import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Redirect root
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  // Auth (no layout)
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/authentication/authentication.routes').then(
        (m) => m.authenticationRoutes
      ),
  },

  // Protected routes (inside admin layout)
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/admin-layout/admin-layout.component').then(
        (m) => m.AdminLayoutComponent
      ),
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
      },
      {
        path: 'patients',
        loadChildren: () =>
          import('./features/patients/patients.routes').then((m) => m.patientsRoutes),
      },
      {
        path: 'doctors',
        loadChildren: () =>
          import('./features/doctors/doctors.routes').then((m) => m.doctorsRoutes),
      },
      {
        path: 'appointments',
        loadChildren: () =>
          import('./features/appointments/appointments.routes').then((m) => m.appointmentsRoutes),
      },
      {
        path: 'emergency-cases',
        loadChildren: () =>
          import('./features/emergency-cases/emergency-cases.routes').then(
            (m) => m.emergencyCasesRoutes
          ),
      },
      {
        path: 'medical-records',
        loadChildren: () =>
          import('./features/medical-records/medical-records.routes').then(
            (m) => m.medicalRecordsRoutes
          ),
      },
      {
        path: 'lab-results',
        loadChildren: () =>
          import('./features/lab-results/lab-results.routes').then((m) => m.labResultsRoutes),
      },
      {
        path: 'prescriptions',
        loadChildren: () =>
          import('./features/prescriptions/prescriptions.routes').then(
            (m) => m.prescriptionsRoutes
          ),
      },
      {
        path: 'billing',
        loadChildren: () =>
          import('./features/billing/billing.routes').then((m) => m.billingRoutes),
      },
      {
        path: 'staff-management',
        loadChildren: () =>
          import('./features/staff-management/staff-management.routes').then(
            (m) => m.staffManagementRoutes
          ),
      },
      {
        path: 'charts-analytics',
        loadChildren: () =>
          import('./features/charts-analytics/charts-analytics.routes').then(
            (m) => m.chartsAnalyticsRoutes
          ),
      },
      {
        path: 'calendar-scheduling',
        loadChildren: () =>
          import('./features/calendar-scheduling/calendar-scheduling.routes').then(
            (m) => m.calendarSchedulingRoutes
          ),
      },
      {
        path: 'role-management',
        loadChildren: () =>
          import('./features/role-management/role-management.routes').then(
            (m) => m.roleManagementRoutes
          ),
      },
      {
        path: 'authorization',
        loadChildren: () =>
          import('./features/authorization/authorization.routes').then(
            (m) => m.authorizationRoutes
          ),
      },
      {
        path: 'audit-logs',
        loadChildren: () =>
          import('./features/audit-logs/audit-logs.routes').then((m) => m.auditLogsRoutes),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./features/notifications/notifications.routes').then(
            (m) => m.notificationsRoutes
          ),
      },
      {
        path: 'real-time-updates',
        loadChildren: () =>
          import('./features/real-time-updates/real-time-updates.routes').then(
            (m) => m.realTimeUpdatesRoutes
          ),
      },
      {
        path: 'auth/change-password',
        loadChildren: () =>
          import('./features/authentication/authentication.routes').then(
            (m) => m.authenticationRoutes
          ),
      },
    ],
  },

  // Error Pages
  {
    path: '403',
    loadComponent: () =>
      import('./errors/forbidden-page/forbidden-page.component').then(
        (m) => m.ForbiddenPageComponent
      ),
  },
  {
    path: '500',
    loadComponent: () =>
      import('./errors/server-error-page/server-error-page.component').then(
        (m) => m.ServerErrorPageComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./errors/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent
      ),
  },
];