import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BillingRepository, CreateInvoiceRequest, UpdateInvoiceRequest, BillingSummary } from '../../domain/repositories/billing.repository';
import { BillingApiService } from '../api/billing-api.service';
import { InvoiceModel, PaymentModel } from '../../domain/models/invoice.model';
import { BillingFilter, CreatePaymentRequest } from '../../domain/models/billing-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';

@Injectable({ providedIn: 'root' })
export class BillingApiRepository extends BillingRepository {
  private readonly api = inject(BillingApiService);

  getAll(f: BillingFilter): Observable<PaginatedResult<InvoiceModel>> { return this.api.getAll(f); }
  getById(id: string): Observable<InvoiceModel> { return this.api.getById(id); }
  create(req: CreateInvoiceRequest): Observable<InvoiceModel> { return this.api.create(req); }
  update(id: string, req: UpdateInvoiceRequest): Observable<InvoiceModel> { return this.api.update(id, req); }
  issue(id: string): Observable<InvoiceModel> { return this.api.issue(id); }
  cancel(id: string, reason: string): Observable<InvoiceModel> { return this.api.cancel(id, reason); }
  refund(id: string, reason: string): Observable<InvoiceModel> { return this.api.refund(id, reason); }
  processPayment(req: CreatePaymentRequest): Observable<PaymentModel> { return this.api.processPayment(req); }
  delete(id: string): Observable<void> { return this.api.delete(id); }
  getSummary(): Observable<BillingSummary> { return this.api.getSummary(); }
}