import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientRepository, CreatePatientRequest, UpdatePatientRequest } from '../../domain/repositories/patient.repository';
import { PatientApiService } from '../api/patient-api.service';
import { PatientModel } from '../../domain/models/patient.model';
import { PatientFilter } from '../../domain/models/patient-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';

@Injectable({ providedIn: 'root' })
export class PatientApiRepository extends PatientRepository {
  private readonly api = inject(PatientApiService);

  getAll(filter: PatientFilter): Observable<PaginatedResult<PatientModel>> {
    return this.api.getAll(filter);
  }

  getById(id: string): Observable<PatientModel> {
    return this.api.getById(id);
  }

  create(request: CreatePatientRequest): Observable<PatientModel> {
    return this.api.create(request);
  }

  update(id: string, request: UpdatePatientRequest): Observable<PatientModel> {
    return this.api.update(id, request);
  }

  delete(id: string): Observable<void> {
    return this.api.delete(id);
  }

  search(query: string): Observable<PatientModel[]> {
    return this.api.search(query);
  }
}