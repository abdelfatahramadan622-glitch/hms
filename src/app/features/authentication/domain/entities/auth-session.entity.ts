export interface AuthSession {
  sessionId: string;
  userId: string;
  startedAt: string;
  lastActivityAt: string;
  expiresAt: string;
  ipAddress?: string;
  userAgent?: string;
  isActive: boolean;
}

export function isSessionExpired(session: AuthSession): boolean {
  return new Date(session.expiresAt) <= new Date();
}

export function isSessionIdle(
  session: AuthSession,
  idleMinutes: number
): boolean {
  const idleMs = idleMinutes * 60 * 1000;
  return Date.now() - new Date(session.lastActivityAt).getTime() > idleMs;
}