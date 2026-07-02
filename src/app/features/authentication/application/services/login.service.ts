import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthenticationRepository } from '../../domain/repositories/authentication.repository';
import { SessionService } from '../../../../core/application/services/session.service';
import { AuthenticationStore } from '../state/authentication.store';
import { LoginRequest, LoginResponse } from '../../domain/models/login-request.model';
import { AppUserContext } from '../../../../core/domain/entities/app-user-context.entity';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private readonly authRepo = inject(AuthenticationRepository);
  private readonly session = inject(SessionService);
  private readonly store = inject(AuthenticationStore);

  login(request: LoginRequest): Observable<LoginResponse> {
    this.store.setLoading(true);

    return this.authRepo.login(request).pipe(
      tap({
        next: (response) => this.handleLoginSuccess(response),
        error: (err) => this.store.setError(err?.message ?? 'فشل تسجيل الدخول'),
      })
    );
  }

  private handleLoginSuccess(response: LoginResponse): void {
    const userContext: AppUserContext = {
      ...response.user,
    };

    this.session.saveSession(
      {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        tokenType: response.tokenType,
        expiresIn: response.expiresIn,
        expiresAt: response.expiresAt,
        scope: response.scope,
      },
      userContext
    );

    this.store.setUser(userContext);
  }
}