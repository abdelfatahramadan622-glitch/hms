import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationRepository } from '../../domain/repositories/authentication.repository';
import { AuthenticationApiService } from '../api/authentication-api.service';
import { LoginRequest, LoginResponse } from '../../domain/models/login-request.model';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ChangePasswordRequest,
} from '../../domain/models/password-reset.model';
import {
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '../../domain/models/refresh-token-request.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationApiRepository extends AuthenticationRepository {
  private readonly api = inject(AuthenticationApiService);

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.api.login(request);
  }

  logout(): Observable<void> {
    return this.api.logout();
  }

  refreshToken(request: RefreshTokenRequest): Observable<RefreshTokenResponse> {
    return this.api.refreshToken(request);
  }

  forgotPassword(request: ForgotPasswordRequest): Observable<ForgotPasswordResponse> {
    return this.api.forgotPassword(request);
  }

  resetPassword(request: ResetPasswordRequest): Observable<void> {
    return this.api.resetPassword(request);
  }

  changePassword(request: ChangePasswordRequest): Observable<void> {
    return this.api.changePassword(request);
  }
}