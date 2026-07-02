import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { MedicalRecordRepository, CreateMedicalRecordRequest, UpdateMedicalRecordRequest } from '../../domain/repositories/medical-record.repository';
import { MedicalRecordsStore } from '../state/medical-records.store';
import { MedicalRecordFilter } from '../../domain/models/medical-record-filter.model';
import { MedicalRecordModel } from '../../domain/models/medical-record.model';

@Injectable({ providedIn: 'root' })
export class MedicalRecordService {
  private readonly repo = inject(MedicalRecordRepository);
  private readonly store = inject(MedicalRecordsStore);

  loadAll(filter?: MedicalRecordFilter): void {
    const f = filter ?? this.store.filter();
    this.store.setLoading(true);
    this.repo.getAll(f).subscribe({
      next: (result) => this.store.setRecords(result),
      error: (err) => this.store.setError(err?.message ?? 'فشل تحميل السجلات الطبية'),
    });
  }

  loadById(id: string): void {
    this.store.setDetailLoading(true);
    this.repo.getById(id).subscribe({
      next: (r) => this.store.setSelectedRecord(r),
      error: (err) => this.store.setError(err?.message ?? 'فشل تحميل السجل الطبي'),
    });
  }

  create(req: CreateMedicalRecordRequest): Observable<MedicalRecordModel> {
    this.store.setSaving(true);
    return this.repo.create(req).pipe(
      tap({ next: (r) => this.store.addRecord(r), error: (err) => this.store.setError(err?.message) })
    );
  }

  update(id: string, req: UpdateMedicalRecordRequest): Observable<MedicalRecordModel> {
    this.store.setSaving(true);
    return this.repo.update(id, req).pipe(
      tap({ next: (r) => this.store.updateRecord(r), error: (err) => this.store.setError(err?.message) })
    );
  }

  delete(id: string): Observable<void> {
    return this.repo.delete(id).pipe(
      tap({ next: () => this.store.removeRecord(id), error: (err) => this.store.setError(err?.message) })
    );
  }

  uploadAttachment(id: string, file: File): Observable<MedicalRecordModel> {
    this.store.setUploading(true);
    return this.repo.addAttachment(id, file).pipe(
      tap({ next: (r) => this.store.updateRecord(r), error: (err) => this.store.setError(err?.message) })
    );
  }

  removeAttachment(id: string, attachmentId: string): Observable<void> {
    return this.repo.removeAttachment(id, attachmentId).pipe(
      tap({ error: (err) => this.store.setError(err?.message) })
    );
  }

  applyFilter(filter: MedicalRecordFilter): void {
    this.store.setFilter(filter);
    this.loadAll(filter);
  }

  changePage(page: number): void { this.applyFilter({ ...this.store.filter(), page }); }
}