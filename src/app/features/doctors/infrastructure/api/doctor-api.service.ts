import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../../../core/infrastructure/api/api-client.service';
import { API_ENDPOINTS } from '../../../../core/infrastructure/api/api-endpoints';
import { DoctorModel } from '../../domain/models/doctor.model';
import { DoctorFilter, DoctorSchedule } from '../../domain/models/doctor-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';
import { CreateDoctorRequest, UpdateDoctorRequest } from '../../domain/repositories/doctor.repository';

@Injectable({ providedIn: 'root' })
export class DoctorApiService {
  private readonly api = inject(ApiClientService);

  getAll(filter: DoctorFilter): Observable<PaginatedResult<DoctorModel>> {
    const { page, pageSize, search, status, departmentId, specialization, availableDay, sort } = filter;
    return this.api.getList<DoctorModel>(API_ENDPOINTS.DOCTORS.BASE, {
      page, pageSize, search, status, departmentId, specialization, availableDay,
      sortBy: sort?.sortBy, sortDir: sort?.sortDirection,
    });
  }

  getById(id: string): Observable<DoctorModel> {
    return this.api.get<DoctorModel>(API_ENDPOINTS.DOCTORS.BY_ID(id));
  }

  create(request: CreateDoctorRequest): Observable<DoctorModel> {
    return this.api.post<DoctorModel>(API_ENDPOINTS.DOCTORS.BASE, request);
  }

  update(id: string, request: UpdateDoctorRequest): Observable<DoctorModel> {
    return this.api.put<DoctorModel>(API_ENDPOINTS.DOCTORS.BY_ID(id), request);
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(API_ENDPOINTS.DOCTORS.BY_ID(id));
  }

  getSchedule(id: string, date: string): Observable<DoctorSchedule> {
    return this.api.get<DoctorSchedule>(API_ENDPOINTS.DOCTORS.SCHEDULE(id), { date });
  }

  getAvailableDoctors(date: string, specialization?: string): Observable<DoctorModel[]> {
    return this.api.get<DoctorModel[]>(API_ENDPOINTS.DOCTORS.BASE, {
      date, specialization, status: 'active', available: true,
    });
  }
}