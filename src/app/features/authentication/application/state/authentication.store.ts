import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { computed } from '@angular/core';
import { AppUserContext } from '../../../../core/domain/entities/app-user-context.entity';

export interface AuthenticationState {
  user: AppUserContext | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string | null;
  passwordResetSent: boolean;
  passwordResetEmail: string | null;
}

const initialState: AuthenticationState = {
  user: null,
  isLoading: false,
  isLoggedIn: false,
  error: null,
  passwordResetSent: false,
  passwordResetEmail: null,
};

export const AuthenticationStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((store) => ({
    userFullName: computed(() => store.user()?.fullName ?? ''),
    userRoles: computed(() => store.user()?.roles ?? []),
    userPermissions: computed(() => store.user()?.permissions ?? []),
    hasError: computed(() => store.error() !== null),
  })),

  withMethods((store) => ({
    setLoading(loading: boolean): void {
      patchState(store, { isLoading: loading, error: null });
    },

    setUser(user: AppUserContext): void {
      patchState(store, { user, isLoggedIn: true, isLoading: false, error: null });
    },

    clearUser(): void {
      patchState(store, { ...initialState });
    },

    setError(error: string): void {
      patchState(store, { error, isLoading: false });
    },

    clearError(): void {
      patchState(store, { error: null });
    },

    setPasswordResetSent(email: string): void {
      patchState(store, {
        passwordResetSent: true,
        passwordResetEmail: email,
        isLoading: false,
      });
    },
  }))
);