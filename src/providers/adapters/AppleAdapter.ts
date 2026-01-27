import type { IAuthProvider, ProviderConfig, AuthorizationParams, OIDCTokens, UserProfile } from '../IAuthProvider';

export class AppleAdapter implements IAuthProvider {
  readonly name = 'apple';
  readonly displayName = 'Apple';
  readonly authorizeEndpoint = 'https://appleid.apple.com/auth/authorize';
  readonly tokenEndpoint = 'https://appleid.apple.com/auth/token';
  readonly userInfoEndpoint = '';
  readonly scopes = ['name', 'email'];

  private config!: ProviderConfig;

  async initialize(config: ProviderConfig): Promise<void> {
    this.config = config;
  }

  getAuthorizationUrl(params: AuthorizationParams): string {
    const searchParams = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code id_token',
      response_mode: 'form_post',
      scope: params.scope || this.scopes.join(' '),
      state: params.state || '',
      nonce: params.nonce || '',
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
    return null;
  }
}
