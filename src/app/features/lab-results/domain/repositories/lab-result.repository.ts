import { Observable } from 'rxjs';
import { LabResultModel } from '../models/lab-result.model';
import { LabResultFilter } from '../models/lab-result-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';

export interface CreateLabResultRequest {
  patientId: string;
  doctorId: string;
  tests: Array<{ name: string; category: string; notes?: string }>;
  notes?: string;
}

export interface UpdateLabResultRequest {
  tests?: Array<{ id: string; value: string; unit?: string; isAbnormal: boolean; isCritical: boolean; notes?: string }>;
  notes?: string;
  status?: string;
}

export abstract class LabResultRepository {
  abstract getAll(filter: LabResultFilter): Observable<PaginatedResult<LabResultModel>>;
  abstract getById(id: string): Observable<LabResultModel>;
  abstract create(request: CreateLabResultRequest): Observable<LabResultModel>;
  abstract update(id: string, request: UpdateLabResultRequest): Observable<LabResultModel>;
  abstract approve(id: string): Observable<LabResultModel>;
  abstract reject(id: string, reason: string): Observable<LabResultModel>;
  abstract upload(id: string, file: File): Observable<LabResultModel>;
  abstract delete(id: string): Observable<void>;
}