import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PatientsFacade } from '../../../application/facades/patients.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { PatientCardComponent } from '../../components/patient-card/patient-card.component';
import { PatientFilterComponent } from '../../components/patient-filter/patient-filter.component';
import { PatientFilter } from '../../../domain/models/patient-filter.model';

@Component({
  selector: 'hms-patient-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, PatientCardComponent, PatientFilterComponent],
  templateUrl: './patient-list-page.component.html',
  styleUrl: './patient-list-page.component.scss',
})
export class PatientListPageComponent implements OnInit {
  readonly facade = inject(PatientsFacade);
  private readonly layout = inject(LayoutService);

  ngOnInit(): void {
    this.layout.setPageTitle('Patients', 'المرضى');
    this.facade.loadAll();
  }

  onFilterChanged(filter: Partial<PatientFilter>): void {
    this.facade.applyFilter({ ...this.facade.filter(), ...filter, page: 1 });
  }

  onFilterReset(): void {
    this.facade.resetFilter();
  }

  onDelete(id: string): void {
    if (!confirm('هل أنت متأكد من حذف هذا المريض؟')) return;
    this.facade.delete(id).subscribe();
  }

  onPageChange(page: number): void {
    this.facade.changePage(page);
  }

  get pages(): number[] {
    return Array.from({ length: this.facade.totalPages() }, (_, i) => i + 1);
  }
}