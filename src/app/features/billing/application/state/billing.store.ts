import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { InvoiceModel } from '../../domain/models/invoice.model';
import { BillingFilter, createDefaultBillingFilter } from '../../domain/models/billing-filter.model';
import { PaginatedResult, createEmptyPaginatedResult } from '../../../../core/domain/models/pagination.model';
import { BillingSummary } from '../../domain/repositories/billing.repository';

export interface BillingState {
  invoices: PaginatedResult<InvoiceModel>;
  selectedInvoice: InvoiceModel | null;
  summary: BillingSummary | null;
  filter: BillingFilter;
  isLoading: boolean;
  isDetailLoading: boolean;
  isSaving: boolean;
  isProcessingPayment: boolean;
  error: string | null;
}

const initialState: BillingState = {
  invoices: createEmptyPaginatedResult<InvoiceModel>(),
  selectedInvoice: null,
  summary: null,
  filter: createDefaultBillingFilter(),
  isLoading: false,
  isDetailLoading: false,
  isSaving: false,
  isProcessingPayment: false,
  error: null,
};

export const BillingStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((store) => ({
    hasInvoices: computed(() => store.invoices().totalCount > 0),
    hasError: computed(() => store.error() !== null),
    totalInvoices: computed(() => store.invoices().totalCount),
    totalPages: computed(() => store.invoices().totalPages),
    currentPage: computed(() => store.invoices().currentPage),
    overdueCount: computed(() => store.invoices().items.filter((i) => i.status === 'overdue').length),
    totalRevenue: computed(() => store.summary()?.totalRevenue ?? 0),
    totalOutstanding: computed(() => store.summary()?.totalOutstanding ?? 0),
  })),

  withMethods((store) => ({
    setLoading(v: boolean): void { patchState(store, { isLoading: v, error: null }); },
    setDetailLoading(v: boolean): void { patchState(store, { isDetailLoading: v }); },
    setSaving(v: boolean): void { patchState(store, { isSaving: v }); },
    setProcessingPayment(v: boolean): void { patchState(store, { isProcessingPayment: v }); },
    setInvoices(invoices: PaginatedResult<InvoiceModel>): void {
      patchState(store, { invoices, isLoading: false });
    },
    setSelectedInvoice(invoice: InvoiceModel | null): void {
      patchState(store, { selectedInvoice: invoice, isDetailLoading: false });
    },
    setSummary(summary: BillingSummary): void {
      patchState(store, { summary });
    },
    addInvoice(invoice: InvoiceModel): void {
      const cur = store.invoices();
      patchState(store, {
        invoices: { ...cur, items: [invoice, ...cur.items], totalCount: cur.totalCount + 1 },
        isSaving: false,
      });
    },
    updateInvoice(updated: InvoiceModel): void {
      const items = store.invoices().items.map((i) => i.id === updated.id ? updated : i);
      patchState(store, {
        invoices: { ...store.invoices(), items },
        selectedInvoice: store.selectedInvoice()?.id === updated.id ? updated : store.selectedInvoice(),
        isSaving: false, isProcessingPayment: false,
      });
    },
    removeInvoice(id: string): void {
      const cur = store.invoices();
      patchState(store, {
        invoices: { ...cur, items: cur.items.filter((i) => i.id !== id), totalCount: cur.totalCount - 1 },
      });
    },
    setFilter(f: BillingFilter): void { patchState(store, { filter: f }); },
    setError(error: string): void {
      patchState(store, { error, isLoading: false, isDetailLoading: false, isSaving: false, isProcessingPayment: false });
    },
    clearError(): void { patchState(store, { error: null }); },
  }))
);