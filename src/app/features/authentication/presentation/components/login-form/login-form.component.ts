import { Component, inject, input, output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginRequest } from '../../../domain/models/login-request.model';
import { ROUTE_PATHS } from '../../../../../core/constants/route-paths.constants';

@Component({
  selector: 'hms-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly submitted = output<LoginRequest>();

  readonly isLoading = input<boolean>(false);
  readonly errorMessage = input<string>('');

  readonly forgotPasswordPath = `/${ROUTE_PATHS.AUTH.FORGOT_PASSWORD}`;

  showPassword = false;

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });

  get email() { return this.form.get('email')!; }
  get password() { return this.form.get('password')!; }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.emit(this.form.getRawValue() as LoginRequest);
  }
}