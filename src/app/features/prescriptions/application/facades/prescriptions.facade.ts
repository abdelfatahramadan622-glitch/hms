import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PrescriptionService } from '../services/prescription.service';
import { PrescriptionsStore } from '../state/prescriptions.store';
import { PrescriptionFilter } from '../../domain/models/prescription-filter.model';
import { PrescriptionModel } from '../../domain/models/prescription.model';
import { CreatePrescriptionRequest, UpdatePrescriptionRequest } from '../../domain/repositories/prescription.repository';

@Injectable({ providedIn: 'root' })
export class PrescriptionsFacade {
  private readonly service = inject(PrescriptionService);
  private readonly store = inject(PrescriptionsStore);

  readonly prescriptions = this.store.prescriptions;
  readonly selectedPrescription = this.store.selectedPrescription;
  readonly filter = this.store.filter;
  readonly isLoading = this.store.isLoading;
  readonly isDetailLoading = this.store.isDetailLoading;
  readonly isSaving = this.store.isSaving;
  readonly hasPrescriptions = this.store.hasPrescriptions;
  readonly hasError = this.store.hasError;
  readonly error = this.store.error;
  readonly totalPrescriptions = this.store.totalPrescriptions;
  readonly totalPages = this.store.totalPages;
  readonly currentPage = this.store.currentPage;
  readonly activeCount = this.store.activeCount;

  loadAll(filter?: PrescriptionFilter): void { this.service.loadAll(filter); }
  loadById(id: string): void { this.service.loadById(id); }
  create(req: CreatePrescriptionRequest): Observable<PrescriptionModel> { return this.service.create(req); }
  update(id: string, req: UpdatePrescriptionRequest): Observable<PrescriptionModel> { return this.service.update(id, req); }
  dispense(id: string): Observable<PrescriptionModel> { return this.service.dispense(id); }
  cancel(id: string, reason: string): Observable<PrescriptionModel> { return this.service.cancel(id, reason); }
  delete(id: string): Observable<void> { return this.service.delete(id); }
  applyFilter(filter: PrescriptionFilter): void { this.service.applyFilter(filter); }
  changePage(page: number): void { this.service.changePage(page); }
  clearError(): void { this.store.clearError(); }
  clearSelected(): void { this.store.setSelectedPrescription(null); }
}