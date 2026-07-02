import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { ROLES, ROLE_LABELS } from '../../../../../core/constants/roles.constants';

@Component({
  selector: 'hms-role-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes cardIn {
      from { opacity: 0; transform: scale(0.97) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes rowSlide {
      from { opacity: 0; transform: translateX(-8px); }
      to { opacity: 1; transform: translateX(0); }
    }
    :host {
      display: block;
      animation: fadeUp 0.5s ease-out;
    }
    .h4 .bi-shield-fill { color: #15803d !important; }
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
    .card {
      border-radius: 14px;
      animation: cardIn 0.4s ease-out both;
    }
    .card-body.border-bottom {
      border-bottom-color: #f0fdf4;
      transition: background-color 0.25s ease;
    }
    .card-body.border-bottom:hover {
      background-color: #f0fdf4;
    }
    .card-body.border-bottom {
      animation: rowSlide 0.35s ease-out both;
    }
    .rounded-circle.bg-primary-subtle {
      background-color: #dcfce7 !important;
      color: #15803d !important;
      border-radius: 10px !important;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .card-body.border-bottom:hover .rounded-circle.bg-primary-subtle {
      transform: scale(1.08);
      box-shadow: 0 4px 10px rgba(22, 163, 74, 0.2);
    }
    .fa-shield { color: #22c55e; }
    .btn-outline-primary {
      border-radius: 8px;
      border-color: #bbf7d0;
      color: #15803d;
      transition: all 0.3s ease;
    }
    .btn-outline-primary:hover {
      background-color: #f0fdf4;
      border-color: #22c55e;
      color: #166534;
    }
  `],
  template: `
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h1 class="h4 fw-bold mb-0"><i class="bi bi-shield-fill me-2 text-primary"></i>إدارة الأدوار</h1>
      <a routerLink="/role-management/new" class="btn btn-primary">
        <i class="bi bi-plus-lg me-1"></i>دور جديد
      </a>
    </div>
    <div class="card border-0 shadow-sm">
      @for (role of roleEntries; track role.key) {
        <div class="card-body border-bottom d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-3">
            <div class="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
              style="width:40px;height:40px;">
              <i class="fa-solid fa-shield"></i>
            </div>
            <div>
              <div class="fw-semibold">{{ role.value.ar }}</div>
              <div class="text-muted small" dir="ltr">{{ role.key }}</div>
            </div>
          </div>
          <div class="d-flex gap-2">
            <a [routerLink]="['/role-management', role.key]" class="btn btn-sm btn-outline-primary">
              <i class="bi bi-eye me-1"></i>عرض
            </a>
          </div>
        </div>
      }
    </div>
  `,
})
export class RoleListPageComponent implements OnInit {
  private readonly layout = inject(LayoutService);
  readonly roleEntries = Object.entries(ROLE_LABELS).map(([key, value]) => ({ key, value }));
  ngOnInit(): void { this.layout.setPageTitle('Roles', 'الأدوار'); }
}