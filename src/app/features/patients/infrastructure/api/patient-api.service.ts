import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiClientService } from '../../../../core/infrastructure/api/api-client.service';
import { API_ENDPOINTS } from '../../../../core/infrastructure/api/api-endpoints';
import { PatientMapper } from '../mappers/patient.mapper';
import { PatientModel } from '../../domain/models/patient.model';
import { PatientFilter } from '../../domain/models/patient-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';
import {
  CreatePatientRequest,
  UpdatePatientRequest,
} from '../../domain/repositories/patient.repository';
import { getDemoPatientById, getDemoPatientList } from './demo-patients.util';

@Injectable({ providedIn: 'root' })
export class PatientApiService {
  private readonly api = inject(ApiClientService);
  private readonly mapper = inject(PatientMapper);

  getAll(filter: PatientFilter): Observable<PaginatedResult<PatientModel>> {
    const { page, pageSize, search, gender, bloodType, status, ageFrom, ageTo, sort } = filter;

    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      return of(getDemoPatientList({
        ...filter,
        page: page ?? 1,
        pageSize: pageSize ?? 10,
        search,
        gender,
        bloodType,
        status,
        ageFrom,
        ageTo,
        sort,
      }));
    }

    return this.api.getList<PatientModel>(API_ENDPOINTS.PATIENTS.BASE, {
      page, pageSize, search,
      gender, bloodType, status,
      ageFrom, ageTo,
      sortBy: sort?.sortBy,
      sortDir: sort?.sortDirection,
    });
  }

  getById(id: string): Observable<PatientModel> {
    const demoPatient = getDemoPatientById(id);
    if (demoPatient) {
      return of(demoPatient);
    }

    return this.api.get<PatientModel>(API_ENDPOINTS.PATIENTS.BY_ID(id));
  }

  create(request: CreatePatientRequest): Observable<PatientModel> {
    const dto = this.mapper.toCreateDto(request);
    return this.api.post<PatientModel>(API_ENDPOINTS.PATIENTS.BASE, dto);
  }

  update(id: string, request: UpdatePatientRequest): Observable<PatientModel> {
    return this.api.put<PatientModel>(API_ENDPOINTS.PATIENTS.BY_ID(id), request);
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(API_ENDPOINTS.PATIENTS.BY_ID(id));
  }

  search(query: string): Observable<PatientModel[]> {
    return this.api.get<PatientModel[]>(API_ENDPOINTS.PATIENTS.BASE, { search: query, pageSize: 10 });
  }
}