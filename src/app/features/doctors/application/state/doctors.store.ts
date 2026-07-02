import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { DoctorModel } from '../../domain/models/doctor.model';
import { DoctorFilter, DoctorSchedule, createDefaultDoctorFilter } from '../../domain/models/doctor-filter.model';
import { PaginatedResult, createEmptyPaginatedResult } from '../../../../core/domain/models/pagination.model';

export interface DoctorsState {
  doctors: PaginatedResult<DoctorModel>;
  selectedDoctor: DoctorModel | null;
  schedule: DoctorSchedule | null;
  filter: DoctorFilter;
  isLoading: boolean;
  isDetailLoading: boolean;
  isScheduleLoading: boolean;
  isSaving: boolean;
  error: string | null;
}

const initialState: DoctorsState = {
  doctors: createEmptyPaginatedResult<DoctorModel>(),
  selectedDoctor: null,
  schedule: null,
  filter: createDefaultDoctorFilter(),
  isLoading: false,
  isDetailLoading: false,
  isScheduleLoading: false,
  isSaving: false,
  error: null,
};

export const DoctorsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((store) => ({
    hasDoctors: computed(() => store.doctors().totalCount > 0),
    hasError: computed(() => store.error() !== null),
    totalDoctors: computed(() => store.doctors().totalCount),
    totalPages: computed(() => store.doctors().totalPages),
    currentPage: computed(() => store.doctors().currentPage),
  })),

  withMethods((store) => ({
    setLoading(v: boolean): void { patchState(store, { isLoading: v, error: null }); },
    setDetailLoading(v: boolean): void { patchState(store, { isDetailLoading: v }); },
    setScheduleLoading(v: boolean): void { patchState(store, { isScheduleLoading: v }); },
    setSaving(v: boolean): void { patchState(store, { isSaving: v }); },
    setDoctors(doctors: PaginatedResult<DoctorModel>): void {
      patchState(store, { doctors, isLoading: false });
    },
    setSelectedDoctor(doctor: DoctorModel | null): void {
      patchState(store, { selectedDoctor: doctor, isDetailLoading: false });
    },
    setSchedule(schedule: DoctorSchedule | null): void {
      patchState(store, { schedule, isScheduleLoading: false });
    },
    addDoctor(doctor: DoctorModel): void {
      const current = store.doctors();
      patchState(store, {
        doctors: { ...current, items: [doctor, ...current.items], totalCount: current.totalCount + 1 },
        isSaving: false,
      });
    },
    updateDoctor(updated: DoctorModel): void {
      const items = store.doctors().items.map((d) => d.id === updated.id ? updated : d);
      patchState(store, { doctors: { ...store.doctors(), items }, selectedDoctor: updated, isSaving: false });
    },
    removeDoctor(id: string): void {
      const current = store.doctors();
      patchState(store, {
        doctors: { ...current, items: current.items.filter((d) => d.id !== id), totalCount: current.totalCount - 1 },
      });
    },
    setFilter(filter: DoctorFilter): void { patchState(store, { filter }); },
    setError(error: string): void {
      patchState(store, { error, isLoading: false, isDetailLoading: false, isSaving: false });
    },
    clearError(): void { patchState(store, { error: null }); },
  }))
);