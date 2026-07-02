import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppointmentWidgetItem } from '../../../domain/repositories/dashboard.repository';

@Component({
  selector: 'hms-appointments-widget',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './appointments-widget.component.html',
  styleUrl: './appointments-widget.component.scss',
})
export class AppointmentsWidgetComponent {
  readonly appointments = input<AppointmentWidgetItem[]>([]);
  readonly isLoading = input<boolean>(false);

  // Partial<Record<...>> instead of Record<...>: keeps the `?.` / `??`
  // fallback in the template meaningful (and the NG8107/NG8102 warnings
  // gone) in case the backend ever sends a status value we haven't
  // mapped yet.
  readonly statusConfig: Partial<Record<string, { label: string; class: string }>> = {
    scheduled:     { label: 'مجدول',  class: 'bg-info-subtle text-info' },
    confirmed:     { label: 'مؤكد',   class: 'bg-primary-subtle text-primary' },
    'in-progress': { label: 'جارٍ',   class: 'bg-warning-subtle text-warning' },
    completed:     { label: 'مكتمل',  class: 'bg-success-subtle text-success' },
    cancelled:     { label: 'ملغى',   class: 'bg-danger-subtle text-danger' },
  };
}