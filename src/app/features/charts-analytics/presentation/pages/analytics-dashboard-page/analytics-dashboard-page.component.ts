import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutService } from '../../../../../core/application/services/layout.service';

@Component({
  selector: 'hms-analytics-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [`
    :host { display: block; animation: fadeUp 0.4s ease both; }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

    .header-actions { display: flex; gap: 0.6rem; align-items: center; }
    .h4 { color: #14532d; i { color: #0e7490; margin-left: 0.5rem; } }

    .form-select {
      width: auto; border-radius: 10px; border: 1.5px solid #d1e7da;
      font-size: 0.85rem; font-weight: 600; padding: 0.4rem 2rem 0.4rem 0.8rem;
      transition: all 0.25s; color: #166534;
      &:focus { border-color: #16a34a; box-shadow: 0 0 0 3.5px rgba(22, 163, 74, 0.1); }
    }
    .btn-export {
      border-radius: 10px; font-weight: 600; font-size: 0.85rem;
      border: 1.5px solid #e8f5ec; color: #166634; transition: all 0.2s;
      i { margin-left: 0.35rem; }
      &:hover { background: #f0fdf4; border-color: #bbf7d0; }
    }

    // Stats Cards
    .stat-card {
      border-radius: 16px !important; border: 1px solid #e8f5ec !important;
      box-shadow: 0 2px 8px rgba(22, 101, 52, 0.05) !important;
      background: #fff; transition: all 0.3s; overflow: hidden; position: relative;
      animation: cardIn 0.4s ease both;
      &::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; }
      &:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(22, 101, 52, 0.1) !important; }
    }
    @keyframes cardIn { from { opacity: 0; transform: translateY(10px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }

    .col-lg-3:nth-child(1) .stat-card::before { background: #0e7490; }
    .col-lg-3:nth-child(2) .stat-card::before { background: #16a34a; }
    .col-lg-3:nth-child(3) .stat-card::before { background: #7c3aed; }
    .col-lg-3:nth-child(4) .stat-card::before { background: #f59e0b; }

    .stat-card .card-body { padding: 1.25rem !important; text-align: center; }
    .stat-card i { font-size: 1.8rem; margin-bottom: 0.6rem; display: block; }
    .stat-card h4 { font-weight: 800; font-size: 1.5rem; letter-spacing: -0.02em; margin-bottom: 0.15rem; }
    .stat-card .text-muted { font-size: 0.8rem; color: #6b9a7e !important; font-weight: 500; }

    // Fixing Bootstrap text colors for medical theme
    .text-primary { color: #0e7490 !important; }
    .text-success { color: #15803d !important; }
    .text-info { color: #7c3aed !important; }
    .text-warning { color: #b45309 !important; }

    // Charts Placeholders
    .chart-card {
      border-radius: 16px !important; border: 1px solid #e8f5ec !important;
      box-shadow: 0 2px 8px rgba(22, 101, 52, 0.05) !important;
    }
    .chart-card .card-header {
      background: #fff !important; border-bottom: 1px solid #e8f5ec !important;
      padding: 1rem 1.25rem;
      h6 { color: #14532d; font-weight: 700; font-size: 0.95rem; margin: 0; }
      i { margin-left: 0.5rem; }
    }
    .chart-placeholder {
      color: #a3c4b0;
      i { font-size: 3rem; margin-bottom: 0.8rem; display: block; }
      p { font-size: 0.85rem; margin: 0; }
    }
  `],
  template: `
    <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
      <h1 class="h4 fw-bold mb-0">
        <i class="fa-solid fa-chart-column"></i>لوحة التحليلات
      </h1>
      <div class="header-actions">
        <select class="form-select form-select-sm">
          <option>هذا الشهر</option>
          <option>هذا الأسبوع</option>
          <option>هذا العام</option>
        </select>
        <button class="btn btn-sm btn-export">
          <i class="fa-solid fa-file-export"></i>تصدير
        </button>
      </div>
    </div>

    <div class="row g-3 mb-4">
      @for (stat of stats; track stat.label) {
        <div class="col-6 col-lg-3">
          <div class="card border-0 shadow-sm stat-card">
            <div class="card-body p-3">
              <i class="fa-solid" [ngClass]="[stat.icon, 'text-' + stat.color]"></i>
              <h4 class="fw-bold mb-0" [ngClass]="'text-' + stat.color">{{ stat.value }}</h4>
              <div class="text-muted">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      }
    </div>

    <div class="row g-4">
      <div class="col-12 col-lg-8">
        <div class="card border-0 shadow-sm chart-card">
          <div class="card-header bg-white border-bottom py-3">
            <h6 class="mb-0 fw-bold"><i class="fa-solid fa-chart-line text-primary"></i>تدفق المرضى</h6>
          </div>
          <div class="card-body text-center py-5 chart-placeholder">
            <i class="fa-solid fa-chart-bar"></i>
            <p>سيتم عرض الرسم البياني هنا عند ربط مكتبة الرسوم</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card border-0 shadow-sm chart-card">
          <div class="card-header bg-white border-bottom py-3">
            <h6 class="mb-0 fw-bold"><i class="fa-solid fa-chart-pie text-success"></i>توزيع الإيرادات</h6>
          </div>
          <div class="card-body text-center py-5 chart-placeholder">
            <i class="fa-solid fa-chart-pie"></i>
            <p>الرسم البياني الدائري</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AnalyticsDashboardPageComponent implements OnInit {
  private readonly layout = inject(LayoutService);

  readonly stats = [
    { label: 'إجمالي المرضى',     value: '2,450', icon: 'fa-users',          color: 'primary' },
    { label: 'المواعيد هذا الشهر', value: '384',  icon: 'fa-calendar-check', color: 'success' },
    { label: 'نسبة الإشغال',      value: '78%',   icon: 'fa-hospital',       color: 'info' },
    { label: 'الإيرادات',         value: '125K',  icon: 'fa-coins',          color: 'warning' },
  ];

  ngOnInit(): void { this.layout.setPageTitle('Analytics', 'التحليلات'); }
}