import { FilterParams, createDefaultFilter } from '../../../../core/domain/models/filtering.model';
import { PrescriptionStatus } from './prescription.model';

export interface PrescriptionFilter extends FilterParams {
  patientId?: string;
  doctorId?: string;
  status?: PrescriptionStatus;
  dateFrom?: string;
  dateTo?: string;
  isExpired?: boolean;
}

export function createDefaultPrescriptionFilter(): PrescriptionFilter {
  return { ...createDefaultFilter({ pageSize: 15 }) };
}

export interface DosageFormModel {
  medicationId?: string;
  name: string;
  genericName?: string;
  form: string;
  strength: string;
  quantity: number;
  unit: string;
  frequency: number;
  times: string;
  route: string;
  withFood: boolean;
  duration: number;
  durationUnit: 'days' | 'weeks' | 'months';
  instructions?: string;
  isSubstitutionAllowed: boolean;
}

export const MEDICATION_FORMS = ['أقراص', 'كبسولات', 'شراب', 'حقن', 'مرهم', 'قطرة', 'بخاخ', 'تحاميل'];
export const MEDICATION_ROUTES = ['فموي', 'وريدي', 'عضلي', 'تحت الجلد', 'موضعي', 'استنشاق', 'تحاميل'];
export const DURATION_UNITS: Array<{ value: 'days' | 'weeks' | 'months'; label: string }> = [
  { value: 'days', label: 'أيام' },
  { value: 'weeks', label: 'أسابيع' },
  { value: 'months', label: 'أشهر' },
];