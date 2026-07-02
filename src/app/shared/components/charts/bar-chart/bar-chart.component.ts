import { Component, input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ChartDataItem { label: string; value: number; color?: string; }

@Component({
  selector: 'hms-bar-chart',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    :host {
      display: block;
      animation: fadeUp 0.4s ease-out;
    }
    .bar-chart {
      h6 {
        color: #1f2937;
        font-size: 0.88rem;
      }
    }
    .bg-light {
      background-color: #f0fdf4 !important;
      border-radius: 6px;
    }
    .rounded.h-100 {
      border-radius: 6px;
      min-width: 30px;
      transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .d-flex.align-items-center.gap-2 {
      padding: 2px 0;
      transition: transform 0.2s ease;
    }
    .d-flex.align-items-center.gap-2:hover {
      transform: translateX(2px);
    }
  `],
  template: `
    <div class="bar-chart">
      @if (title()) {
        <h6 class="fw-bold mb-3 small">{{ title() }}</h6>
      }
      @if (data().length === 0) {
        <div class="text-center py-4 text-muted small">لا توجد بيانات</div>
      } @else {
        <div class="d-flex flex-column gap-2">
          @for (item of data(); track item.label) {
            <div class="d-flex align-items-center gap-2 small">
              <div class="text-muted" style="min-width:80px;font-size:0.75rem;">{{ item.label }}</div>
              <div class="flex-grow-1 bg-light rounded" style="height:20px;">
                <div class="rounded h-100 d-flex align-items-center px-2"
                  [style.width]="getWidth(item.value) + '%'"
                  [style.background]="item.color ?? '#22c55e'"
                  style="font-size:0.7rem;color:white;min-width:30px;transition:width 0.4s ease;">
                  {{ item.value }}
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class BarChartComponent implements OnChanges {
  readonly data = input<ChartDataItem[]>([]);
  readonly title = input<string>('');
  private maxValue = 0;

  ngOnChanges(): void {
    this.maxValue = Math.max(...this.data().map((d) => d.value), 1);
  }

  getWidth(value: number): number {
    return Math.round((value / this.maxValue) * 100);
  }
}