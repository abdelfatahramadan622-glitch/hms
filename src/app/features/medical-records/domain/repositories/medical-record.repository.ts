import { Observable } from 'rxjs';
import { MedicalRecordModel } from '../models/medical-record.model';
import { MedicalRecordFilter } from '../models/medical-record-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';

export interface CreateMedicalRecordRequest {
  patientId: string;
  doctorId: string;
  departmentId: string;
  type: string;
  visitDate: string;
  chiefComplaint: string;
  presentIllness: string;
  physicalExamination?: string;
  treatmentPlan?: string;
  followUpDate?: string;
  followUpNotes?: string;
  notes?: string;
}

export interface UpdateMedicalRecordRequest extends Partial<CreateMedicalRecordRequest> {
  isClosed?: boolean;
}

export abstract class MedicalRecordRepository {
  abstract getAll(filter: MedicalRecordFilter): Observable<PaginatedResult<MedicalRecordModel>>;
  abstract getById(id: string): Observable<MedicalRecordModel>;
  abstract create(request: CreateMedicalRecordRequest): Observable<MedicalRecordModel>;
  abstract update(id: string, request: UpdateMedicalRecordRequest): Observable<MedicalRecordModel>;
  abstract delete(id: string): Observable<void>;
  abstract addAttachment(id: string, file: File): Observable<MedicalRecordModel>;
  abstract removeAttachment(id: string, attachmentId: string): Observable<void>;
}