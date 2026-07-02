import { Component, input, output, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-toast',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .toast {
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      animation: slideIn 0.35s ease-out;
      overflow: hidden;
    }
    .text-bg-success {
      background: linear-gradient(135deg, #15803d, #22c55e) !important;
    }
    .text-bg-danger {
      background: linear-gradient(135deg, #dc2626, #ef4444) !important;
    }
    .text-bg-warning {
      background: linear-gradient(135deg, #d97706, #f59e0b) !important;
    }
    .text-bg-info {
      background: linear-gradient(135deg, #0369a1, #38bdf8) !important;
    }
    .small {
      font-size: 0.85rem;
      font-weight: 500;
    }
    .btn-close-white {
      opacity: 0.7;
      transition: opacity 0.2s ease;
    }
    .btn-close-white:hover {
      opacity: 1;
    }
  `],
  template: `
    @if (visible()) {
      <div class="toast show align-items-center border-0"
        [ngClass]="'text-bg-' + type()"
        role="alert" style="min-width:280px;">
        <div class="d-flex">
          <div class="toast-body d-flex align-items-center gap-2">
            <i class="bi" [ngClass]="iconClass()"></i>
            <span class="small">{{ message() }}</span>
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto"
            (click)="dismiss()"></button>
        </div>
      </div>
    }
  `,
})
export class ToastComponent implements OnInit, OnDestroy {
  readonly message = input.required<string>();
  readonly type = input<'success' | 'danger' | 'warning' | 'info'>('info');
  readonly duration = input<number>(4000);
  readonly dismissed = output<void>();

  readonly visible = signal(true);
  private timer?: ReturnType<typeof setTimeout>;

  readonly iconMap: Record<string, string> = {
    success: 'bi-check-circle-fill',
    danger:  'bi-exclamation-circle-fill',
    warning: 'bi-exclamation-triangle-fill',
    info:    'bi-info-circle-fill',
  };

  iconClass(): string { return this.iconMap[this.type()] ?? 'bi-info-circle-fill'; }

  ngOnInit(): void {
    if (this.duration() > 0) {
      this.timer = setTimeout(() => this.dismiss(), this.duration());
    }
  }

  ngOnDestroy(): void { if (this.timer) clearTimeout(this.timer); }

  dismiss(): void { this.visible.set(false); this.dismissed.emit(); }
}