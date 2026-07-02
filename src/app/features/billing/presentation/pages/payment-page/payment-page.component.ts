import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { BillingFacade } from '../../../application/facades/billing.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { PaymentFormComponent } from '../../components/payment-form/payment-form.component';
import { CreatePaymentRequest } from '../../../domain/models/billing-filter.model';
import { formatCurrency } from '../../../domain/entities/invoice.entity';

@Component({
  selector: 'hms-payment-page',
  standalone: true,
  imports: [CommonModule, RouterModule, PaymentFormComponent],
  styles: [`
    :host { display: block; animation: fadeUp 0.4s ease both; }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

    .breadcrumb-item a { color: #15803d; text-decoration: none; &:hover { color: #0d9488; } }
    .breadcrumb-item.active { color: #6b9a7e; }

    .h4 { color: #14532d; i { color: #16a34a; margin-left: 0.5rem; } }

    // Summary Card
    .summary-card {
      border-radius: 16px !important; border: 1px solid #e8f5ec !important;
      box-shadow: 0 4px 16px rgba(22, 101, 52, 0.06) !important;
      border-top: 3px solid #16a34a;
    }
    .summary-card .card-body { padding: 1.25rem 1.5rem !important; }
    
    // Spacing fix: Gap between summary blocks
    .summary-blocks {
      display: flex; align-items: flex-start; justify-content: space-between;
      flex-wrap: wrap; gap: 1.5rem;
    }
    .summary-block { text-align: center; min-width: 100px; }
    .summary-block .text-muted { font-size: 0.78rem; color: #6b9a7e !important; margin-bottom: 0.25rem; }
    .summary-block .fw-bold { font-size: 1.1rem; color: #14532d; }
    .summary-block .text-success { color: #15803d !important; }
    .summary-block .text-danger { color: #dc2626 !important; }

    .text-center .spinner-border { color: #16a34a !important; width: 3rem; height: 3rem; border-width: 3px; }

    .empty-state {
      i { font-size: 2.5rem; color: #a3c4b0; }
      p { color: #6b9a7e; }
      .btn {
        border-radius: 12px; font-weight: 600; border: none;
        background: linear-gradient(135deg, #15803d, #16a34a); color: #fff;
        box-shadow: 0 4px 14px rgba(22, 101, 52, 0.25); transition: all 0.3s;
        &:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(22, 101, 52, 0.3); color: #fff; }
      }
    }
  `],
  template: `
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb small">
        <li class="breadcrumb-item"><a routerLink="/billing/invoices" class="text-decoration-none">الفواتير</a></li>
        <li class="breadcrumb-item active">تسجيل دفعة</li>
      </ol>
    </nav>

    <h1 class="h4 fw-bold mb-4">
      <i class="fa-solid fa-credit-card"></i>تسجيل دفعة
    </h1>

    @if (facade.isDetailLoading()) {
      <div class="text-center py-5"><div class="spinner-border" role="status"></div></div>
    } @else {
      @if (facade.selectedInvoice(); as inv) {
        <div class="card border-0 shadow-sm mb-4 summary-card">
          <div class="card-body p-3">
            <div class="summary-blocks">
              <div class="summary-block">
                <div class="text-muted">الإجمالي</div>
                <div class="fw-bold" dir="ltr">{{ fmt(inv.totalAmount) }}</div>
              </div>
              <div class="summary-block">
                <div class="text-muted">المدفوع</div>
                <div class="fw-bold text-success" dir="ltr">{{ fmt(inv.paidAmount) }}</div>
              </div>
              <div class="summary-block">
                <div class="text-muted">المتبقي</div>
                <div class="fw-bold text-danger" dir="ltr">{{ fmt(inv.remainingAmount) }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-12 col-md-8 col-lg-6">
            <hms-payment-form
              [invoiceId]="inv.id"
              [remainingAmount]="inv.remainingAmount"
              [isProcessing]="facade.isProcessingPayment()"
              (submitted)="onSubmit($event)"
              (cancelled)="nav.goTo('/billing/invoices/' + inv.id)"
            />
          </div>
        </div>
      } @else {
        <div class="text-center py-5 empty-state">
          <i class="fa-regular fa-file-lines d-block mb-3"></i>
          <p class="mb-4">لم يتم تحديد فاتورة</p>
          <a routerLink="/billing/invoices" class="btn px-4 py-2">عرض الفواتير</a>
        </div>
      }
    }
  `,
})
export class PaymentPageComponent implements OnInit {
  readonly facade = inject(BillingFacade);
  readonly nav = inject(NavigationService);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);

  readonly fmt = formatCurrency;

  ngOnInit(): void {
    this.layout.setPageTitle('Payment', 'تسجيل دفعة');
    const invoiceId = this.route.snapshot.queryParams['invoiceId'];
    if (invoiceId) this.facade.loadById(invoiceId);
  }

  onSubmit(req: CreatePaymentRequest): void {
    this.facade.processPayment(req).subscribe({
      next: () => this.nav.goTo(`/billing/invoices/${req.invoiceId}`),
    });
  }
}