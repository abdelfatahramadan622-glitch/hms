import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hms-staff-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes cardIn {
      from { opacity: 0; transform: scale(0.97) translateY(12px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    :host {
      display: block;
      animation: fadeUp 0.5s ease-out;
    }
    .btn-outline-secondary {
      border-radius: 8px;
      border-color: #dcfce7;
      color: #15803d;
      transition: all 0.3s ease;
    }
    .btn-outline-secondary:hover {
      background-color: #f0fdf4;
      border-color: #22c55e;
      color: #166534;
    }
    .card {
      border-radius: 14px;
      animation: cardIn 0.45s ease-out both;
    }
    .fa-id-badge { color: #86efac; }
  `],
  template: `
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h1 class="h4 fw-bold mb-0">
        <i class="fa-solid fa-id-badge me-2 text-info"></i>تفاصيل الموظف
      </h1>
      <a routerLink="/staff-management" class="btn btn-outline-secondary">
        <i class="bi bi-arrow-right me-1"></i>رجوع
      </a>
    </div>
    <div class="card border-0 shadow-sm">
      <div class="card-body text-center py-5">
        <i class="fa-solid fa-id-badge fs-1 text-info d-block mb-3"></i>
        <h5 class="fw-bold text-muted mb-2">تفاصيل الموظف</h5>
        <p class="text-muted small mb-0">هذه الصفحة قيد التطوير</p>
      </div>
    </div>
  `,
})
export class StaffDetailPageComponent {}