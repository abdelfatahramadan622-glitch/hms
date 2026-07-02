import { Routes } from '@angular/router';

export const authorizationRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/permissions-page/permissions-page.component').then(
        (m) => m.PermissionsPageComponent
      ),
    title: 'الصلاحيات | HMS',
  },
];