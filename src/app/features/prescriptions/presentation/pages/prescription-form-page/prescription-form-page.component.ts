import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PrescriptionsFacade } from '../../../application/facades/prescriptions.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { PrescriptionFormComponent } from '../../components/prescription-form/prescription-form.component';
import { CreatePrescriptionRequest } from '../../../domain/repositories/prescription.repository';

@Component({
  selector: 'hms-prescription-form-page',
  standalone: true,
  imports: [CommonModule, RouterModule, PrescriptionFormComponent],
  styles: [`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
      20%, 40%, 60%, 80% { transform: translateX(4px); }
    }
    :host {
      display: block;
      animation: fadeUp 0.5s ease-out;
    }
    .breadcrumb .breadcrumb-item a {
      color: #15803d;
      transition: color 0.2s ease;
    }
    .breadcrumb .breadcrumb-item a:hover {
      color: #22c55e;
    }
    .breadcrumb .breadcrumb-item.active {
      color: #6b7280;
    }
    .h4 .bi-file-plus-fill {
      color: #15803d !important;
    }
    .h4 .bi-pencil-square {
      color: #d97706 !important;
    }
    .alert-danger {
      border-radius: 12px;
      border: none;
      background: linear-gradient(135deg, #fef2f2, #fee2e2);
      color: #991b1b;
      padding: 14px 20px;
      animation: shake 0.5s ease-in-out;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.1);
    }
    .spinner-border.text-primary {
      color: #22c55e !important;
    }
  `],
  template: `
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb small">
        <li class="breadcrumb-item"><a routerLink="/prescriptions" class="text-decoration-none">الوصفات الطبية</a></li>
        <li class="breadcrumb-item active">{{ isEdit ? 'تعديل' : 'وصفة جديدة' }}</li>
      </ol>
    </nav>
    <h1 class="h4 fw-bold mb-4">
      <i class="bi me-2"
        [class.bi-file-plus-fill]="!isEdit"
        [class.bi-pencil-square]="isEdit"
        [class.text-primary]="!isEdit"
        [class.text-warning]="isEdit"></i>
      {{ isEdit ? 'تعديل الوصفة الطبية' : 'إصدار وصفة طبية جديدة' }}
    </h1>
    @if (facade.hasError()) {
      <div class="alert alert-danger d-flex gap-2 align-items-center mb-4">
        <i class="bi bi-exclamation-circle-fill"></i>{{ facade.error() }}
        <button class="btn-close ms-auto" (click)="facade.clearError()"></button>
      </div>
    }
    @if (isEdit && facade.isDetailLoading()) {
      <div class="text-center py-5"><div class="spinner-border text-primary" role="status"></div></div>
    } @else {
      <hms-prescription-form
        [prescription]="isEdit ? facade.selectedPrescription() : null"
        [isSaving]="facade.isSaving()"
        [prefillPatientId]="prefillPatientId"
        (submitted)="onSubmit($event)"
        (cancelled)="onCancel()"
      />
    }
  `,
})
export class PrescriptionFormPageComponent implements OnInit {
  readonly facade = inject(PrescriptionsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  prescriptionId: string | null = null;
  prefillPatientId = '';

  get isEdit(): boolean { return !!this.prescriptionId; }

  ngOnInit(): void {
    this.prescriptionId = this.route.snapshot.paramMap.get('id');
    this.prefillPatientId = this.route.snapshot.queryParams['patientId'] ?? '';
    if (this.isEdit) {
      this.facade.loadById(this.prescriptionId!);
      this.layout.setPageTitle('Edit Prescription', 'تعديل الوصفة الطبية');
    } else {
      this.layout.setPageTitle('New Prescription', 'وصفة طبية جديدة');
    }
  }

  onSubmit(req: CreatePrescriptionRequest): void {
    const action$ = this.isEdit
      ? this.facade.update(this.prescriptionId!, req)
      : this.facade.create(req);
    action$.subscribe({ next: (p) => this.nav.goTo(`/prescriptions/${p.id}`) });
  }

  onCancel(): void {
    this.isEdit ? this.nav.goTo(`/prescriptions/${this.prescriptionId}`) : this.nav.goTo('/prescriptions');
  }
}