import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { EmergencyCaseRepository, CreateEmergencyCaseRequest, UpdateEmergencyCaseRequest } from '../../domain/repositories/emergency-case.repository';
import { EmergencyCasesStore } from '../state/emergency-cases.store';
import { EmergencyFilter } from '../../domain/models/emergency-filter.model';
import { EmergencyCaseModel, TriageLevel } from '../../domain/models/emergency-case.model';

@Injectable({ providedIn: 'root' })
export class EmergencyCaseService {
  private readonly repo = inject(EmergencyCaseRepository);
  private readonly store = inject(EmergencyCasesStore);

  loadAll(filter?: EmergencyFilter): void {
    const f = filter ?? this.store.filter();
    this.store.setLoading(true);
    this.repo.getAll(f).subscribe({
      next: (result) => this.store.setCases(result),
      error: (err) => this.store.setError(err?.message ?? 'فشل تحميل حالات الطوارئ'),
    });
  }

  loadById(id: string): void {
    this.store.setDetailLoading(true);
    this.repo.getById(id).subscribe({
      next: (c) => this.store.setSelectedCase(c),
      error: (err) => this.store.setError(err?.message ?? 'فشل تحميل بيانات الحالة'),
    });
  }

  create(request: CreateEmergencyCaseRequest): Observable<EmergencyCaseModel> {
    this.store.setSaving(true);
    return this.repo.create(request).pipe(
      tap({ next: (c) => this.store.addCase(c), error: (err) => this.store.setError(err?.message) })
    );
  }

  update(id: string, request: UpdateEmergencyCaseRequest): Observable<EmergencyCaseModel> {
    this.store.setSaving(true);
    return this.repo.update(id, request).pipe(
      tap({ next: (c) => this.store.updateCase(c), error: (err) => this.store.setError(err?.message) })
    );
  }

  triage(id: string, level: TriageLevel, notes?: string): Observable<EmergencyCaseModel> {
    return this.repo.triage(id, level, notes).pipe(
      tap({ next: (c) => this.store.updateCase(c), error: (err) => this.store.setError(err?.message) })
    );
  }

  assignDoctor(id: string, doctorId: string): Observable<EmergencyCaseModel> {
    return this.repo.assignDoctor(id, doctorId).pipe(
      tap({ next: (c) => this.store.updateCase(c), error: (err) => this.store.setError(err?.message) })
    );
  }

  close(id: string, outcome: string): Observable<EmergencyCaseModel> {
    return this.repo.close(id, outcome).pipe(
      tap({ next: (c) => this.store.updateCase(c), error: (err) => this.store.setError(err?.message) })
    );
  }

  delete(id: string): Observable<void> {
    return this.repo.delete(id).pipe(
      tap({ next: () => this.store.removeCase(id), error: (err) => this.store.setError(err?.message) })
    );
  }

  applyFilter(filter: EmergencyFilter): void {
    this.store.setFilter(filter);
    this.loadAll(filter);
  }

  changePage(page: number): void {
    this.applyFilter({ ...this.store.filter(), page });
  }
}