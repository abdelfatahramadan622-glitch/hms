import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { LogoutService } from '../services/logout.service';
import { PasswordResetService } from '../services/password-reset.service';
import { AuthenticationStore } from '../state/authentication.store';
import { LoginRequest, LoginResponse } from '../../domain/models/login-request.model';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ChangePasswordRequest,
} from '../../domain/models/password-reset.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationFacade {
  private readonly loginService = inject(LoginService);
  private readonly logoutService = inject(LogoutService);
  private readonly passwordResetService = inject(PasswordResetService);
  private readonly store = inject(AuthenticationStore);

  // ── State ────────────────────────────────────────
  readonly isLoading = this.store.isLoading;
  readonly isLoggedIn = this.store.isLoggedIn;
  readonly user = this.store.user;
  readonly error = this.store.error;
  readonly hasError = this.store.hasError;
  readonly userFullName = this.store.userFullName;
  readonly passwordResetSent = this.store.passwordResetSent;
  readonly passwordResetEmail = this.store.passwordResetEmail;

  // ── Actions ──────────────────────────────────────
  login(request: LoginRequest): Observable<LoginResponse> {
    return this.loginService.login(request);
  }

  logout(): Observable<void> {
    return this.logoutService.logout();
  }

  forgotPassword(request: ForgotPasswordRequest): Observable<ForgotPasswordResponse> {
    return this.passwordResetService.forgotPassword(request);
  }

  resetPassword(request: ResetPasswordRequest): Observable<void> {
    return this.passwordResetService.resetPassword(request);
  }

  changePassword(request: ChangePasswordRequest): Observable<void> {
    return this.passwordResetService.changePassword(request);
  }

  clearError(): void {
    this.store.clearError();
  }
}