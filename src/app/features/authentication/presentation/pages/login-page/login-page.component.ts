import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationFacade } from '../../../application/facades/authentication.facade';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { LoginRequest } from '../../../domain/models/login-request.model';
import { ROUTE_PATHS } from '../../../../../core/constants/route-paths.constants';

@Component({
  selector: 'hms-login-page',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  readonly facade = inject(AuthenticationFacade);
  private readonly nav = inject(NavigationService);
  private readonly route = inject(ActivatedRoute);

  readonly isLoading = this.facade.isLoading;
  readonly error = this.facade.error;
  readonly hasError = this.facade.hasError;

  private returnUrl = `/${ROUTE_PATHS.DASHBOARD}`;
  readonly currentYear = new Date().getFullYear();

  ngOnInit(): void {
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] ?? `/${ROUTE_PATHS.DASHBOARD}`;
    this.facade.clearError();
  }

  onLogin(request: LoginRequest): void {
    this.facade.login(request).subscribe({
      next: () => this.nav.goTo(this.returnUrl),
    });
  }
}