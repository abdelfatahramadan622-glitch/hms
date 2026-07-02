import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardFacade } from '../../../application/facades/dashboard.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { AppointmentsWidgetComponent } from '../../components/appointments-widget/appointments-widget.component';
import { EmergencyWidgetComponent } from '../../components/emergency-widget/emergency-widget.component';
import { OccupancyWidgetComponent } from '../../components/occupancy-widget/occupancy-widget.component';
import { RevenueWidgetComponent } from '../../components/revenue-widget/revenue-widget.component';
import {
  DashboardPeriod,
  PERIOD_LABELS,
} from '../../../domain/models/dashboard-filter.model';
import { getTrendIcon, getTrendClass, MetricTrend } from '../../../domain/entities/dashboard-metric.entity';

@Component({
  selector: 'hms-hospital-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AppointmentsWidgetComponent,
    EmergencyWidgetComponent,
    OccupancyWidgetComponent,
    RevenueWidgetComponent,
  ],
  templateUrl: './hospital-dashboard-page.component.html',
  styleUrl: './hospital-dashboard-page.component.scss',
})
export class HospitalDashboardPageComponent implements OnInit {
  readonly facade = inject(DashboardFacade);
  private readonly layout = inject(LayoutService);

  readonly periods: DashboardPeriod[] = ['today', 'week', 'month', 'year'];
  readonly periodLabels = PERIOD_LABELS;
  readonly getTrendIcon = getTrendIcon;
  readonly getTrendClass = getTrendClass;

  readonly quickStats = [
    { key: 'totalPatients',     icon: 'bi-people-fill',          color: 'primary',  label: 'إجمالي المرضى' },
    { key: 'todayAppointments', icon: 'bi-calendar-check-fill',  color: 'info',     label: 'مواعيد اليوم' },
    { key: 'activeEmergencies', icon: 'bi-exclamation-triangle-fill', color: 'danger', label: 'حالات طوارئ' },
    { key: 'availableDoctors',  icon: 'bi-person-badge-fill',    color: 'success',  label: 'أطباء متاحون' },
  ];

  ngOnInit(): void {
    this.layout.setPageTitle('Dashboard', 'لوحة التحكم');
    this.facade.load();
  }

  onPeriodChange(period: DashboardPeriod): void {
    this.facade.changePeriod({ period });
  }

  onRefresh(): void {
    this.facade.refresh();
  }

  getMetricValue(key: string): number {
    const summary = this.facade.summary();
    if (!summary) return 0;
    return (summary as unknown as Record<string, { value: number }>)[key]?.value ?? 0;
  }

  getMetricTrend(key: string): { trend: MetricTrend; trendPercent: number } | null {
    const summary = this.facade.summary();
    if (!summary) return null;
    return (summary as unknown as Record<string, { trend: MetricTrend; trendPercent: number }>)[key] ?? null;
  }
}