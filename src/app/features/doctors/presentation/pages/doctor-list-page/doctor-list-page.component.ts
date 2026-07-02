import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DoctorsFacade } from '../../../application/facades/doctors.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { DoctorCardComponent } from '../../components/doctor-card/doctor-card.component';
import { DoctorFilterComponent } from '../../components/doctor-filter/doctor-filter.component';
import { DoctorFilter } from '../../../domain/models/doctor-filter.model';

@Component({
  selector: 'hms-doctor-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, DoctorCardComponent, DoctorFilterComponent],
  templateUrl: './doctor-list-page.component.html',
  styleUrl: './doctor-list-page.component.scss',
})
export class DoctorListPageComponent implements OnInit {
  readonly facade = inject(DoctorsFacade);
  private readonly layout = inject(LayoutService);

  ngOnInit(): void {
    this.layout.setPageTitle('Doctors', 'الأطباء');
    this.facade.loadAll();
  }

  onFilterChanged(filter: Partial<DoctorFilter>): void {
    this.facade.applyFilter({ ...this.facade.filter(), ...filter, page: 1 });
  }

  onFilterReset(): void { this.facade.loadAll(); }

  onDelete(id: string): void {
    if (!confirm('هل أنت متأكد من حذف هذا الطبيب؟')) return;
    this.facade.delete(id).subscribe();
  }

  onPageChange(page: number): void { this.facade.changePage(page); }

  get pages(): number[] {
    return Array.from({ length: this.facade.totalPages() }, (_, i) => i + 1);
  }
}