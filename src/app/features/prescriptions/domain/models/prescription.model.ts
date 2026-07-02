export type PrescriptionStatus = 'active' | 'dispensed' | 'expired' | 'cancelled';

export interface PrescriptionModel {
  id: string;
  prescriptionNumber: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  issuedAt: string;
  expiresAt: string;
  status: PrescriptionStatus;
  medications: MedicationModel[];
  diagnosis?: string;
  notes?: string;
  dispensedAt?: string;
  dispensedBy?: string;
}

export interface MedicationModel {
  id: string;
  name: string;
  genericName?: string;
  form: string;
  strength: string;
  quantity: number;
  unit: string;
  dosage: DosageModel;
  duration: number;
  durationUnit: 'days' | 'weeks' | 'months';
  instructions?: string;
  isSubstitutionAllowed: boolean;
}

export interface DosageModel {
  frequency: number;
  times: string[];
  route: string;
  withFood: boolean;
  notes?: string;
}

// Partial<Record<...>>: see doctor.model.ts for the rationale — keeps the
// `?.` / `??` fallbacks in prescription-detail-page / prescription-list-page
// meaningful.
export const PRESCRIPTION_STATUS_CONFIG: Partial<Record<PrescriptionStatus, { label: string; class: string; icon: string }>> = {
  active:    { label: 'نشطة',    class: 'bg-success-subtle text-success',     icon: 'bi-check-circle' },
  dispensed: { label: 'صُرِّفت', class: 'bg-primary-subtle text-primary',     icon: 'bi-bag-check' },
  expired:   { label: 'منتهية',  class: 'bg-secondary-subtle text-secondary', icon: 'bi-clock-history' },
  cancelled: { label: 'ملغاة',   class: 'bg-danger-subtle text-danger',       icon: 'bi-x-circle' },
};