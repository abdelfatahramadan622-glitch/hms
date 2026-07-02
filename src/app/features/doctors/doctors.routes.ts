import { Routes } from '@angular/router';

export const doctorsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/doctor-list-page/doctor-list-page.component').then(
        (m) => m.DoctorListPageComponent
      ),
    title: 'الأطباء | HMS',
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./presentation/pages/doctor-form-page/doctor-form-page.component').then(
        (m) => m.DoctorFormPageComponent
      ),
    title: 'إضافة طبيب | HMS',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./presentation/pages/doctor-detail-page/doctor-detail-page.component').then(
        (m) => m.DoctorDetailPageComponent
      ),
    title: 'تفاصيل الطبيب | HMS',
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./presentation/pages/doctor-form-page/doctor-form-page.component').then(
        (m) => m.DoctorFormPageComponent
      ),
    title: 'تعديل الطبيب | HMS',
  },
  {
    path: ':id/schedule',
    loadComponent: () =>
      import('./presentation/pages/doctor-schedule-page/doctor-schedule-page.component').then(
        (m) => m.DoctorSchedulePageComponent
      ),
    title: 'جدول الطبيب | HMS',
  },
];