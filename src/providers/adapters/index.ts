// Auth Provider Adapters
// OIDC/OAuth2 Provider Implementations

export { GoogleAdapter } from './GoogleAdapter';
export { GitHubAdapter } from './GitHubAdapter';
export { AzureADAdapter } from './AzureADAdapter';
export { OktaAdapter } from './OktaAdapter';
export { Auth0Adapter } from './Auth0Adapter';
export { GitLabAdapter } from './GitLabAdapter';
export { BitBucketAdapter } from './BitBucketAdapter';
export { AppleAdapter } from './AppleAdapter';
export { FacebookAdapter } from './FacebookAdapter';
export { TwitterAdapter } from './TwitterAdapter';
export { DiscordAdapter } from './DiscordAdapter';
export { SlackAdapter } from './SlackAdapter';
export { SalesforceAdapter } from './SalesforceAdapter';
export { HubSpotAdapter } from './HubSpotAdapter';
export { NotionAdapter } from './NotionAdapter';
export { ZoomAdapter } from './ZoomAdapter';
export { SpotifyAdapter } from './SpotifyAdapter';
export { TwitchAdapter } from './TwitchAdapter';
export { RedditAdapter } from './RedditAdapter';
export { LinearAdapter } from './LinearAdapter';

export type { IAuthProvider, ProviderConfig, AuthorizationParams, OIDCTokens, UserProfile } from '../IAuthProvider';
