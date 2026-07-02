import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BillingRepository, CreateInvoiceRequest, UpdateInvoiceRequest } from '../../domain/repositories/billing.repository';
import { BillingStore } from '../state/billing.store';
import { BillingFilter, CreatePaymentRequest } from '../../domain/models/billing-filter.model';
import { InvoiceModel, PaymentModel } from '../../domain/models/invoice.model';

@Injectable({ providedIn: 'root' })
export class BillingService {
  private readonly repo = inject(BillingRepository);
  private readonly store = inject(BillingStore);

  loadAll(filter?: BillingFilter): void {
    const f = filter ?? this.store.filter();
    this.store.setLoading(true);
    this.repo.getAll(f).subscribe({
      next: (result) => this.store.setInvoices(result),
      error: (err) => this.store.setError(err?.message ?? 'فشل تحميل الفواتير'),
    });
  }

  loadById(id: string): void {
    this.store.setDetailLoading(true);
    this.repo.getById(id).subscribe({
      next: (inv) => this.store.setSelectedInvoice(inv),
      error: (err) => this.store.setError(err?.message ?? 'فشل تحميل الفاتورة'),
    });
  }

  loadSummary(): void {
    this.repo.getSummary().subscribe({
      next: (summary) => this.store.setSummary(summary),
      error: () => {},
    });
  }

  create(req: CreateInvoiceRequest): Observable<InvoiceModel> {
    this.store.setSaving(true);
    return this.repo.create(req).pipe(
      tap({ next: (inv) => this.store.addInvoice(inv), error: (err) => this.store.setError(err?.message) })
    );
  }

  update(id: string, req: UpdateInvoiceRequest): Observable<InvoiceModel> {
    this.store.setSaving(true);
    return this.repo.update(id, req).pipe(
      tap({ next: (inv) => this.store.updateInvoice(inv), error: (err) => this.store.setError(err?.message) })
    );
  }

  issue(id: string): Observable<InvoiceModel> {
    return this.repo.issue(id).pipe(
      tap({ next: (inv) => this.store.updateInvoice(inv), error: (err) => this.store.setError(err?.message) })
    );
  }

  cancel(id: string, reason: string): Observable<InvoiceModel> {
    return this.repo.cancel(id, reason).pipe(
      tap({ next: (inv) => this.store.updateInvoice(inv), error: (err) => this.store.setError(err?.message) })
    );
  }

  refund(id: string, reason: string): Observable<InvoiceModel> {
    return this.repo.refund(id, reason).pipe(
      tap({ next: (inv) => this.store.updateInvoice(inv), error: (err) => this.store.setError(err?.message) })
    );
  }

  processPayment(req: CreatePaymentRequest): Observable<PaymentModel> {
    this.store.setProcessingPayment(true);
    return this.repo.processPayment(req).pipe(
      tap({
        next: () => this.loadById(req.invoiceId),
        error: (err) => this.store.setError(err?.message),
      })
    );
  }

  delete(id: string): Observable<void> {
    return this.repo.delete(id).pipe(
      tap({ next: () => this.store.removeInvoice(id), error: (err) => this.store.setError(err?.message) })
    );
  }

  applyFilter(filter: BillingFilter): void {
    this.store.setFilter(filter);
    this.loadAll(filter);
  }

  changePage(page: number): void { this.applyFilter({ ...this.store.filter(), page }); }
}