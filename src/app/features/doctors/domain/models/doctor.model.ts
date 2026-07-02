export type DoctorStatus = 'active' | 'inactive' | 'on-leave';

export interface DoctorModel {
  id: string;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  fullName: string;
  specialization: string;
  subSpecialization?: string;
  licenseNumber: string;
  licenseExpiryDate: string;
  phone: string;
  email: string;
  avatar?: string;
  departmentId: string;
  departmentName: string;
  status: DoctorStatus;
  yearsOfExperience: number;
  consultationFee: number;
  bio?: string;
  languages: string[];
  availableDays: DayOfWeek[];
  shiftStart: string;
  shiftEnd: string;
  hospitalId: string;
  joinedAt: string;
}

export type DayOfWeek = 'saturday' | 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

export const DAY_LABELS: Record<DayOfWeek, string> = {
  saturday:  'السبت',
  sunday:    'الأحد',
  monday:    'الاثنين',
  tuesday:   'الثلاثاء',
  wednesday: 'الأربعاء',
  thursday:  'الخميس',
  friday:    'الجمعة',
};

// Partial<Record<...>>: keeps the `?.` / `??` fallback used in doctor-card
// and doctor-detail-page meaningful instead of TypeScript flagging it as
// redundant, so an unmapped status coming from the API degrades gracefully
// instead of crashing the template.
export const DOCTOR_STATUS_CONFIG: Partial<Record<DoctorStatus, { label: string; class: string }>> = {
  active:     { label: 'نشط',      class: 'bg-success-subtle text-success' },
  inactive:   { label: 'غير نشط', class: 'bg-secondary-subtle text-secondary' },
  'on-leave': { label: 'إجازة',    class: 'bg-warning-subtle text-warning' },
};