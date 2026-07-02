import { Component, inject, input, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MedicalRecordModel, RECORD_TYPE_LABELS, RecordType } from '../../../domain/models/medical-record.model';
import { CreateMedicalRecordRequest } from '../../../domain/repositories/medical-record.repository';

@Component({
  selector: 'hms-medical-record-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './medical-record-form.component.html',
  styleUrl: './medical-record-form.component.scss',
})
export class MedicalRecordFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  readonly record = input<MedicalRecordModel | null>(null);
  readonly isSaving = input<boolean>(false);
  readonly prefillPatientId = input<string>('');
  readonly submitted = output<CreateMedicalRecordRequest>();
  readonly cancelled = output<void>();

  readonly typeLabels = RECORD_TYPE_LABELS;
  readonly types = Object.keys(RECORD_TYPE_LABELS) as RecordType[];

  form = this.fb.group({
    patientId:            ['', Validators.required],
    doctorId:             ['', Validators.required],
    departmentId:         ['', Validators.required],
    type:                 ['visit', Validators.required],
    visitDate:            ['', Validators.required],
    chiefComplaint:       ['', [Validators.required, Validators.minLength(5)]],
    presentIllness:       ['', Validators.required],
    physicalExamination:  [''],
    treatmentPlan:        [''],
    followUpDate:         [''],
    followUpNotes:        [''],
    notes:                [''],
  });

  get f() { return this.form.controls; }
  get isEdit(): boolean { return !!this.record(); }

  ngOnInit(): void {
    const r = this.record();
    if (r) {
      this.form.patchValue({
        patientId: r.patientId, doctorId: r.doctorId, departmentId: r.departmentId,
        type: r.type, visitDate: r.visitDate, chiefComplaint: r.chiefComplaint,
        presentIllness: r.presentIllness, physicalExamination: r.physicalExamination ?? '',
        treatmentPlan: r.treatmentPlan ?? '', followUpDate: r.followUpDate ?? '',
        followUpNotes: r.followUpNotes ?? '', notes: r.notes ?? '',
      });
    } else if (this.prefillPatientId()) {
      this.form.patchValue({ patientId: this.prefillPatientId() });
    }
    // Default date to today
    if (!r) this.form.patchValue({ visitDate: new Date().toISOString().split('T')[0] });
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.getRawValue();
    this.submitted.emit({
      patientId: v.patientId!, doctorId: v.doctorId!, departmentId: v.departmentId!,
      type: v.type!, visitDate: v.visitDate!, chiefComplaint: v.chiefComplaint!,
      presentIllness: v.presentIllness!, physicalExamination: v.physicalExamination || undefined,
      treatmentPlan: v.treatmentPlan || undefined, followUpDate: v.followUpDate || undefined,
      followUpNotes: v.followUpNotes || undefined, notes: v.notes || undefined,
    });
  }
}