import { Observable } from 'rxjs';
import { DashboardSummary } from '../entities/dashboard-metric.entity';
import { DashboardFilter } from '../models/dashboard-filter.model';

export interface AppointmentWidgetItem {
  id: string;
  patientName: string;
  doctorName: string;
  time: string;
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  type: string;
}

export interface EmergencyWidgetItem {
  id: string;
  patientName: string;
  triageLevel: 1 | 2 | 3 | 4 | 5;
  complaint: string;
  arrivedAt: string;
  assignedDoctor?: string;
}

export abstract class DashboardRepository {
  abstract getSummary(filter: DashboardFilter): Observable<DashboardSummary>;
  abstract getTodayAppointments(limit?: number): Observable<AppointmentWidgetItem[]>;
  abstract getActiveEmergencies(limit?: number): Observable<EmergencyWidgetItem[]>;
}