import { inject } from '@angular/core';
import { DashboardStore } from './dashboard.store';

export function injectDashboardSelectors() {
  const store = inject(DashboardStore);
  return {
    summary: store.summary,
    appointments: store.appointments,
    emergencies: store.emergencies,
    filter: store.filter,
    isLoading: store.isLoading,
    isSummaryLoading: store.isSummaryLoading,
    hasData: store.hasData,
    hasError: store.hasError,
    error: store.error,
    lastUpdated: store.lastUpdated,
    activeEmergencyCount: store.activeEmergencyCount,
    todayAppointmentCount: store.todayAppointmentCount,
  };
}