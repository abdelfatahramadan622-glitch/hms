import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/hospital-dashboard-page/hospital-dashboard-page.component').then(
        (m) => m.HospitalDashboardPageComponent
      ),
    title: 'لوحة التحكم | HMS',
  },
];