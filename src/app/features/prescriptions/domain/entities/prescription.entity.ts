import { PrescriptionModel, MedicationModel } from '../models/prescription.model';

export interface PrescriptionEntity extends PrescriptionModel {
  readonly isExpired: boolean;
  readonly isActive: boolean;
  readonly canDispense: boolean;
  readonly medicationCount: number;
  readonly daysRemaining: number;
}

export function toPrescriptionEntity(model: PrescriptionModel): PrescriptionEntity {
  const now = new Date();
  const expires = new Date(model.expiresAt);
  const diffMs = expires.getTime() - now.getTime();
  const daysRemaining = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  return {
    ...model,
    get isExpired() { return expires < now; },
    get isActive() { return model.status === 'active' && expires >= now; },
    get canDispense() { return model.status === 'active' && expires >= now; },
    get medicationCount() { return model.medications.length; },
    get daysRemaining() { return daysRemaining; },
  };
}

export interface MedicationEntity extends MedicationModel {
  readonly displayDosage: string;
  readonly displayDuration: string;
}

export function toMedicationEntity(model: MedicationModel): MedicationEntity {
  const durationLabels = { days: 'يوم', weeks: 'أسبوع', months: 'شهر' };
  return {
    ...model,
    get displayDosage() {
      return `${model.dosage.frequency} مرة/يوم — ${model.dosage.route}`;
    },
    get displayDuration() {
      return `${model.duration} ${durationLabels[model.durationUnit]}`;
    },
  };
}