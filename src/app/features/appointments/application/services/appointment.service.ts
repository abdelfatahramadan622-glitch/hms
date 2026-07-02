import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AppointmentRepository, CreateAppointmentRequest, UpdateAppointmentRequest } from '../../domain/repositories/appointment.repository';
import { AppointmentsStore } from '../state/appointments.store';
import { AppointmentFilter } from '../../domain/models/appointment-filter.model';
import { AppointmentModel } from '../../domain/models/appointment.model';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private readonly repo = inject(AppointmentRepository);
  private readonly store = inject(AppointmentsStore);

  loadAll(filter?: AppointmentFilter): void {
    const f = filter ?? this.store.filter();
    this.store.setLoading(true);
    this.repo.getAll(f).subscribe({
      next: (result) => this.store.setAppointments(result),
      error: (err) => this.store.setError(err?.message ?? 'فشل تحميل المواعيد'),
    });
  }

  loadById(id: string): void {
    this.store.setDetailLoading(true);
    this.repo.getById(id).subscribe({
      next: (a) => this.store.setSelectedAppointment(a),
      error: (err) => this.store.setError(err?.message ?? 'فشل تحميل تفاصيل الموعد'),
    });
  }

  create(request: CreateAppointmentRequest): Observable<AppointmentModel> {
    this.store.setSaving(true);
    return this.repo.create(request).pipe(
      tap({ next: (a) => this.store.addAppointment(a), error: (err) => this.store.setError(err?.message) })
    );
  }

  update(id: string, request: UpdateAppointmentRequest): Observable<AppointmentModel> {
    this.store.setSaving(true);
    return this.repo.update(id, request).pipe(
      tap({ next: (a) => this.store.updateAppointment(a), error: (err) => this.store.setError(err?.message) })
    );
  }

  cancel(id: string, reason: string): Observable<AppointmentModel> {
    return this.repo.cancel(id, reason).pipe(
      tap({ next: (a) => this.store.updateAppointment(a), error: (err) => this.store.setError(err?.message) })
    );
  }

  confirm(id: string): Observable<AppointmentModel> {
    return this.repo.confirm(id).pipe(
      tap({ next: (a) => this.store.updateAppointment(a), error: (err) => this.store.setError(err?.message) })
    );
  }

  complete(id: string): Observable<AppointmentModel> {
    return this.repo.complete(id).pipe(
      tap({ next: (a) => this.store.updateAppointment(a), error: (err) => this.store.setError(err?.message) })
    );
  }

  delete(id: string): Observable<void> {
    return this.repo.delete(id).pipe(
      tap({ next: () => this.store.removeAppointment(id), error: (err) => this.store.setError(err?.message) })
    );
  }

  applyFilter(filter: AppointmentFilter): void {
    this.store.setFilter(filter);
    this.loadAll(filter);
  }

  changePage(page: number): void {
    this.applyFilter({ ...this.store.filter(), page });
  }
}