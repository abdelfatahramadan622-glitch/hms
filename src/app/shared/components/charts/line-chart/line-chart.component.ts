import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface LineChartPoint { label: string; value: number; }

@Component({
  selector: 'hms-line-chart',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    :host {
      display: block;
      animation: fadeUp 0.45s ease-out;
    }
    .line-chart {
      h6 {
        color: #1f2937;
        font-size: 0.88rem;
      }
    }
    .bg-light {
      background-color: #f0fdf4 !important;
      border-radius: 12px;
      border: 1px solid #dcfce7;
    }
    .bi-graph-up {
      color: #86efac;
    }
    .fw-bold {
      color: #15803d;
    }
    .text-center {
      padding: 16px;
      border-radius: 10px;
      transition: background-color 0.2s ease;
    }
    .text-center:hover {
      background-color: #f0fdf4;
    }
  `],
  template: `
    <div class="line-chart">
      @if (title()) { <h6 class="fw-bold mb-3 small">{{ title() }}</h6> }
      <div class="text-center py-5 text-muted bg-light rounded">
        <i class="bi bi-graph-up fs-2 d-block mb-2"></i>
        <small>{{ title() || 'الرسم البياني الخطي' }}</small>
        @if (data().length > 0) {
          <div class="d-flex justify-content-center gap-3 mt-3 flex-wrap">
            @for (p of data().slice(0, 6); track p.label) {
              <div class="text-center">
                <div class="fw-bold" style="font-size:0.75rem;">{{ p.value }}</div>
                <div class="text-muted" style="font-size:0.65rem;">{{ p.label }}</div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class LineChartComponent {
  readonly data = input<LineChartPoint[]>([]);
  readonly title = input<string>('');
  readonly color = input<string>('#22c55e');
}