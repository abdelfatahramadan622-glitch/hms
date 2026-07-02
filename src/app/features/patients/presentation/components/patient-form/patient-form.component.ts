import { Component, inject, input, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PatientModel, BLOOD_TYPES, GENDER_LABELS } from '../../../domain/models/patient.model';
import { CreatePatientRequest } from '../../../domain/repositories/patient.repository';

@Component({
  selector: 'hms-patient-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.scss',
})
export class PatientFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  readonly patient = input<PatientModel | null>(null);
  readonly isSaving = input<boolean>(false);
  readonly submitted = output<CreatePatientRequest>();
  readonly cancelled = output<void>();

  readonly bloodTypes = BLOOD_TYPES;
  readonly genderLabels = GENDER_LABELS;

  form = this.fb.group({
    firstName:   ['', [Validators.required, Validators.minLength(2)]],
    lastName:    ['', [Validators.required, Validators.minLength(2)]],
    dateOfBirth: ['', Validators.required],
    gender:      ['', Validators.required],
    bloodType:   [''],
    nationalId:  ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
    phone:       ['', [Validators.required, Validators.pattern(/^(\+?\d{10,15})$/)]],
    email:       ['', Validators.email],
    maritalStatus: ['', Validators.required],
    insuranceNumber: [''],
    insuranceProvider: [''],
    // Address
    street:      ['', Validators.required],
    city:        ['', Validators.required],
    governorate: ['', Validators.required],
    country:     ['مصر', Validators.required],
    postalCode:  [''],
    // Emergency Contact
    emergencyName:     ['', Validators.required],
    emergencyRelation: ['', Validators.required],
    emergencyPhone:    ['', [Validators.required, Validators.pattern(/^(\+?\d{10,15})$/)]],
    // Medical
    allergies:       [''],
    chronicDiseases: [''],
    notes:           [''],
  });

  ngOnInit(): void {
    const p = this.patient();
    if (p) this.patchForm(p);
  }

  private patchForm(p: PatientModel): void {
    this.form.patchValue({
      firstName: p.firstName,
      lastName: p.lastName,
      dateOfBirth: p.dateOfBirth,
      gender: p.gender,
      bloodType: p.bloodType ?? '',
      nationalId: p.nationalId,
      phone: p.phone,
      email: p.email ?? '',
      maritalStatus: p.maritalStatus,
      insuranceNumber: p.insuranceNumber ?? '',
      insuranceProvider: p.insuranceProvider ?? '',
      street: p.address.street,
      city: p.address.city,
      governorate: p.address.governorate,
      country: p.address.country,
      postalCode: p.address.postalCode ?? '',
      emergencyName: p.emergencyContact.name,
      emergencyRelation: p.emergencyContact.relation,
      emergencyPhone: p.emergencyContact.phone,
      allergies: p.allergies.join(', '),
      chronicDiseases: p.chronicDiseases.join(', '),
      notes: p.notes ?? '',
    });
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.getRawValue();
    const request: CreatePatientRequest = {
      firstName: v.firstName!,
      lastName: v.lastName!,
      dateOfBirth: v.dateOfBirth!,
      gender: v.gender as 'male' | 'female',
      bloodType: (v.bloodType as any) || undefined,
      nationalId: v.nationalId!,
      phone: v.phone!,
      email: v.email || undefined,
      maritalStatus: v.maritalStatus as any,
      insuranceNumber: v.insuranceNumber || undefined,
      insuranceProvider: v.insuranceProvider || undefined,
      status: 'active',
      address: {
        street: v.street!,
        city: v.city!,
        governorate: v.governorate!,
        country: v.country!,
        postalCode: v.postalCode || undefined,
      },
      emergencyContact: {
        name: v.emergencyName!,
        relation: v.emergencyRelation!,
        phone: v.emergencyPhone!,
      },
      allergies: v.allergies ? v.allergies.split(',').map((s) => s.trim()).filter(Boolean) : [],
      chronicDiseases: v.chronicDiseases ? v.chronicDiseases.split(',').map((s) => s.trim()).filter(Boolean) : [],
      notes: v.notes || undefined,
    };
    this.submitted.emit(request);
  }

  get f() { return this.form.controls; }
  get isEditMode(): boolean { return !!this.patient(); }
}
