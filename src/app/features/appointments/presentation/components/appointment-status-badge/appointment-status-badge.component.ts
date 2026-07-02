import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentStatus, APPOINTMENT_STATUS_CONFIG } from '../../../domain/models/appointment.model';

@Component({
  selector: 'hms-appointment-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge rounded-pill d-inline-flex align-items-center gap-1"
      [ngClass]="config[status()].class">
      <i class="bi small" [ngClass]="config[status()].icon"></i>
      {{ config[status()].label }}
    </span>
  `,
})
export class AppointmentStatusBadgeComponent {
  readonly status = input.required<AppointmentStatus>();
  readonly config = APPOINTMENT_STATUS_CONFIG;
}