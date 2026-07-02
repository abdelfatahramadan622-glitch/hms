import { Observable } from 'rxjs';
import { PrescriptionModel } from '../models/prescription.model';
import { PrescriptionFilter } from '../models/prescription-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';

export interface CreatePrescriptionRequest {
  patientId: string;
  doctorId: string;
  expiresAt: string;
  diagnosis?: string;
  notes?: string;
  medications: Array<{
    name: string;
    genericName?: string;
    form: string;
    strength: string;
    quantity: number;
    unit: string;
    frequency: number;
    times: string[];
    route: string;
    withFood: boolean;
    duration: number;
    durationUnit: string;
    instructions?: string;
    isSubstitutionAllowed: boolean;
  }>;
}

export interface UpdatePrescriptionRequest extends Partial<CreatePrescriptionRequest> {
  status?: string;
}

export abstract class PrescriptionRepository {
  abstract getAll(filter: PrescriptionFilter): Observable<PaginatedResult<PrescriptionModel>>;
  abstract getById(id: string): Observable<PrescriptionModel>;
  abstract create(request: CreatePrescriptionRequest): Observable<PrescriptionModel>;
  abstract update(id: string, request: UpdatePrescriptionRequest): Observable<PrescriptionModel>;
  abstract dispense(id: string): Observable<PrescriptionModel>;
  abstract cancel(id: string, reason: string): Observable<PrescriptionModel>;
  abstract delete(id: string): Observable<void>;
}