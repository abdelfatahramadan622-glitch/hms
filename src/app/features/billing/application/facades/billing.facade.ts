import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BillingService } from '../services/billing.service';
import { BillingStore } from '../state/billing.store';
import { BillingFilter, CreatePaymentRequest } from '../../domain/models/billing-filter.model';
import { InvoiceModel, PaymentModel } from '../../domain/models/invoice.model';
import { CreateInvoiceRequest, UpdateInvoiceRequest } from '../../domain/repositories/billing.repository';

@Injectable({ providedIn: 'root' })
export class BillingFacade {
  private readonly service = inject(BillingService);
  private readonly store = inject(BillingStore);

  readonly invoices = this.store.invoices;
  readonly selectedInvoice = this.store.selectedInvoice;
  readonly summary = this.store.summary;
  readonly filter = this.store.filter;
  readonly isLoading = this.store.isLoading;
  readonly isDetailLoading = this.store.isDetailLoading;
  readonly isSaving = this.store.isSaving;
  readonly isProcessingPayment = this.store.isProcessingPayment;
  readonly hasInvoices = this.store.hasInvoices;
  readonly hasError = this.store.hasError;
  readonly error = this.store.error;
  readonly totalInvoices = this.store.totalInvoices;
  readonly totalPages = this.store.totalPages;
  readonly currentPage = this.store.currentPage;
  readonly overdueCount = this.store.overdueCount;
  readonly totalRevenue = this.store.totalRevenue;
  readonly totalOutstanding = this.store.totalOutstanding;

  loadAll(filter?: BillingFilter): void { this.service.loadAll(filter); }
  loadById(id: string): void { this.service.loadById(id); }
  loadSummary(): void { this.service.loadSummary(); }
  create(req: CreateInvoiceRequest): Observable<InvoiceModel> { return this.service.create(req); }
  update(id: string, req: UpdateInvoiceRequest): Observable<InvoiceModel> { return this.service.update(id, req); }
  issue(id: string): Observable<InvoiceModel> { return this.service.issue(id); }
  cancel(id: string, reason: string): Observable<InvoiceModel> { return this.service.cancel(id, reason); }
  refund(id: string, reason: string): Observable<InvoiceModel> { return this.service.refund(id, reason); }
  processPayment(req: CreatePaymentRequest): Observable<PaymentModel> { return this.service.processPayment(req); }
  delete(id: string): Observable<void> { return this.service.delete(id); }
  applyFilter(filter: BillingFilter): void { this.service.applyFilter(filter); }
  changePage(page: number): void { this.service.changePage(page); }
  clearError(): void { this.store.clearError(); }
  clearSelected(): void { this.store.setSelectedInvoice(null); }
}