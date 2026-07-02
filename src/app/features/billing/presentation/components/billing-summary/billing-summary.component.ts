import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingSummary } from '../../../domain/repositories/billing.repository';
import { formatCurrency } from '../../../domain/entities/invoice.entity';

@Component({
  selector: 'hms-billing-summary',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    :host { display: block; animation: fadeUp 0.4s ease both; }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

    .row { --bs-gutter-x: 1rem; }

    .card {
      border-radius: 16px !important; border: 1px solid #e8f5ec !important;
      box-shadow: 0 2px 8px rgba(22, 101, 52, 0.05) !important;
      background: #fff; transition: all 0.3s ease;
      overflow: hidden; position: relative;

      &::before {
        content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
        border-radius: 16px 16px 0 0;
      }

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(22, 101, 52, 0.1) !important;
      }
    }

    // ألوان الشريط العلوي لكل كارت
    .col-6:nth-child(1) .card::before { background: #16a34a; }
    .col-6:nth-child(2) .card::before { background: #0ea5e9; }
    .col-6:nth-child(3) .card::before { background: #f59e0b; }
    .col-6:nth-child(4) .card::before { background: #ef4444; }

    .card-body { padding: 1.25rem !important; }

    .fs-5 { font-weight: 800; letter-spacing: -0.02em; }
    .text-success { color: #15803d !important; }
    .text-primary { color: #0e7490 !important; }
    .text-warning { color: #b45309 !important; }
    .text-danger { color: #b91c1c !important; }

    .text-muted {
      color: #6b9a7e !important; font-size: 0.8rem; font-weight: 500;
    }
  `],
  template: `
    <div class="row g-3">
      @for (card of cards(); track card.label) {
        <div class="col-6 col-lg-3">
          <div class="card border-0 shadow-sm">
            <div class="card-body p-3 text-center">
              <div class="fw-bold fs-5" [ngClass]="card.color" dir="ltr">{{ card.value }}</div>
              <div class="text-muted">{{ card.label }}</div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class BillingSummaryComponent {
  readonly summary = input<BillingSummary | null>(null);

  cards() {
    const s = this.summary();
    if (!s) return [];
    return [
      { label: 'إجمالي الإيرادات',   value: formatCurrency(s.totalRevenue),     color: 'text-success' },
      { label: 'المبالغ المحصَّلة',   value: formatCurrency(s.totalPaid),        color: 'text-primary' },
      { label: 'المبالغ المستحقة',    value: formatCurrency(s.totalOutstanding), color: 'text-warning' },
      { label: 'المبالغ المتأخرة',    value: formatCurrency(s.totalOverdue),     color: 'text-danger' },
    ];
  }
}