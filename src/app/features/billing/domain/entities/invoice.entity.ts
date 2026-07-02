import { InvoiceModel } from '../models/invoice.model';

export interface InvoiceEntity extends InvoiceModel {
  readonly isOverdue: boolean;
  readonly isPaid: boolean;
  readonly paymentPercent: number;
  readonly formattedTotal: string;
}

export function toInvoiceEntity(model: InvoiceModel): InvoiceEntity {
  return {
    ...model,
    get isOverdue() {
      return new Date(model.dueDate) < new Date() && !['paid', 'cancelled', 'refunded'].includes(model.status);
    },
    get isPaid() { return model.status === 'paid'; },
    get paymentPercent() {
      return model.totalAmount > 0 ? Math.round((model.paidAmount / model.totalAmount) * 100) : 0;
    },
    get formattedTotal() {
      return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 2 }).format(model.totalAmount);
    },
  };
}

// Money Value Object
export interface Money {
  amount: number;
  currency: string;
  display: string;
}

export function createMoney(amount: number, currency = 'EGP'): Money {
  return {
    amount,
    currency,
    display: new Intl.NumberFormat('ar-EG', { style: 'currency', currency, maximumFractionDigits: 2 }).format(amount),
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 2 }).format(amount);
}