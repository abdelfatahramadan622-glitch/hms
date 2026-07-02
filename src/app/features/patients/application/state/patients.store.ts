import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { PatientModel } from '../../domain/models/patient.model';
import { PatientFilter, createDefaultPatientFilter } from '../../domain/models/patient-filter.model';
import { PaginatedResult, createEmptyPaginatedResult } from '../../../../core/domain/models/pagination.model';

export interface PatientsState {
  patients: PaginatedResult<PatientModel>;
  selectedPatient: PatientModel | null;
  filter: PatientFilter;
  isLoading: boolean;
  isDetailLoading: boolean;
  isSaving: boolean;
  error: string | null;
}

const initialState: PatientsState = {
  patients: createEmptyPaginatedResult<PatientModel>(),
  selectedPatient: null,
  filter: createDefaultPatientFilter(),
  isLoading: false,
  isDetailLoading: false,
  isSaving: false,
  error: null,
};

export const PatientsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((store) => ({
    hasPatients: computed(() => store.patients().totalCount > 0),
    hasError: computed(() => store.error() !== null),
    totalPatients: computed(() => store.patients().totalCount),
    currentPage: computed(() => store.patients().currentPage),
    totalPages: computed(() => store.patients().totalPages),
  })),

  withMethods((store) => ({
    setLoading(loading: boolean): void {
      patchState(store, { isLoading: loading, error: null });
    },
    setDetailLoading(loading: boolean): void {
      patchState(store, { isDetailLoading: loading });
    },
    setSaving(saving: boolean): void {
      patchState(store, { isSaving: saving });
    },
    setPatients(patients: PaginatedResult<PatientModel>): void {
      patchState(store, { patients, isLoading: false });
    },
    setSelectedPatient(patient: PatientModel | null): void {
      patchState(store, { selectedPatient: patient, isDetailLoading: false });
    },
    addPatient(patient: PatientModel): void {
      const current = store.patients();
      patchState(store, {
        patients: {
          ...current,
          items: [patient, ...current.items],
          totalCount: current.totalCount + 1,
        },
        isSaving: false,
      });
    },
    updatePatient(updated: PatientModel): void {
      const items = store.patients().items.map((p) => p.id === updated.id ? updated : p);
      patchState(store, {
        patients: { ...store.patients(), items },
        selectedPatient: updated,
        isSaving: false,
      });
    },
    removePatient(id: string): void {
      const current = store.patients();
      patchState(store, {
        patients: {
          ...current,
          items: current.items.filter((p) => p.id !== id),
          totalCount: current.totalCount - 1,
        },
      });
    },
    setFilter(filter: PatientFilter): void {
      patchState(store, { filter });
    },
    setError(error: string): void {
      patchState(store, { error, isLoading: false, isDetailLoading: false, isSaving: false });
    },
    clearError(): void {
      patchState(store, { error: null });
    },
  }))
);