import { FilterParams, createDefaultFilter } from '../../../../core/domain/models/filtering.model';
import { DoctorStatus, DayOfWeek } from './doctor.model';

export interface DoctorFilter extends FilterParams {
  status?: DoctorStatus;
  departmentId?: string;
  specialization?: string;
  availableDay?: DayOfWeek;
  minExperience?: number;
}

export function createDefaultDoctorFilter(): DoctorFilter {
  return { ...createDefaultFilter({ pageSize: 12 }) };
}

export interface DoctorSchedule {
  doctorId: string;
  date: string;
  slots: ScheduleSlot[];
}

export interface ScheduleSlot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  patientId?: string;
  patientName?: string;
  appointmentId?: string;
}