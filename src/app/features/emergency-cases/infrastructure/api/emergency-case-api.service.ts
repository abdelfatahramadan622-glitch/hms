import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../../../core/infrastructure/api/api-client.service';
import { API_ENDPOINTS } from '../../../../core/infrastructure/api/api-endpoints';
import { EmergencyCaseModel, TriageLevel } from '../../domain/models/emergency-case.model';
import { EmergencyFilter } from '../../domain/models/emergency-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';
import { CreateEmergencyCaseRequest, UpdateEmergencyCaseRequest } from '../../domain/repositories/emergency-case.repository';

@Injectable({ providedIn: 'root' })
export class EmergencyCaseApiService {
  private readonly api = inject(ApiClientService);

  getAll(filter: EmergencyFilter): Observable<PaginatedResult<EmergencyCaseModel>> {
    const { page, pageSize, search, status, triageLevel, assignedDoctorId, dateFrom, dateTo } = filter;
    return this.api.getList<EmergencyCaseModel>(API_ENDPOINTS.EMERGENCY.BASE, {
      page, pageSize, search, status, triageLevel, assignedDoctorId, dateFrom, dateTo,
    });
  }

  getById(id: string): Observable<EmergencyCaseModel> {
    return this.api.get<EmergencyCaseModel>(API_ENDPOINTS.EMERGENCY.BY_ID(id));
  }

  create(request: CreateEmergencyCaseRequest): Observable<EmergencyCaseModel> {
    return this.api.post<EmergencyCaseModel>(API_ENDPOINTS.EMERGENCY.BASE, request);
  }

  update(id: string, request: UpdateEmergencyCaseRequest): Observable<EmergencyCaseModel> {
    return this.api.put<EmergencyCaseModel>(API_ENDPOINTS.EMERGENCY.BY_ID(id), request);
  }

  triage(id: string, level: TriageLevel, notes?: string): Observable<EmergencyCaseModel> {
    return this.api.post<EmergencyCaseModel>(API_ENDPOINTS.EMERGENCY.TRIAGE(id), { level, notes });
  }

  assignDoctor(id: string, doctorId: string): Observable<EmergencyCaseModel> {
    return this.api.post<EmergencyCaseModel>(API_ENDPOINTS.EMERGENCY.ASSIGN_DOCTOR(id), { doctorId });
  }

  close(id: string, outcome: string): Observable<EmergencyCaseModel> {
    return this.api.post<EmergencyCaseModel>(API_ENDPOINTS.EMERGENCY.CLOSE(id), { outcome });
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(API_ENDPOINTS.EMERGENCY.BY_ID(id));
  }
}