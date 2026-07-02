import { Routes } from '@angular/router';

export const auditLogsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/audit-log-list-page/audit-log-list-page.component').then(
        (m) => m.AuditLogListPageComponent
      ),
    title: 'سجل التدقيق | HMS',
  },
];