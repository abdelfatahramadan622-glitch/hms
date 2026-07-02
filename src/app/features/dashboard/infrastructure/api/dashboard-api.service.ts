import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../../../core/infrastructure/api/api-client.service';
import { API_ENDPOINTS } from '../../../../core/infrastructure/api/api-endpoints';
import { DashboardSummary } from '../../domain/entities/dashboard-metric.entity';
import { DashboardFilter } from '../../domain/models/dashboard-filter.model';
import {
  AppointmentWidgetItem,
  EmergencyWidgetItem,
} from '../../domain/repositories/dashboard.repository';

@Injectable({ providedIn: 'root' })
export class DashboardApiService {
  private readonly api = inject(ApiClientService);

  getSummary(filter: DashboardFilter): Observable<DashboardSummary> {
    return this.api.get<DashboardSummary>(API_ENDPOINTS.DASHBOARD.METRICS, {
      period: filter.period,
      departmentId: filter.departmentId,
    });
  }

  getTodayAppointments(limit = 5): Observable<AppointmentWidgetItem[]> {
    return this.api.get<AppointmentWidgetItem[]>(API_ENDPOINTS.APPOINTMENTS.BASE, {
      date: new Date().toISOString().split('T')[0],
      limit,
    });
  }

  getActiveEmergencies(limit = 5): Observable<EmergencyWidgetItem[]> {
    return this.api.get<EmergencyWidgetItem[]>(API_ENDPOINTS.EMERGENCY.BASE, {
      status: 'active',
      limit,
    });
  }
}