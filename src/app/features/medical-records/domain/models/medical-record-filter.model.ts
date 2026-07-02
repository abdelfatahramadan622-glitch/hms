import { FilterParams, createDefaultFilter } from '../../../../core/domain/models/filtering.model';
import { RecordType } from './medical-record.model';

export interface MedicalRecordFilter extends FilterParams {
  patientId?: string;
  doctorId?: string;
  type?: RecordType;
  dateFrom?: string;
  dateTo?: string;
  isClosed?: boolean;
}

export function createDefaultMedicalRecordFilter(): MedicalRecordFilter {
  return { ...createDefaultFilter({ pageSize: 15 }) };
}

export interface TreatmentHistoryModel {
  recordId: string;
  visitDate: string;
  doctorName: string;
  diagnosis: string;
  treatment: string;
  outcome?: string;
}