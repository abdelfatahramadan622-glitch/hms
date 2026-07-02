import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PieChartSlice { label: string; value: number; color: string; }

@Component({
  selector: 'hms-pie-chart',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes cardIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    :host {
      display: block;
      animation: fadeUp 0.4s ease-out;
    }
    .pie-chart {
      h6 {
        color: #1f2937;
        font-size: 0.88rem;
      }
    }
    .bg-light {
      background-color: #f0fdf4 !important;
      border: 1px solid #dcfce7;
      border-radius: 16px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .bg-light:hover {
      transform: scale(1.04);
      box-shadow: 0 6px 16px rgba(22, 163, 74, 0.1);
    }
    .bi-pie-chart {
      color: #86efac;
    }
    .rounded-circle {
      transition: transform 0.2s ease;
    }
    .d-flex.align-items-center.gap-2:hover .rounded-circle {
      transform: scale(1.3);
    }
    .fw-bold {
      color: #15803d;
      font-size: 0.82rem;
    }
    .text-muted {
      font-size: 0.82rem;
    }
  `],
  template: `
    <div class="pie-chart">
      @if (title()) { <h6 class="fw-bold mb-3 small">{{ title() }}</h6> }
      <div class="d-flex align-items-center gap-4 flex-wrap">
        <div class="text-center text-muted bg-light rounded d-flex align-items-center justify-content-center"
          style="width:120px;height:120px;">
          <i class="bi bi-pie-chart fs-1"></i>
        </div>
        <div class="d-flex flex-column gap-2">
          @for (slice of data(); track slice.label) {
            <div class="d-flex align-items-center gap-2 small">
              <div class="rounded-circle flex-shrink-0"
                [style.background]="slice.color"
                style="width:10px;height:10px;"></div>
              <span class="text-muted">{{ slice.label }}</span>
              <span class="fw-bold ms-1">{{ getPercent(slice.value) }}%</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class PieChartComponent {
  readonly data = input<PieChartSlice[]>([]);
  readonly title = input<string>('');

  private get total(): number { return this.data().reduce((s, d) => s + d.value, 0) || 1; }

  getPercent(value: number): number { return Math.round((value / this.total) * 100); }
}