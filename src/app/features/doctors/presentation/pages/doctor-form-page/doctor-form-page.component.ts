import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DoctorsFacade } from '../../../application/facades/doctors.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { DAY_LABELS, DayOfWeek } from '../../../domain/models/doctor.model';
import { CreateDoctorRequest } from '../../../domain/repositories/doctor.repository';

@Component({
  selector: 'hms-doctor-form-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './doctor-form-page.component.html',
  styleUrl: './doctor-form-page.component.scss',
})
export class DoctorFormPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly facade = inject(DoctorsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  readonly dayLabels = DAY_LABELS;
  readonly allDays: DayOfWeek[] = ['saturday','sunday','monday','tuesday','wednesday','thursday','friday'];
  doctorId: string | null = null;

  form = this.fb.group({
    firstName:          ['', [Validators.required, Validators.minLength(2)]],
    lastName:           ['', [Validators.required, Validators.minLength(2)]],
    specialization:     ['', Validators.required],
    subSpecialization:  [''],
    licenseNumber:      ['', Validators.required],
    licenseExpiryDate:  ['', Validators.required],
    phone:              ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
    email:              ['', [Validators.required, Validators.email]],
    departmentId:       ['', Validators.required],
    departmentName:     ['', Validators.required],
    status:             ['active', Validators.required],
    yearsOfExperience:  [0, [Validators.required, Validators.min(0)]],
    consultationFee:    [0, [Validators.required, Validators.min(0)]],
    shiftStart:         ['08:00', Validators.required],
    shiftEnd:           ['16:00', Validators.required],
    languages:          ['عربي'],
    bio:                [''],
  });

  selectedDays = new Set<DayOfWeek>();

  get isEditMode(): boolean { return !!this.doctorId; }
  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.doctorId = this.route.snapshot.paramMap.get('id');
    if (this.isEditMode) {
      this.facade.loadById(this.doctorId!);
      this.layout.setPageTitle('Edit Doctor', 'تعديل بيانات الطبيب');
    } else {
      this.layout.setPageTitle('New Doctor', 'إضافة طبيب جديد');
    }
  }

  toggleDay(day: DayOfWeek): void {
    this.selectedDays.has(day) ? this.selectedDays.delete(day) : this.selectedDays.add(day);
  }

  onSubmit(): void {
    if (this.form.invalid || this.selectedDays.size === 0) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const request: CreateDoctorRequest = {
      firstName: v.firstName!,
      lastName: v.lastName!,
      specialization: v.specialization!,
      subSpecialization: v.subSpecialization || undefined,
      licenseNumber: v.licenseNumber!,
      licenseExpiryDate: v.licenseExpiryDate!,
      phone: v.phone!,
      email: v.email!,
      departmentId: v.departmentId!,
      departmentName: v.departmentName!,
      status: v.status as any,
      yearsOfExperience: v.yearsOfExperience!,
      consultationFee: v.consultationFee!,
      shiftStart: v.shiftStart!,
      shiftEnd: v.shiftEnd!,
      availableDays: Array.from(this.selectedDays),
      languages: v.languages ? v.languages.split(',').map((s: string) => s.trim()) : ['عربي'],
      bio: v.bio || undefined,
    };

    const action$ = this.isEditMode
      ? this.facade.update(this.doctorId!, request)
      : this.facade.create(request);

    action$.subscribe({ next: (d) => this.nav.goTo(`/doctors/${d.id}`) });
  }

  onCancel(): void {
    this.isEditMode ? this.nav.goTo(`/doctors/${this.doctorId}`) : this.nav.goTo('/doctors');
  }
}