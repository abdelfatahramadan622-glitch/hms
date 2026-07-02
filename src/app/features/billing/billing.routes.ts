import { Routes } from '@angular/router';

export const billingRoutes: Routes = [
  {
    path: '',
    redirectTo: 'invoices',
    pathMatch: 'full',
  },
  {
    path: 'invoices',
    loadComponent: () =>
      import('./presentation/pages/invoice-list-page/invoice-list-page.component').then(
        (m) => m.InvoiceListPageComponent
      ),
    title: 'الفواتير | HMS',
  },
  {
    path: 'invoices/new',
    loadComponent: () =>
      import('./presentation/pages/invoice-form-page/invoice-form-page.component').then(
        (m) => m.InvoiceFormPageComponent
      ),
    title: 'فاتورة جديدة | HMS',
  },
  {
    path: 'invoices/:id',
    loadComponent: () =>
      import('./presentation/pages/invoice-detail-page/invoice-detail-page.component').then(
        (m) => m.InvoiceDetailPageComponent
      ),
    title: 'تفاصيل الفاتورة | HMS',
  },
  {
    path: 'invoices/:id/edit',
    loadComponent: () =>
      import('./presentation/pages/invoice-form-page/invoice-form-page.component').then(
        (m) => m.InvoiceFormPageComponent
      ),
    title: 'تعديل الفاتورة | HMS',
  },
  {
    path: 'payment',
    loadComponent: () =>
      import('./presentation/pages/payment-page/payment-page.component').then(
        (m) => m.PaymentPageComponent
      ),
    title: 'تسجيل دفعة | HMS',
  },
];