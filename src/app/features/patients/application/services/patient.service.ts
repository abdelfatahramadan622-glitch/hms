import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PatientRepository, CreatePatientRequest, UpdatePatientRequest } from '../../domain/repositories/patient.repository';
import { PatientsStore } from '../state/patients.store';
import { PatientFilter } from '../../domain/models/patient-filter.model';
import { PatientModel } from '../../domain/models/patient.model';

@Injectable({ providedIn: 'root' })
export class PatientService {
  private readonly repo = inject(PatientRepository);
  private readonly store = inject(PatientsStore);

  loadAll(filter?: PatientFilter): void {
    const activeFilter = filter ?? this.store.filter();
    this.store.setLoading(true);
    this.repo.getAll(activeFilter).subscribe({
      next: (result) => this.store.setPatients(result),
      error: (err) => this.store.setError(err?.message ?? 'فشل تحميل المرضى'),
    });
  }

  loadById(id: string): void {
    this.store.setDetailLoading(true);
    this.repo.getById(id).subscribe({
      next: (patient) => this.store.setSelectedPatient(patient),
      error: (err) => this.store.setError(err?.message ?? 'فشل تحميل بيانات المريض'),
    });
  }

  create(request: CreatePatientRequest): Observable<PatientModel> {
    this.store.setSaving(true);
    return this.repo.create(request).pipe(
      tap({
        next: (patient) => this.store.addPatient(patient),
        error: (err) => this.store.setError(err?.message ?? 'فشل إضافة المريض'),
      })
    );
  }

  update(id: string, request: UpdatePatientRequest): Observable<PatientModel> {
    this.store.setSaving(true);
    return this.repo.update(id, request).pipe(
      tap({
        next: (patient) => this.store.updatePatient(patient),
        error: (err) => this.store.setError(err?.message ?? 'فشل تعديل بيانات المريض'),
      })
    );
  }

  delete(id: string): Observable<void> {
    return this.repo.delete(id).pipe(
      tap({
        next: () => this.store.removePatient(id),
        error: (err) => this.store.setError(err?.message ?? 'فشل حذف المريض'),
      })
    );
  }

  applyFilter(filter: PatientFilter): void {
    this.store.setFilter(filter);
    this.loadAll(filter);
  }

  changePage(page: number): void {
    const filter = { ...this.store.filter(), page };
    this.applyFilter(filter);
  }

  resetFilter(): void {
    const defaultFilter = { ...this.store.filter(), page: 1 };
    this.applyFilter(defaultFilter);
  }
}