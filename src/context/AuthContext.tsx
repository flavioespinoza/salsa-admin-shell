import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { UserProfile, OIDCTokens } from '../providers/IAuthProvider';

interface AuthState {
  user: UserProfile | null;
  tokens: OIDCTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: UserProfile; tokens: OIDCTokens } }
  | { type: 'AUTH_FAILURE'; payload: Error }
  | { type: 'LOGOUT' }
  | { type: 'REFRESH_TOKENS'; payload: OIDCTokens }
  | { type: 'UPDATE_USER'; payload: Partial<UserProfile> };

interface AuthContextValue extends AuthState {
  login: (provider: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshTokens: () => Promise<void>;
  updateUser: (updates: Partial<UserProfile>) => void;
}

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return { ...initialState, isLoading: false };
    case 'REFRESH_TOKENS':
      return { ...state, tokens: action.payload };
    case 'UPDATE_USER':
      return state.user
        ? { ...state, user: { ...state.user, ...action.payload } }
        : state;
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      try {
        const storedTokens = sessionStorage.getItem('oidc_tokens');
        if (storedTokens) {
          const tokens = JSON.parse(storedTokens) as OIDCTokens;
          if (tokens.expiresAt > Date.now()) {
            // Fetch user profile with stored tokens
            dispatch({
              type: 'AUTH_SUCCESS',
              payload: { user: { sub: 'user' }, tokens },
            });
            return;
          }
        }
        dispatch({ type: 'AUTH_FAILURE', payload: new Error('No valid session') });
      } catch (error) {
        dispatch({ type: 'AUTH_FAILURE', payload: error as Error });
      }
    };

    void initAuth();
  }, []);

  const login = async (provider: string): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    // Implementation: redirect to provider authorization URL
    throw new Error(`Login with ${provider} not implemented`);
  };

  const logout = async (): Promise<void> => {
    sessionStorage.removeItem('oidc_tokens');
    dispatch({ type: 'LOGOUT' });
  };

  const refreshTokens = async (): Promise<void> => {
    // Implementation: refresh tokens using refresh token
    throw new Error('Token refresh not implemented');
  };

  const updateUser = (updates: Partial<UserProfile>): void => {
    dispatch({ type: 'UPDATE_USER', payload: updates });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, logout, refreshTokens, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
