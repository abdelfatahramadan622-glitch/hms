import { Observable } from 'rxjs';
import { PatientModel } from '../models/patient.model';
import { PatientFilter } from '../models/patient-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';

export interface CreatePatientRequest extends Omit<PatientModel, 'id' | 'patientNumber' | 'fullName' | 'age' | 'registeredAt' | 'lastVisitAt' | 'hospitalId'> {}
export interface UpdatePatientRequest extends Partial<CreatePatientRequest> {}

export abstract class PatientRepository {
  abstract getAll(filter: PatientFilter): Observable<PaginatedResult<PatientModel>>;
  abstract getById(id: string): Observable<PatientModel>;
  abstract create(request: CreatePatientRequest): Observable<PatientModel>;
  abstract update(id: string, request: UpdatePatientRequest): Observable<PatientModel>;
  abstract delete(id: string): Observable<void>;
  abstract search(query: string): Observable<PatientModel[]>;
}