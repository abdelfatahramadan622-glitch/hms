import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { DashboardSummary } from '../../domain/entities/dashboard-metric.entity';
import {
  DashboardFilter,
  createDefaultDashboardFilter,
} from '../../domain/models/dashboard-filter.model';
import {
  AppointmentWidgetItem,
  EmergencyWidgetItem,
} from '../../domain/repositories/dashboard.repository';

export interface DashboardState {
  summary: DashboardSummary | null;
  appointments: AppointmentWidgetItem[];
  emergencies: EmergencyWidgetItem[];
  filter: DashboardFilter;
  isLoading: boolean;
  isSummaryLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

const initialState: DashboardState = {
  summary: null,
  appointments: [],
  emergencies: [],
  filter: createDefaultDashboardFilter(),
  isLoading: false,
  isSummaryLoading: false,
  error: null,
  lastUpdated: null,
};

export const DashboardStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((store) => ({
    hasData: computed(() => store.summary() !== null),
    hasError: computed(() => store.error() !== null),
    activeEmergencyCount: computed(() => store.emergencies().length),
    todayAppointmentCount: computed(() => store.appointments().length),
  })),

  withMethods((store) => ({
    setLoading(loading: boolean): void {
      patchState(store, { isLoading: loading, error: null });
    },
    setSummaryLoading(loading: boolean): void {
      patchState(store, { isSummaryLoading: loading });
    },
    setSummary(summary: DashboardSummary): void {
      patchState(store, {
        summary,
        isSummaryLoading: false,
        lastUpdated: new Date().toISOString(),
      });
    },
    setAppointments(appointments: AppointmentWidgetItem[]): void {
      patchState(store, { appointments });
    },
    setEmergencies(emergencies: EmergencyWidgetItem[]): void {
      patchState(store, { emergencies, isLoading: false });
    },
    setFilter(filter: DashboardFilter): void {
      patchState(store, { filter });
    },
    setError(error: string): void {
      patchState(store, { error, isLoading: false, isSummaryLoading: false });
    },
  }))
);