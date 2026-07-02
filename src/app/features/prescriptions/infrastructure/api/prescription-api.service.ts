import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../../../core/infrastructure/api/api-client.service';
import { API_ENDPOINTS } from '../../../../core/infrastructure/api/api-endpoints';
import { PrescriptionModel } from '../../domain/models/prescription.model';
import { PrescriptionFilter } from '../../domain/models/prescription-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';
import { CreatePrescriptionRequest, UpdatePrescriptionRequest } from '../../domain/repositories/prescription.repository';

@Injectable({ providedIn: 'root' })
export class PrescriptionApiService {
  private readonly api = inject(ApiClientService);

  getAll(filter: PrescriptionFilter): Observable<PaginatedResult<PrescriptionModel>> {
    const { page, pageSize, search, patientId, doctorId, status, dateFrom, dateTo } = filter;
    return this.api.getList<PrescriptionModel>(API_ENDPOINTS.PRESCRIPTIONS.BASE, {
      page, pageSize, search, patientId, doctorId, status, dateFrom, dateTo,
    });
  }

  getById(id: string): Observable<PrescriptionModel> {
    return this.api.get<PrescriptionModel>(API_ENDPOINTS.PRESCRIPTIONS.BY_ID(id));
  }

  create(req: CreatePrescriptionRequest): Observable<PrescriptionModel> {
    return this.api.post<PrescriptionModel>(API_ENDPOINTS.PRESCRIPTIONS.BASE, req);
  }

  update(id: string, req: UpdatePrescriptionRequest): Observable<PrescriptionModel> {
    return this.api.put<PrescriptionModel>(API_ENDPOINTS.PRESCRIPTIONS.BY_ID(id), req);
  }

  dispense(id: string): Observable<PrescriptionModel> {
    return this.api.post<PrescriptionModel>(API_ENDPOINTS.PRESCRIPTIONS.DISPENSE(id), {});
  }

  cancel(id: string, reason: string): Observable<PrescriptionModel> {
    return this.api.post<PrescriptionModel>(`${API_ENDPOINTS.PRESCRIPTIONS.BASE}/${id}/cancel`, { reason });
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(API_ENDPOINTS.PRESCRIPTIONS.BY_ID(id));
  }
}