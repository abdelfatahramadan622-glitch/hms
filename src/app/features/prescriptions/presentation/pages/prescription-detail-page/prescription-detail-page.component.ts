import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PrescriptionsFacade } from '../../../application/facades/prescriptions.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { MedicationListComponent } from '../../components/medication-list/medication-list.component';
import { PRESCRIPTION_STATUS_CONFIG } from '../../../domain/models/prescription.model';

@Component({
  selector: 'hms-prescription-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MedicationListComponent],
  templateUrl: './prescription-detail-page.component.html',
  styleUrl: './prescription-detail-page.component.scss',
})
export class PrescriptionDetailPageComponent implements OnInit, OnDestroy {
  readonly facade = inject(PrescriptionsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  readonly statusConfig = PRESCRIPTION_STATUS_CONFIG;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.facade.loadById(id);
    this.layout.setPageTitle('Prescription', 'الوصفة الطبية');
  }

  ngOnDestroy(): void { this.facade.clearSelected(); }

  onDispense(): void {
    const p = this.facade.selectedPrescription();
    if (!p || !confirm('هل تريد تأكيد صرف هذه الوصفة؟')) return;
    this.facade.dispense(p.id).subscribe();
  }

  onCancel(): void {
    const p = this.facade.selectedPrescription();
    if (!p) return;
    const reason = prompt('سبب الإلغاء:');
    if (reason) this.facade.cancel(p.id, reason).subscribe();
  }

  onDelete(): void {
    const p = this.facade.selectedPrescription();
    if (!p || !confirm('هل أنت متأكد من حذف هذه الوصفة؟')) return;
    this.facade.delete(p.id).subscribe({ next: () => this.nav.goTo('/prescriptions') });
  }

  isExpired(expiresAt: string): boolean {
    return new Date(expiresAt) < new Date();
  }
}