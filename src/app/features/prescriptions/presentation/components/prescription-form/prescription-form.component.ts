import { Component, inject, input, output, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PrescriptionModel } from '../../../domain/models/prescription.model';
import { CreatePrescriptionRequest } from '../../../domain/repositories/prescription.repository';
import { MEDICATION_FORMS, MEDICATION_ROUTES, DURATION_UNITS } from '../../../domain/models/prescription-filter.model';

@Component({
  selector: 'hms-prescription-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './prescription-form.component.html',
  styleUrl: './prescription-form.component.scss',
})
export class PrescriptionFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  readonly prescription = input<PrescriptionModel | null>(null);
  readonly isSaving = input<boolean>(false);
  readonly prefillPatientId = input<string>('');
  readonly submitted = output<CreatePrescriptionRequest>();
  readonly cancelled = output<void>();

  readonly medicationForms = MEDICATION_FORMS;
  readonly medicationRoutes = MEDICATION_ROUTES;
  readonly durationUnits = DURATION_UNITS;

  form = this.fb.group({
    patientId:   ['', Validators.required],
    doctorId:    ['', Validators.required],
    expiresAt:   ['', Validators.required],
    diagnosis:   [''],
    notes:       [''],
    medications: this.fb.array([]),
  });

  get medicationsArray(): FormArray { return this.form.get('medications') as FormArray; }
  get f() { return this.form.controls; }
  get isEdit(): boolean { return !!this.prescription(); }

  ngOnInit(): void {
    const p = this.prescription();
    if (p) {
      this.form.patchValue({
        patientId: p.patientId, doctorId: p.doctorId,
        expiresAt: p.expiresAt.split('T')[0],
        diagnosis: p.diagnosis ?? '', notes: p.notes ?? '',
      });
      p.medications.forEach((med) => this.addMedication(med));
    } else {
      if (this.prefillPatientId()) this.form.patchValue({ patientId: this.prefillPatientId() });
      const defaultExpiry = new Date();
      defaultExpiry.setDate(defaultExpiry.getDate() + 30);
      this.form.patchValue({ expiresAt: defaultExpiry.toISOString().split('T')[0] });
      this.addMedication();
    }
  }

  addMedication(med?: any): void {
    this.medicationsArray.push(this.fb.group({
      name:                   [med?.name ?? '',       Validators.required],
      genericName:            [med?.genericName ?? ''],
      form:                   [med?.form ?? 'أقراص',  Validators.required],
      strength:               [med?.strength ?? '',   Validators.required],
      quantity:               [med?.quantity ?? 1,    [Validators.required, Validators.min(1)]],
      unit:                   [med?.unit ?? 'علبة',   Validators.required],
      frequency:              [med?.dosage?.frequency ?? 1, [Validators.required, Validators.min(1)]],
      times:                  [med?.dosage?.times?.join(', ') ?? ''],
      route:                  [med?.dosage?.route ?? 'فموي', Validators.required],
      withFood:               [med?.dosage?.withFood ?? false],
      duration:               [med?.duration ?? 7,   [Validators.required, Validators.min(1)]],
      durationUnit:           [med?.durationUnit ?? 'days', Validators.required],
      instructions:           [med?.instructions ?? ''],
      isSubstitutionAllowed:  [med?.isSubstitutionAllowed ?? false],
    }));
  }

  removeMedication(index: number): void {
    if (this.medicationsArray.length > 1) this.medicationsArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.getRawValue();
    this.submitted.emit({
      patientId:  v.patientId!,
      doctorId:   v.doctorId!,
      expiresAt:  v.expiresAt!,
      diagnosis:  v.diagnosis || undefined,
      notes:      v.notes || undefined,
      medications: (v.medications as any[]).map((m) => ({
        name:                   m.name,
        genericName:            m.genericName || undefined,
        form:                   m.form,
        strength:               m.strength,
        quantity:               m.quantity,
        unit:                   m.unit,
        frequency:              m.frequency,
        times:                  m.times ? m.times.split(',').map((t: string) => t.trim()) : [],
        route:                  m.route,
        withFood:               m.withFood,
        duration:               m.duration,
        durationUnit:           m.durationUnit,
        instructions:           m.instructions || undefined,
        isSubstitutionAllowed:  m.isSubstitutionAllowed,
      })),
    });
  }
}