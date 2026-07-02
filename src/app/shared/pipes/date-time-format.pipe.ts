import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateTimeFormat', standalone: true })
export class DateTimeFormatPipe implements PipeTransform {
  transform(value: string | Date | null, format: 'date' | 'time' | 'datetime' = 'datetime'): string {
    if (!value) return '—';
    const d = new Date(value);
    if (isNaN(d.getTime())) return '—';
    if (format === 'date') return d.toLocaleDateString('ar-EG', { day: '2-digit', month: '2-digit', year: 'numeric' });
    if (format === 'time') return d.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    return d.toLocaleString('ar-EG');
  }
}
