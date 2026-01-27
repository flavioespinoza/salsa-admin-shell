import { useState, useEffect, useCallback } from 'react';
import type { UserProfile, OIDCTokens } from '../providers/IAuthProvider';

export interface Session {
  user: UserProfile | null;
  tokens: OIDCTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
}

export interface UseSessionReturn extends Session {
  login: (provider: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useSession(): UseSessionReturn {
  const [session, setSession] = useState<Session>({
    user: null,
    tokens: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Initialize session from storage
    const initSession = async (): Promise<void> => {
      try {
        const storedTokens = sessionStorage.getItem('oidc_tokens');
        if (storedTokens) {
          const tokens = JSON.parse(storedTokens) as OIDCTokens;
          if (tokens.expiresAt > Date.now()) {
            setSession(prev => ({
              ...prev,
              tokens,
              isAuthenticated: true,
              isLoading: false,
            }));
          }
        }
      } catch (error) {
        setSession(prev => ({
          ...prev,
          error: error as Error,
          isLoading: false,
        }));
      }
    };

    void initSession();
  }, []);

  const login = useCallback(async (provider: string): Promise<void> => {
    setSession(prev => ({ ...prev, isLoading: true, error: null }));
    // Implementation will redirect to provider authorization URL
    throw new Error(`Login with ${provider} not implemented`);
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    sessionStorage.removeItem('oidc_tokens');
    setSession({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  const refresh = useCallback(async (): Promise<void> => {
    setSession(prev => ({ ...prev, isLoading: true }));
    // Implementation will refresh tokens
    throw new Error('Token refresh not implemented');
  }, []);

  return {
    ...session,
    login,
    logout,
    refresh,
  };
}
