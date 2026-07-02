import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { MedicalRecordModel } from '../../domain/models/medical-record.model';
import { MedicalRecordFilter, createDefaultMedicalRecordFilter } from '../../domain/models/medical-record-filter.model';
import { PaginatedResult, createEmptyPaginatedResult } from '../../../../core/domain/models/pagination.model';

export interface MedicalRecordsState {
  records: PaginatedResult<MedicalRecordModel>;
  selectedRecord: MedicalRecordModel | null;
  filter: MedicalRecordFilter;
  isLoading: boolean;
  isDetailLoading: boolean;
  isSaving: boolean;
  isUploading: boolean;
  error: string | null;
}

const initialState: MedicalRecordsState = {
  records: createEmptyPaginatedResult<MedicalRecordModel>(),
  selectedRecord: null,
  filter: createDefaultMedicalRecordFilter(),
  isLoading: false,
  isDetailLoading: false,
  isSaving: false,
  isUploading: false,
  error: null,
};

export const MedicalRecordsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((store) => ({
    hasRecords: computed(() => store.records().totalCount > 0),
    hasError: computed(() => store.error() !== null),
    totalRecords: computed(() => store.records().totalCount),
    totalPages: computed(() => store.records().totalPages),
    currentPage: computed(() => store.records().currentPage),
  })),

  withMethods((store) => ({
    setLoading(v: boolean): void { patchState(store, { isLoading: v, error: null }); },
    setDetailLoading(v: boolean): void { patchState(store, { isDetailLoading: v }); },
    setSaving(v: boolean): void { patchState(store, { isSaving: v }); },
    setUploading(v: boolean): void { patchState(store, { isUploading: v }); },
    setRecords(records: PaginatedResult<MedicalRecordModel>): void {
      patchState(store, { records, isLoading: false });
    },
    setSelectedRecord(record: MedicalRecordModel | null): void {
      patchState(store, { selectedRecord: record, isDetailLoading: false });
    },
    addRecord(record: MedicalRecordModel): void {
      const cur = store.records();
      patchState(store, {
        records: { ...cur, items: [record, ...cur.items], totalCount: cur.totalCount + 1 },
        isSaving: false,
      });
    },
    updateRecord(updated: MedicalRecordModel): void {
      const items = store.records().items.map((r) => r.id === updated.id ? updated : r);
      patchState(store, {
        records: { ...store.records(), items },
        selectedRecord: store.selectedRecord()?.id === updated.id ? updated : store.selectedRecord(),
        isSaving: false,
        isUploading: false,
      });
    },
    removeRecord(id: string): void {
      const cur = store.records();
      patchState(store, {
        records: { ...cur, items: cur.items.filter((r) => r.id !== id), totalCount: cur.totalCount - 1 },
      });
    },
    setFilter(filter: MedicalRecordFilter): void { patchState(store, { filter }); },
    setError(error: string): void {
      patchState(store, { error, isLoading: false, isDetailLoading: false, isSaving: false, isUploading: false });
    },
    clearError(): void { patchState(store, { error: null }); },
  }))
);