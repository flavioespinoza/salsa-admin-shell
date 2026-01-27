import type { IAuthProvider, ProviderConfig, AuthorizationParams, OIDCTokens, UserProfile } from '../IAuthProvider';

export class SalesforceAdapter implements IAuthProvider {
  readonly name = 'salesforce';
  readonly displayName = 'Salesforce';
  readonly authorizeEndpoint = 'https://login.salesforce.com/services/oauth2/authorize';
  readonly tokenEndpoint = 'https://login.salesforce.com/services/oauth2/token';
  readonly userInfoEndpoint = 'https://login.salesforce.com/services/oauth2/userinfo';
  readonly scopes = ['openid', 'profile', 'email', 'api'];

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
    return 'https://login.salesforce.com/services/oauth2/logout';
  }
}
