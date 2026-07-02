import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicationModel } from '../../../domain/models/prescription.model';

@Component({
  selector: 'hms-medication-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medication-list.component.html',
  styleUrl: './medication-list.component.scss',
})
export class MedicationListComponent {
  readonly medications = input<MedicationModel[]>([]);

  getDurationLabel(unit: string): string {
    const map: Record<string, string> = { days: 'يوم', weeks: 'أسبوع', months: 'شهر' };
    return map[unit] ?? unit;
  }

  getTimesDisplay(times: string[]): string {
    return times.join(' ، ') || '—';
  }
}