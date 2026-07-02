import { Routes } from '@angular/router';

export const realTimeUpdatesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/realtime-monitor-page/realtime-monitor-page.component').then(
        (m) => m.RealtimeMonitorPageComponent
      ),
    title: 'التحديثات الفورية | HMS',
  },
];