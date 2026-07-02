import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-metric-card',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes cardIn {
      from { opacity: 0; transform: scale(0.95) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    :host {
      display: block;
      animation: fadeUp 0.5s ease-out;
    }
    .card {
      border-radius: 14px;
      animation: cardIn 0.45s ease-out both;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .card:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
    }
    .h3 {
      color: #1f2937;
      font-size: 1.6rem;
    }
    .text-success {
      color: #15803d !important;
    }
    .text-danger {
      color: #dc2626 !important;
    }
    .rounded-3 {
      border-radius: 12px !important;
      transition: transform 0.3s ease;
    }
    .card:hover .rounded-3 {
      transform: scale(1.06);
    }
    .bg-primary-subtle {
      background-color: #dcfce7 !important;
    }
    .text-primary {
      color: #15803d !important;
    }
    .bi-arrow-up-right {
      color: #22c55e;
    }
    .bi-arrow-down-right {
      color: #dc2626;
    }
  `],
  template: `
    <div class="card border-0 shadow-sm h-100">
      <div class="card-body p-3">
        <div class="d-flex align-items-start justify-content-between">
          <div>
            <p class="text-muted small mb-1">{{ label() }}</p>
            <h3 class="fw-bold mb-0">{{ value() }}</h3>
            @if (trend()) {
              <div class="small mt-1" [ngClass]="trendPositive() ? 'text-success' : 'text-danger'">
                <i class="bi me-1" [ngClass]="trendPositive() ? 'bi-arrow-up-right' : 'bi-arrow-down-right'"></i>
                {{ trend() }}
              </div>
            }
          </div>
          @if (icon()) {
            <div class="rounded-3 p-2 flex-shrink-0" [ngClass]="'bg-' + color() + '-subtle'">
              <i class="bi fs-4" [ngClass]="[icon()!, 'text-' + color()]"></i>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class MetricCardComponent {
  readonly label = input<string>('');
  readonly value = input<string | number>('');
  readonly icon = input<string | null>(null);
  readonly color = input<string>('primary');
  readonly trend = input<string>('');
  readonly trendPositive = input<boolean>(true);
}