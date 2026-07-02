import { FilterParams, createDefaultFilter } from '../../../../core/domain/models/filtering.model';
import { LabResultStatus, LabTestCategory } from './lab-result.model';

export interface LabResultFilter extends FilterParams {
  patientId?: string;
  doctorId?: string;
  status?: LabResultStatus;
  category?: LabTestCategory;
  dateFrom?: string;
  dateTo?: string;
  isAbnormal?: boolean;
}

export function createDefaultLabResultFilter(): LabResultFilter {
  return { ...createDefaultFilter({ pageSize: 15 }) };
}

export interface LabTestFilter extends FilterParams {
  category?: LabTestCategory;
  isAbnormal?: boolean;
}