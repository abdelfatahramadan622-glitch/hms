import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PatientModel, GENDER_LABELS, STATUS_CONFIG } from '../../../domain/models/patient.model';

@Component({
  selector: 'hms-patient-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './patient-card.component.html',
  styleUrl: './patient-card.component.scss',
})
export class PatientCardComponent {
  readonly patient = input.required<PatientModel>();
  readonly deleted = output<string>();

  readonly genderLabels = GENDER_LABELS;
  readonly statusConfig = STATUS_CONFIG;

  onDelete(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.deleted.emit(this.patient().id);
  }

  getInitials(): string {
    const p = this.patient();
    return `${p.firstName.charAt(0)}${p.lastName.charAt(0)}`.toUpperCase();
  }
}