import { Observable } from 'rxjs';
import { InvoiceModel, PaymentModel } from '../models/invoice.model';
import { BillingFilter, CreatePaymentRequest } from '../models/billing-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';

export interface CreateInvoiceRequest {
  patientId: string;
  appointmentId?: string;
  dueDate: string;
  items: Array<{
    type: string;
    description: string;
    quantity: number;
    unitPrice: number;
    discount?: number;
  }>;
  discountPercent?: number;
  taxPercent?: number;
  notes?: string;
}

export interface UpdateInvoiceRequest extends Partial<CreateInvoiceRequest> {
  status?: string;
}

export abstract class BillingRepository {
  abstract getAll(filter: BillingFilter): Observable<PaginatedResult<InvoiceModel>>;
  abstract getById(id: string): Observable<InvoiceModel>;
  abstract create(request: CreateInvoiceRequest): Observable<InvoiceModel>;
  abstract update(id: string, request: UpdateInvoiceRequest): Observable<InvoiceModel>;
  abstract issue(id: string): Observable<InvoiceModel>;
  abstract cancel(id: string, reason: string): Observable<InvoiceModel>;
  abstract refund(id: string, reason: string): Observable<InvoiceModel>;
  abstract processPayment(request: CreatePaymentRequest): Observable<PaymentModel>;
  abstract delete(id: string): Observable<void>;
  abstract getSummary(): Observable<BillingSummary>;
}

export interface BillingSummary {
  totalRevenue: number;
  totalPaid: number;
  totalOutstanding: number;
  totalOverdue: number;
  invoiceCount: number;
  paidCount: number;
  overdueCount: number;
}