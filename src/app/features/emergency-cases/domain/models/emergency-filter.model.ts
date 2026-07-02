import { FilterParams, createDefaultFilter } from '../../../../core/domain/models/filtering.model';
import { TriageLevel, EmergencyStatus } from './emergency-case.model';

export interface EmergencyFilter extends FilterParams {
  status?: EmergencyStatus;
  triageLevel?: TriageLevel;
  assignedDoctorId?: string;
  dateFrom?: string;
  dateTo?: string;
}

export function createDefaultEmergencyFilter(): EmergencyFilter {
  return { ...createDefaultFilter({ pageSize: 20 }) };
}

export interface TriageModel {
  level: TriageLevel;
  assessedAt: string;
  assessedBy: string;
  chiefComplaint: string;
  notes?: string;
}