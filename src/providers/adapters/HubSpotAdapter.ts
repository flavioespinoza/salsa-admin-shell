import type { IAuthProvider, ProviderConfig, AuthorizationParams, OIDCTokens, UserProfile } from '../IAuthProvider';

export class HubSpotAdapter implements IAuthProvider {
  readonly name = 'hubspot';
  readonly displayName = 'HubSpot';
  readonly authorizeEndpoint = 'https://app.hubspot.com/oauth/authorize';
  readonly tokenEndpoint = 'https://api.hubapi.com/oauth/v1/token';
  readonly userInfoEndpoint = 'https://api.hubapi.com/oauth/v1/access-tokens';
  readonly scopes = ['oauth', 'crm.objects.contacts.read'];

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
