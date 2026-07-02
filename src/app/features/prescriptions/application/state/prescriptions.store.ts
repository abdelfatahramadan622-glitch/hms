import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { PrescriptionModel } from '../../domain/models/prescription.model';
import { PrescriptionFilter, createDefaultPrescriptionFilter } from '../../domain/models/prescription-filter.model';
import { PaginatedResult, createEmptyPaginatedResult } from '../../../../core/domain/models/pagination.model';

export interface PrescriptionsState {
  prescriptions: PaginatedResult<PrescriptionModel>;
  selectedPrescription: PrescriptionModel | null;
  filter: PrescriptionFilter;
  isLoading: boolean;
  isDetailLoading: boolean;
  isSaving: boolean;
  error: string | null;
}

const initialState: PrescriptionsState = {
  prescriptions: createEmptyPaginatedResult<PrescriptionModel>(),
  selectedPrescription: null,
  filter: createDefaultPrescriptionFilter(),
  isLoading: false,
  isDetailLoading: false,
  isSaving: false,
  error: null,
};

export const PrescriptionsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((store) => ({
    hasPrescriptions: computed(() => store.prescriptions().totalCount > 0),
    hasError: computed(() => store.error() !== null),
    totalPrescriptions: computed(() => store.prescriptions().totalCount),
    totalPages: computed(() => store.prescriptions().totalPages),
    currentPage: computed(() => store.prescriptions().currentPage),
    activeCount: computed(() =>
      store.prescriptions().items.filter((p) => p.status === 'active').length
    ),
  })),

  withMethods((store) => ({
    setLoading(v: boolean): void { patchState(store, { isLoading: v, error: null }); },
    setDetailLoading(v: boolean): void { patchState(store, { isDetailLoading: v }); },
    setSaving(v: boolean): void { patchState(store, { isSaving: v }); },
    setPrescriptions(prescriptions: PaginatedResult<PrescriptionModel>): void {
      patchState(store, { prescriptions, isLoading: false });
    },
    setSelectedPrescription(p: PrescriptionModel | null): void {
      patchState(store, { selectedPrescription: p, isDetailLoading: false });
    },
    addPrescription(p: PrescriptionModel): void {
      const cur = store.prescriptions();
      patchState(store, {
        prescriptions: { ...cur, items: [p, ...cur.items], totalCount: cur.totalCount + 1 },
        isSaving: false,
      });
    },
    updatePrescription(updated: PrescriptionModel): void {
      const items = store.prescriptions().items.map((p) => p.id === updated.id ? updated : p);
      patchState(store, {
        prescriptions: { ...store.prescriptions(), items },
        selectedPrescription: store.selectedPrescription()?.id === updated.id ? updated : store.selectedPrescription(),
        isSaving: false,
      });
    },
    removePrescription(id: string): void {
      const cur = store.prescriptions();
      patchState(store, {
        prescriptions: { ...cur, items: cur.items.filter((p) => p.id !== id), totalCount: cur.totalCount - 1 },
      });
    },
    setFilter(f: PrescriptionFilter): void { patchState(store, { filter: f }); },
    setError(error: string): void {
      patchState(store, { error, isLoading: false, isDetailLoading: false, isSaving: false });
    },
    clearError(): void { patchState(store, { error: null }); },
  }))
);