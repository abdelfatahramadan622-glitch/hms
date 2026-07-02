import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Breadcrumb } from '../../../../core/domain/entities/breadcrumb.entity';

@Component({
  selector: 'hms-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb small mb-0">
        @for (item of items(); track item.label; let last = $last) {
          <li class="breadcrumb-item" [class.active]="last || item.isActive">
            @if (!last && item.path) {
              <a [routerLink]="item.path" class="text-decoration-none">
                @if (item.icon) { <i class="bi me-1" [ngClass]="item.icon"></i> }
                {{ item.label }}
              </a>
            } @else {
              @if (item.icon) { <i class="bi me-1" [ngClass]="item.icon"></i> }
              {{ item.label }}
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: [`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    :host {
      display: block;
      animation: fadeUp 0.35s ease-out;
    }

    .breadcrumb-item {
      color: #6b7280;
      transition: color 0.2s ease;
    }

    .breadcrumb-item a {
      color: #6b7280;
      transition: color 0.2s ease;
    }

    .breadcrumb-item a:hover {
      color: #15803d;
    }

    .breadcrumb-item.active {
      color: #15803d;
      font-weight: 600;
    }

    .breadcrumb-item + .breadcrumb-item::before {
      color: #bbf7d0;
    }
  `]
})
export class BreadcrumbComponent {
  readonly items = input<Breadcrumb[]>([]);
}