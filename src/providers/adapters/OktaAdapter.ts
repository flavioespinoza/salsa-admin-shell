import type { IAuthProvider, ProviderConfig, AuthorizationParams, OIDCTokens, UserProfile } from '../IAuthProvider';

export class OktaAdapter implements IAuthProvider {
  readonly name = 'okta';
  readonly displayName = 'Okta';
  readonly authorizeEndpoint: string = '';
  readonly tokenEndpoint: string = '';
  readonly userInfoEndpoint: string = '';
  readonly scopes = ['openid', 'profile', 'email', 'offline_access'];

  private config!: ProviderConfig;

  async initialize(config: ProviderConfig): Promise<void> {
    this.config = config;
    if (!config.issuer) throw new Error('Okta requires issuer URL');
    (this as { authorizeEndpoint: string }).authorizeEndpoint = `${config.issuer}/v1/authorize`;
    (this as { tokenEndpoint: string }).tokenEndpoint = `${config.issuer}/v1/token`;
    (this as { userInfoEndpoint: string }).userInfoEndpoint = `${config.issuer}/v1/userinfo`;
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
    return `${this.config.issuer}/v1/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(this.config.postLogoutRedirectUri || '')}`;
  }
}
