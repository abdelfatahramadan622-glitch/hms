import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    .placeholder-glow .placeholder {
      animation: shimmer 1.5s infinite;
      background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
      background-size: 200% 100%;
      border-radius: 6px;
    }
    .rounded-circle {
      background-color: #dcfce7 !important;
    }
  `],
  template: `
    <div class="placeholder-glow" [class]="containerClass()">
      @for (row of rows(); track $index) {
        <div class="d-flex gap-2 mb-3">
          @if (showAvatar()) {
            <span class="placeholder rounded-circle flex-shrink-0"
              style="width:40px;height:40px;"></span>
          }
          <div class="flex-grow-1">
            <span class="placeholder d-block mb-1 rounded"
              [style.width]="row.titleWidth ?? '60%'"
              style="height:14px;"></span>
            <span class="placeholder d-block rounded"
              [style.width]="row.subtitleWidth ?? '40%'"
              style="height:12px;"></span>
          </div>
        </div>
      }
    </div>
  `,
})
export class SkeletonLoaderComponent {
  readonly rowCount = input<number>(5);
  readonly showAvatar = input<boolean>(false);
  readonly containerClass = input<string>('');

  rows(): Array<{ titleWidth: string; subtitleWidth: string }> {
    return Array.from({ length: this.rowCount() }, (_, i) => ({
      titleWidth: `${50 + (i % 4) * 10}%`,
      subtitleWidth: `${30 + (i % 3) * 10}%`,
    }));
  }
}