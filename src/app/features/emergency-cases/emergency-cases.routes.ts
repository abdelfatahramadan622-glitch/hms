import { Routes } from '@angular/router';

export const emergencyCasesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/emergency-case-list-page/emergency-case-list-page.component').then(
        (m) => m.EmergencyCaseListPageComponent
      ),
    title: 'الطوارئ | HMS',
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./presentation/pages/emergency-case-form-page/emergency-case-form-page.component').then(
        (m) => m.EmergencyCaseFormPageComponent
      ),
    title: 'حالة طوارئ جديدة | HMS',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./presentation/pages/emergency-case-detail-page/emergency-case-detail-page.component').then(
        (m) => m.EmergencyCaseDetailPageComponent
      ),
    title: 'تفاصيل الحالة | HMS',
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./presentation/pages/emergency-case-form-page/emergency-case-form-page.component').then(
        (m) => m.EmergencyCaseFormPageComponent
      ),
    title: 'تعديل الحالة | HMS',
  },
];