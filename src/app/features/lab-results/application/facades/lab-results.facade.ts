import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LabResultService } from '../services/lab-result.service';
import { LabResultsStore } from '../state/lab-results.store';
import { LabResultFilter } from '../../domain/models/lab-result-filter.model';
import { LabResultModel } from '../../domain/models/lab-result.model';
import { CreateLabResultRequest, UpdateLabResultRequest } from '../../domain/repositories/lab-result.repository';

@Injectable({ providedIn: 'root' })
export class LabResultsFacade {
  private readonly service = inject(LabResultService);
  private readonly store = inject(LabResultsStore);

  readonly results = this.store.results;
  readonly selectedResult = this.store.selectedResult;
  readonly filter = this.store.filter;
  readonly isLoading = this.store.isLoading;
  readonly isDetailLoading = this.store.isDetailLoading;
  readonly isSaving = this.store.isSaving;
  readonly isUploading = this.store.isUploading;
  readonly hasResults = this.store.hasResults;
  readonly hasError = this.store.hasError;
  readonly error = this.store.error;
  readonly totalResults = this.store.totalResults;
  readonly totalPages = this.store.totalPages;
  readonly currentPage = this.store.currentPage;
  readonly pendingCount = this.store.pendingCount;

  loadAll(filter?: LabResultFilter): void { this.service.loadAll(filter); }
  loadById(id: string): void { this.service.loadById(id); }
  create(req: CreateLabResultRequest): Observable<LabResultModel> { return this.service.create(req); }
  update(id: string, req: UpdateLabResultRequest): Observable<LabResultModel> { return this.service.update(id, req); }
  approve(id: string): Observable<LabResultModel> { return this.service.approve(id); }
  reject(id: string, reason: string): Observable<LabResultModel> { return this.service.reject(id, reason); }
  upload(id: string, file: File): Observable<LabResultModel> { return this.service.upload(id, file); }
  delete(id: string): Observable<void> { return this.service.delete(id); }
  applyFilter(filter: LabResultFilter): void { this.service.applyFilter(filter); }
  changePage(page: number): void { this.service.changePage(page); }
  clearError(): void { this.store.clearError(); }
  clearSelected(): void { this.store.setSelectedResult(null); }
}