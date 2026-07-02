import { inject } from '@angular/core';
import { PatientsStore } from './patients.store';

export function injectPatientsSelectors() {
  const store = inject(PatientsStore);
  return {
    patients: store.patients,
    selectedPatient: store.selectedPatient,
    filter: store.filter,
    isLoading: store.isLoading,
    isDetailLoading: store.isDetailLoading,
    isSaving: store.isSaving,
    hasPatients: store.hasPatients,
    hasError: store.hasError,
    error: store.error,
    totalPatients: store.totalPatients,
    currentPage: store.currentPage,
    totalPages: store.totalPages,
  };
}