import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Breadcrumb } from '../../../../core/domain/entities/breadcrumb.entity';

@Component({
  selector: 'hms-page-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="mb-4">
      @if (breadcrumbs().length > 0) {
        <nav aria-label="breadcrumb" class="mb-2">
          <ol class="breadcrumb small mb-0">
            @for (item of breadcrumbs(); track item.label; let last = $last) {
              <li class="breadcrumb-item" [class.active]="last">
                @if (!last && item.path) {
                  <a [routerLink]="item.path" class="text-decoration-none">{{ item.label }}</a>
                } @else {
                  {{ item.label }}
                }
              </li>
            }
          </ol>
        </nav>
      }
      <div class="d-flex align-items-start justify-content-between flex-wrap gap-2">
        <div>
          <h1 class="h4 fw-bold mb-0">
            @if (icon()) { <i class="bi me-2" [ngClass]="[icon()!, 'text-' + iconColor()]"></i> }
            {{ title() }}
          </h1>
          @if (subtitle()) {
            <p class="text-muted small mb-0 mt-1">{{ subtitle() }}</p>
          }
        </div>
        <ng-content select="[pageActions]" />
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(14px); }
      to { opacity: 1; transform: translateY(0); }
    }

    :host {
      display: block;
      animation: fadeUp 0.45s ease-out;
    }

    .h4 {
      color: #1f2937;
    }

    .breadcrumb-item + .breadcrumb-item::before {
      color: #bbf7d0;
    }

    .breadcrumb-item.active {
      color: #15803d;
      font-weight: 600;
    }

    .breadcrumb-item a {
      color: #6b7280;
      transition: color 0.2s ease;
    }

    .breadcrumb-item a:hover {
      color: #15803d;
    }
  `]
})
export class PageHeaderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
  readonly icon = input<string | null>(null);
  readonly iconColor = input<string>('primary');
  readonly breadcrumbs = input<Breadcrumb[]>([]);
}