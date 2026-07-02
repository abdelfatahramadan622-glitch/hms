import { Injectable, inject, signal } from '@angular/core';
import { SecureStorageService } from '../../infrastructure/storage/secure-storage.service';
import { LocalStorageService } from '../../infrastructure/storage/local-storage.service';
import { APP_CONSTANTS } from '../../constants/app.constants';
import { ApplicationToken, isTokenExpired } from '../../domain/models/application-token.model';
import { AppUserContext } from '../../domain/entities/app-user-context.entity';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly secureStorage = inject(SecureStorageService);
  private readonly localStorage = inject(LocalStorageService);

  readonly isAuthenticated = signal(false);

  constructor() {
    this.isAuthenticated.set(this.hasValidSession());
  }

  saveSession(token: ApplicationToken, user: AppUserContext): void {
    this.secureStorage.set(APP_CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN, token.accessToken);
    this.secureStorage.set(APP_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN, token.refreshToken);
    this.secureStorage.set(APP_CONSTANTS.STORAGE_KEYS.USER_CONTEXT, user);
    this.isAuthenticated.set(true);
  }

  clearSession(): void {
    this.secureStorage.remove(APP_CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN);
    this.secureStorage.remove(APP_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN);
    this.secureStorage.remove(APP_CONSTANTS.STORAGE_KEYS.USER_CONTEXT);
    this.isAuthenticated.set(false);
  }

  getAccessToken(): string | null {
    return this.secureStorage.get<string>(APP_CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return this.secureStorage.get<string>(APP_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN);
  }

  getUserContext(): AppUserContext | null {
    return this.secureStorage.get<AppUserContext>(APP_CONSTANTS.STORAGE_KEYS.USER_CONTEXT);
  }

  hasValidSession(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;
    // Basic check: token exists (full expiry check done via TokenService)
    return true;
  }
}