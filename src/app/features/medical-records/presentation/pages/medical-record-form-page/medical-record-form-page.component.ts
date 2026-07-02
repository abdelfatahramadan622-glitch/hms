import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MedicalRecordsFacade } from '../../../application/facades/medical-records.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { MedicalRecordFormComponent } from '../../components/medical-record-form/medical-record-form.component';
import { CreateMedicalRecordRequest } from '../../../domain/repositories/medical-record.repository';

@Component({
  selector: 'hms-medical-record-form-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MedicalRecordFormComponent],
  template: `
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb small">
        <li class="breadcrumb-item"><a routerLink="/medical-records" class="text-decoration-none">السجلات الطبية</a></li>
        <li class="breadcrumb-item active">{{ isEdit ? 'تعديل' : 'إنشاء' }}</li>
      </ol>
    </nav>
    <h1 class="h4 fw-bold mb-4">
      <i class="bi me-2" [class.bi-file-plus-fill]="!isEdit" [class.bi-pencil-square]="isEdit"
        [class.text-primary]="!isEdit" [class.text-warning]="isEdit"></i>
      {{ isEdit ? 'تعديل السجل الطبي' : 'إنشاء سجل طبي جديد' }}
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
      <hms-medical-record-form
        [record]="isEdit ? facade.selectedRecord() : null"
        [isSaving]="facade.isSaving()"
        [prefillPatientId]="prefillPatientId"
        (submitted)="onSubmit($event)"
        (cancelled)="onCancel()"
      />
    }
  `,
})
export class MedicalRecordFormPageComponent implements OnInit {
  readonly facade = inject(MedicalRecordsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  recordId: string | null = null;
  prefillPatientId = '';

  get isEdit(): boolean { return !!this.recordId; }

  ngOnInit(): void {
    this.recordId = this.route.snapshot.paramMap.get('id');
    this.prefillPatientId = this.route.snapshot.queryParams['patientId'] ?? '';
    if (this.isEdit) {
      this.facade.loadById(this.recordId!);
      this.layout.setPageTitle('Edit Medical Record', 'تعديل السجل الطبي');
    } else {
      this.layout.setPageTitle('New Medical Record', 'إنشاء سجل طبي');
    }
  }

  onSubmit(req: CreateMedicalRecordRequest): void {
    const action$ = this.isEdit
      ? this.facade.update(this.recordId!, req)
      : this.facade.create(req);
    action$.subscribe({ next: (r) => this.nav.goTo(`/medical-records/${r.id}`) });
  }

  onCancel(): void {
    this.isEdit ? this.nav.goTo(`/medical-records/${this.recordId}`) : this.nav.goTo('/medical-records');
  }
}