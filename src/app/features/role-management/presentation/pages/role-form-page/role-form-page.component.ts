import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hms-role-form-page',
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
    .breadcrumb .breadcrumb-item a {
      color: #15803d;
      transition: color 0.2s ease;
    }
    .breadcrumb .breadcrumb-item a:hover { color: #22c55e; }
    .breadcrumb .breadcrumb-item.active { color: #6b7280; }
    .card {
      border-radius: 14px;
      animation: cardIn 0.45s ease-out both;
    }
    .fa-shield-plus { color: #15803d !important; }
  `],
  template: `
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb small">
        <li class="breadcrumb-item"><a routerLink="/role-management" class="text-decoration-none">الأدوار</a></li>
        <li class="breadcrumb-item active">دور جديد</li>
      </ol>
    </nav>
    <div class="card border-0 shadow-sm">
      <div class="card-body text-center py-5 text-muted">
        <i class="fa-solid fa-shield-plus fs-1 d-block mb-3"></i>
        <h5 class="fw-bold mb-2">إضافة / تعديل دور</h5>
        <p class="small mb-0">هذه الصفحة قيد التطوير</p>
      </div>
    </div>
  `,
})
export class RoleFormPageComponent {}