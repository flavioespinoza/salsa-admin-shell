import type { IAuthProvider, ProviderConfig, AuthorizationParams, OIDCTokens, UserProfile } from '../IAuthProvider';

export class AzureADAdapter implements IAuthProvider {
  readonly name = 'azure-ad';
  readonly displayName = 'Microsoft Azure AD';
  readonly authorizeEndpoint = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';
  readonly tokenEndpoint = 'https://login.microsoftonline.com/common/oauth2/v2.0/token';
  readonly userInfoEndpoint = 'https://graph.microsoft.com/oidc/userinfo';
  readonly scopes = ['openid', 'profile', 'email', 'offline_access'];

  private config!: ProviderConfig;

  async initialize(config: ProviderConfig): Promise<void> {
    this.config = config;
  }

  getAuthorizationUrl(params: AuthorizationParams): string {
    const searchParams = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      scope: params.scope || this.scopes.join(' '),
      state: params.state || '',
      nonce: params.nonce || '',
      ...(params.prompt && { prompt: params.prompt }),
      ...(params.loginHint && { login_hint: params.loginHint }),
    });
    return `${this.authorizeEndpoint}?${searchParams.toString()}`;
  }

  async exchangeCodeForTokens(code: string, codeVerifier?: string): Promise<OIDCTokens> {
    throw new Error('Method not implemented.');
  }

  async refreshAccessToken(refreshToken: string): Promise<OIDCTokens> {
    throw new Error('Method not implemented.');
  }

  async getUserProfile(accessToken: string): Promise<UserProfile> {
    throw new Error('Method not implemented.');
  }

  async revokeToken(token: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async logout(idToken?: string): Promise<string | null> {
    return `https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(this.config.postLogoutRedirectUri || '')}`;
  }
}
