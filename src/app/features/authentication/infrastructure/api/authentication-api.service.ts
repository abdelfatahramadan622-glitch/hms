import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiClientService } from '../../../../core/infrastructure/api/api-client.service';
import { API_ENDPOINTS } from '../../../../core/infrastructure/api/api-endpoints';
import { LoginRequest, LoginResponse } from '../../domain/models/login-request.model';
import { getDemoLoginResponse } from './demo-auth.util';
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
export class AuthenticationApiService {
  private readonly api = inject(ApiClientService);

  login(request: LoginRequest): Observable<LoginResponse> {
    const demoResponse = getDemoLoginResponse(request);
    if (demoResponse) {
      return of(demoResponse);
    }

    return this.api.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, request);
  }

  logout(): Observable<void> {
    return this.api.post<void>(API_ENDPOINTS.AUTH.LOGOUT, {});
  }

  refreshToken(request: RefreshTokenRequest): Observable<RefreshTokenResponse> {
    return this.api.post<RefreshTokenResponse>(API_ENDPOINTS.AUTH.REFRESH, request);
  }

  forgotPassword(request: ForgotPasswordRequest): Observable<ForgotPasswordResponse> {
    return this.api.post<ForgotPasswordResponse>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, request);
  }

  resetPassword(request: ResetPasswordRequest): Observable<void> {
    return this.api.post<void>(API_ENDPOINTS.AUTH.RESET_PASSWORD, request);
  }

  changePassword(request: ChangePasswordRequest): Observable<void> {
    return this.api.post<void>(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, request);
  }
}