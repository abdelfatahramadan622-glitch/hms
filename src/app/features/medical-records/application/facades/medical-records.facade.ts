import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicalRecordService } from '../services/medical-record.service';
import { MedicalRecordsStore } from '../state/medical-records.store';
import { MedicalRecordFilter } from '../../domain/models/medical-record-filter.model';
import { MedicalRecordModel } from '../../domain/models/medical-record.model';
import { CreateMedicalRecordRequest, UpdateMedicalRecordRequest } from '../../domain/repositories/medical-record.repository';

@Injectable({ providedIn: 'root' })
export class MedicalRecordsFacade {
  private readonly service = inject(MedicalRecordService);
  private readonly store = inject(MedicalRecordsStore);

  readonly records = this.store.records;
  readonly selectedRecord = this.store.selectedRecord;
  readonly filter = this.store.filter;
  readonly isLoading = this.store.isLoading;
  readonly isDetailLoading = this.store.isDetailLoading;
  readonly isSaving = this.store.isSaving;
  readonly isUploading = this.store.isUploading;
  readonly hasRecords = this.store.hasRecords;
  readonly hasError = this.store.hasError;
  readonly error = this.store.error;
  readonly totalRecords = this.store.totalRecords;
  readonly totalPages = this.store.totalPages;
  readonly currentPage = this.store.currentPage;

  loadAll(filter?: MedicalRecordFilter): void { this.service.loadAll(filter); }
  loadById(id: string): void { this.service.loadById(id); }
  create(req: CreateMedicalRecordRequest): Observable<MedicalRecordModel> { return this.service.create(req); }
  update(id: string, req: UpdateMedicalRecordRequest): Observable<MedicalRecordModel> { return this.service.update(id, req); }
  delete(id: string): Observable<void> { return this.service.delete(id); }
  uploadAttachment(id: string, file: File): Observable<MedicalRecordModel> { return this.service.uploadAttachment(id, file); }
  removeAttachment(id: string, attachmentId: string): Observable<void> { return this.service.removeAttachment(id, attachmentId); }
  applyFilter(filter: MedicalRecordFilter): void { this.service.applyFilter(filter); }
  changePage(page: number): void { this.service.changePage(page); }
  clearError(): void { this.store.clearError(); }
  clearSelected(): void { this.store.setSelectedRecord(null); }
}