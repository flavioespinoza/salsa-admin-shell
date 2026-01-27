export interface OIDCDiscoveryDocument {
  issuer: string;
  authorization_endpoint: string;
  token_endpoint: string;
  userinfo_endpoint?: string;
  jwks_uri: string;
  registration_endpoint?: string;
  scopes_supported?: string[];
  response_types_supported: string[];
  response_modes_supported?: string[];
  grant_types_supported?: string[];
  subject_types_supported: string[];
  id_token_signing_alg_values_supported: string[];
  token_endpoint_auth_methods_supported?: string[];
  claims_supported?: string[];
  code_challenge_methods_supported?: string[];
  end_session_endpoint?: string;
  revocation_endpoint?: string;
  introspection_endpoint?: string;
}

export interface ParsedAuthorizationResponse {
  code?: string;
  state?: string;
  error?: string;
  errorDescription?: string;
  errorUri?: string;
}

export async function fetchDiscoveryDocument(
  issuer: string
): Promise<OIDCDiscoveryDocument> {
  const wellKnownUrl = `${issuer.replace(/\/$/, '')}/.well-known/openid-configuration`;

  const response = await fetch(wellKnownUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch discovery document: ${response.status}`);
  }

  return response.json() as Promise<OIDCDiscoveryDocument>;
}

export function parseAuthorizationResponse(
  url: string
): ParsedAuthorizationResponse {
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search || urlObj.hash.slice(1));

  return {
    code: params.get('code') || undefined,
    state: params.get('state') || undefined,
    error: params.get('error') || undefined,
    errorDescription: params.get('error_description') || undefined,
    errorUri: params.get('error_uri') || undefined,
  };
}

export function buildAuthorizationUrl(
  endpoint: string,
  params: {
    clientId: string;
    redirectUri: string;
    scope: string;
    state: string;
    nonce?: string;
    codeChallenge?: string;
    codeChallengeMethod?: 'S256' | 'plain';
    responseType?: string;
    prompt?: string;
    loginHint?: string;
    additionalParams?: Record<string, string>;
  }
): string {
  const searchParams = new URLSearchParams({
    client_id: params.clientId,
    redirect_uri: params.redirectUri,
    response_type: params.responseType || 'code',
    scope: params.scope,
    state: params.state,
  });

  if (params.nonce) searchParams.set('nonce', params.nonce);
  if (params.codeChallenge) {
    searchParams.set('code_challenge', params.codeChallenge);
    searchParams.set('code_challenge_method', params.codeChallengeMethod || 'S256');
  }
  if (params.prompt) searchParams.set('prompt', params.prompt);
  if (params.loginHint) searchParams.set('login_hint', params.loginHint);

  if (params.additionalParams) {
    Object.entries(params.additionalParams).forEach(([key, value]) => {
      searchParams.set(key, value);
    });
  }

  return `${endpoint}?${searchParams.toString()}`;
}

export function validateIdToken(
  idToken: string,
  expectedIssuer: string,
  expectedAudience: string,
  expectedNonce?: string
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  try {
    const parts = idToken.split('.');
    if (parts.length !== 3) {
      return { valid: false, errors: ['Invalid token format'] };
    }

    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));

    if (payload.iss !== expectedIssuer) {
      errors.push(`Invalid issuer: expected ${expectedIssuer}, got ${payload.iss}`);
    }

    const aud = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
    if (!aud.includes(expectedAudience)) {
      errors.push(`Invalid audience: expected ${expectedAudience}`);
    }

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      errors.push('Token has expired');
    }

    if (payload.nbf && Date.now() < payload.nbf * 1000) {
      errors.push('Token is not yet valid');
    }

    if (expectedNonce && payload.nonce !== expectedNonce) {
      errors.push('Invalid nonce');
    }

    return { valid: errors.length === 0, errors };
  } catch {
    return { valid: false, errors: ['Failed to parse token'] };
  }
}
