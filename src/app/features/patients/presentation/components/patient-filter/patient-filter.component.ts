import { Component, inject, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { PatientFilter } from '../../../domain/models/patient-filter.model';
import { Gender, BloodType, PatientStatus, BLOOD_TYPES, GENDER_LABELS } from '../../../domain/models/patient.model';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'hms-patient-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-filter.component.html',
  styleUrl: './patient-filter.component.scss',
})
export class PatientFilterComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  readonly filterChanged = output<Partial<PatientFilter>>();
  readonly filterReset = output<void>();

  readonly bloodTypes = BLOOD_TYPES;
  readonly genderLabels = GENDER_LABELS;

  form = this.fb.group({
    search:     [''],
    gender:     ['' as Gender | ''],
    bloodType:  ['' as BloodType | ''],
    status:     ['' as PatientStatus | ''],
    hasInsurance: ['' as 'true' | 'false' | ''],
  });

  ngOnInit(): void {
    this.form.get('search')!.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(() => this.emitFilter());

    this.form.valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.emitFilter());
  }

  emitFilter(): void {
    const v = this.form.value;
    this.filterChanged.emit({
      search: v.search ?? '',
      gender: (v.gender as Gender) || undefined,
      bloodType: (v.bloodType as BloodType) || undefined,
      status: (v.status as PatientStatus) || undefined,
      hasInsurance: v.hasInsurance ? v.hasInsurance === 'true' : undefined,
      page: 1,
    });
  }

  reset(): void {
    this.form.reset({ search: '', gender: '', bloodType: '', status: '', hasInsurance: '' });
    this.filterReset.emit();
  }

  get hasActiveFilter(): boolean {
    const v = this.form.value;
    return !!(v.search || v.gender || v.bloodType || v.status || v.hasInsurance);
  }
}