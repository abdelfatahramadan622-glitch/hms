import { Routes } from '@angular/router';

export const roleManagementRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/role-list-page/role-list-page.component').then(
        (m) => m.RoleListPageComponent
      ),
    title: 'إدارة الأدوار | HMS',
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./presentation/pages/role-form-page/role-form-page.component').then(
        (m) => m.RoleFormPageComponent
      ),
    title: 'دور جديد | HMS',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./presentation/pages/role-detail-page/role-detail-page.component').then(
        (m) => m.RoleDetailPageComponent
      ),
    title: 'تفاصيل الدور | HMS',
  },
];