import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationFacade } from '../../../application/facades/authentication.facade';
import { ROUTE_PATHS } from '../../../../../core/constants/route-paths.constants';

@Component({
  selector: 'hms-forgot-password-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.scss',
})
export class ForgotPasswordPageComponent {
  private readonly fb = inject(FormBuilder);
  readonly facade = inject(AuthenticationFacade);

  readonly loginPath = `/${ROUTE_PATHS.AUTH.LOGIN}`;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  get email() { return this.form.get('email')!; }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.facade.forgotPassword({ email: this.email.value! }).subscribe();
  }
}
