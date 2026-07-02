import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date: string;
  icon?: string;
  color?: string;
}

@Component({
  selector: 'hms-timeline',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes dotPop {
      from { opacity: 0; transform: scale(0); }
      to { opacity: 1; transform: scale(1); }
    }
    :host {
      display: block;
      animation: fadeUp 0.5s ease-out;
    }
    .timeline {
      position: relative;
    }
    .border-start {
      border-left-color: #dcfce7 !important;
      border-left-width: 2px !important;
    }
    .rounded-circle {
      border-radius: 8px !important;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .rounded-circle:hover {
      transform: scale(1.2);
      box-shadow: 0 2px 8px rgba(22, 163, 74, 0.2);
    }
    .bg-primary {
      background: linear-gradient(135deg, #15803d, #22c55e) !important;
      box-shadow: 0 2px 6px rgba(22, 163, 74, 0.2);
    }
    .bg-danger {
      background: linear-gradient(135deg, #dc2626, #ef4444) !important;
      box-shadow: 0 2px 6px rgba(220, 38, 38, 0.2);
    }
    .bg-warning {
      background: linear-gradient(135deg, #d97706, #f59e0b) !important;
    }
    .bg-success {
      background: linear-gradient(135deg, #15803d, #22c55e) !important;
    }
    .bg-info {
      background: linear-gradient(135deg, #0369a1, #38bdf8) !important;
    }
    .fw-semibold {
      color: #1f2937;
      font-size: 0.88rem;
    }
    .text-muted {
      font-size: 0.75rem;
      line-height: 1.6;
    }
    .d-flex.gap-3 {
      animation: dotPop 0.3s ease-out both;
    }
    .d-flex.gap-3:nth-child(1) { animation-delay: 0.05s; }
    .d-flex.gap-3:nth-child(2) { animation-delay: 0.1s; }
    .d-flex.gap-3:nth-child(3) { animation-delay: 0.15s; }
    .d-flex.gap-3:nth-child(4) { animation-delay: 0.2s; }
    .d-flex.gap-3:nth-child(5) { animation-delay: 0.25s; }
  `],
  template: `
    <div class="timeline">
      @for (item of items(); track item.id; let last = $last) {
        <div class="d-flex gap-3 pb-3"
          [class.border-start]="!last"
          style="margin-right: 8px; padding-right: 4px;">
          <div class="flex-shrink-0" style="margin-right: -10px; margin-top: 2px;">
            <div class="rounded-circle d-flex align-items-center justify-content-center"
              [ngClass]="'bg-' + (item.color ?? 'primary')"
              style="width: 16px; height: 16px;">
              @if (item.icon) {
                <i class="bi text-white" [ngClass]="item.icon" style="font-size: 0.5rem;"></i>
              }
            </div>
          </div>
          <div class="flex-grow-1 min-w-0 pb-2">
            <div class="d-flex align-items-center justify-content-between gap-2">
              <div class="fw-semibold small">{{ item.title }}</div>
              <div class="text-muted flex-shrink-0" style="font-size: 0.72rem;">{{ item.date }}</div>
            </div>
            @if (item.description) {
              <div class="text-muted small">{{ item.description }}</div>
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class TimelineComponent {
  readonly items = input<TimelineItem[]>([]);
}