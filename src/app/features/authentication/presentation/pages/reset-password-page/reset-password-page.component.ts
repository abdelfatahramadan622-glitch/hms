import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthenticationFacade } from '../../../application/facades/authentication.facade';
import { PasswordPolicyComponent } from '../../components/password-policy/password-policy.component';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { ROUTE_PATHS } from '../../../../../core/constants/route-paths.constants';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const pw = control.get('newPassword')?.value;
  const confirm = control.get('confirmPassword')?.value;
  return pw && confirm && pw !== confirm ? { passwordMismatch: true } : null;
}

@Component({
  selector: 'hms-reset-password-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, PasswordPolicyComponent],
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.scss',
})
export class ResetPasswordPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly nav = inject(NavigationService);
  readonly facade = inject(AuthenticationFacade);

  readonly loginPath = `/${ROUTE_PATHS.AUTH.LOGIN}`;
  readonly resetSuccess = signal(false);
  showPassword = false;

  form = this.fb.group(
    {
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordMatchValidator }
  );

  private token = '';

  get newPassword() { return this.form.get('newPassword')!; }
  get confirmPassword() { return this.form.get('confirmPassword')!; }
  get passwordValue() { return this.newPassword.value ?? ''; }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'] ?? '';
    if (!this.token) this.nav.goToLogin();
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.facade
      .resetPassword({
        token: this.token,
        newPassword: this.newPassword.value!,
        confirmPassword: this.confirmPassword.value!,
      })
      .subscribe({ next: () => this.resetSuccess.set(true) });
  }
}
