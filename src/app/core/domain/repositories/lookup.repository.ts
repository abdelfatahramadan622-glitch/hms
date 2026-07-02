import { Observable } from 'rxjs';

export interface LookupItem {
  id: string | number;
  label: string;
  labelAr: string;
  value: string | number;
  code?: string;
  isActive: boolean;
  metadata?: Record<string, unknown>;
}

export type LookupType =
  | 'departments'
  | 'specializations'
  | 'bloodTypes'
  | 'insuranceProviders'
  | 'appointmentTypes'
  | 'appointmentStatuses'
  | 'emergencyTypes'
  | 'triageLevels'
  | 'labTestTypes'
  | 'medicationCategories'
  | 'paymentMethods'
  | 'genders'
  | 'nationalities'
  | 'countries';

export abstract class LookupRepository {
  abstract getLookup(type: LookupType): Observable<LookupItem[]>;
  abstract getLookups(types: LookupType[]): Observable<Record<LookupType, LookupItem[]>>;
}