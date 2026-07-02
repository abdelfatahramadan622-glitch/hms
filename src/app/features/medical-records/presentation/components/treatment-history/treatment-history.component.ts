import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TreatmentHistoryModel } from '../../../domain/models/medical-record-filter.model';

@Component({
  selector: 'hms-treatment-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    @if (history().length === 0) {
      <p class="text-muted small mb-0">لا يوجد تاريخ علاجي مسجل</p>
    } @else {
      <div class="timeline">
        @for (item of history(); track item.recordId; let last = $last) {
          <div class="d-flex gap-3 pb-3" [class.border-start]="!last" style="margin-right: 8px;">
            <div class="flex-shrink-0 mt-1" style="margin-right: -9px;">
              <div class="rounded-circle bg-primary" style="width: 10px; height: 10px;"></div>
            </div>
            <div class="flex-grow-1 min-w-0">
              <div class="d-flex align-items-center gap-2 mb-1">
                <span class="small fw-semibold">{{ item.visitDate | date:'dd/MM/yyyy' }}</span>
                <span class="text-muted small">— د. {{ item.doctorName }}</span>
              </div>
              <div class="small text-dark mb-1"><span class="text-muted">التشخيص:</span> {{ item.diagnosis }}</div>
              <div class="small text-dark mb-1"><span class="text-muted">العلاج:</span> {{ item.treatment }}</div>
              @if (item.outcome) {
                <div class="small text-success"><i class="bi bi-check-circle me-1"></i>{{ item.outcome }}</div>
              }
              <a [routerLink]="['/medical-records', item.recordId]"
                class="btn btn-xs btn-outline-primary mt-2" style="font-size:0.75rem; padding: 2px 8px;">
                عرض السجل
              </a>
            </div>
          </div>
        }
      </div>
    }
  `,
})
export class TreatmentHistoryComponent {
  readonly history = input<TreatmentHistoryModel[]>([]);
}