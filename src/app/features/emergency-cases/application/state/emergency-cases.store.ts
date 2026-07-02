import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { EmergencyCaseModel, TriageLevel, TRIAGE_CONFIG } from '../../domain/models/emergency-case.model';
import { EmergencyFilter, createDefaultEmergencyFilter } from '../../domain/models/emergency-filter.model';
import { PaginatedResult, createEmptyPaginatedResult } from '../../../../core/domain/models/pagination.model';

export interface EmergencyCasesState {
  cases: PaginatedResult<EmergencyCaseModel>;
  selectedCase: EmergencyCaseModel | null;
  filter: EmergencyFilter;
  isLoading: boolean;
  isDetailLoading: boolean;
  isSaving: boolean;
  error: string | null;
}

const initialState: EmergencyCasesState = {
  cases: createEmptyPaginatedResult<EmergencyCaseModel>(),
  selectedCase: null,
  filter: createDefaultEmergencyFilter(),
  isLoading: false,
  isDetailLoading: false,
  isSaving: false,
  error: null,
};

export const EmergencyCasesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((store) => ({
    hasCases: computed(() => store.cases().totalCount > 0),
    hasError: computed(() => store.error() !== null),
    totalCases: computed(() => store.cases().totalCount),
    totalPages: computed(() => store.cases().totalPages),
    currentPage: computed(() => store.cases().currentPage),
    activeCases: computed(() =>
      store.cases().items.filter((c) => ['waiting', 'in-treatment', 'critical'].includes(c.status))
    ),
    casesByTriage: computed(() => {
      const levels: TriageLevel[] = [1, 2, 3, 4, 5];
      return levels.reduce((acc, level) => ({
        ...acc,
        [level]: store.cases().items.filter((c) => c.triageLevel === level),
      }), {} as Record<TriageLevel, EmergencyCaseModel[]>);
    }),
  })),

  withMethods((store) => ({
    setLoading(v: boolean): void { patchState(store, { isLoading: v, error: null }); },
    setDetailLoading(v: boolean): void { patchState(store, { isDetailLoading: v }); },
    setSaving(v: boolean): void { patchState(store, { isSaving: v }); },
    setCases(cases: PaginatedResult<EmergencyCaseModel>): void {
      patchState(store, { cases, isLoading: false });
    },
    setSelectedCase(c: EmergencyCaseModel | null): void {
      patchState(store, { selectedCase: c, isDetailLoading: false });
    },
    addCase(c: EmergencyCaseModel): void {
      const current = store.cases();
      patchState(store, {
        cases: { ...current, items: [c, ...current.items], totalCount: current.totalCount + 1 },
        isSaving: false,
      });
    },
    updateCase(updated: EmergencyCaseModel): void {
      const items = store.cases().items.map((c) => c.id === updated.id ? updated : c);
      patchState(store, {
        cases: { ...store.cases(), items },
        selectedCase: store.selectedCase()?.id === updated.id ? updated : store.selectedCase(),
        isSaving: false,
      });
    },
    removeCase(id: string): void {
      const current = store.cases();
      patchState(store, {
        cases: { ...current, items: current.items.filter((c) => c.id !== id), totalCount: current.totalCount - 1 },
      });
    },
    setFilter(filter: EmergencyFilter): void { patchState(store, { filter }); },
    setError(error: string): void {
      patchState(store, { error, isLoading: false, isDetailLoading: false, isSaving: false });
    },
    clearError(): void { patchState(store, { error: null }); },
  }))
);