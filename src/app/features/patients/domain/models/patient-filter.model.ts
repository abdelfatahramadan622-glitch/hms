import { FilterParams, createDefaultFilter } from '../../../../core/domain/models/filtering.model';
import { Gender, BloodType, PatientStatus } from './patient.model';

export interface PatientFilter extends FilterParams {
  gender?: Gender;
  bloodType?: BloodType;
  status?: PatientStatus;
  ageFrom?: number;
  ageTo?: number;
  governorate?: string;
  hasInsurance?: boolean;
  registeredFrom?: string;
  registeredTo?: string;
}

export function createDefaultPatientFilter(): PatientFilter {
  return { ...createDefaultFilter({ pageSize: 10 }) };
}