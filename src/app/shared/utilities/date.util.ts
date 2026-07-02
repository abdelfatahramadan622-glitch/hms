export function formatDate(date: string | Date | null, format: 'short' | 'long' | 'time' | 'datetime' = 'short'): string {
  if (!date) return '—';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '—';

  const opts: Record<string, Intl.DateTimeFormatOptions> = {
    short:    { day: '2-digit', month: '2-digit', year: 'numeric' },
    long:     { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' },
    time:     { hour: '2-digit', minute: '2-digit' },
    datetime: { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' },
  };

  return d.toLocaleDateString('ar-EG', opts[format]);
}

export function isToday(date: string | Date): boolean {
  const d = new Date(date);
  const today = new Date();
  return d.toDateString() === today.toDateString();
}

export function daysBetween(from: string | Date, to: string | Date): number {
  const diff = new Date(to).getTime() - new Date(from).getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

export function toISODate(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

export function addDays(date: string | Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function isExpired(date: string | Date): boolean {
  return new Date(date) < new Date();
}

export function timeAgo(date: string | Date): string {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'الآن';
  if (mins < 60) return `منذ ${mins} دقيقة`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `منذ ${hrs} ساعة`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `منذ ${days} يوم`;
  return formatDate(date, 'short');
}