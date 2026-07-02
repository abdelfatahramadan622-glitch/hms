import { Injectable, inject } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { AuthenticationRepository } from '../../domain/repositories/authentication.repository';
import { SessionService } from '../../../../core/application/services/session.service';
import { AuthenticationStore } from '../state/authentication.store';
import { NavigationService } from '../../../../core/application/services/navigation.service';

@Injectable({ providedIn: 'root' })
export class LogoutService {
  private readonly authRepo = inject(AuthenticationRepository);
  private readonly session = inject(SessionService);
  private readonly store = inject(AuthenticationStore);
  private readonly nav = inject(NavigationService);

  logout(): Observable<void> {
    return this.authRepo.logout().pipe(
      catchError(() => of(undefined)), // Always clear session even if API fails
      tap(() => this.clearAndRedirect())
    );
  }

  forceLogout(): void {
    this.clearAndRedirect();
  }

  private clearAndRedirect(): void {
    this.session.clearSession();
    this.store.clearUser();
    this.nav.goToLogin();
  }
}