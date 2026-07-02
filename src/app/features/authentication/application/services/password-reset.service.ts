import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthenticationRepository } from '../../domain/repositories/authentication.repository';
import { AuthenticationStore } from '../state/authentication.store';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ChangePasswordRequest,
} from '../../domain/models/password-reset.model';

@Injectable({ providedIn: 'root' })
export class PasswordResetService {
  private readonly authRepo = inject(AuthenticationRepository);
  private readonly store = inject(AuthenticationStore);

  forgotPassword(request: ForgotPasswordRequest): Observable<ForgotPasswordResponse> {
    this.store.setLoading(true);
    return this.authRepo.forgotPassword(request).pipe(
      tap({
        next: () => this.store.setPasswordResetSent(request.email),
        error: (err) => this.store.setError(err?.message ?? 'فشل إرسال رابط إعادة التعيين'),
      })
    );
  }

  resetPassword(request: ResetPasswordRequest): Observable<void> {
    this.store.setLoading(true);
    return this.authRepo.resetPassword(request).pipe(
      tap({
        next: () => this.store.setLoading(false),
        error: (err) => this.store.setError(err?.message ?? 'فشل إعادة تعيين كلمة المرور'),
      })
    );
  }

  changePassword(request: ChangePasswordRequest): Observable<void> {
    this.store.setLoading(true);
    return this.authRepo.changePassword(request).pipe(
      tap({
        next: () => this.store.setLoading(false),
        error: (err) => this.store.setError(err?.message ?? 'فشل تغيير كلمة المرور'),
      })
    );
  }
}