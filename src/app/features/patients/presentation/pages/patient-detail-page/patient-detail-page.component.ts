import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PatientsFacade } from '../../../application/facades/patients.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { PatientSummaryComponent } from '../../components/patient-summary/patient-summary.component';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { GENDER_LABELS, STATUS_CONFIG } from '../../../domain/models/patient.model';

@Component({
  selector: 'hms-patient-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, PatientSummaryComponent],
  templateUrl: './patient-detail-page.component.html',
  styleUrl: './patient-detail-page.component.scss',
})
export class PatientDetailPageComponent implements OnInit, OnDestroy {
  readonly facade = inject(PatientsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  readonly genderLabels = GENDER_LABELS;
  readonly statusConfig = STATUS_CONFIG;
  activeTab = 'overview';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.facade.loadById(id);
    this.layout.setPageTitle('Patient Detail', 'تفاصيل المريض');
  }

  ngOnDestroy(): void {
    this.facade.clearSelected();
  }

  onDelete(): void {
    const patient = this.facade.selectedPatient();
    if (!patient) return;
    if (!confirm(`هل أنت متأكد من حذف المريض "${patient.fullName}"؟`)) return;
    this.facade.delete(patient.id).subscribe({
      next: () => this.nav.goTo('/patients'),
    });
  }

  setTab(tab: string): void {
    this.activeTab = tab;
  }
}