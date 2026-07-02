import { AppointmentModel, AppointmentStatus } from '../models/appointment.model';

export interface AppointmentEntity extends AppointmentModel {
  readonly isUpcoming: boolean;
  readonly isPast: boolean;
  readonly canCancel: boolean;
  readonly canConfirm: boolean;
  readonly displayDate: string;
}

export function toAppointmentEntity(model: AppointmentModel): AppointmentEntity {
  const appointmentDateTime = new Date(`${model.date}T${model.startTime}`);
  const now = new Date();
  const cancellableStatuses: AppointmentStatus[] = ['scheduled', 'confirmed'];
  const confirmableStatuses: AppointmentStatus[] = ['scheduled'];

  return {
    ...model,
    get isUpcoming() { return appointmentDateTime > now; },
    get isPast() { return appointmentDateTime < now; },
    get canCancel() { return cancellableStatuses.includes(model.status) && appointmentDateTime > now; },
    get canConfirm() { return confirmableStatuses.includes(model.status); },
    get displayDate() {
      return appointmentDateTime.toLocaleDateString('ar-EG', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      });
    },
  };
}

// Appointment Slot Value Object
export interface AppointmentSlot {
  date: string;
  startTime: string;
  endTime: string;
  doctorId: string;
  isAvailable: boolean;
}

export function createAppointmentSlot(
  date: string, startTime: string, endTime: string, doctorId: string
): AppointmentSlot {
  return { date, startTime, endTime, doctorId, isAvailable: true };
}