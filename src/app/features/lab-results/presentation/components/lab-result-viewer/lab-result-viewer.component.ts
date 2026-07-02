import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabResultModel, LAB_STATUS_CONFIG } from '../../../domain/models/lab-result.model';
import { LabTestTableComponent } from '../lab-test-table/lab-test-table.component';

@Component({
  selector: 'hms-lab-result-viewer',
  standalone: true,
  imports: [CommonModule, LabTestTableComponent],
  templateUrl: './lab-result-viewer.component.html',
  styleUrl: './lab-result-viewer.component.scss',
})
export class LabResultViewerComponent {
  readonly result = input.required<LabResultModel>();
  readonly statusConfig = LAB_STATUS_CONFIG;

  get abnormalCount(): number {
    return this.result().tests.filter((t) => t.isAbnormal).length;
  }
  get criticalCount(): number {
    return this.result().tests.filter((t) => t.isCritical).length;
  }
}