export interface ApplicationToken {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  expiresAt: string;
  scope: string[];
}

export interface TokenPayload {
  sub: string;
  email: string;
  roles: string[];
  permissions: string[];
  hospitalId: string;
  departmentId?: string;
  iat: number;
  exp: number;
}

export function isTokenExpired(expiresAt: string): boolean {
  return new Date(expiresAt) <= new Date();
}

export function parseTokenPayload(token: string): TokenPayload | null {
  try {
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload) as TokenPayload;
  } catch {
    return null;
  }
}

export function getTokenExpiryDate(expiresIn: number): string {
  const date = new Date();
  date.setSeconds(date.getSeconds() + expiresIn);
  return date.toISOString();
}