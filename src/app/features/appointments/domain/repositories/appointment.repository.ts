import { Observable } from 'rxjs';
import { AppointmentModel } from '../models/appointment.model';
import { AppointmentFilter } from '../models/appointment-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';

export interface CreateAppointmentRequest {
  patientId: string;
  doctorId: string;
  departmentId: string;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  reason: string;
  notes?: string;
  fee: number;
}

export interface UpdateAppointmentRequest extends Partial<CreateAppointmentRequest> {
  status?: string;
}

export abstract class AppointmentRepository {
  abstract getAll(filter: AppointmentFilter): Observable<PaginatedResult<AppointmentModel>>;
  abstract getById(id: string): Observable<AppointmentModel>;
  abstract create(request: CreateAppointmentRequest): Observable<AppointmentModel>;
  abstract update(id: string, request: UpdateAppointmentRequest): Observable<AppointmentModel>;
  abstract cancel(id: string, reason: string): Observable<AppointmentModel>;
  abstract confirm(id: string): Observable<AppointmentModel>;
  abstract complete(id: string): Observable<AppointmentModel>;
  abstract delete(id: string): Observable<void>;
}