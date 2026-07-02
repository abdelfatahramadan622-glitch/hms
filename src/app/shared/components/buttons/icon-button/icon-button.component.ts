import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-icon-button',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .btn {
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    .btn-primary {
      background: linear-gradient(135deg, #15803d, #22c55e);
      border: none;
    }
    .btn-primary:hover:not(:disabled) {
      background: linear-gradient(135deg, #166534, #16a34a);
      box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);
      transform: translateY(-1px);
    }
    .btn-outline-primary {
      border-color: #bbf7d0;
      color: #15803d;
    }
    .btn-outline-primary:hover {
      background-color: #f0fdf4;
      border-color: #22c55e;
      color: #166534;
    }
    .btn-outline-success {
      border-color: #bbf7d0;
      color: #15803d;
    }
    .btn-outline-success:hover {
      background: linear-gradient(135deg, #15803d, #22c55e);
      border-color: #16a34a;
      color: #fff;
      box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);
    }
    .btn-outline-danger {
      border-color: #fecaca;
      color: #dc2626;
    }
    .btn-outline-danger:hover {
      background-color: #fef2f2;
      border-color: #f87171;
      color: #b91c1c;
    }
    .btn-outline-secondary {
      border-color: #dcfce7;
      color: #15803d;
    }
    .btn-outline-secondary:hover {
      background-color: #f0fdf4;
      border-color: #22c55e;
      color: #166534;
    }
    .btn:disabled {
      opacity: 0.65;
      pointer-events: none;
    }
  `],
  template: `
    <button
      type="button"
      class="btn btn-sm"
      [ngClass]="'btn-' + (variant() === 'solid' ? color() : 'outline-' + color())"
      [disabled]="disabled()"
      [title]="tooltip()"
      (click)="clicked.emit($event)">
      <i class="bi" [ngClass]="icon()"></i>
    </button>
  `,
})
export class IconButtonComponent {
  readonly icon = input.required<string>();
  readonly color = input<string>('secondary');
  readonly variant = input<'solid' | 'outline'>('outline');
  readonly tooltip = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly clicked = output<MouseEvent>();
}