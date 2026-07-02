import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { EmergencyCasesFacade } from '../../../application/facades/emergency-cases.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { TRIAGE_CONFIG, EMERGENCY_STATUS_CONFIG } from '../../../domain/models/emergency-case.model';

@Component({
  selector: 'hms-emergency-case-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './emergency-case-detail-page.component.html',
  styleUrl: './emergency-case-detail-page.component.scss',
})
export class EmergencyCaseDetailPageComponent implements OnInit, OnDestroy {
  readonly facade = inject(EmergencyCasesFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  readonly triageConfig = TRIAGE_CONFIG;
  readonly statusConfig = EMERGENCY_STATUS_CONFIG;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.facade.loadById(id);
    this.layout.setPageTitle('Emergency Detail', 'تفاصيل الحالة');
  }

  ngOnDestroy(): void { this.facade.clearSelected(); }

  onAssignDoctor(): void {
    const c = this.facade.selectedCase();
    if (!c) return;
    const doctorId = prompt('أدخل معرّف الطبيب:');
    if (doctorId) this.facade.assignDoctor(c.id, doctorId).subscribe();
  }

  onClose(): void {
    const c = this.facade.selectedCase();
    if (!c) return;
    const outcome = prompt('نتيجة الحالة:');
    if (outcome) this.facade.close(c.id, outcome).subscribe({ next: () => this.nav.goTo('/emergency-cases') });
  }

  onDelete(): void {
    const c = this.facade.selectedCase();
    if (!c || !confirm('هل أنت متأكد من حذف هذه الحالة؟')) return;
    this.facade.delete(c.id).subscribe({ next: () => this.nav.goTo('/emergency-cases') });
  }

  getWaitingTime(): string {
    const c = this.facade.selectedCase();
    if (!c) return '';
    const diff = Date.now() - new Date(c.arrivedAt).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} دقيقة`;
    return `${Math.floor(mins / 60)} ساعة ${mins % 60} دقيقة`;
  }
}