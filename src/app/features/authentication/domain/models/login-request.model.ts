export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  expiresAt: string;
  scope: string[];
  user: AuthenticatedUserDto;
}

export interface AuthenticatedUserDto {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar?: string;
  roles: string[];
  permissions: string[];
  hospitalId: string;
  departmentId?: string;
  departmentName?: string;
  isActive: boolean;
  lastLoginAt: string;
  preferredLanguage: 'ar' | 'en';
  preferredTheme: 'light' | 'dark' | 'system';
}