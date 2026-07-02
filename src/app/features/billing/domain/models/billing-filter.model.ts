import { FilterParams, createDefaultFilter } from '../../../../core/domain/models/filtering.model';
import { InvoiceStatus, PaymentMethod } from './invoice.model';

export interface BillingFilter extends FilterParams {
  patientId?: string;
  status?: InvoiceStatus;
  dateFrom?: string;
  dateTo?: string;
  isOverdue?: boolean;
}

export function createDefaultBillingFilter(): BillingFilter {
  return { ...createDefaultFilter({ pageSize: 15 }) };
}

export interface CreatePaymentRequest {
  invoiceId: string;
  amount: number;
  method: PaymentMethod;
  reference?: string;
  notes?: string;
}