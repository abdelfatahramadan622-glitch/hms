import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { LabResultsFacade } from '../../../application/facades/lab-results.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { LAB_STATUS_CONFIG } from '../../../domain/models/lab-result.model';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'hms-lab-result-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './lab-result-list-page.component.html',
  styleUrl: './lab-result-list-page.component.scss',
})
export class LabResultListPageComponent implements OnInit {
  readonly facade = inject(LabResultsFacade);
  private readonly layout = inject(LayoutService);
  private readonly fb = inject(FormBuilder);

  readonly statusConfig = LAB_STATUS_CONFIG;

  searchForm = this.fb.group({ search: [''], status: [''] });

  ngOnInit(): void {
    this.layout.setPageTitle('Lab Results', 'نتائج المختبر');
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

  onApprove(id: string): void { this.facade.approve(id).subscribe(); }

  onReject(id: string): void {
    const reason = prompt('سبب الرفض:');
    if (reason) this.facade.reject(id, reason).subscribe();
  }

  onDelete(id: string): void {
    if (!confirm('هل أنت متأكد من حذف هذه النتيجة؟')) return;
    this.facade.delete(id).subscribe();
  }

  onPageChange(page: number): void { this.facade.changePage(page); }
  get pages(): number[] {
    return Array.from({ length: this.facade.totalPages() }, (_, i) => i + 1);
  }

  hasCriticalTest(result: { tests: Array<{ isCritical: boolean }> }): boolean {
    return result.tests.some((t) => t.isCritical);
  }

  hasAbnormalTest(result: { tests: Array<{ isAbnormal: boolean }> }): boolean {
    return result.tests.some((t) => t.isAbnormal);
  }
}