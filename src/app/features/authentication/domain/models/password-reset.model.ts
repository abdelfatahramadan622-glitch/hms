export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  email: string;
  expiresInMinutes: number;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  maxLength: number;
}

export const DEFAULT_PASSWORD_POLICY: PasswordPolicy = {
  minLength: 8,
  maxLength: 64,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
};

export interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4;
  label: 'ضعيف جداً' | 'ضعيف' | 'مقبول' | 'قوي' | 'قوي جداً';
  color: 'danger' | 'warning' | 'info' | 'success';
  checks: PasswordChecks;
}

export interface PasswordChecks {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export function evaluatePasswordStrength(
  password: string,
  policy = DEFAULT_PASSWORD_POLICY
): PasswordStrength {
  const checks: PasswordChecks = {
    hasMinLength: password.length >= policy.minLength,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const passed = Object.values(checks).filter(Boolean).length as 0 | 1 | 2 | 3 | 4 | 5;
  const score = Math.min(4, Math.floor((passed / 5) * 5)) as 0 | 1 | 2 | 3 | 4;

  const labels: PasswordStrength['label'][] = [
    'ضعيف جداً', 'ضعيف', 'مقبول', 'قوي', 'قوي جداً',
  ];
  const colors: PasswordStrength['color'][] = [
    'danger', 'danger', 'warning', 'info', 'success',
  ];

  return { score, label: labels[score], color: colors[score], checks };
}