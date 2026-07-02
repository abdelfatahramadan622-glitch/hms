import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentService } from '../services/appointment.service';
import { AppointmentsStore } from '../state/appointments.store';
import { AppointmentFilter } from '../../domain/models/appointment-filter.model';
import { AppointmentModel } from '../../domain/models/appointment.model';
import { CreateAppointmentRequest, UpdateAppointmentRequest } from '../../domain/repositories/appointment.repository';

@Injectable({ providedIn: 'root' })
export class AppointmentsFacade {
  private readonly service = inject(AppointmentService);
  private readonly store = inject(AppointmentsStore);

  // ── State ────────────────────────────────────────
  readonly appointments = this.store.appointments;
  readonly selectedAppointment = this.store.selectedAppointment;
  readonly filter = this.store.filter;
  readonly isLoading = this.store.isLoading;
  readonly isDetailLoading = this.store.isDetailLoading;
  readonly isSaving = this.store.isSaving;
  readonly hasAppointments = this.store.hasAppointments;
  readonly hasError = this.store.hasError;
  readonly error = this.store.error;
  readonly totalAppointments = this.store.totalAppointments;
  readonly totalPages = this.store.totalPages;
  readonly currentPage = this.store.currentPage;

  // ── Actions ──────────────────────────────────────
  loadAll(filter?: AppointmentFilter): void { this.service.loadAll(filter); }
  loadById(id: string): void { this.service.loadById(id); }
  create(req: CreateAppointmentRequest): Observable<AppointmentModel> { return this.service.create(req); }
  update(id: string, req: UpdateAppointmentRequest): Observable<AppointmentModel> { return this.service.update(id, req); }
  cancel(id: string, reason: string): Observable<AppointmentModel> { return this.service.cancel(id, reason); }
  confirm(id: string): Observable<AppointmentModel> { return this.service.confirm(id); }
  complete(id: string): Observable<AppointmentModel> { return this.service.complete(id); }
  delete(id: string): Observable<void> { return this.service.delete(id); }
  applyFilter(filter: AppointmentFilter): void { this.service.applyFilter(filter); }
  changePage(page: number): void { this.service.changePage(page); }
  clearError(): void { this.store.clearError(); }
  clearSelected(): void { this.store.setSelectedAppointment(null); }
}