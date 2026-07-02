import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AppointmentsFacade } from '../../../application/facades/appointments.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { AppointmentFormComponent } from '../../components/appointment-form/appointment-form.component';
import { CreateAppointmentRequest } from '../../../domain/repositories/appointment.repository';

@Component({
  selector: 'hms-appointment-form-page',
  standalone: true,
  imports: [CommonModule, RouterModule, AppointmentFormComponent],
  template: `
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb small">
        <li class="breadcrumb-item"><a routerLink="/appointments" class="text-decoration-none">المواعيد</a></li>
        <li class="breadcrumb-item active">{{ isEditMode ? 'تعديل الموعد' : 'إضافة موعد جديد' }}</li>
      </ol>
    </nav>

    <h1 class="h4 fw-bold mb-4">
      <i class="bi me-2"
        [class.bi-calendar-plus-fill]="!isEditMode"
        [class.bi-pencil-square]="isEditMode"
        [class.text-primary]="!isEditMode"
        [class.text-warning]="isEditMode"></i>
      {{ isEditMode ? 'تعديل الموعد' : 'إضافة موعد جديد' }}
    </h1>

    @if (facade.hasError()) {
      <div class="alert alert-danger d-flex gap-2 align-items-center mb-4">
        <i class="bi bi-exclamation-circle-fill"></i>{{ facade.error() }}
        <button class="btn-close ms-auto" (click)="facade.clearError()"></button>
      </div>
    }

    @if (isEditMode && facade.isDetailLoading()) {
      <div class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
      </div>
    } @else {
      <hms-appointment-form
        [appointment]="isEditMode ? facade.selectedAppointment() : null"
        [isSaving]="facade.isSaving()"
        [prefillPatientId]="prefillPatientId"
        [prefillDoctorId]="prefillDoctorId"
        (submitted)="onSubmit($event)"
        (cancelled)="onCancel()"
      />
    }
  `,
})
export class AppointmentFormPageComponent implements OnInit {
  readonly facade = inject(AppointmentsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  appointmentId: string | null = null;
  prefillPatientId = '';
  prefillDoctorId = '';

  get isEditMode(): boolean { return !!this.appointmentId; }

  ngOnInit(): void {
    this.appointmentId = this.route.snapshot.paramMap.get('id');
    this.prefillPatientId = this.route.snapshot.queryParams['patientId'] ?? '';
    this.prefillDoctorId = this.route.snapshot.queryParams['doctorId'] ?? '';

    if (this.isEditMode) {
      this.facade.loadById(this.appointmentId!);
      this.layout.setPageTitle('Edit Appointment', 'تعديل الموعد');
    } else {
      this.layout.setPageTitle('New Appointment', 'إضافة موعد جديد');
    }
  }

  onSubmit(request: CreateAppointmentRequest): void {
    const action$ = this.isEditMode
      ? this.facade.update(this.appointmentId!, request)
      : this.facade.create(request);
    action$.subscribe({ next: (a) => this.nav.goTo(`/appointments/${a.id}`) });
  }

  onCancel(): void {
    this.isEditMode
      ? this.nav.goTo(`/appointments/${this.appointmentId}`)
      : this.nav.goTo('/appointments');
  }
}