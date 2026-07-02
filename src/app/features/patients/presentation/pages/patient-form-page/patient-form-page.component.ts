import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PatientsFacade } from '../../../application/facades/patients.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { PatientFormComponent } from '../../components/patient-form/patient-form.component';
import { CreatePatientRequest } from '../../../domain/repositories/patient.repository';

@Component({
  selector: 'hms-patient-form-page',
  standalone: true,
  imports: [CommonModule, RouterModule, PatientFormComponent],
  templateUrl: './patient-form-page.component.html',
  styleUrl: './patient-form-page.component.scss',
})
export class PatientFormPageComponent implements OnInit {
  readonly facade = inject(PatientsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  patientId: string | null = null;

  get isEditMode(): boolean { return !!this.patientId; }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id');
    if (this.isEditMode) {
      this.facade.loadById(this.patientId!);
      this.layout.setPageTitle('Edit Patient', 'تعديل بيانات المريض');
    } else {
      this.layout.setPageTitle('New Patient', 'إضافة مريض جديد');
    }
  }

  onSubmit(request: CreatePatientRequest): void {
    const action$ = this.isEditMode
      ? this.facade.update(this.patientId!, request)
      : this.facade.create(request);

    action$.subscribe({
      next: (patient) => this.nav.goTo(`/patients/${patient.id}`),
    });
  }

  onCancel(): void {
    this.isEditMode
      ? this.nav.goTo(`/patients/${this.patientId}`)
      : this.nav.goTo('/patients');
  }
}