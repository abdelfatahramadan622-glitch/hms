import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DoctorModel, DOCTOR_STATUS_CONFIG, DAY_LABELS } from '../../../domain/models/doctor.model';

@Component({
  selector: 'hms-doctor-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './doctor-card.component.html',
  styleUrl: './doctor-card.component.scss',
})
export class DoctorCardComponent {
  readonly doctor = input.required<DoctorModel>();
  readonly deleted = output<string>();

  readonly statusConfig = DOCTOR_STATUS_CONFIG;
  readonly dayLabels = DAY_LABELS;

  getInitials(): string {
    const d = this.doctor();
    return `${d.firstName.charAt(0)}${d.lastName.charAt(0)}`.toUpperCase();
  }

  onDelete(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this.deleted.emit(this.doctor().id);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(amount);
  }
}