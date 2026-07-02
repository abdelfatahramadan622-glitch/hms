import { Routes } from '@angular/router';
import { guestGuard } from '../../core/guards/guest.guard';
import { authGuard } from '../../core/guards/auth.guard';

export const authenticationRoutes: Routes = [
  {
    path: '',
    canActivate: [guestGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./presentation/pages/login-page/login-page.component').then(
            (m) => m.LoginPageComponent
          ),
        title: 'تسجيل الدخول | HMS',
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./presentation/pages/forgot-password-page/forgot-password-page.component').then(
            (m) => m.ForgotPasswordPageComponent
          ),
        title: 'استرداد كلمة المرور | HMS',
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./presentation/pages/reset-password-page/reset-password-page.component').then(
            (m) => m.ResetPasswordPageComponent
          ),
        title: 'إعادة تعيين كلمة المرور | HMS',
      },
    ],
  },
  {
    path: 'change-password',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./presentation/pages/change-password-page/change-password-page.component').then(
        (m) => m.ChangePasswordPageComponent
      ),
    title: 'تغيير كلمة المرور | HMS',
  },
];
