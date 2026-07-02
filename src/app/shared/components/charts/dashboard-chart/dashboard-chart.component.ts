import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-dashboard-chart',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes cardIn {
      from { opacity: 0; transform: scale(0.97) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    :host {
      display: block;
      animation: fadeUp 0.45s ease-out;
    }
    .card {
      border-radius: 14px;
      animation: cardIn 0.45s ease-out both;
      transition: box-shadow 0.3s ease;
    }
    .card:hover {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    }
    .card-header {
      border-bottom-color: #dcfce7;
      h6 {
        color: #1f2937;
      }
    }
    .bi-bar-chart-fill {
      color: #86efac;
    }
  `],
  template: `
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white border-bottom py-3">
        <h6 class="mb-0 fw-bold">{{ title() }}</h6>
      </div>
      <div class="card-body text-center py-5 text-muted">
        <i class="bi bi-bar-chart-fill fs-2 d-block mb-2"></i>
        <small>{{ subtitle() }}</small>
      </div>
    </div>
  `,
})
export class DashboardChartComponent {
  readonly title = input<string>('رسم بياني');
  readonly subtitle = input<string>('سيتم عرض البيانات هنا');
}