import { Routes } from '@angular/router';

export const chartsAnalyticsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./presentation/pages/analytics-dashboard-page/analytics-dashboard-page.component').then(
        (m) => m.AnalyticsDashboardPageComponent
      ),
    title: 'التحليلات | HMS',
  },
];