import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LabResultRepository, CreateLabResultRequest, UpdateLabResultRequest } from '../../domain/repositories/lab-result.repository';
import { LabResultsStore } from '../state/lab-results.store';
import { LabResultFilter } from '../../domain/models/lab-result-filter.model';
import { LabResultModel } from '../../domain/models/lab-result.model';

@Injectable({ providedIn: 'root' })
export class LabResultService {
  private readonly repo = inject(LabResultRepository);
  private readonly store = inject(LabResultsStore);

  loadAll(filter?: LabResultFilter): void {
    const f = filter ?? this.store.filter();
    this.store.setLoading(true);
    this.repo.getAll(f).subscribe({
      next: (result) => this.store.setResults(result),
      error: (err) => this.store.setError(err?.message ?? 'فشل تحميل نتائج المختبر'),
    });
  }

  loadById(id: string): void {
    this.store.setDetailLoading(true);
    this.repo.getById(id).subscribe({
      next: (r) => this.store.setSelectedResult(r),
      error: (err) => this.store.setError(err?.message ?? 'فشل تحميل نتيجة المختبر'),
    });
  }

  create(req: CreateLabResultRequest): Observable<LabResultModel> {
    this.store.setSaving(true);
    return this.repo.create(req).pipe(
      tap({ next: (r) => this.store.addResult(r), error: (err) => this.store.setError(err?.message) })
    );
  }

  update(id: string, req: UpdateLabResultRequest): Observable<LabResultModel> {
    this.store.setSaving(true);
    return this.repo.update(id, req).pipe(
      tap({ next: (r) => this.store.updateResult(r), error: (err) => this.store.setError(err?.message) })
    );
  }

  approve(id: string): Observable<LabResultModel> {
    return this.repo.approve(id).pipe(
      tap({ next: (r) => this.store.updateResult(r), error: (err) => this.store.setError(err?.message) })
    );
  }

  reject(id: string, reason: string): Observable<LabResultModel> {
    return this.repo.reject(id, reason).pipe(
      tap({ next: (r) => this.store.updateResult(r), error: (err) => this.store.setError(err?.message) })
    );
  }

  upload(id: string, file: File): Observable<LabResultModel> {
    this.store.setUploading(true);
    return this.repo.upload(id, file).pipe(
      tap({ next: (r) => this.store.updateResult(r), error: (err) => this.store.setError(err?.message) })
    );
  }

  delete(id: string): Observable<void> {
    return this.repo.delete(id).pipe(
      tap({ next: () => this.store.removeResult(id), error: (err) => this.store.setError(err?.message) })
    );
  }

  applyFilter(filter: LabResultFilter): void {
    this.store.setFilter(filter);
    this.loadAll(filter);
  }

  changePage(page: number): void { this.applyFilter({ ...this.store.filter(), page }); }
}