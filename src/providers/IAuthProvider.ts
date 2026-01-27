export interface OIDCTokens {
  accessToken: string;
  refreshToken?: string;
  idToken?: string;
  expiresAt: number;
  tokenType: string;
}

export interface UserProfile {
  sub: string;
  email?: string;
  emailVerified?: boolean;
  name?: string;
  givenName?: string;
  familyName?: string;
  picture?: string;
  locale?: string;
  updatedAt?: number;
}

export interface AuthorizationParams {
  scope?: string;
  state?: string;
  nonce?: string;
  prompt?: 'none' | 'login' | 'consent' | 'select_account';
  loginHint?: string;
  acrValues?: string;
  additionalParams?: Record<string, string>;
}

export interface IAuthProvider {
  readonly name: string;
  readonly displayName: string;
  readonly authorizeEndpoint: string;
  readonly tokenEndpoint: string;
  readonly userInfoEndpoint: string;
  readonly scopes: string[];

  initialize(config: ProviderConfig): Promise<void>;
  getAuthorizationUrl(params: AuthorizationParams): string;
  exchangeCodeForTokens(code: string, codeVerifier?: string): Promise<OIDCTokens>;
  refreshAccessToken(refreshToken: string): Promise<OIDCTokens>;
  getUserProfile(accessToken: string): Promise<UserProfile>;
  revokeToken(token: string): Promise<void>;
  logout(idToken?: string): Promise<string | null>;
}

export interface ProviderConfig {
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
  postLogoutRedirectUri?: string;
  issuer?: string;
  audience?: string;
}
