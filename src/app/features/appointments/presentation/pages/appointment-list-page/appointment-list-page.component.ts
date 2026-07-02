import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppointmentsFacade } from '../../../application/facades/appointments.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { AppointmentCardComponent } from '../../components/appointment-card/appointment-card.component';
import { AppointmentFilterComponent } from '../../components/appointment-filter/appointment-filter.component';
import { AppointmentFilter } from '../../../domain/models/appointment-filter.model';

@Component({
  selector: 'hms-appointment-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, AppointmentCardComponent, AppointmentFilterComponent],
  templateUrl: './appointment-list-page.component.html',
  styleUrl: './appointment-list-page.component.scss',
})
export class AppointmentListPageComponent implements OnInit {
  readonly facade = inject(AppointmentsFacade);
  private readonly layout = inject(LayoutService);

  ngOnInit(): void {
    this.layout.setPageTitle('Appointments', 'المواعيد');
    this.facade.loadAll();
  }

  onFilterChanged(filter: Partial<AppointmentFilter>): void {
    this.facade.applyFilter({ ...this.facade.filter(), ...filter, page: 1 });
  }

  onFilterReset(): void { this.facade.loadAll(); }

  onConfirm(id: string): void { this.facade.confirm(id).subscribe(); }

  onCancel(id: string): void {
    const reason = prompt('سبب الإلغاء:');
    if (reason) this.facade.cancel(id, reason).subscribe();
  }

  onComplete(id: string): void { this.facade.complete(id).subscribe(); }

  onPageChange(page: number): void { this.facade.changePage(page); }

  get pages(): number[] {
    return Array.from({ length: this.facade.totalPages() }, (_, i) => i + 1);
  }
}