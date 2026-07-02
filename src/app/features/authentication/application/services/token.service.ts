import { Injectable, inject } from '@angular/core';
import { Observable, timer, switchMap, EMPTY } from 'rxjs';
import { SessionService } from '../../../../core/application/services/session.service';
import { AuthenticationRepository } from '../../domain/repositories/authentication.repository';
import {
  parseTokenPayload,
  isTokenExpired,
} from '../../../../core/domain/models/application-token.model';

const REFRESH_BEFORE_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly session = inject(SessionService);
  private readonly authRepo = inject(AuthenticationRepository);

  isAccessTokenExpired(): boolean {
    const token = this.session.getAccessToken();
    if (!token) return true;
    const payload = parseTokenPayload(token);
    if (!payload) return true;
    return payload.exp * 1000 < Date.now();
  }

  getTokenExpiryMs(): number {
    const token = this.session.getAccessToken();
    if (!token) return 0;
    const payload = parseTokenPayload(token);
    if (!payload) return 0;
    return payload.exp * 1000 - Date.now();
  }

  scheduleTokenRefresh(): Observable<void> {
    const expiryMs = this.getTokenExpiryMs();
    const refreshAfterMs = Math.max(0, expiryMs - REFRESH_BEFORE_EXPIRY_MS);

    if (expiryMs <= 0) return EMPTY;

    return timer(refreshAfterMs).pipe(
      switchMap(() => {
        const refreshToken = this.session.getRefreshToken();
        if (!refreshToken) return EMPTY;
        return this.authRepo.refreshToken({ refreshToken }).pipe(
          switchMap((res) => {
            // Update tokens in session
            const user = this.session.getUserContext();
            if (user) {
              this.session.saveSession(
                {
                  accessToken: res.accessToken,
                  refreshToken: res.refreshToken,
                  tokenType: 'Bearer',
                  expiresIn: res.expiresIn,
                  expiresAt: res.expiresAt,
                  scope: [],
                },
                user
              );
            }
            return EMPTY;
          })
        );
      })
    );
  }
}