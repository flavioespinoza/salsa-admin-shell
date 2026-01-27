import { useState, useEffect, useCallback } from 'react';

export interface FeatureFlags {
  [key: string]: boolean | string | number;
}

export interface UseFeatureFlagReturn {
  flags: FeatureFlags;
  isEnabled: (flag: string) => boolean;
  getValue: <T>(flag: string, defaultValue: T) => T;
  isLoading: boolean;
  refresh: () => Promise<void>;
}

const DEFAULT_FLAGS: FeatureFlags = {
  mfaEnabled: true,
  auditLog: true,
  darkMode: false,
  betaFeatures: false,
};

export function useFeatureFlag(): UseFeatureFlagReturn {
  const [flags, setFlags] = useState<FeatureFlags>(DEFAULT_FLAGS);
  const [isLoading, setIsLoading] = useState(true);

  const loadFlags = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Load from environment variables
      const envFlags: FeatureFlags = {};
      Object.keys(import.meta.env).forEach(key => {
        if (key.startsWith('VITE_FEATURE_')) {
          const flagName = key.replace('VITE_FEATURE_', '').toLowerCase();
          const value = import.meta.env[key];
          envFlags[flagName] = value === 'true' ? true : value === 'false' ? false : value;
        }
      });
      setFlags(prev => ({ ...prev, ...envFlags }));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadFlags();
  }, [loadFlags]);

  const isEnabled = useCallback(
    (flag: string): boolean => {
      const value = flags[flag];
      return typeof value === 'boolean' ? value : Boolean(value);
    },
    [flags]
  );

  const getValue = useCallback(
    <T>(flag: string, defaultValue: T): T => {
      const value = flags[flag];
      return (value !== undefined ? value : defaultValue) as T;
    },
    [flags]
  );

  return {
    flags,
    isEnabled,
    getValue,
    isLoading,
    refresh: loadFlags,
  };
}
