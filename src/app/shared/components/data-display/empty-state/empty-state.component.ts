import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-empty-state',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    :host {
      display: block;
      animation: fadeUp 0.5s ease-out;
    }
    .fs-1 {
      color: #86efac;
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
  `],
  template: `
    <div class="text-center py-5">
      <i class="bi fs-1 text-muted d-block mb-3" [ngClass]="icon()"></i>
      <h5 class="fw-bold text-muted mb-2">{{ title() }}</h5>
      @if (description()) {
        <p class="text-muted small mb-4">{{ description() }}</p>
      }
      @if (actionLabel()) {
        <button type="button" class="btn btn-primary btn-sm" (click)="actionClicked.emit()">
          @if (actionIcon()) { <i class="bi me-2" [ngClass]="actionIcon()!"></i> }
          {{ actionLabel() }}
        </button>
      }
    </div>
  `,
})
export class EmptyStateComponent {
  readonly icon = input<string>('bi-inbox');
  readonly title = input<string>('لا توجد بيانات');
  readonly description = input<string>('');
  readonly actionLabel = input<string>('');
  readonly actionIcon = input<string | null>(null);
  readonly actionClicked = output<void>();
}