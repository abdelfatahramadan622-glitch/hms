import { AppUserContext } from '../../../../core/domain/entities/app-user-context.entity';

export interface AuthenticatedUser extends AppUserContext {
  sessionId: string;
  accessToken: string;
  refreshToken: string;
  tokenExpiresAt: string;
}

export function mapToAppUserContext(user: AuthenticatedUser): AppUserContext {
  const { sessionId, accessToken, refreshToken, tokenExpiresAt, ...context } = user;
  return context;
}