import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-primary-button',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .btn-primary {
      background: linear-gradient(135deg, #15803d, #22c55e);
      border: none;
      border-radius: 10px;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .btn-primary:hover:not(:disabled) {
      background: linear-gradient(135deg, #166534, #16a34a);
      box-shadow: 0 4px 14px rgba(22, 163, 74, 0.35);
      transform: translateY(-1px);
    }
    .btn-primary:active:not(:disabled) {
      transform: translateY(0);
    }
    .btn-primary:disabled {
      opacity: 0.65;
    }
    .btn-sm {
      border-radius: 8px;
      padding: 6px 16px;
      font-size: 0.85rem;
    }
    .btn-lg {
      border-radius: 12px;
      padding: 12px 32px;
      font-size: 1.05rem;
    }
    .spinner-border {
      border-color: rgba(255, 255, 255, 0.3);
      border-right-color: #fff;
    }
  `],
  template: `
    <button
      type="button"
      [class]="'btn btn-primary ' + (size() === 'sm' ? 'btn-sm' : size() === 'lg' ? 'btn-lg' : '')"
      [disabled]="disabled() || loading()"
      (click)="clicked.emit($event)">
      @if (loading()) {
        <span class="spinner-border spinner-border-sm me-2"></span>
      } @else if (icon()) {
        <i class="bi me-2" [ngClass]="icon()!"></i>
      }
      <ng-content />
    </button>
  `,
})
export class PrimaryButtonComponent {
  readonly icon = input<string | null>(null);
  readonly loading = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly clicked = output<MouseEvent>();
}