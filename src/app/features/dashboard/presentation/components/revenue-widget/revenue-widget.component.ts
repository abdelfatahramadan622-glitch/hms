import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMetric, getTrendIcon, getTrendClass } from '../../../domain/entities/dashboard-metric.entity';

@Component({
  selector: 'hms-revenue-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './revenue-widget.component.html',
  styleUrl: './revenue-widget.component.scss',
})
export class RevenueWidgetComponent {
  readonly metric = input<DashboardMetric | null>(null);
  readonly isLoading = input<boolean>(false);

  getTrendIcon = getTrendIcon;
  getTrendClass = getTrendClass;

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      maximumFractionDigits: 0,
    }).format(value);
  }
}