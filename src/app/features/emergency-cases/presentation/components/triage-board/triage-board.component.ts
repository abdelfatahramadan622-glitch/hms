import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmergencyCaseModel, TriageLevel, TRIAGE_CONFIG } from '../../../domain/models/emergency-case.model';

@Component({
  selector: 'hms-triage-board',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './triage-board.component.html',
  styleUrl: './triage-board.component.scss',
})
export class TriageBoardComponent {
  readonly casesByTriage = input.required<Record<TriageLevel, EmergencyCaseModel[]>>();
  readonly isLoading = input<boolean>(false);

  readonly triageConfig = TRIAGE_CONFIG;
  readonly levels: TriageLevel[] = [1, 2, 3, 4, 5];
}