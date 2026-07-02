import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { LabResultModel } from '../../domain/models/lab-result.model';
import { LabResultFilter, createDefaultLabResultFilter } from '../../domain/models/lab-result-filter.model';
import { PaginatedResult, createEmptyPaginatedResult } from '../../../../core/domain/models/pagination.model';

export interface LabResultsState {
  results: PaginatedResult<LabResultModel>;
  selectedResult: LabResultModel | null;
  filter: LabResultFilter;
  isLoading: boolean;
  isDetailLoading: boolean;
  isSaving: boolean;
  isUploading: boolean;
  error: string | null;
}

const initialState: LabResultsState = {
  results: createEmptyPaginatedResult<LabResultModel>(),
  selectedResult: null,
  filter: createDefaultLabResultFilter(),
  isLoading: false,
  isDetailLoading: false,
  isSaving: false,
  isUploading: false,
  error: null,
};

export const LabResultsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((store) => ({
    hasResults: computed(() => store.results().totalCount > 0),
    hasError: computed(() => store.error() !== null),
    totalResults: computed(() => store.results().totalCount),
    totalPages: computed(() => store.results().totalPages),
    currentPage: computed(() => store.results().currentPage),
    pendingCount: computed(() => store.results().items.filter((r) => r.status === 'pending').length),
  })),

  withMethods((store) => ({
    setLoading(v: boolean): void { patchState(store, { isLoading: v, error: null }); },
    setDetailLoading(v: boolean): void { patchState(store, { isDetailLoading: v }); },
    setSaving(v: boolean): void { patchState(store, { isSaving: v }); },
    setUploading(v: boolean): void { patchState(store, { isUploading: v }); },
    setResults(results: PaginatedResult<LabResultModel>): void {
      patchState(store, { results, isLoading: false });
    },
    setSelectedResult(result: LabResultModel | null): void {
      patchState(store, { selectedResult: result, isDetailLoading: false });
    },
    addResult(result: LabResultModel): void {
      const cur = store.results();
      patchState(store, {
        results: { ...cur, items: [result, ...cur.items], totalCount: cur.totalCount + 1 },
        isSaving: false,
      });
    },
    updateResult(updated: LabResultModel): void {
      const items = store.results().items.map((r) => r.id === updated.id ? updated : r);
      patchState(store, {
        results: { ...store.results(), items },
        selectedResult: store.selectedResult()?.id === updated.id ? updated : store.selectedResult(),
        isSaving: false, isUploading: false,
      });
    },
    removeResult(id: string): void {
      const cur = store.results();
      patchState(store, {
        results: { ...cur, items: cur.items.filter((r) => r.id !== id), totalCount: cur.totalCount - 1 },
      });
    },
    setFilter(filter: LabResultFilter): void { patchState(store, { filter }); },
    setError(error: string): void {
      patchState(store, { error, isLoading: false, isDetailLoading: false, isSaving: false, isUploading: false });
    },
    clearError(): void { patchState(store, { error: null }); },
  }))
);