export type AppointmentStatus =
  | 'scheduled'
  | 'confirmed'
  | 'in-progress'
  | 'completed'
  | 'cancelled'
  | 'no-show';

export type AppointmentType =
  | 'consultation'
  | 'follow-up'
  | 'emergency'
  | 'procedure'
  | 'lab'
  | 'radiology';

export interface AppointmentModel {
  id: string;
  appointmentNumber: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  departmentId: string;
  departmentName: string;
  date: string;
  startTime: string;
  endTime: string;
  type: AppointmentType;
  status: AppointmentStatus;
  reason: string;
  notes?: string;
  fee: number;
  isPaid: boolean;
  cancelReason?: string;
  createdAt: string;
  updatedAt: string;
}

export const APPOINTMENT_STATUS_CONFIG: Record<AppointmentStatus, { label: string; class: string; icon: string }> = {
  scheduled:    { label: 'مجدول',    class: 'bg-info-subtle text-info',           icon: 'bi-calendar-check' },
  confirmed:    { label: 'مؤكد',     class: 'bg-primary-subtle text-primary',     icon: 'bi-check-circle' },
  'in-progress':{ label: 'جارٍ',     class: 'bg-warning-subtle text-warning',     icon: 'bi-arrow-right-circle' },
  completed:    { label: 'مكتمل',    class: 'bg-success-subtle text-success',     icon: 'bi-check2-circle' },
  cancelled:    { label: 'ملغى',     class: 'bg-danger-subtle text-danger',       icon: 'bi-x-circle' },
  'no-show':    { label: 'لم يحضر',  class: 'bg-secondary-subtle text-secondary', icon: 'bi-dash-circle' },
};

export const APPOINTMENT_TYPE_LABELS: Record<AppointmentType, string> = {
  consultation: 'كشف',
  'follow-up':  'متابعة',
  emergency:    'طوارئ',
  procedure:    'إجراء',
  lab:          'مختبر',
  radiology:    'أشعة',
};