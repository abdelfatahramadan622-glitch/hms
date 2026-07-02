import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hms-staff-list-page',
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
    .h4 .bi-person-workspace { color: #15803d !important; }
    .btn-primary {
      background: linear-gradient(135deg, #15803d, #22c55e);
      border: none;
      border-radius: 10px;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .btn-primary:hover {
      background: linear-gradient(135deg, #166534, #16a34a);
      box-shadow: 0 4px 14px rgba(22, 163, 74, 0.35);
      transform: translateY(-1px);
    }
    .fa-user-plus { color: #15803d !important; }
    .card {
      border-radius: 14px;
      animation: cardIn 0.45s ease-out both;
    }
    .bi-person-workspace { color: #86efac; }
  `],
  template: `
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h1 class="h4 fw-bold mb-0">
        <i class="bi bi-person-workspace me-2 text-primary"></i>إدارة الموظفين
      </h1>
      <a routerLink="/staff-management/new" class="btn btn-primary">
        <i class="fa-solid fa-user-plus me-2"></i>موظف جديد
      </a>
    </div>
    <div class="card border-0 shadow-sm">
      <div class="card-body text-center py-5">
        <i class="bi bi-person-workspace fs-1 text-primary d-block mb-3"></i>
        <h5 class="fw-bold text-muted mb-2">إدارة الموظفين</h5>
        <p class="text-muted small mb-0">هذه الصفحة قيد التطوير — سيتم عرض قائمة الموظفين هنا</p>
      </div>
    </div>
  `,
})
export class StaffListPageComponent {}