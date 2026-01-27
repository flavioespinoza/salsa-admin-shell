// Provider Profile Fixtures
// Mock data for offline testing

import googleProfile from './googleProfile.json';
import githubProfile from './githubProfile.json';
import azureProfile from './azureProfile.json';
import oktaProfile from './oktaProfile.json';
import auth0Profile from './auth0Profile.json';
import gitlabProfile from './gitlabProfile.json';
import bitbucketProfile from './bitbucketProfile.json';
import appleProfile from './appleProfile.json';
import facebookProfile from './facebookProfile.json';
import twitterProfile from './twitterProfile.json';
import discordProfile from './discordProfile.json';
import slackProfile from './slackProfile.json';
import salesforceProfile from './salesforceProfile.json';
import hubspotProfile from './hubspotProfile.json';
import notionProfile from './notionProfile.json';
import zoomProfile from './zoomProfile.json';
import spotifyProfile from './spotifyProfile.json';
import twitchProfile from './twitchProfile.json';
import redditProfile from './redditProfile.json';
import linearProfile from './linearProfile.json';

export const providerProfiles = {
  google: googleProfile,
  github: githubProfile,
  azure: azureProfile,
  okta: oktaProfile,
  auth0: auth0Profile,
  gitlab: gitlabProfile,
  bitbucket: bitbucketProfile,
  apple: appleProfile,
  facebook: facebookProfile,
  twitter: twitterProfile,
  discord: discordProfile,
  slack: slackProfile,
  salesforce: salesforceProfile,
  hubspot: hubspotProfile,
  notion: notionProfile,
  zoom: zoomProfile,
  spotify: spotifyProfile,
  twitch: twitchProfile,
  reddit: redditProfile,
  linear: linearProfile,
};

export type ProviderName = keyof typeof providerProfiles;

export function getProviderProfile(provider: ProviderName): unknown {
  return providerProfiles[provider];
}

export default providerProfiles;
