import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DoctorsFacade } from '../../../application/facades/doctors.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { DOCTOR_STATUS_CONFIG, DAY_LABELS } from '../../../domain/models/doctor.model';

@Component({
  selector: 'hms-doctor-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './doctor-detail-page.component.html',
  styleUrl: './doctor-detail-page.component.scss',
})
export class DoctorDetailPageComponent implements OnInit, OnDestroy {
  readonly facade = inject(DoctorsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  readonly statusConfig = DOCTOR_STATUS_CONFIG;
  readonly dayLabels = DAY_LABELS;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.facade.loadById(id);
    this.layout.setPageTitle('Doctor Detail', 'تفاصيل الطبيب');
  }

  ngOnDestroy(): void { this.facade.clearSelected(); }

  onDelete(): void {
    const d = this.facade.selectedDoctor();
    if (!d || !confirm(`هل أنت متأكد من حذف الطبيب "${d.fullName}"؟`)) return;
    this.facade.delete(d.id).subscribe({ next: () => this.nav.goTo('/doctors') });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(amount);
  }
}