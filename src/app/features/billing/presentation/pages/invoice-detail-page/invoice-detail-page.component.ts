import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { BillingFacade } from '../../../application/facades/billing.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { InvoiceItemsTableComponent } from '../../components/invoice-items-table/invoice-items-table.component';
import { PaymentFormComponent } from '../../components/payment-form/payment-form.component';
import { INVOICE_STATUS_CONFIG, PAYMENT_METHOD_LABELS } from '../../../domain/models/invoice.model';
import { formatCurrency } from '../../../domain/entities/invoice.entity';
import { CreatePaymentRequest } from '../../../domain/models/billing-filter.model';

@Component({
  selector: 'hms-invoice-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, InvoiceItemsTableComponent, PaymentFormComponent],
  templateUrl: './invoice-detail-page.component.html',
  styleUrl: './invoice-detail-page.component.scss',
})
export class InvoiceDetailPageComponent implements OnInit, OnDestroy {
  readonly facade = inject(BillingFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  readonly statusConfig = INVOICE_STATUS_CONFIG;
  readonly methodLabels = PAYMENT_METHOD_LABELS;
  readonly fmt = formatCurrency;
  showPaymentForm = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.facade.loadById(id);
    this.layout.setPageTitle('Invoice', 'تفاصيل الفاتورة');
  }

  ngOnDestroy(): void { this.facade.clearSelected(); }

  onIssue(): void { const inv = this.facade.selectedInvoice(); if (inv) this.facade.issue(inv.id).subscribe(); }

  onCancel(): void {
    const inv = this.facade.selectedInvoice();
    if (!inv) return;
    const reason = prompt('سبب الإلغاء:');
    if (reason) this.facade.cancel(inv.id, reason).subscribe();
  }

  onRefund(): void {
    const inv = this.facade.selectedInvoice();
    if (!inv) return;
    const reason = prompt('سبب الاسترداد:');
    if (reason) this.facade.refund(inv.id, reason).subscribe();
  }

  onDelete(): void {
    const inv = this.facade.selectedInvoice();
    if (!inv || !confirm('هل أنت متأكد من حذف هذه الفاتورة؟')) return;
    this.facade.delete(inv.id).subscribe({ next: () => this.nav.goTo('/billing/invoices') });
  }

  onPaymentSubmit(req: CreatePaymentRequest): void {
    this.facade.processPayment(req).subscribe({
      next: () => this.showPaymentForm.set(false),
    });
  }

  paymentPercent(inv: any): number {
    return inv.totalAmount > 0 ? Math.round((inv.paidAmount / inv.totalAmount) * 100) : 0;
  }
}