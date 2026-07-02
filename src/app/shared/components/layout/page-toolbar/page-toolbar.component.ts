import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-page-toolbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
      <div class="d-flex align-items-center gap-2 flex-wrap">
        <ng-content select="[toolbarStart]" />
      </div>
      <div class="d-flex align-items-center gap-2 flex-wrap">
        <ng-content select="[toolbarEnd]" />
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    :host ::ng-deep .btn {
      border-radius: 8px;
      transition: all 0.25s ease;
    }

    :host ::ng-deep .btn-primary {
      background-color: #15803d;
      border-color: #15803d;
    }

    :host ::ng-deep .btn-primary:hover {
      background-color: #16a34a;
      border-color: #16a34a;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(21, 128, 61, 0.25);
    }
  `]
})
export class PageToolbarComponent {}