import { Routes } from '@angular/router';

export const staffManagementRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/staff-list-page/staff-list-page.component').then(
        (m) => m.StaffListPageComponent
      ),
    title: 'إدارة الموظفين | HMS',
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./presentation/pages/staff-form-page/staff-form-page.component').then(
        (m) => m.StaffFormPageComponent
      ),
    title: 'موظف جديد | HMS',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./presentation/pages/staff-detail-page/staff-detail-page.component').then(
        (m) => m.StaffDetailPageComponent
      ),
    title: 'تفاصيل الموظف | HMS',
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./presentation/pages/staff-form-page/staff-form-page.component').then(
        (m) => m.StaffFormPageComponent
      ),
    title: 'تعديل الموظف | HMS',
  },
];