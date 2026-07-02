import { Injectable, inject } from '@angular/core';
import { forkJoin, tap } from 'rxjs';
import { DashboardRepository } from '../../domain/repositories/dashboard.repository';
import { DashboardStore } from '../state/dashboard.store';
import { DashboardFilter } from '../../domain/models/dashboard-filter.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly repo = inject(DashboardRepository);
  private readonly store = inject(DashboardStore);

  loadDashboard(filter?: DashboardFilter): void {
    const activeFilter = filter ?? this.store.filter();
    this.store.setLoading(true);
    this.store.setSummaryLoading(true);

    forkJoin({
      summary: this.repo.getSummary(activeFilter),
      appointments: this.repo.getTodayAppointments(5),
      emergencies: this.repo.getActiveEmergencies(5),
    }).subscribe({
      next: ({ summary, appointments, emergencies }) => {
        this.store.setSummary(summary);
        this.store.setAppointments(appointments);
        this.store.setEmergencies(emergencies);
        this.store.setLoading(false);
      },
      error: (err) => this.store.setError(err?.message ?? 'فشل تحميل البيانات'),
    });
  }

  changePeriod(filter: DashboardFilter): void {
    this.store.setFilter(filter);
    this.loadDashboard(filter);
  }

  refresh(): void {
    this.loadDashboard();
  }
}