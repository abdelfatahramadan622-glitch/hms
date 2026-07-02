import { Routes } from '@angular/router';

export const calendarSchedulingRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/calendar-page/calendar-page.component').then(
        (m) => m.CalendarPageComponent
      ),
    title: 'التقويم | HMS',
  },
];