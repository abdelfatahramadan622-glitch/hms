import { Routes } from '@angular/router';

export const prescriptionsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/prescription-list-page/prescription-list-page.component').then(
        (m) => m.PrescriptionListPageComponent
      ),
    title: 'الوصفات الطبية | HMS',
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./presentation/pages/prescription-form-page/prescription-form-page.component').then(
        (m) => m.PrescriptionFormPageComponent
      ),
    title: 'وصفة طبية جديدة | HMS',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./presentation/pages/prescription-detail-page/prescription-detail-page.component').then(
        (m) => m.PrescriptionDetailPageComponent
      ),
    title: 'تفاصيل الوصفة الطبية | HMS',
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./presentation/pages/prescription-form-page/prescription-form-page.component').then(
        (m) => m.PrescriptionFormPageComponent
      ),
    title: 'تعديل الوصفة الطبية | HMS',
  },
];