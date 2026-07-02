export type MetricTrend = 'up' | 'down' | 'stable';
export type MetricColor = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface DashboardMetric {
  id: string;
  labelAr: string;
  labelEn: string;
  value: number;
  unit?: string;
  trend: MetricTrend;
  trendPercent: number;
  icon: string;
  color: MetricColor;
  description?: string;
}

export interface DashboardSummary {
  totalPatients: DashboardMetric;
  todayAppointments: DashboardMetric;
  activeEmergencies: DashboardMetric;
  occupancyRate: DashboardMetric;
  todayRevenue: DashboardMetric;
  pendingLabResults: DashboardMetric;
  availableDoctors: DashboardMetric;
  availableBeds: DashboardMetric;
}

export function getTrendIcon(trend: MetricTrend): string {
  return { up: 'bi-arrow-up-right', down: 'bi-arrow-down-right', stable: 'bi-dash' }[trend];
}

export function getTrendClass(trend: MetricTrend, positiveIsGood = true): string {
  if (trend === 'stable') return 'text-muted';
  const isGood = positiveIsGood ? trend === 'up' : trend === 'down';
  return isGood ? 'text-success' : 'text-danger';
}