import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

interface FeatureFlags {
  [key: string]: boolean | string | number;
}

interface FeatureFlagContextValue {
  flags: FeatureFlags;
  isEnabled: (flag: string) => boolean;
  getValue: <T>(flag: string, defaultValue: T) => T;
  isLoading: boolean;
  refresh: () => Promise<void>;
}

const FeatureFlagContext = createContext<FeatureFlagContextValue | undefined>(undefined);

const DEFAULT_FLAGS: FeatureFlags = {
  mfaEnabled: true,
  auditLog: true,
  darkMode: true,
  betaFeatures: false,
  maxSessionDuration: 3600,
  defaultLocale: 'en-US',
};

export function FeatureFlagProvider({ children }: { children: ReactNode }): JSX.Element {
  const [flags, setFlags] = useState<FeatureFlags>(DEFAULT_FLAGS);
  const [isLoading, setIsLoading] = useState(true);

  const loadFlags = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Load from environment variables
      const envFlags: FeatureFlags = {};
      Object.keys(import.meta.env).forEach((key) => {
        if (key.startsWith('VITE_FEATURE_')) {
          const flagName = key.replace('VITE_FEATURE_', '').toLowerCase();
          const value = import.meta.env[key];
          envFlags[flagName] = value === 'true' ? true : value === 'false' ? false : value;
        }
      });
      setFlags((prev) => ({ ...prev, ...envFlags }));
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
    <T,>(flag: string, defaultValue: T): T => {
      const value = flags[flag];
      return (value !== undefined ? value : defaultValue) as T;
    },
    [flags]
  );

  return (
    <FeatureFlagContext.Provider value={{ flags, isEnabled, getValue, isLoading, refresh: loadFlags }}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

export function useFeatureFlagContext(): FeatureFlagContextValue {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error('useFeatureFlagContext must be used within a FeatureFlagProvider');
  }
  return context;
}
