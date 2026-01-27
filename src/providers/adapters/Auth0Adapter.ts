import type { IAuthProvider, ProviderConfig, AuthorizationParams, OIDCTokens, UserProfile } from '../IAuthProvider';

export class Auth0Adapter implements IAuthProvider {
  readonly name = 'auth0';
  readonly displayName = 'Auth0';
  readonly authorizeEndpoint: string = '';
  readonly tokenEndpoint: string = '';
  readonly userInfoEndpoint: string = '';
  readonly scopes = ['openid', 'profile', 'email', 'offline_access'];

  private config!: ProviderConfig;

  async initialize(config: ProviderConfig): Promise<void> {
    this.config = config;
    if (!config.issuer) throw new Error('Auth0 requires issuer (domain) URL');
    (this as { authorizeEndpoint: string }).authorizeEndpoint = `${config.issuer}/authorize`;
    (this as { tokenEndpoint: string }).tokenEndpoint = `${config.issuer}/oauth/token`;
    (this as { userInfoEndpoint: string }).userInfoEndpoint = `${config.issuer}/userinfo`;
  }

  getAuthorizationUrl(params: AuthorizationParams): string {
    const searchParams = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      scope: params.scope || this.scopes.join(' '),
      state: params.state || '',
      nonce: params.nonce || '',
      ...(this.config.audience && { audience: this.config.audience }),
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
    return `${this.config.issuer}/v2/logout?client_id=${this.config.clientId}&returnTo=${encodeURIComponent(this.config.postLogoutRedirectUri || '')}`;
  }
}
