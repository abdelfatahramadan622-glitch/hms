import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorRepository, CreateDoctorRequest, UpdateDoctorRequest } from '../../domain/repositories/doctor.repository';
import { DoctorApiService } from '../api/doctor-api.service';
import { DoctorModel } from '../../domain/models/doctor.model';
import { DoctorFilter, DoctorSchedule } from '../../domain/models/doctor-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';

@Injectable({ providedIn: 'root' })
export class DoctorApiRepository extends DoctorRepository {
  private readonly api = inject(DoctorApiService);

  getAll(filter: DoctorFilter): Observable<PaginatedResult<DoctorModel>> { return this.api.getAll(filter); }
  getById(id: string): Observable<DoctorModel> { return this.api.getById(id); }
  create(request: CreateDoctorRequest): Observable<DoctorModel> { return this.api.create(request); }
  update(id: string, request: UpdateDoctorRequest): Observable<DoctorModel> { return this.api.update(id, request); }
  delete(id: string): Observable<void> { return this.api.delete(id); }
  getSchedule(id: string, date: string): Observable<DoctorSchedule> { return this.api.getSchedule(id, date); }
  getAvailableDoctors(date: string, specialization?: string): Observable<DoctorModel[]> {
    return this.api.getAvailableDoctors(date, specialization);
  }
}