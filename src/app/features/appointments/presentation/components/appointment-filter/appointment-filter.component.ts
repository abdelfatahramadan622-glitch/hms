import { Component, inject, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AppointmentFilter } from '../../../domain/models/appointment-filter.model';
import { AppointmentStatus, AppointmentType, APPOINTMENT_TYPE_LABELS } from '../../../domain/models/appointment.model';

@Component({
  selector: 'hms-appointment-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointment-filter.component.html',
  styleUrl: './appointment-filter.component.scss',
})
export class AppointmentFilterComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  readonly filterChanged = output<Partial<AppointmentFilter>>();
  readonly filterReset = output<void>();

  readonly typeLabels = APPOINTMENT_TYPE_LABELS;
  readonly types = Object.keys(APPOINTMENT_TYPE_LABELS) as AppointmentType[];

  form = this.fb.group({
    search:   [''],
    status:   ['' as AppointmentStatus | ''],
    type:     ['' as AppointmentType | ''],
    dateFrom: [''],
    dateTo:   [''],
    isPaid:   ['' as 'true' | 'false' | ''],
  });

  ngOnInit(): void {
    this.form.get('search')!.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.emit());
    this.form.valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.emit());
  }

  emit(): void {
    const v = this.form.value;
    this.filterChanged.emit({
      search:   v.search ?? '',
      status:   (v.status as AppointmentStatus) || undefined,
      type:     (v.type as AppointmentType) || undefined,
      dateFrom: v.dateFrom || undefined,
      dateTo:   v.dateTo || undefined,
      isPaid:   v.isPaid ? v.isPaid === 'true' : undefined,
      page: 1,
    });
  }

  reset(): void {
    this.form.reset({ search: '', status: '', type: '', dateFrom: '', dateTo: '', isPaid: '' });
    this.filterReset.emit();
  }

  get hasActive(): boolean {
    const v = this.form.value;
    return !!(v.search || v.status || v.type || v.dateFrom || v.dateTo || v.isPaid);
  }
}