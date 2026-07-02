import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DoctorRepository, CreateDoctorRequest, UpdateDoctorRequest } from '../../domain/repositories/doctor.repository';
import { DoctorsStore } from '../state/doctors.store';
import { DoctorFilter } from '../../domain/models/doctor-filter.model';
import { DoctorModel } from '../../domain/models/doctor.model';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private readonly repo = inject(DoctorRepository);
  private readonly store = inject(DoctorsStore);

  loadAll(filter?: DoctorFilter): void {
    const activeFilter = filter ?? this.store.filter();
    this.store.setLoading(true);
    this.repo.getAll(activeFilter).subscribe({
      next: (result) => this.store.setDoctors(result),
      error: (err) => this.store.setError(err?.message ?? 'فشل تحميل بيانات الأطباء'),
    });
  }

  loadById(id: string): void {
    this.store.setDetailLoading(true);
    this.repo.getById(id).subscribe({
      next: (doctor) => this.store.setSelectedDoctor(doctor),
      error: (err) => this.store.setError(err?.message ?? 'فشل تحميل بيانات الطبيب'),
    });
  }

  loadSchedule(id: string, date: string): void {
    this.store.setScheduleLoading(true);
    this.repo.getSchedule(id, date).subscribe({
      next: (schedule) => this.store.setSchedule(schedule),
      error: (err) => this.store.setError(err?.message ?? 'فشل تحميل جدول الطبيب'),
    });
  }

  create(request: CreateDoctorRequest): Observable<DoctorModel> {
    this.store.setSaving(true);
    return this.repo.create(request).pipe(
      tap({
        next: (doctor) => this.store.addDoctor(doctor),
        error: (err) => this.store.setError(err?.message ?? 'فشل إضافة الطبيب'),
      })
    );
  }

  update(id: string, request: UpdateDoctorRequest): Observable<DoctorModel> {
    this.store.setSaving(true);
    return this.repo.update(id, request).pipe(
      tap({
        next: (doctor) => this.store.updateDoctor(doctor),
        error: (err) => this.store.setError(err?.message ?? 'فشل تعديل بيانات الطبيب'),
      })
    );
  }

  delete(id: string): Observable<void> {
    return this.repo.delete(id).pipe(
      tap({
        next: () => this.store.removeDoctor(id),
        error: (err) => this.store.setError(err?.message ?? 'فشل حذف الطبيب'),
      })
    );
  }

  applyFilter(filter: DoctorFilter): void {
    this.store.setFilter(filter);
    this.loadAll(filter);
  }

  changePage(page: number): void {
    this.applyFilter({ ...this.store.filter(), page });
  }
}