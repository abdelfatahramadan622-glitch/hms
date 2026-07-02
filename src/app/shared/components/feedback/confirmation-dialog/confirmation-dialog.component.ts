import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.9) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    .modal-backdrop {
      animation: fadeIn 0.25s ease-out;
      backdrop-filter: blur(3px);
    }
    .modal-content {
      border: none;
      border-radius: 18px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      animation: scaleIn 0.3s ease-out;
    }
    .modal-body {
      padding: 2rem 1.5rem;
    }
    .modal-footer {
      border-top-color: #f0fdf4;
      padding-top: 1rem;
    }
    .btn-outline-secondary {
      border-radius: 10px;
      border-color: #dcfce7;
      color: #15803d;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    .btn-outline-secondary:hover {
      background-color: #f0fdf4;
      border-color: #22c55e;
      color: #166534;
    }
    .btn-danger {
      background: linear-gradient(135deg, #dc2626, #ef4444);
      border: none;
      border-radius: 10px;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .btn-danger:hover {
      background: linear-gradient(135deg, #b91c1c, #dc2626);
      box-shadow: 0 4px 14px rgba(220, 38, 38, 0.3);
      transform: translateY(-1px);
    }
    .btn-success {
      background: linear-gradient(135deg, #15803d, #22c55e);
      border: none;
      border-radius: 10px;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .btn-success:hover {
      background: linear-gradient(135deg, #166534, #16a34a);
      box-shadow: 0 4px 14px rgba(22, 163, 74, 0.35);
      transform: translateY(-1px);
    }
    .btn-primary {
      background: linear-gradient(135deg, #15803d, #22c55e);
      border: none;
      border-radius: 10px;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .btn-primary:hover {
      background: linear-gradient(135deg, #166534, #16a34a);
      box-shadow: 0 4px 14px rgba(22, 163, 74, 0.35);
      transform: translateY(-1px);
    }
    .text-danger { color: #dc2626 !important; }
    .text-warning { color: #d97706 !important; }
    .text-info { color: #0369a1 !important; }
    .text-primary { color: #15803d !important; }
    .fs-1 { font-size: 3rem; }
  `],
  template: `
    @if (visible()) {
      <!-- Backdrop -->
      <div class="modal-backdrop fade show" style="z-index:1040;"></div>
      <!-- Dialog -->
      <div class="modal d-block" style="z-index:1050;" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-sm">
          <div class="modal-content border-0 shadow">
            <div class="modal-body p-4 text-center">
              <div class="mb-3">
                <i class="bi fs-1" [ngClass]="[icon(), 'text-' + color()]"></i>
              </div>
              <h5 class="fw-bold mb-2">{{ title() }}</h5>
              @if (message()) {
                <p class="text-muted small mb-0">{{ message() }}</p>
              }
            </div>
            <div class="modal-footer border-0 pt-0 justify-content-center gap-2">
              <button type="button" class="btn btn-outline-secondary btn-sm px-4"
                (click)="cancelled.emit()">
                {{ cancelLabel() }}
              </button>
              <button type="button" class="btn btn-sm px-4"
                [ngClass]="'btn-' + color()"
                (click)="confirmed.emit()">
                {{ confirmLabel() }}
              </button>
            </div>
          </div>
        </div>
      </div>
    }
  `,
})
export class ConfirmationDialogComponent {
  readonly visible = input<boolean>(false);
  readonly title = input<string>('هل أنت متأكد؟');
  readonly message = input<string>('');
  readonly confirmLabel = input<string>('تأكيد');
  readonly cancelLabel = input<string>('إلغاء');
  readonly icon = input<string>('bi-question-circle-fill');
  readonly color = input<string>('danger');
  readonly confirmed = output<void>();
  readonly cancelled = output<void>();
}