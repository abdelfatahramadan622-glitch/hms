export type InvoiceStatus = 'draft' | 'issued' | 'paid' | 'partially-paid' | 'overdue' | 'cancelled' | 'refunded';
export type PaymentMethod = 'cash' | 'card' | 'bank-transfer' | 'insurance' | 'cheque';
export type InvoiceItemType = 'consultation' | 'procedure' | 'medication' | 'lab' | 'radiology' | 'room' | 'other';

export interface InvoiceModel {
  id: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  appointmentId?: string;
  issuedAt: string;
  dueDate: string;
  status: InvoiceStatus;
  items: InvoiceItemModel[];
  subtotal: number;
  discountAmount: number;
  discountPercent: number;
  taxAmount: number;
  taxPercent: number;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  payments: PaymentModel[];
  notes?: string;
  hospitalId: string;
}

export interface InvoiceItemModel {
  id: string;
  type: InvoiceItemType;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

export interface PaymentModel {
  id: string;
  invoiceId: string;
  amount: number;
  method: PaymentMethod;
  reference?: string;
  paidAt: string;
  receivedBy: string;
  notes?: string;
}

// Partial<Record<...>>: see doctor.model.ts for the rationale — keeps the
// `?.` / `??` fallbacks in invoice-detail-page / invoice-list-page
// meaningful.
export const INVOICE_STATUS_CONFIG: Partial<Record<InvoiceStatus, { label: string; class: string; icon: string }>> = {
  draft:            { label: 'مسودة',          class: 'bg-secondary-subtle text-secondary', icon: 'bi-file-earmark' },
  issued:           { label: 'صادرة',          class: 'bg-info-subtle text-info',           icon: 'bi-file-earmark-check' },
  paid:             { label: 'مدفوعة',         class: 'bg-success-subtle text-success',     icon: 'bi-check-circle' },
  'partially-paid': { label: 'مدفوعة جزئياً', class: 'bg-warning-subtle text-warning',     icon: 'bi-circle-half' },
  overdue:          { label: 'متأخرة',          class: 'bg-danger text-white',               icon: 'bi-clock-history' },
  cancelled:        { label: 'ملغاة',           class: 'bg-dark-subtle text-dark',           icon: 'bi-x-circle' },
  refunded:         { label: 'مستردة',          class: 'bg-purple-subtle text-purple',       icon: 'bi-arrow-return-left' },
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  cash:            'نقداً',
  card:            'بطاقة',
  'bank-transfer': 'تحويل بنكي',
  insurance:       'تأمين',
  cheque:          'شيك',
};

export const ITEM_TYPE_LABELS: Record<InvoiceItemType, string> = {
  consultation: 'كشف',
  procedure:    'إجراء',
  medication:   'دواء',
  lab:          'مختبر',
  radiology:    'أشعة',
  room:         'غرفة',
  other:        'أخرى',
};