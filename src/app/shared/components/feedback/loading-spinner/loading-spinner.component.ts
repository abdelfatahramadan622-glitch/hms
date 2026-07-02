import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-loading-spinner',
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
    .spinner-border.text-primary {
      color: #22c55e !important;
    }
    .text-muted {
      color: #6b7280;
      font-size: 0.88rem;
    }
    .small {
      font-size: 0.85rem;
    }
  `],
  template: `
    @if (visible()) {
      <div class="d-flex align-items-center justify-content-center py-5 gap-3">
        <div class="spinner-border text-primary" [class.spinner-border-sm]="size() === 'sm'" role="status">
          <span class="visually-hidden">جاري التحميل...</span>
        </div>
        @if (label()) {
          <span class="text-muted small">{{ label() }}</span>
        }
      </div>
    }
  `,
})
export class LoadingSpinnerComponent {
  readonly visible = input<boolean>(true);
  readonly label = input<string>('جاري التحميل...');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
}