export type TriageLevel = 1 | 2 | 3 | 4 | 5;
export type EmergencyStatus = 'waiting' | 'in-treatment' | 'stable' | 'critical' | 'discharged' | 'transferred' | 'deceased';

export interface EmergencyCaseModel {
  id: string;
  caseNumber: string;
  patientId?: string;
  patientName: string;
  patientAge?: number;
  patientGender?: 'male' | 'female';
  patientPhone?: string;
  nationalId?: string;
  triageLevel: TriageLevel;
  status: EmergencyStatus;
  chiefComplaint: string;
  symptoms: string[];
  vitalSigns: VitalSigns;
  assignedDoctorId?: string;
  assignedDoctorName?: string;
  assignedBed?: string;
  arrivedAt: string;
  triageAt?: string;
  treatmentStartAt?: string;
  dischargedAt?: string;
  notes?: string;
  diagnosis?: string;
  hospitalId: string;
}

export interface VitalSigns {
  temperature?: number;
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  heartRate?: number;
  respiratoryRate?: number;
  oxygenSaturation?: number;
  glucoseLevel?: number;
}

// Partial<Record<...>> rather than Record<...>: TriageLevel/EmergencyStatus
// are closed unions today, so TS treats indexed access as always defined
// and flags the `?.` / `??` fallbacks in templates as redundant (NG8107 /
// NG8102). In practice the backend is the source of truth for these
// strings, and a value the frontend hasn't mapped yet (new status added
// server-side before the client is updated) is a realistic failure mode —
// so we keep the defensive fallback and widen the type to make it valid.
export const TRIAGE_CONFIG: Partial<Record<TriageLevel, { label: string; color: string; bgClass: string; textClass: string; waitTime: string }>> = {
  1: { label: 'إعادة إنعاش',  color: '#dc3545', bgClass: 'bg-danger',    textClass: 'text-white', waitTime: 'فوري' },
  2: { label: 'طارئ',         color: '#fd7e14', bgClass: 'bg-warning',   textClass: 'text-dark',  waitTime: '15 دقيقة' },
  3: { label: 'عاجل',         color: '#ffc107', bgClass: 'bg-info',      textClass: 'text-white', waitTime: '30 دقيقة' },
  4: { label: 'أقل إلحاحاً',  color: '#198754', bgClass: 'bg-success',   textClass: 'text-white', waitTime: '60 دقيقة' },
  5: { label: 'غير طارئ',     color: '#6c757d', bgClass: 'bg-secondary', textClass: 'text-white', waitTime: '120 دقيقة' },
};

export const EMERGENCY_STATUS_CONFIG: Partial<Record<EmergencyStatus, { label: string; class: string }>> = {
  waiting:        { label: 'في الانتظار', class: 'bg-warning-subtle text-warning' },
  'in-treatment': { label: 'تحت العلاج',  class: 'bg-primary-subtle text-primary' },
  stable:         { label: 'مستقر',       class: 'bg-info-subtle text-info' },
  critical:       { label: 'حرج',         class: 'bg-danger text-white' },
  discharged:     { label: 'خرج',         class: 'bg-success-subtle text-success' },
  transferred:    { label: 'محوَّل',      class: 'bg-secondary-subtle text-secondary' },
  deceased:       { label: 'متوفى',       class: 'bg-dark-subtle text-dark' },
};