import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PatientModel, GENDER_LABELS, STATUS_CONFIG } from '../../../domain/models/patient.model';

@Component({
  selector: 'hms-patient-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './patient-summary.component.html',
  styleUrl: './patient-summary.component.scss',
})
export class PatientSummaryComponent {
  readonly patient = input.required<PatientModel>();
  readonly genderLabels = GENDER_LABELS;
  readonly statusConfig = STATUS_CONFIG;

  getInitials(): string {
    const p = this.patient();
    return `${p.firstName.charAt(0)}${p.lastName.charAt(0)}`.toUpperCase();
  }
}