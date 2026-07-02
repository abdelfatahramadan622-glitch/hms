import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EmergencyCasesFacade } from '../../../application/facades/emergency-cases.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { TRIAGE_CONFIG, TriageLevel } from '../../../domain/models/emergency-case.model';
import { CreateEmergencyCaseRequest } from '../../../domain/repositories/emergency-case.repository';

@Component({
  selector: 'hms-emergency-case-form-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './emergency-case-form-page.component.html',
  styleUrl: './emergency-case-form-page.component.scss',
})
export class EmergencyCaseFormPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly facade = inject(EmergencyCasesFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  readonly triageConfig = TRIAGE_CONFIG;
  readonly triageLevels: TriageLevel[] = [1, 2, 3, 4, 5];
  caseId: string | null = null;

  form = this.fb.group({
    patientName:   ['', [Validators.required, Validators.minLength(3)]],
    patientAge:    [null as number | null],
    patientGender: [''],
    patientPhone:  [''],
    nationalId:    [''],
    triageLevel:   [3 as TriageLevel, Validators.required],
    chiefComplaint:['', [Validators.required, Validators.minLength(5)]],
    symptoms:      [''],
    temperature:   [null as number | null],
    heartRate:     [null as number | null],
    oxygenSaturation: [null as number | null],
    bloodPressureSystolic:  [null as number | null],
    bloodPressureDiastolic: [null as number | null],
    notes:         [''],
  });

  get f() { return this.form.controls; }
  get isEdit(): boolean { return !!this.caseId; }

  ngOnInit(): void {
    this.caseId = this.route.snapshot.paramMap.get('id');
    if (this.isEdit) {
      this.facade.loadById(this.caseId!);
      this.layout.setPageTitle('Edit Emergency Case', 'تعديل حالة الطوارئ');
    } else {
      this.layout.setPageTitle('New Emergency Case', 'تسجيل حالة طوارئ جديدة');
    }
  }

  setTriageLevel(level: TriageLevel): void {
    this.form.patchValue({ triageLevel: level });
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.getRawValue();
    const request: CreateEmergencyCaseRequest = {
      patientName:    v.patientName!,
      patientAge:     v.patientAge ?? undefined,
      patientGender:  v.patientGender || undefined,
      patientPhone:   v.patientPhone || undefined,
      nationalId:     v.nationalId || undefined,
      triageLevel:    v.triageLevel!,
      chiefComplaint: v.chiefComplaint!,
      symptoms:       v.symptoms ? v.symptoms.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
      vitalSigns: {
        temperature:              v.temperature ?? undefined,
        heartRate:                v.heartRate ?? undefined,
        oxygenSaturation:         v.oxygenSaturation ?? undefined,
        bloodPressureSystolic:    v.bloodPressureSystolic ?? undefined,
        bloodPressureDiastolic:   v.bloodPressureDiastolic ?? undefined,
      },
      notes: v.notes || undefined,
    };

    const action$ = this.isEdit
      ? this.facade.update(this.caseId!, request)
      : this.facade.create(request);
    action$.subscribe({ next: (c) => this.nav.goTo(`/emergency-cases/${c.id}`) });
  }

  onCancel(): void {
    this.isEdit ? this.nav.goTo(`/emergency-cases/${this.caseId}`) : this.nav.goTo('/emergency-cases');
  }
}