import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabTestModel, LAB_CATEGORY_LABELS } from '../../../domain/models/lab-result.model';

@Component({
  selector: 'hms-lab-test-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lab-test-table.component.html',
  styleUrl: './lab-test-table.component.scss',
})
export class LabTestTableComponent {
  readonly tests = input<LabTestModel[]>([]);
  readonly isLoading = input<boolean>(false);

  readonly categoryLabels = LAB_CATEGORY_LABELS;

  getRowClass(test: LabTestModel): string {
    if (test.isCritical) return 'table-danger';
    if (test.isAbnormal) return 'table-warning';
    return '';
  }

  getValueDisplay(test: LabTestModel): string {
    if (!test.value) return '—';
    return test.unit ? `${test.value} ${test.unit}` : test.value;
  }

  getReferenceRange(test: LabTestModel): string {
    if (test.referenceText) return test.referenceText;
    if (test.referenceMin !== undefined && test.referenceMax !== undefined) {
      return `${test.referenceMin} – ${test.referenceMax} ${test.unit ?? ''}`.trim();
    }
    return '—';
  }
}