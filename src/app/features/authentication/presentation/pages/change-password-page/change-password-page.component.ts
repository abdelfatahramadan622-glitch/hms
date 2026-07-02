import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthenticationFacade } from '../../../application/facades/authentication.facade';
import { PasswordPolicyComponent } from '../../components/password-policy/password-policy.component';
import { ROUTE_PATHS } from '../../../../../core/constants/route-paths.constants';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const pw = control.get('newPassword')?.value;
  const confirm = control.get('confirmPassword')?.value;
  return pw && confirm && pw !== confirm ? { passwordMismatch: true } : null;
}

@Component({
  selector: 'hms-change-password-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, PasswordPolicyComponent],
  templateUrl: './change-password-page.component.html',
  styleUrl: './change-password-page.component.scss',
})
export class ChangePasswordPageComponent {
  private readonly fb = inject(FormBuilder);
  readonly facade = inject(AuthenticationFacade);

  readonly dashboardPath = `/${ROUTE_PATHS.DASHBOARD}`;
  readonly changeSuccess = signal(false);
  showCurrent = false;
  showNew = false;

  form = this.fb.group(
    {
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordMatchValidator }
  );

  get currentPassword() { return this.form.get('currentPassword')!; }
  get newPassword() { return this.form.get('newPassword')!; }
  get confirmPassword() { return this.form.get('confirmPassword')!; }
  get newPasswordValue() { return this.newPassword.value ?? ''; }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.facade
      .changePassword({
        currentPassword: this.currentPassword.value!,
        newPassword: this.newPassword.value!,
        confirmPassword: this.confirmPassword.value!,
      })
      .subscribe({ next: () => this.changeSuccess.set(true) });
  }
}
