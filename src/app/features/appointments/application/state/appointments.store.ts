import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { AppointmentModel } from '../../domain/models/appointment.model';
import { AppointmentFilter, createDefaultAppointmentFilter } from '../../domain/models/appointment-filter.model';
import { PaginatedResult, createEmptyPaginatedResult } from '../../../../core/domain/models/pagination.model';

export interface AppointmentsState {
  appointments: PaginatedResult<AppointmentModel>;
  selectedAppointment: AppointmentModel | null;
  filter: AppointmentFilter;
  isLoading: boolean;
  isDetailLoading: boolean;
  isSaving: boolean;
  error: string | null;
}

const initialState: AppointmentsState = {
  appointments: createEmptyPaginatedResult<AppointmentModel>(),
  selectedAppointment: null,
  filter: createDefaultAppointmentFilter(),
  isLoading: false,
  isDetailLoading: false,
  isSaving: false,
  error: null,
};

export const AppointmentsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((store) => ({
    hasAppointments: computed(() => store.appointments().totalCount > 0),
    hasError: computed(() => store.error() !== null),
    totalAppointments: computed(() => store.appointments().totalCount),
    totalPages: computed(() => store.appointments().totalPages),
    currentPage: computed(() => store.appointments().currentPage),
  })),

  withMethods((store) => ({
    setLoading(v: boolean): void { patchState(store, { isLoading: v, error: null }); },
    setDetailLoading(v: boolean): void { patchState(store, { isDetailLoading: v }); },
    setSaving(v: boolean): void { patchState(store, { isSaving: v }); },
    setAppointments(appointments: PaginatedResult<AppointmentModel>): void {
      patchState(store, { appointments, isLoading: false });
    },
    setSelectedAppointment(appointment: AppointmentModel | null): void {
      patchState(store, { selectedAppointment: appointment, isDetailLoading: false });
    },
    addAppointment(appointment: AppointmentModel): void {
      const current = store.appointments();
      patchState(store, {
        appointments: { ...current, items: [appointment, ...current.items], totalCount: current.totalCount + 1 },
        isSaving: false,
      });
    },
    updateAppointment(updated: AppointmentModel): void {
      const items = store.appointments().items.map((a) => a.id === updated.id ? updated : a);
      patchState(store, {
        appointments: { ...store.appointments(), items },
        selectedAppointment: store.selectedAppointment()?.id === updated.id ? updated : store.selectedAppointment(),
        isSaving: false,
      });
    },
    removeAppointment(id: string): void {
      const current = store.appointments();
      patchState(store, {
        appointments: { ...current, items: current.items.filter((a) => a.id !== id), totalCount: current.totalCount - 1 },
      });
    },
    setFilter(filter: AppointmentFilter): void { patchState(store, { filter }); },
    setError(error: string): void {
      patchState(store, { error, isLoading: false, isDetailLoading: false, isSaving: false });
    },
    clearError(): void { patchState(store, { error: null }); },
  }))
);