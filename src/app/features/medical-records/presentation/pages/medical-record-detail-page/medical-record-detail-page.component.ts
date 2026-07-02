import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MedicalRecordsFacade } from '../../../application/facades/medical-records.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { DiagnosisListComponent } from '../../components/diagnosis-list/diagnosis-list.component';
import { AttachmentsPanelComponent } from '../../components/attachments-panel/attachments-panel.component';
import { RECORD_TYPE_LABELS } from '../../../domain/models/medical-record.model';

@Component({
  selector: 'hms-medical-record-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, DiagnosisListComponent, AttachmentsPanelComponent],
  templateUrl: './medical-record-detail-page.component.html',
  styleUrl: './medical-record-detail-page.component.scss',
})
export class MedicalRecordDetailPageComponent implements OnInit, OnDestroy {
  readonly facade = inject(MedicalRecordsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  readonly typeLabels = RECORD_TYPE_LABELS;
  activeTab = 'overview';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.facade.loadById(id);
    this.layout.setPageTitle('Medical Record', 'السجل الطبي');
  }

  ngOnDestroy(): void { this.facade.clearSelected(); }

  onDelete(): void {
    const r = this.facade.selectedRecord();
    if (!r || !confirm('هل أنت متأكد من حذف هذا السجل الطبي؟')) return;
    this.facade.delete(r.id).subscribe({ next: () => this.nav.goTo('/medical-records') });
  }

  onClose(): void {
    const r = this.facade.selectedRecord();
    if (!r) return;
    this.facade.update(r.id, { isClosed: true }).subscribe();
  }

  onFileSelected(file: File): void {
    const r = this.facade.selectedRecord();
    if (!r) return;
    this.facade.uploadAttachment(r.id, file).subscribe();
  }

  onRemoveAttachment(attachmentId: string): void {
    const r = this.facade.selectedRecord();
    if (!r || !confirm('هل أنت متأكد من حذف هذا المرفق؟')) return;
    this.facade.removeAttachment(r.id, attachmentId).subscribe();
  }
}