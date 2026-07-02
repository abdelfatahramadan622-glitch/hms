export type DashboardPeriod = 'today' | 'week' | 'month' | 'year';

export interface DashboardFilter {
  period: DashboardPeriod;
  departmentId?: string;
  dateFrom?: string;
  dateTo?: string;
}

export const PERIOD_LABELS: Record<DashboardPeriod, string> = {
  today: 'اليوم',
  week: 'هذا الأسبوع',
  month: 'هذا الشهر',
  year: 'هذا العام',
};

export function createDefaultDashboardFilter(): DashboardFilter {
  return { period: 'today' };
}