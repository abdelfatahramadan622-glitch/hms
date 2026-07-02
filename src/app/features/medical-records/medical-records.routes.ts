import { Routes } from '@angular/router';

export const medicalRecordsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/medical-record-list-page/medical-record-list-page.component').then(
        (m) => m.MedicalRecordListPageComponent
      ),
    title: 'السجلات الطبية | HMS',
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./presentation/pages/medical-record-form-page/medical-record-form-page.component').then(
        (m) => m.MedicalRecordFormPageComponent
      ),
    title: 'سجل طبي جديد | HMS',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./presentation/pages/medical-record-detail-page/medical-record-detail-page.component').then(
        (m) => m.MedicalRecordDetailPageComponent
      ),
    title: 'تفاصيل السجل الطبي | HMS',
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./presentation/pages/medical-record-form-page/medical-record-form-page.component').then(
        (m) => m.MedicalRecordFormPageComponent
      ),
    title: 'تعديل السجل الطبي | HMS',
  },
];