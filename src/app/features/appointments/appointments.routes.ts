import { Routes } from '@angular/router';

export const appointmentsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/appointment-list-page/appointment-list-page.component').then(
        (m) => m.AppointmentListPageComponent
      ),
    title: 'المواعيد | HMS',
  },
  {
    path: 'calendar',
    loadComponent: () =>
      import('./presentation/pages/appointment-calendar-page/appointment-calendar-page.component').then(
        (m) => m.AppointmentCalendarPageComponent
      ),
    title: 'تقويم المواعيد | HMS',
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./presentation/pages/appointment-form-page/appointment-form-page.component').then(
        (m) => m.AppointmentFormPageComponent
      ),
    title: 'إضافة موعد | HMS',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./presentation/pages/appointment-detail-page/appointment-detail-page.component').then(
        (m) => m.AppointmentDetailPageComponent
      ),
    title: 'تفاصيل الموعد | HMS',
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./presentation/pages/appointment-form-page/appointment-form-page.component').then(
        (m) => m.AppointmentFormPageComponent
      ),
    title: 'تعديل الموعد | HMS',
  },
];