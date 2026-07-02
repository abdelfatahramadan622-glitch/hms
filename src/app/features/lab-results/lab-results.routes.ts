import { Routes } from '@angular/router';

export const labResultsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/lab-result-list-page/lab-result-list-page.component').then(
        (m) => m.LabResultListPageComponent
      ),
    title: 'نتائج المختبر | HMS',
  },
  {
    path: 'upload',
    loadComponent: () =>
      import('./presentation/pages/lab-result-upload-page/lab-result-upload-page.component').then(
        (m) => m.LabResultUploadPageComponent
      ),
    title: 'رفع نتيجة | HMS',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./presentation/pages/lab-result-detail-page/lab-result-detail-page.component').then(
        (m) => m.LabResultDetailPageComponent
      ),
    title: 'تفاصيل نتيجة المختبر | HMS',
  },
];