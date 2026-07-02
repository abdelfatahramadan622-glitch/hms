import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicationModel } from '../../../domain/models/prescription.model';

@Component({
  selector: 'hms-dosage-instructions',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (medication()) {
      <div class="dosage-instructions p-3 bg-light rounded-3 small">
        <h6 class="fw-bold mb-2">
          <i class="fa-solid fa-capsules text-primary me-2"></i>{{ medication()!.name }}
        </h6>
        <ul class="list-unstyled mb-0">
          <li class="d-flex gap-2 mb-1">
            <i class="bi bi-clock text-muted flex-shrink-0"></i>
            <span>{{ medication()!.dosage.frequency }} مرة يومياً عبر {{ medication()!.dosage.route }}</span>
          </li>
          @if (medication()!.dosage.times.length > 0) {
            <li class="d-flex gap-2 mb-1">
              <i class="bi bi-alarm text-muted flex-shrink-0"></i>
              <span>مواعيد: {{ medication()!.dosage.times.join(' ، ') }}</span>
            </li>
          }
          <li class="d-flex gap-2 mb-1">
            <i class="bi bi-egg-fried text-muted flex-shrink-0"></i>
            <span>{{ medication()!.dosage.withFood ? 'تُؤخذ مع الطعام' : 'تُؤخذ على معدة فارغة' }}</span>
          </li>
          @if (medication()!.dosage.notes) {
            <li class="d-flex gap-2">
              <i class="bi bi-info-circle text-info flex-shrink-0"></i>
              <span class="text-info">{{ medication()!.dosage.notes }}</span>
            </li>
          }
        </ul>
      </div>
    }
  `,
  styles: [`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    :host {
      display: block;
      animation: fadeUp 0.4s ease-out;
    }
    .dosage-instructions {
      border-radius: 12px;
      background-color: #f0fdf4;
      border: 1px solid #dcfce7;
      transition: box-shadow 0.3s ease;
    }
    .dosage-instructions:hover {
      box-shadow: 0 4px 12px rgba(22, 163, 74, 0.08);
    }
    h6 {
      color: #1f2937;
      font-size: 0.92rem;
    }
    .fa-capsules {
      color: #15803d;
    }
    ul li {
      line-height: 1.7;
      color: #4b5563;
      padding: 2px 0;
    }
    ul li i {
      width: 16px;
      text-align: center;
      font-size: 0.85rem;
    }
    .text-info {
      color: #15803d !important;
      font-weight: 500;
    }
    .bi-info-circle {
      color: #22c55e !important;
    }
  `],
})
export class DosageInstructionsComponent {
  readonly medication = input<MedicationModel | null>(null);
}