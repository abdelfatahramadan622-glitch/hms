import { Injectable, inject } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { DashboardStore } from '../state/dashboard.store';
import { DashboardFilter } from '../../domain/models/dashboard-filter.model';

@Injectable({ providedIn: 'root' })
export class DashboardFacade {
  private readonly service = inject(DashboardService);
  private readonly store = inject(DashboardStore);

  // ── State ────────────────────────────────────────
  readonly summary = this.store.summary;
  readonly appointments = this.store.appointments;
  readonly emergencies = this.store.emergencies;
  readonly filter = this.store.filter;
  readonly isLoading = this.store.isLoading;
  readonly isSummaryLoading = this.store.isSummaryLoading;
  readonly hasData = this.store.hasData;
  readonly hasError = this.store.hasError;
  readonly error = this.store.error;
  readonly lastUpdated = this.store.lastUpdated;
  readonly activeEmergencyCount = this.store.activeEmergencyCount;
  readonly todayAppointmentCount = this.store.todayAppointmentCount;

  // ── Actions ──────────────────────────────────────
  load(filter?: DashboardFilter): void {
    this.service.loadDashboard(filter);
  }

  changePeriod(filter: DashboardFilter): void {
    this.service.changePeriod(filter);
  }

  refresh(): void {
    this.service.refresh();
  }
}