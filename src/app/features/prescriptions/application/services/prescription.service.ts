import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PrescriptionRepository, CreatePrescriptionRequest, UpdatePrescriptionRequest } from '../../domain/repositories/prescription.repository';
import { PrescriptionsStore } from '../state/prescriptions.store';
import { PrescriptionFilter } from '../../domain/models/prescription-filter.model';
import { PrescriptionModel } from '../../domain/models/prescription.model';

@Injectable({ providedIn: 'root' })
export class PrescriptionService {
  private readonly repo = inject(PrescriptionRepository);
  private readonly store = inject(PrescriptionsStore);

  loadAll(filter?: PrescriptionFilter): void {
    const f = filter ?? this.store.filter();
    this.store.setLoading(true);
    this.repo.getAll(f).subscribe({
      next: (result) => this.store.setPrescriptions(result),
      error: (err) => this.store.setError(err?.message ?? 'فشل تحميل الوصفات الطبية'),
    });
  }

  loadById(id: string): void {
    this.store.setDetailLoading(true);
    this.repo.getById(id).subscribe({
      next: (p) => this.store.setSelectedPrescription(p),
      error: (err) => this.store.setError(err?.message ?? 'فشل تحميل الوصفة الطبية'),
    });
  }

  create(req: CreatePrescriptionRequest): Observable<PrescriptionModel> {
    this.store.setSaving(true);
    return this.repo.create(req).pipe(
      tap({ next: (p) => this.store.addPrescription(p), error: (err) => this.store.setError(err?.message) })
    );
  }

  update(id: string, req: UpdatePrescriptionRequest): Observable<PrescriptionModel> {
    this.store.setSaving(true);
    return this.repo.update(id, req).pipe(
      tap({ next: (p) => this.store.updatePrescription(p), error: (err) => this.store.setError(err?.message) })
    );
  }

  dispense(id: string): Observable<PrescriptionModel> {
    return this.repo.dispense(id).pipe(
      tap({ next: (p) => this.store.updatePrescription(p), error: (err) => this.store.setError(err?.message) })
    );
  }

  cancel(id: string, reason: string): Observable<PrescriptionModel> {
    return this.repo.cancel(id, reason).pipe(
      tap({ next: (p) => this.store.updatePrescription(p), error: (err) => this.store.setError(err?.message) })
    );
  }

  delete(id: string): Observable<void> {
    return this.repo.delete(id).pipe(
      tap({ next: () => this.store.removePrescription(id), error: (err) => this.store.setError(err?.message) })
    );
  }

  applyFilter(filter: PrescriptionFilter): void {
    this.store.setFilter(filter);
    this.loadAll(filter);
  }

  changePage(page: number): void { this.applyFilter({ ...this.store.filter(), page }); }
}