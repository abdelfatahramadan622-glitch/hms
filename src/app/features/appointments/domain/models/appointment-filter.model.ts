import { FilterParams, createDefaultFilter } from '../../../../core/domain/models/filtering.model';
import { AppointmentStatus, AppointmentType } from './appointment.model';

export interface AppointmentFilter extends FilterParams {
  patientId?: string;
  doctorId?: string;
  departmentId?: string;
  status?: AppointmentStatus;
  type?: AppointmentType;
  dateFrom?: string;
  dateTo?: string;
  date?: string;
  isPaid?: boolean;
}

export function createDefaultAppointmentFilter(): AppointmentFilter {
  return { ...createDefaultFilter({ pageSize: 15 }) };
}