import { Component, inject, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DoctorFilter } from '../../../domain/models/doctor-filter.model';
import { DoctorStatus } from '../../../domain/models/doctor.model';

@Component({
  selector: 'hms-doctor-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './doctor-filter.component.html',
  styleUrl: './doctor-filter.component.scss',
})
export class DoctorFilterComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  readonly filterChanged = output<Partial<DoctorFilter>>();
  readonly filterReset = output<void>();

  form = this.fb.group({
    search:         [''],
    status:         ['' as DoctorStatus | ''],
    specialization: [''],
    departmentId:   [''],
  });

  ngOnInit(): void {
    this.form.get('search')!.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.emit());
    this.form.valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.emit());
  }

  emit(): void {
    const v = this.form.value;
    this.filterChanged.emit({
      search: v.search ?? '',
      status: (v.status as DoctorStatus) || undefined,
      specialization: v.specialization || undefined,
      departmentId: v.departmentId || undefined,
      page: 1,
    });
  }

  reset(): void {
    this.form.reset({ search: '', status: '', specialization: '', departmentId: '' });
    this.filterReset.emit();
  }

  get hasActive(): boolean {
    const v = this.form.value;
    return !!(v.search || v.status || v.specialization || v.departmentId);
  }
}