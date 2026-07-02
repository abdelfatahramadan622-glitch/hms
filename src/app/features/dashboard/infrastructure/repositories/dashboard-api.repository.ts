import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardRepository, AppointmentWidgetItem, EmergencyWidgetItem } from '../../domain/repositories/dashboard.repository';
import { DashboardApiService } from '../api/dashboard-api.service';
import { DashboardSummary } from '../../domain/entities/dashboard-metric.entity';
import { DashboardFilter } from '../../domain/models/dashboard-filter.model';

@Injectable({ providedIn: 'root' })
export class DashboardApiRepository extends DashboardRepository {
  private readonly api = inject(DashboardApiService);

  getSummary(filter: DashboardFilter): Observable<DashboardSummary> {
    return this.api.getSummary(filter);
  }

  getTodayAppointments(limit = 5): Observable<AppointmentWidgetItem[]> {
    return this.api.getTodayAppointments(limit);
  }

  getActiveEmergencies(limit = 5): Observable<EmergencyWidgetItem[]> {
    return this.api.getActiveEmergencies(limit);
  }
}