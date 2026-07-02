import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentRepository, CreateAppointmentRequest, UpdateAppointmentRequest } from '../../domain/repositories/appointment.repository';
import { AppointmentApiService } from '../api/appointment-api.service';
import { AppointmentModel } from '../../domain/models/appointment.model';
import { AppointmentFilter } from '../../domain/models/appointment-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';

@Injectable({ providedIn: 'root' })
export class AppointmentApiRepository extends AppointmentRepository {
  private readonly api = inject(AppointmentApiService);

  getAll(filter: AppointmentFilter): Observable<PaginatedResult<AppointmentModel>> { return this.api.getAll(filter); }
  getById(id: string): Observable<AppointmentModel> { return this.api.getById(id); }
  create(req: CreateAppointmentRequest): Observable<AppointmentModel> { return this.api.create(req); }
  update(id: string, req: UpdateAppointmentRequest): Observable<AppointmentModel> { return this.api.update(id, req); }
  cancel(id: string, reason: string): Observable<AppointmentModel> { return this.api.cancel(id, reason); }
  confirm(id: string): Observable<AppointmentModel> { return this.api.confirm(id); }
  complete(id: string): Observable<AppointmentModel> { return this.api.complete(id); }
  delete(id: string): Observable<void> { return this.api.delete(id); }
}