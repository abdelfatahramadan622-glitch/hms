import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AppointmentsFacade } from '../../../application/facades/appointments.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { AppointmentStatusBadgeComponent } from '../../components/appointment-status-badge/appointment-status-badge.component';
import { APPOINTMENT_TYPE_LABELS } from '../../../domain/models/appointment.model';

@Component({
  selector: 'hms-appointment-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, AppointmentStatusBadgeComponent],
  templateUrl: './appointment-detail-page.component.html',
  styleUrl: './appointment-detail-page.component.scss',
})
export class AppointmentDetailPageComponent implements OnInit, OnDestroy {
  readonly facade = inject(AppointmentsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  readonly typeLabels = APPOINTMENT_TYPE_LABELS;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.facade.loadById(id);
    this.layout.setPageTitle('Appointment Detail', 'تفاصيل الموعد');
  }

  ngOnDestroy(): void { this.facade.clearSelected(); }

  onConfirm(): void {
    const a = this.facade.selectedAppointment();
    if (a) this.facade.confirm(a.id).subscribe();
  }

  onCancel(): void {
    const a = this.facade.selectedAppointment();
    if (!a) return;
    const reason = prompt('سبب الإلغاء:');
    if (reason) this.facade.cancel(a.id, reason).subscribe();
  }

  onComplete(): void {
    const a = this.facade.selectedAppointment();
    if (a) this.facade.complete(a.id).subscribe();
  }

  onDelete(): void {
    const a = this.facade.selectedAppointment();
    if (!a || !confirm('هل أنت متأكد من حذف هذا الموعد؟')) return;
    this.facade.delete(a.id).subscribe({ next: () => this.nav.goTo('/appointments') });
  }

  formatCurrency(v: number): string {
    return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(v);
  }
}