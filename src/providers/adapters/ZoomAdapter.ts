import type { IAuthProvider, ProviderConfig, AuthorizationParams, OIDCTokens, UserProfile } from '../IAuthProvider';

export class ZoomAdapter implements IAuthProvider {
  readonly name = 'zoom';
  readonly displayName = 'Zoom';
  readonly authorizeEndpoint = 'https://zoom.us/oauth/authorize';
  readonly tokenEndpoint = 'https://zoom.us/oauth/token';
  readonly userInfoEndpoint = 'https://api.zoom.us/v2/users/me';
  readonly scopes = ['user:read', 'user:email'];

  private config!: ProviderConfig;

  async initialize(config: ProviderConfig): Promise<void> {
    this.config = config;
  }

  getAuthorizationUrl(params: AuthorizationParams): string {
    const searchParams = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      state: params.state || '',
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
