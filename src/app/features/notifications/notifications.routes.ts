import { Routes } from '@angular/router';

export const notificationsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/notification-center-page/notification-center-page.component').then(
        (m) => m.NotificationCenterPageComponent
      ),
    title: 'الإشعارات | HMS',
  },
];