import { Routes } from '@angular/router';
import { unsavedChangesGuard } from '../../core/guards/unsaved-changes.guard';

export const patientsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/patient-list-page/patient-list-page.component').then(
        (m) => m.PatientListPageComponent
      ),
    title: 'المرضى | HMS',
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./presentation/pages/patient-form-page/patient-form-page.component').then(
        (m) => m.PatientFormPageComponent
      ),
    title: 'إضافة مريض | HMS',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./presentation/pages/patient-detail-page/patient-detail-page.component').then(
        (m) => m.PatientDetailPageComponent
      ),
    title: 'تفاصيل المريض | HMS',
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./presentation/pages/patient-form-page/patient-form-page.component').then(
        (m) => m.PatientFormPageComponent
      ),
    title: 'تعديل المريض | HMS',
  },
];