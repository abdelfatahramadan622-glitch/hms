import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppointmentModel, APPOINTMENT_TYPE_LABELS } from '../../../domain/models/appointment.model';
import { AppointmentStatusBadgeComponent } from '../appointment-status-badge/appointment-status-badge.component';

@Component({
  selector: 'hms-appointment-card',
  standalone: true,
  imports: [CommonModule, RouterModule, AppointmentStatusBadgeComponent],
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.scss',
})
export class AppointmentCardComponent {
  readonly appointment = input.required<AppointmentModel>();
  readonly confirmed = output<string>();
  readonly cancelled = output<string>();
  readonly completed = output<string>();

  readonly typeLabels = APPOINTMENT_TYPE_LABELS;

  onConfirm(e: Event): void { e.preventDefault(); this.confirmed.emit(this.appointment().id); }
  onCancel(e: Event): void { e.preventDefault(); this.cancelled.emit(this.appointment().id); }
  onComplete(e: Event): void { e.preventDefault(); this.completed.emit(this.appointment().id); }

  canConfirm(): boolean { return this.appointment().status === 'scheduled'; }
  canCancel(): boolean { return ['scheduled', 'confirmed'].includes(this.appointment().status); }
  canComplete(): boolean { return this.appointment().status === 'in-progress'; }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(amount);
  }
}