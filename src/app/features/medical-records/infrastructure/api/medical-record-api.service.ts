import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../../../core/infrastructure/api/api-client.service';
import { API_ENDPOINTS } from '../../../../core/infrastructure/api/api-endpoints';
import { MedicalRecordModel } from '../../domain/models/medical-record.model';
import { MedicalRecordFilter } from '../../domain/models/medical-record-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';
import { CreateMedicalRecordRequest, UpdateMedicalRecordRequest } from '../../domain/repositories/medical-record.repository';

@Injectable({ providedIn: 'root' })
export class MedicalRecordApiService {
  private readonly api = inject(ApiClientService);

  getAll(filter: MedicalRecordFilter): Observable<PaginatedResult<MedicalRecordModel>> {
    const { page, pageSize, search, patientId, doctorId, type, dateFrom, dateTo, isClosed } = filter;
    return this.api.getList<MedicalRecordModel>(API_ENDPOINTS.MEDICAL_RECORDS.BASE, {
      page, pageSize, search, patientId, doctorId, type, dateFrom, dateTo, isClosed,
    });
  }

  getById(id: string): Observable<MedicalRecordModel> {
    return this.api.get<MedicalRecordModel>(API_ENDPOINTS.MEDICAL_RECORDS.BY_ID(id));
  }

  create(req: CreateMedicalRecordRequest): Observable<MedicalRecordModel> {
    return this.api.post<MedicalRecordModel>(API_ENDPOINTS.MEDICAL_RECORDS.BASE, req);
  }

  update(id: string, req: UpdateMedicalRecordRequest): Observable<MedicalRecordModel> {
    return this.api.put<MedicalRecordModel>(API_ENDPOINTS.MEDICAL_RECORDS.BY_ID(id), req);
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(API_ENDPOINTS.MEDICAL_RECORDS.BY_ID(id));
  }

  addAttachment(id: string, file: File): Observable<MedicalRecordModel> {
    return this.api.upload<MedicalRecordModel>(API_ENDPOINTS.MEDICAL_RECORDS.ATTACHMENTS(id), file);
  }

  removeAttachment(id: string, attachmentId: string): Observable<void> {
    return this.api.delete<void>(`${API_ENDPOINTS.MEDICAL_RECORDS.ATTACHMENTS(id)}/${attachmentId}`);
  }
}