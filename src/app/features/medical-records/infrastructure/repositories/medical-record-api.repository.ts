import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicalRecordRepository, CreateMedicalRecordRequest, UpdateMedicalRecordRequest } from '../../domain/repositories/medical-record.repository';
import { MedicalRecordApiService } from '../api/medical-record-api.service';
import { MedicalRecordModel } from '../../domain/models/medical-record.model';
import { MedicalRecordFilter } from '../../domain/models/medical-record-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';

@Injectable({ providedIn: 'root' })
export class MedicalRecordApiRepository extends MedicalRecordRepository {
  private readonly api = inject(MedicalRecordApiService);

  getAll(filter: MedicalRecordFilter): Observable<PaginatedResult<MedicalRecordModel>> { return this.api.getAll(filter); }
  getById(id: string): Observable<MedicalRecordModel> { return this.api.getById(id); }
  create(req: CreateMedicalRecordRequest): Observable<MedicalRecordModel> { return this.api.create(req); }
  update(id: string, req: UpdateMedicalRecordRequest): Observable<MedicalRecordModel> { return this.api.update(id, req); }
  delete(id: string): Observable<void> { return this.api.delete(id); }
  addAttachment(id: string, file: File): Observable<MedicalRecordModel> { return this.api.addAttachment(id, file); }
  removeAttachment(id: string, attachmentId: string): Observable<void> { return this.api.removeAttachment(id, attachmentId); }
}