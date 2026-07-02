import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmergencyWidgetItem } from '../../../domain/repositories/dashboard.repository';

@Component({
  selector: 'hms-emergency-widget',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './emergency-widget.component.html',
  styleUrl: './emergency-widget.component.scss',
})
export class EmergencyWidgetComponent {
  readonly emergencies = input<EmergencyWidgetItem[]>([]);
  readonly isLoading = input<boolean>(false);

  // Partial<Record<...>> so an out-of-range triage level (bad/legacy data)
  // falls back gracefully in the template instead of the compiler assuming
  // every numeric key is guaranteed to exist.
  readonly triageConfig: Partial<Record<number, { label: string; class: string; color: string }>> = {
    1: { label: 'بالغ الخطورة', class: 'bg-danger text-white',    color: '#dc3545' },
    2: { label: 'طارئ',         class: 'bg-warning text-dark',    color: '#ffc107' },
    3: { label: 'عاجل',         class: 'bg-info text-white',      color: '#0dcaf0' },
    4: { label: 'أقل إلحاحاً',  class: 'bg-success text-white',   color: '#198754' },
    5: { label: 'غير طارئ',     class: 'bg-secondary text-white', color: '#6c757d' },
  };

  getElapsedTime(arrivedAt: string): string {
    const diff = Date.now() - new Date(arrivedAt).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `منذ ${mins} دقيقة`;
    const hrs = Math.floor(mins / 60);
    return `منذ ${hrs} ساعة`;
  }
}