import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { LabResultsFacade } from '../../../application/facades/lab-results.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { LabResultViewerComponent } from '../../components/lab-result-viewer/lab-result-viewer.component';
import { LAB_STATUS_CONFIG } from '../../../domain/models/lab-result.model';

@Component({
  selector: 'hms-lab-result-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, LabResultViewerComponent],
  templateUrl: './lab-result-detail-page.component.html',
  styleUrl: './lab-result-detail-page.component.scss',
})
export class LabResultDetailPageComponent implements OnInit, OnDestroy {
  readonly facade = inject(LabResultsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);
  readonly statusConfig = LAB_STATUS_CONFIG;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.facade.loadById(id);
    this.layout.setPageTitle('Lab Result', 'نتيجة المختبر');
  }

  ngOnDestroy(): void { this.facade.clearSelected(); }

  onApprove(): void {
    const r = this.facade.selectedResult();
    if (r) this.facade.approve(r.id).subscribe();
  }

  onReject(): void {
    const r = this.facade.selectedResult();
    if (!r) return;
    const reason = prompt('سبب الرفض:');
    if (reason) this.facade.reject(r.id, reason).subscribe();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    const r = this.facade.selectedResult();
    if (file && r) this.facade.upload(r.id, file).subscribe();
  }

  onDelete(): void {
    const r = this.facade.selectedResult();
    if (!r || !confirm('هل أنت متأكد من حذف هذه النتيجة؟')) return;
    this.facade.delete(r.id).subscribe({ next: () => this.nav.goTo('/lab-results') });
  }
}