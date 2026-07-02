import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DetailItem { label: string; value: string | null | undefined; icon?: string; }

@Component({
  selector: 'hms-detail-card',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes cardIn {
      from { opacity: 0; transform: scale(0.97) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    :host {
      display: block;
      animation: fadeUp 0.45s ease-out;
    }
    .card {
      border-radius: 14px;
      animation: cardIn 0.45s ease-out both;
      transition: box-shadow 0.3s ease;
    }
    .card:hover {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    }
    .card-header {
      border-radius: 14px 14px 0 0;
      border-bottom-color: #dcfce7;
      h6 {
        color: #1f2937;
        font-size: 0.92rem;
      }
    }
    dl {
      dt {
        padding-bottom: 8px;
        color: #6b7280;
      }
      dd {
        padding-bottom: 8px;
        color: #1f2937;
        font-weight: 500;
        line-height: 1.7;
      }
    }
  `],
  template: `
    <div class="card border-0 shadow-sm h-100">
      <div class="card-header bg-white border-bottom py-3">
        <h6 class="mb-0 fw-bold">
          @if (icon()) { <i class="bi me-2" [ngClass]="icon()!"></i> }
          {{ title() }}
        </h6>
      </div>
      <div class="card-body">
        <dl class="row small mb-0">
          @for (item of items(); track item.label) {
            <dt class="col-5 text-muted fw-normal">{{ item.label }}</dt>
            <dd class="col-7 fw-semibold">{{ item.value ?? '—' }}</dd>
          }
        </dl>
        <ng-content />
      </div>
    </div>
  `,
})
export class DetailCardComponent {
  readonly title = input<string>('');
  readonly icon = input<string | null>(null);
  readonly items = input<DetailItem[]>([]);
}