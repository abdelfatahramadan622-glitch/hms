import { inject } from '@angular/core';
import { AuthenticationStore } from './authentication.store';

// Helper functions to read from the store outside components
export function injectAuthSelectors() {
  const store = inject(AuthenticationStore);

  return {
    isLoggedIn: store.isLoggedIn,
    isLoading: store.isLoading,
    user: store.user,
    error: store.error,
    hasError: store.hasError,
    userFullName: store.userFullName,
    userRoles: store.userRoles,
    userPermissions: store.userPermissions,
    passwordResetSent: store.passwordResetSent,
    passwordResetEmail: store.passwordResetEmail,
  };
}