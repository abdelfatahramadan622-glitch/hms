import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmergencyCaseModel, TRIAGE_CONFIG, EMERGENCY_STATUS_CONFIG } from '../../../domain/models/emergency-case.model';

@Component({
  selector: 'hms-emergency-case-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './emergency-case-card.component.html',
  styleUrl: './emergency-case-card.component.scss',
})
export class EmergencyCaseCardComponent {
  readonly case = input.required<EmergencyCaseModel>();
  readonly assigned = output<string>();
  readonly closed = output<string>();

  readonly triageConfig = TRIAGE_CONFIG;
  readonly statusConfig = EMERGENCY_STATUS_CONFIG;

  getWaitingTime(): string {
    const diff = Date.now() - new Date(this.case().arrivedAt).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} دقيقة`;
    return `${Math.floor(mins / 60)} ساعة ${mins % 60} دقيقة`;
  }

  onAssign(e: Event): void { e.preventDefault(); this.assigned.emit(this.case().id); }
  onClose(e: Event): void { e.preventDefault(); this.closed.emit(this.case().id); }

  isActive(): boolean {
    return ['waiting', 'in-treatment', 'critical'].includes(this.case().status);
  }
}