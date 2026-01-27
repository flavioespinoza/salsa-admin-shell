export interface JWTHeader {
  alg: string;
  typ: string;
  kid?: string;
}

export interface JWTPayload {
  iss?: string;
  sub?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  [key: string]: unknown;
}

export interface DecodedJWT {
  header: JWTHeader;
  payload: JWTPayload;
  signature: string;
}

function base64UrlDecode(str: string): string {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  return atob(padded);
}

export function decodeJWT(token: string): DecodedJWT {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format');
  }

  const [headerB64, payloadB64, signature] = parts;

  try {
    const header = JSON.parse(base64UrlDecode(headerB64)) as JWTHeader;
    const payload = JSON.parse(base64UrlDecode(payloadB64)) as JWTPayload;

    return { header, payload, signature };
  } catch {
    throw new Error('Failed to decode JWT');
  }
}

export function isJWTExpired(token: string, bufferSeconds = 0): boolean {
  try {
    const { payload } = decodeJWT(token);
    if (!payload.exp) return false;
    return Date.now() >= (payload.exp - bufferSeconds) * 1000;
  } catch {
    return true;
  }
}

export function getJWTExpirationDate(token: string): Date | null {
  try {
    const { payload } = decodeJWT(token);
    if (!payload.exp) return null;
    return new Date(payload.exp * 1000);
  } catch {
    return null;
  }
}

export function getJWTClaim<T = unknown>(token: string, claim: string): T | undefined {
  try {
    const { payload } = decodeJWT(token);
    return payload[claim] as T | undefined;
  } catch {
    return undefined;
  }
}
