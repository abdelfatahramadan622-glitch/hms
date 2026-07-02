import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../../../core/infrastructure/api/api-client.service';
import { API_ENDPOINTS } from '../../../../core/infrastructure/api/api-endpoints';
import { LabResultModel } from '../../domain/models/lab-result.model';
import { LabResultFilter } from '../../domain/models/lab-result-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';
import { CreateLabResultRequest, UpdateLabResultRequest } from '../../domain/repositories/lab-result.repository';

@Injectable({ providedIn: 'root' })
export class LabResultApiService {
  private readonly api = inject(ApiClientService);

  getAll(filter: LabResultFilter): Observable<PaginatedResult<LabResultModel>> {
    const { page, pageSize, search, patientId, doctorId, status, dateFrom, dateTo } = filter;
    return this.api.getList<LabResultModel>(API_ENDPOINTS.LAB_RESULTS.BASE, {
      page, pageSize, search, patientId, doctorId, status, dateFrom, dateTo,
    });
  }
  getById(id: string): Observable<LabResultModel> {
    return this.api.get<LabResultModel>(API_ENDPOINTS.LAB_RESULTS.BY_ID(id));
  }
  create(req: CreateLabResultRequest): Observable<LabResultModel> {
    return this.api.post<LabResultModel>(API_ENDPOINTS.LAB_RESULTS.BASE, req);
  }
  update(id: string, req: UpdateLabResultRequest): Observable<LabResultModel> {
    return this.api.put<LabResultModel>(API_ENDPOINTS.LAB_RESULTS.BY_ID(id), req);
  }
  approve(id: string): Observable<LabResultModel> {
    return this.api.post<LabResultModel>(API_ENDPOINTS.LAB_RESULTS.APPROVE(id), {});
  }
  reject(id: string, reason: string): Observable<LabResultModel> {
    return this.api.post<LabResultModel>(`${API_ENDPOINTS.LAB_RESULTS.BASE}/${id}/reject`, { reason });
  }
  upload(id: string, file: File): Observable<LabResultModel> {
    return this.api.upload<LabResultModel>(API_ENDPOINTS.LAB_RESULTS.UPLOAD, file, { resultId: id });
  }
  delete(id: string): Observable<void> {
    return this.api.delete<void>(API_ENDPOINTS.LAB_RESULTS.BY_ID(id));
  }
}