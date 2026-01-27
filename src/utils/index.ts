// Utility Functions
// Security Gateway Dashboard

export {
  decodeJWT,
  isJWTExpired,
  getJWTExpirationDate,
  getJWTClaim,
} from './jwtDecoder';
export type { JWTHeader, JWTPayload, DecodedJWT } from './jwtDecoder';

export {
  fetchDiscoveryDocument,
  parseAuthorizationResponse,
  buildAuthorizationUrl,
  validateIdToken,
} from './oidcParser';
export type {
  OIDCDiscoveryDocument,
  ParsedAuthorizationResponse,
} from './oidcParser';

export {
  encrypt,
  decrypt,
  generateRandomString,
  generateCodeVerifier,
  generateCodeChallenge,
  generateNonce,
  generateState,
} from './encryption';

export { logger, Logger } from './logger';
export type { LogLevel, LogEntry, LoggerConfig } from './logger';
