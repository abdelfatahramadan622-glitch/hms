import { Observable } from 'rxjs';
import { DoctorModel } from '../models/doctor.model';
import { DoctorFilter, DoctorSchedule } from '../models/doctor-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';

export interface CreateDoctorRequest extends Omit<DoctorModel, 'id' | 'employeeNumber' | 'fullName' | 'hospitalId' | 'joinedAt'> {}
export interface UpdateDoctorRequest extends Partial<CreateDoctorRequest> {}

export abstract class DoctorRepository {
  abstract getAll(filter: DoctorFilter): Observable<PaginatedResult<DoctorModel>>;
  abstract getById(id: string): Observable<DoctorModel>;
  abstract create(request: CreateDoctorRequest): Observable<DoctorModel>;
  abstract update(id: string, request: UpdateDoctorRequest): Observable<DoctorModel>;
  abstract delete(id: string): Observable<void>;
  abstract getSchedule(id: string, date: string): Observable<DoctorSchedule>;
  abstract getAvailableDoctors(date: string, specialization?: string): Observable<DoctorModel[]>;
}