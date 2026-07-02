import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { PrescriptionsFacade } from '../../../application/facades/prescriptions.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { PRESCRIPTION_STATUS_CONFIG } from '../../../domain/models/prescription.model';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'hms-prescription-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './prescription-list-page.component.html',
  styleUrl: './prescription-list-page.component.scss',
})
export class PrescriptionListPageComponent implements OnInit {
  readonly facade = inject(PrescriptionsFacade);
  private readonly layout = inject(LayoutService);
  private readonly fb = inject(FormBuilder);

  readonly statusConfig = PRESCRIPTION_STATUS_CONFIG;
  searchForm = this.fb.group({ search: [''], status: [''] });

  ngOnInit(): void {
    this.layout.setPageTitle('Prescriptions', 'الوصفات الطبية');
    this.facade.loadAll();
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

  onDispense(id: string): void {
    if (!confirm('هل تريد تأكيد صرف هذه الوصفة؟')) return;
    this.facade.dispense(id).subscribe();
  }

  onCancel(id: string): void {
    const reason = prompt('سبب الإلغاء:');
    if (reason) this.facade.cancel(id, reason).subscribe();
  }

  onDelete(id: string): void {
    if (!confirm('هل أنت متأكد من حذف هذه الوصفة؟')) return;
    this.facade.delete(id).subscribe();
  }

  onPageChange(page: number): void { this.facade.changePage(page); }
  get pages(): number[] {
    return Array.from({ length: this.facade.totalPages() }, (_, i) => i + 1);
  }

  isExpired(expiresAt: string): boolean {
    return new Date(expiresAt) < new Date();
  }
}