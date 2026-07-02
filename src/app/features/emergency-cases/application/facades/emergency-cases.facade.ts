import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EmergencyCaseService } from '../services/emergency-case.service';
import { EmergencyCasesStore } from '../state/emergency-cases.store';
import { EmergencyFilter } from '../../domain/models/emergency-filter.model';
import { EmergencyCaseModel, TriageLevel } from '../../domain/models/emergency-case.model';
import { CreateEmergencyCaseRequest, UpdateEmergencyCaseRequest } from '../../domain/repositories/emergency-case.repository';

@Injectable({ providedIn: 'root' })
export class EmergencyCasesFacade {
  private readonly service = inject(EmergencyCaseService);
  private readonly store = inject(EmergencyCasesStore);

  // ── State ────────────────────────────────────────
  readonly cases = this.store.cases;
  readonly selectedCase = this.store.selectedCase;
  readonly filter = this.store.filter;
  readonly isLoading = this.store.isLoading;
  readonly isDetailLoading = this.store.isDetailLoading;
  readonly isSaving = this.store.isSaving;
  readonly hasCases = this.store.hasCases;
  readonly hasError = this.store.hasError;
  readonly error = this.store.error;
  readonly totalCases = this.store.totalCases;
  readonly totalPages = this.store.totalPages;
  readonly currentPage = this.store.currentPage;
  readonly activeCases = this.store.activeCases;
  readonly casesByTriage = this.store.casesByTriage;

  // ── Actions ──────────────────────────────────────
  loadAll(filter?: EmergencyFilter): void { this.service.loadAll(filter); }
  loadById(id: string): void { this.service.loadById(id); }
  create(req: CreateEmergencyCaseRequest): Observable<EmergencyCaseModel> { return this.service.create(req); }
  update(id: string, req: UpdateEmergencyCaseRequest): Observable<EmergencyCaseModel> { return this.service.update(id, req); }
  triage(id: string, level: TriageLevel, notes?: string): Observable<EmergencyCaseModel> { return this.service.triage(id, level, notes); }
  assignDoctor(id: string, doctorId: string): Observable<EmergencyCaseModel> { return this.service.assignDoctor(id, doctorId); }
  close(id: string, outcome: string): Observable<EmergencyCaseModel> { return this.service.close(id, outcome); }
  delete(id: string): Observable<void> { return this.service.delete(id); }
  applyFilter(filter: EmergencyFilter): void { this.service.applyFilter(filter); }
  changePage(page: number): void { this.service.changePage(page); }
  clearError(): void { this.store.clearError(); }
  clearSelected(): void { this.store.setSelectedCase(null); }
}