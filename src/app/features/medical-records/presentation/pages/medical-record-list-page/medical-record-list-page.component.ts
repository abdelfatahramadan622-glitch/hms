import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MedicalRecordsFacade } from '../../../application/facades/medical-records.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { RECORD_TYPE_LABELS } from '../../../domain/models/medical-record.model';
import { MedicalRecordFilter } from '../../../domain/models/medical-record-filter.model';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'hms-medical-record-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './medical-record-list-page.component.html',
  styleUrl: './medical-record-list-page.component.scss',
})
export class MedicalRecordListPageComponent implements OnInit {
  readonly facade = inject(MedicalRecordsFacade);
  private readonly layout = inject(LayoutService);
  private readonly fb = inject(FormBuilder);

  readonly typeLabels = RECORD_TYPE_LABELS;

  searchForm = this.fb.group({ search: [''], type: [''], isClosed: [''] });

  ngOnInit(): void {
    this.layout.setPageTitle('Medical Records', 'السجلات الطبية');
    this.facade.loadAll();
    this.searchForm.get('search')!.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.applyFilter());
    this.searchForm.valueChanges.pipe(distinctUntilChanged())
      .subscribe(() => this.applyFilter());
  }

  applyFilter(): void {
    const v = this.searchForm.value;
    this.facade.applyFilter({
      ...this.facade.filter(),
      search: v.search ?? '',
      type: (v.type as any) || undefined,
      isClosed: v.isClosed ? v.isClosed === 'true' : undefined,
      page: 1,
    } as MedicalRecordFilter);
  }

  onDelete(id: string): void {
    if (!confirm('هل أنت متأكد من حذف هذا السجل الطبي؟')) return;
    this.facade.delete(id).subscribe();
  }

  onPageChange(page: number): void { this.facade.changePage(page); }

  get pages(): number[] {
    return Array.from({ length: this.facade.totalPages() }, (_, i) => i + 1);
  }
}