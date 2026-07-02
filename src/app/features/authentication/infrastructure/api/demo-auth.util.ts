import { LoginRequest, LoginResponse } from '../../domain/models/login-request.model';

export const DEMO_AUTH_CREDENTIALS = {
  email: 'admin@hospital.com',
  password: 'Admin123!',
};

export function getDemoLoginResponse(request: LoginRequest): LoginResponse | null {
  if (
    request.email === DEMO_AUTH_CREDENTIALS.email &&
    request.password === DEMO_AUTH_CREDENTIALS.password
  ) {
    return {
      accessToken: 'demo-access-token',
      refreshToken: 'demo-refresh-token',
      tokenType: 'Bearer',
      expiresIn: 3600,
      expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
      scope: ['read', 'write'],
      user: {
        userId: 'demo-user-id',
        email: DEMO_AUTH_CREDENTIALS.email,
        firstName: 'مدير',
        lastName: 'النظام',
        fullName: 'مدير النظام',
        roles: ['super_admin'],
        permissions: ['read', 'write', 'manage'],
        hospitalId: 'demo-hospital',
        isActive: true,
        lastLoginAt: new Date().toISOString(),
        preferredLanguage: 'ar',
        preferredTheme: 'light',
      },
    };
  }

  return null;
}
