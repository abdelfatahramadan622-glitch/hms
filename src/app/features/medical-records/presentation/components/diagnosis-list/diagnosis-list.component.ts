import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagnosisModel } from '../../../domain/models/medical-record.model';

@Component({
  selector: 'hms-diagnosis-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diagnosis-list.component.html',
  styleUrl: './diagnosis-list.component.scss',
})
export class DiagnosisListComponent {
  readonly diagnoses = input<DiagnosisModel[]>([]);
  readonly readonly = input<boolean>(false);
  readonly removed = output<string>();

  readonly typeConfig: Partial<Record<string, { label: string; class: string }>> = {
    primary:      { label: 'رئيسي',  class: 'bg-danger-subtle text-danger' },
    secondary:    { label: 'ثانوي',  class: 'bg-warning-subtle text-warning' },
    differential: { label: 'تفريقي', class: 'bg-info-subtle text-info' },
  };
}