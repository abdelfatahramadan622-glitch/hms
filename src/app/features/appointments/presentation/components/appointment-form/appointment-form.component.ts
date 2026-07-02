import { Component, inject, input, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AppointmentModel, APPOINTMENT_TYPE_LABELS, AppointmentType } from '../../../domain/models/appointment.model';
import { CreateAppointmentRequest } from '../../../domain/repositories/appointment.repository';

@Component({
  selector: 'hms-appointment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss',
})
export class AppointmentFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  readonly appointment = input<AppointmentModel | null>(null);
  readonly isSaving = input<boolean>(false);
  readonly prefillPatientId = input<string>('');
  readonly prefillDoctorId = input<string>('');
  readonly submitted = output<CreateAppointmentRequest>();
  readonly cancelled = output<void>();

  readonly typeLabels = APPOINTMENT_TYPE_LABELS;
  readonly types = Object.keys(APPOINTMENT_TYPE_LABELS) as AppointmentType[];

  form = this.fb.group({
    patientId:    ['', Validators.required],
    doctorId:     ['', Validators.required],
    departmentId: ['', Validators.required],
    date:         ['', Validators.required],
    startTime:    ['', Validators.required],
    endTime:      ['', Validators.required],
    type:         ['consultation', Validators.required],
    reason:       ['', [Validators.required, Validators.minLength(5)]],
    notes:        [''],
    fee:          [0, [Validators.required, Validators.min(0)]],
  });

  get f() { return this.form.controls; }
  get isEdit(): boolean { return !!this.appointment(); }

  ngOnInit(): void {
    const a = this.appointment();
    if (a) {
      this.form.patchValue({
        patientId: a.patientId, doctorId: a.doctorId, departmentId: a.departmentId,
        date: a.date, startTime: a.startTime, endTime: a.endTime,
        type: a.type, reason: a.reason, notes: a.notes ?? '', fee: a.fee,
      });
    } else {
      if (this.prefillPatientId()) this.form.patchValue({ patientId: this.prefillPatientId() });
      if (this.prefillDoctorId()) this.form.patchValue({ doctorId: this.prefillDoctorId() });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.getRawValue();
    this.submitted.emit({
      patientId:    v.patientId!,
      doctorId:     v.doctorId!,
      departmentId: v.departmentId!,
      date:         v.date!,
      startTime:    v.startTime!,
      endTime:      v.endTime!,
      type:         v.type!,
      reason:       v.reason!,
      notes:        v.notes || undefined,
      fee:          v.fee!,
    });
  }
}