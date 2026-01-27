import type { IAuthProvider, ProviderConfig, AuthorizationParams, OIDCTokens, UserProfile } from '../IAuthProvider';

export class RedditAdapter implements IAuthProvider {
  readonly name = 'reddit';
  readonly displayName = 'Reddit';
  readonly authorizeEndpoint = 'https://www.reddit.com/api/v1/authorize';
  readonly tokenEndpoint = 'https://www.reddit.com/api/v1/access_token';
  readonly userInfoEndpoint = 'https://oauth.reddit.com/api/v1/me';
  readonly scopes = ['identity', 'read'];

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
      duration: 'permanent',
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
