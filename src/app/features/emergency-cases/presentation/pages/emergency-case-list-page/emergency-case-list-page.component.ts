import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmergencyCasesFacade } from '../../../application/facades/emergency-cases.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { EmergencyCaseCardComponent } from '../../components/emergency-case-card/emergency-case-card.component';
import { TriageBoardComponent } from '../../components/triage-board/triage-board.component';
import { EmergencyFilter } from '../../../domain/models/emergency-filter.model';

@Component({
  selector: 'hms-emergency-case-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, EmergencyCaseCardComponent, TriageBoardComponent],
  templateUrl: './emergency-case-list-page.component.html',
  styleUrl: './emergency-case-list-page.component.scss',
})
export class EmergencyCaseListPageComponent implements OnInit {
  readonly facade = inject(EmergencyCasesFacade);
  private readonly layout = inject(LayoutService);

  readonly viewMode = signal<'list' | 'board'>('board');

  ngOnInit(): void {
    this.layout.setPageTitle('Emergency Cases', 'حالات الطوارئ');
    this.facade.loadAll();
  }

  onAssignDoctor(id: string): void {
    const doctorId = prompt('أدخل معرّف الطبيب:');
    if (doctorId) this.facade.assignDoctor(id, doctorId).subscribe();
  }

  onClose(id: string): void {
    const outcome = prompt('نتيجة الحالة (خرج/محوَّل/وفاة):');
    if (outcome) this.facade.close(id, outcome).subscribe();
  }

  onFilterChanged(filter: Partial<EmergencyFilter>): void {
    this.facade.applyFilter({ ...this.facade.filter(), ...filter, page: 1 });
  }

  onPageChange(page: number): void { this.facade.changePage(page); }

  get pages(): number[] {
    return Array.from({ length: this.facade.totalPages() }, (_, i) => i + 1);
  }
}