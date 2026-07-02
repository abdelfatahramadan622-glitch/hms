import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SplitButtonItem { label: string; icon?: string; action: string; }

@Component({
  selector: 'hms-split-button',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .btn-group {
      .btn-primary {
        background: linear-gradient(135deg, #15803d, #22c55e);
        border: none;
        border-radius: 10px 0 0 10px;
        font-weight: 600;
        transition: all 0.3s ease;
      }
      .btn-primary:hover {
        background: linear-gradient(135deg, #166534, #16a34a);
        box-shadow: 0 4px 14px rgba(22, 163, 74, 0.35);
        transform: translateY(-1px);
      }
      .dropdown-toggle-split {
        border-radius: 0 10px 10px 0;
        border-left: 1px solid rgba(255, 255, 255, 0.2);
      }
      .dropdown-menu {
        border-radius: 10px;
        border: 1px solid #dcfce7;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        padding: 6px;
      }
      .dropdown-item {
        border-radius: 8px;
        padding: 8px 14px;
        font-size: 0.88rem;
        color: #374151;
        transition: all 0.2s ease;
      }
      .dropdown-item:hover {
        background-color: #f0fdf4;
        color: #15803d;
      }
    }
  `],
  template: `
    <div class="btn-group">
      <button type="button" class="btn btn-primary btn-sm" (click)="mainAction.emit()">
        @if (icon()) { <i class="bi me-1" [ngClass]="icon()!"></i> }
        {{ label() }}
      </button>
      <button type="button" class="btn btn-primary btn-sm dropdown-toggle dropdown-toggle-split"
        data-bs-toggle="dropdown"></button>
      <ul class="dropdown-menu">
        @for (item of items(); track item.action) {
          <li>
            <button type="button" class="dropdown-item" (click)="itemClicked.emit(item.action)">
              @if (item.icon) { <i class="bi me-2" [ngClass]="item.icon"></i> }
              {{ item.label }}
            </button>
          </li>
        }
      </ul>
    </div>
  `,
})
export class SplitButtonComponent {
  readonly label = input.required<string>();
  readonly icon = input<string | null>(null);
  readonly items = input<SplitButtonItem[]>([]);
  readonly mainAction = output<void>();
  readonly itemClicked = output<string>();
}