export interface AppUserContext {
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

export function createGuestUserContext(): AppUserContext {
  return {
    userId: '',
    email: '',
    firstName: '',
    lastName: '',
    fullName: '',
    roles: [],
    permissions: [],
    hospitalId: '',
    isActive: false,
    lastLoginAt: '',
    preferredLanguage: 'ar',
    preferredTheme: 'light',
  };
}

export function hasPermission(
  user: AppUserContext,
  permission: string
): boolean {
  return user.permissions.includes(permission);
}

export function hasRole(user: AppUserContext, role: string): boolean {
  return user.roles.includes(role);
}

export function hasAnyRole(user: AppUserContext, roles: string[]): boolean {
  return roles.some((role) => user.roles.includes(role));
}