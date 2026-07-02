import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../../../core/infrastructure/api/api-client.service';
import { API_ENDPOINTS } from '../../../../core/infrastructure/api/api-endpoints';
import { InvoiceModel, PaymentModel } from '../../domain/models/invoice.model';
import { BillingFilter, CreatePaymentRequest } from '../../domain/models/billing-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';
import { CreateInvoiceRequest, UpdateInvoiceRequest, BillingSummary } from '../../domain/repositories/billing.repository';

@Injectable({ providedIn: 'root' })
export class BillingApiService {
  private readonly api = inject(ApiClientService);

  getAll(filter: BillingFilter): Observable<PaginatedResult<InvoiceModel>> {
    const { page, pageSize, search, patientId, status, dateFrom, dateTo } = filter;
    return this.api.getList<InvoiceModel>(API_ENDPOINTS.BILLING.INVOICES, {
      page, pageSize, search, patientId, status, dateFrom, dateTo,
    });
  }
  getById(id: string): Observable<InvoiceModel> {
    return this.api.get<InvoiceModel>(API_ENDPOINTS.BILLING.INVOICE_BY_ID(id));
  }
  create(req: CreateInvoiceRequest): Observable<InvoiceModel> {
    return this.api.post<InvoiceModel>(API_ENDPOINTS.BILLING.INVOICES, req);
  }
  update(id: string, req: UpdateInvoiceRequest): Observable<InvoiceModel> {
    return this.api.put<InvoiceModel>(API_ENDPOINTS.BILLING.INVOICE_BY_ID(id), req);
  }
  issue(id: string): Observable<InvoiceModel> {
    return this.api.post<InvoiceModel>(`${API_ENDPOINTS.BILLING.INVOICES}/${id}/issue`, {});
  }
  cancel(id: string, reason: string): Observable<InvoiceModel> {
    return this.api.post<InvoiceModel>(`${API_ENDPOINTS.BILLING.INVOICES}/${id}/cancel`, { reason });
  }
  refund(id: string, reason: string): Observable<InvoiceModel> {
    return this.api.post<InvoiceModel>(API_ENDPOINTS.BILLING.REFUND(id), { reason });
  }
  processPayment(req: CreatePaymentRequest): Observable<PaymentModel> {
    return this.api.post<PaymentModel>(API_ENDPOINTS.BILLING.PROCESS_PAYMENT(req.invoiceId), req);
  }
  delete(id: string): Observable<void> {
    return this.api.delete<void>(API_ENDPOINTS.BILLING.INVOICE_BY_ID(id));
  }
  getSummary(): Observable<BillingSummary> {
    return this.api.get<BillingSummary>(`${API_ENDPOINTS.BILLING.INVOICES}/summary`);
  }
}