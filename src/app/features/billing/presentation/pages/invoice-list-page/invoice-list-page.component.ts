import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BillingFacade } from '../../../application/facades/billing.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { BillingSummaryComponent } from '../../components/billing-summary/billing-summary.component';
import { INVOICE_STATUS_CONFIG } from '../../../domain/models/invoice.model';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { formatCurrency } from '../../../domain/entities/invoice.entity';

@Component({
  selector: 'hms-invoice-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, BillingSummaryComponent],
  templateUrl: './invoice-list-page.component.html',
  styleUrl: './invoice-list-page.component.scss',
})
export class InvoiceListPageComponent implements OnInit {
  readonly facade = inject(BillingFacade);
  private readonly layout = inject(LayoutService);
  private readonly fb = inject(FormBuilder);

  readonly statusConfig = INVOICE_STATUS_CONFIG;
  readonly fmt = formatCurrency;

  searchForm = this.fb.group({ search: [''], status: [''] });

  ngOnInit(): void {
    this.layout.setPageTitle('Billing', 'الفواتير');
    this.facade.loadAll();
    this.facade.loadSummary();
    this.searchForm.get('search')!.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.applyFilter());
    this.searchForm.valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.applyFilter());
  }

  applyFilter(): void {
    const v = this.searchForm.value;
    this.facade.applyFilter({
      ...this.facade.filter(),
      search: v.search ?? '',
      status: (v.status as any) || undefined,
      page: 1,
    });
  }

  onIssue(id: string): void { this.facade.issue(id).subscribe(); }

  onCancel(id: string): void {
    const reason = prompt('سبب الإلغاء:');
    if (reason) this.facade.cancel(id, reason).subscribe();
  }

  onDelete(id: string): void {
    if (!confirm('هل أنت متأكد من حذف هذه الفاتورة؟')) return;
    this.facade.delete(id).subscribe();
  }

  onPageChange(page: number): void { this.facade.changePage(page); }

  get pages(): number[] {
    return Array.from({ length: this.facade.totalPages() }, (_, i) => i + 1);
  }
}