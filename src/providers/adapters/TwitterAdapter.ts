import type { IAuthProvider, ProviderConfig, AuthorizationParams, OIDCTokens, UserProfile } from '../IAuthProvider';

export class TwitterAdapter implements IAuthProvider {
  readonly name = 'twitter';
  readonly displayName = 'Twitter/X';
  readonly authorizeEndpoint = 'https://twitter.com/i/oauth2/authorize';
  readonly tokenEndpoint = 'https://api.twitter.com/2/oauth2/token';
  readonly userInfoEndpoint = 'https://api.twitter.com/2/users/me';
  readonly scopes = ['tweet.read', 'users.read', 'offline.access'];

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
      code_challenge: params.nonce || '',
      code_challenge_method: 'S256',
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
