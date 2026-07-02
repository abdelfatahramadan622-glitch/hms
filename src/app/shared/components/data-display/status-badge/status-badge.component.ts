import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-status-badge',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .badge {
      border-radius: 20px;
      padding: 4px 12px;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.01em;
      transition: transform 0.2s ease;
    }
    .badge:hover {
      transform: scale(1.04);
    }
    .bg-secondary-subtle {
      background-color: #f3f4f6 !important;
      color: #6b7280 !important;
    }
    .bg-success-subtle {
      background-color: #dcfce7 !important;
      color: #15803d !important;
    }
    .bg-danger-subtle {
      background-color: #fef2f2 !important;
      color: #dc2626 !important;
    }
    .bg-warning-subtle {
      background-color: #fffbeb !important;
      color: #d97706 !important;
    }
    .bg-primary-subtle {
      background-color: #dcfce7 !important;
      color: #15803d !important;
    }
    .small {
      font-size: 0.7rem;
    }
  `],
  template: `
    <span class="badge rounded-pill d-inline-flex align-items-center gap-1"
      [ngClass]="cssClass()">
      @if (icon()) { <i class="bi small" [ngClass]="icon()!"></i> }
      {{ label() }}
    </span>
  `,
})
export class StatusBadgeComponent {
  readonly label = input.required<string>();
  readonly icon = input<string | null>(null);
  readonly cssClass = input<string>('bg-secondary-subtle text-secondary');
}