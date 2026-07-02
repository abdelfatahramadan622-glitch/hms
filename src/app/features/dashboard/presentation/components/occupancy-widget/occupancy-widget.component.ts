import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMetric } from '../../../domain/entities/dashboard-metric.entity';

@Component({
  selector: 'hms-occupancy-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './occupancy-widget.component.html',
  styleUrl: './occupancy-widget.component.scss',
})
export class OccupancyWidgetComponent {
  readonly metric = input<DashboardMetric | null>(null);
  readonly availableBeds = input<DashboardMetric | null>(null);
  readonly isLoading = input<boolean>(false);

  readonly occupancyPercent = computed(() => this.metric()?.value ?? 0);

  readonly progressColor = computed(() => {
    const pct = this.occupancyPercent();
    if (pct >= 90) return 'bg-danger';
    if (pct >= 75) return 'bg-warning';
    return 'bg-success';
  });

  readonly statusLabel = computed(() => {
    const pct = this.occupancyPercent();
    if (pct >= 90) return 'مكتظ';
    if (pct >= 75) return 'مشغول';
    return 'متاح';
  });
}