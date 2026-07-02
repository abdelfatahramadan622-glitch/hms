import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientService } from '../services/patient.service';
import { PatientsStore } from '../state/patients.store';
import { PatientFilter } from '../../domain/models/patient-filter.model';
import { PatientModel } from '../../domain/models/patient.model';
import { CreatePatientRequest, UpdatePatientRequest } from '../../domain/repositories/patient.repository';

@Injectable({ providedIn: 'root' })
export class PatientsFacade {
  private readonly service = inject(PatientService);
  private readonly store = inject(PatientsStore);

  // ── State ────────────────────────────────────────
  readonly patients = this.store.patients;
  readonly selectedPatient = this.store.selectedPatient;
  readonly filter = this.store.filter;
  readonly isLoading = this.store.isLoading;
  readonly isDetailLoading = this.store.isDetailLoading;
  readonly isSaving = this.store.isSaving;
  readonly hasPatients = this.store.hasPatients;
  readonly hasError = this.store.hasError;
  readonly error = this.store.error;
  readonly totalPatients = this.store.totalPatients;
  readonly totalPages = this.store.totalPages;
  readonly currentPage = this.store.currentPage;

  // ── Actions ──────────────────────────────────────
  loadAll(filter?: PatientFilter): void {
    this.service.loadAll(filter);
  }

  loadById(id: string): void {
    this.service.loadById(id);
  }

  create(request: CreatePatientRequest): Observable<PatientModel> {
    return this.service.create(request);
  }

  update(id: string, request: UpdatePatientRequest): Observable<PatientModel> {
    return this.service.update(id, request);
  }

  delete(id: string): Observable<void> {
    return this.service.delete(id);
  }

  applyFilter(filter: PatientFilter): void {
    this.service.applyFilter(filter);
  }

  changePage(page: number): void {
    this.service.changePage(page);
  }

  resetFilter(): void {
    this.service.resetFilter();
  }

  clearError(): void {
    this.store.clearError();
  }

  clearSelected(): void {
    this.store.setSelectedPatient(null);
  }
}