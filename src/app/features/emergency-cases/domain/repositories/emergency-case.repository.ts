import { Observable } from 'rxjs';
import { EmergencyCaseModel, TriageLevel } from '../models/emergency-case.model';
import { EmergencyFilter } from '../models/emergency-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';

export interface CreateEmergencyCaseRequest {
  patientName: string;
  patientAge?: number;
  patientGender?: string;
  patientPhone?: string;
  nationalId?: string;
  triageLevel: TriageLevel;
  chiefComplaint: string;
  symptoms?: string[];
  vitalSigns?: Record<string, number | undefined>;
  notes?: string;
}

export interface UpdateEmergencyCaseRequest extends Partial<CreateEmergencyCaseRequest> {
  status?: string;
  assignedDoctorId?: string;
  assignedBed?: string;
  diagnosis?: string;
}

export abstract class EmergencyCaseRepository {
  abstract getAll(filter: EmergencyFilter): Observable<PaginatedResult<EmergencyCaseModel>>;
  abstract getById(id: string): Observable<EmergencyCaseModel>;
  abstract create(request: CreateEmergencyCaseRequest): Observable<EmergencyCaseModel>;
  abstract update(id: string, request: UpdateEmergencyCaseRequest): Observable<EmergencyCaseModel>;
  abstract triage(id: string, level: TriageLevel, notes?: string): Observable<EmergencyCaseModel>;
  abstract assignDoctor(id: string, doctorId: string): Observable<EmergencyCaseModel>;
  abstract close(id: string, outcome: string): Observable<EmergencyCaseModel>;
  abstract delete(id: string): Observable<void>;
}