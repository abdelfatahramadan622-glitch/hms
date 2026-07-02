import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../../../core/infrastructure/api/api-client.service';
import { API_ENDPOINTS } from '../../../../core/infrastructure/api/api-endpoints';
import { AppointmentModel } from '../../domain/models/appointment.model';
import { AppointmentFilter } from '../../domain/models/appointment-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';
import { CreateAppointmentRequest, UpdateAppointmentRequest } from '../../domain/repositories/appointment.repository';

@Injectable({ providedIn: 'root' })
export class AppointmentApiService {
  private readonly api = inject(ApiClientService);

  getAll(filter: AppointmentFilter): Observable<PaginatedResult<AppointmentModel>> {
    const { page, pageSize, search, patientId, doctorId, status, type, date, dateFrom, dateTo, sort } = filter;
    return this.api.getList<AppointmentModel>(API_ENDPOINTS.APPOINTMENTS.BASE, {
      page, pageSize, search, patientId, doctorId, status, type, date, dateFrom, dateTo,
      sortBy: sort?.sortBy, sortDir: sort?.sortDirection,
    });
  }

  getById(id: string): Observable<AppointmentModel> {
    return this.api.get<AppointmentModel>(API_ENDPOINTS.APPOINTMENTS.BY_ID(id));
  }

  create(request: CreateAppointmentRequest): Observable<AppointmentModel> {
    return this.api.post<AppointmentModel>(API_ENDPOINTS.APPOINTMENTS.BASE, request);
  }

  update(id: string, request: UpdateAppointmentRequest): Observable<AppointmentModel> {
    return this.api.put<AppointmentModel>(API_ENDPOINTS.APPOINTMENTS.BY_ID(id), request);
  }

  cancel(id: string, reason: string): Observable<AppointmentModel> {
    return this.api.post<AppointmentModel>(API_ENDPOINTS.APPOINTMENTS.CANCEL(id), { reason });
  }

  confirm(id: string): Observable<AppointmentModel> {
    return this.api.post<AppointmentModel>(API_ENDPOINTS.APPOINTMENTS.CONFIRM(id), {});
  }

  complete(id: string): Observable<AppointmentModel> {
    return this.api.post<AppointmentModel>(`${API_ENDPOINTS.APPOINTMENTS.BASE}/${id}/complete`, {});
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(API_ENDPOINTS.APPOINTMENTS.BY_ID(id));
  }
}