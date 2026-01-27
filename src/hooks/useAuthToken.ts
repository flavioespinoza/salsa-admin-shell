import { useState, useEffect, useCallback } from 'react';
import type { OIDCTokens } from '../providers/IAuthProvider';

export interface UseAuthTokenReturn {
  accessToken: string | null;
  idToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  isExpired: boolean;
  isExpiringSoon: boolean;
  getAuthHeader: () => string | null;
  setTokens: (tokens: OIDCTokens) => void;
  clearTokens: () => void;
}

const EXPIRY_BUFFER_MS = 5 * 60 * 1000; // 5 minutes

export function useAuthToken(): UseAuthTokenReturn {
  const [tokens, setTokensState] = useState<OIDCTokens | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('oidc_tokens');
    if (stored) {
      try {
        setTokensState(JSON.parse(stored));
      } catch {
        sessionStorage.removeItem('oidc_tokens');
      }
    }
  }, []);

  const isExpired = tokens ? Date.now() >= tokens.expiresAt : true;
  const isExpiringSoon = tokens
    ? Date.now() >= tokens.expiresAt - EXPIRY_BUFFER_MS
    : true;

  const getAuthHeader = useCallback((): string | null => {
    if (!tokens || isExpired) return null;
    return `${tokens.tokenType} ${tokens.accessToken}`;
  }, [tokens, isExpired]);

  const setTokens = useCallback((newTokens: OIDCTokens): void => {
    setTokensState(newTokens);
    sessionStorage.setItem('oidc_tokens', JSON.stringify(newTokens));
  }, []);

  const clearTokens = useCallback((): void => {
    setTokensState(null);
    sessionStorage.removeItem('oidc_tokens');
  }, []);

  return {
    accessToken: tokens?.accessToken ?? null,
    idToken: tokens?.idToken ?? null,
    refreshToken: tokens?.refreshToken ?? null,
    expiresAt: tokens?.expiresAt ?? null,
    isExpired,
    isExpiringSoon,
    getAuthHeader,
    setTokens,
    clearTokens,
  };
}
