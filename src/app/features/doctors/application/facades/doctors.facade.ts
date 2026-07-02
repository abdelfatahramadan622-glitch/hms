import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorService } from '../services/doctor.service';
import { DoctorsStore } from '../state/doctors.store';
import { DoctorFilter } from '../../domain/models/doctor-filter.model';
import { DoctorModel } from '../../domain/models/doctor.model';
import { CreateDoctorRequest, UpdateDoctorRequest } from '../../domain/repositories/doctor.repository';

@Injectable({ providedIn: 'root' })
export class DoctorsFacade {
  private readonly service = inject(DoctorService);
  private readonly store = inject(DoctorsStore);

  // ── State ────────────────────────────────────────
  readonly doctors = this.store.doctors;
  readonly selectedDoctor = this.store.selectedDoctor;
  readonly schedule = this.store.schedule;
  readonly filter = this.store.filter;
  readonly isLoading = this.store.isLoading;
  readonly isDetailLoading = this.store.isDetailLoading;
  readonly isScheduleLoading = this.store.isScheduleLoading;
  readonly isSaving = this.store.isSaving;
  readonly hasDoctors = this.store.hasDoctors;
  readonly hasError = this.store.hasError;
  readonly error = this.store.error;
  readonly totalDoctors = this.store.totalDoctors;
  readonly totalPages = this.store.totalPages;
  readonly currentPage = this.store.currentPage;

  // ── Actions ──────────────────────────────────────
  loadAll(filter?: DoctorFilter): void { this.service.loadAll(filter); }
  loadById(id: string): void { this.service.loadById(id); }
  loadSchedule(id: string, date: string): void { this.service.loadSchedule(id, date); }
  create(req: CreateDoctorRequest): Observable<DoctorModel> { return this.service.create(req); }
  update(id: string, req: UpdateDoctorRequest): Observable<DoctorModel> { return this.service.update(id, req); }
  delete(id: string): Observable<void> { return this.service.delete(id); }
  applyFilter(filter: DoctorFilter): void { this.service.applyFilter(filter); }
  changePage(page: number): void { this.service.changePage(page); }
  clearError(): void { this.store.clearError(); }
  clearSelected(): void { this.store.setSelectedDoctor(null); }
}