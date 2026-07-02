import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { PERMISSIONS } from '../../../../../core/constants/permissions.constants';

@Component({
  selector: 'hms-permissions-page',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    :host { display: block; animation: fadeUp 0.4s ease both; }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

    .h4 { color: #14532d; i { color: #f59e0b; } }

    .card {
      border-radius: 16px !important; border: 1px solid #e8f5ec !important;
      box-shadow: 0 2px 8px rgba(22, 101, 52, 0.05) !important;
    }
    .card-body { padding: 1.5rem !important; }

    .perm-group {
      border: 1px solid #e8f5ec !important; border-radius: 14px !important;
      background: #fff; padding: 1.25rem !important;
      transition: all 0.3s ease;
      animation: cardIn 0.4s ease both;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(22, 101, 52, 0.08);
        border-color: #bbf7d0;
      }

      h6 {
        color: #15803d; font-weight: 700; font-size: 0.95rem;
        padding-bottom: 0.6rem; margin-bottom: 0.5rem !important;
        border-bottom: 2px solid #f0fdf4;
      }
    }

    @keyframes cardIn {
      from { opacity: 0; transform: translateY(10px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    ul {
      display: grid; gap: 0.3rem;
    }

    li {
      padding: 0.4rem 0; border-bottom: 1px solid #f0f7f2 !important;
      color: #3d6b4f; font-size: 0.82rem; font-family: 'Courier New', monospace;
      transition: all 0.2s;

      &:last-child { border-bottom: none !important; }
      &:hover { padding-left: 6px; color: #15803d; }

      i { font-size: 0.7rem; color: #16a34a; }
    }
  `],
  template: `
    <h1 class="h4 fw-bold mb-4">
      <i class="fa-solid fa-lock me-2"></i>إدارة الصلاحيات
    </h1>
    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <p class="text-muted small mb-4">قائمة بجميع الصلاحيات المتاحة في النظام</p>
        <div class="row g-3">
          @for (group of permissionGroups; track group.label) {
            <div class="col-12 col-md-6 col-lg-4">
              <div class="perm-group">
                <h6 class="fw-bold mb-2">{{ group.label }}</h6>
                <ul class="list-unstyled mb-0">
                  @for (perm of group.perms; track perm) {
                    <li class="py-1 border-bottom d-flex align-items-center gap-2">
                      <i class="fa-solid fa-circle-check flex-shrink-0"></i>
                      <span dir="ltr">{{ perm }}</span>
                    </li>
                  }
                </ul>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class PermissionsPageComponent implements OnInit {
  private readonly layout = inject(LayoutService);

  readonly permissionGroups = [
    { label: 'المرضى',         perms: Object.values(PERMISSIONS.PATIENTS) },
    { label: 'الأطباء',        perms: Object.values(PERMISSIONS.DOCTORS) },
    { label: 'المواعيد',       perms: Object.values(PERMISSIONS.APPOINTMENTS) },
    { label: 'الطوارئ',        perms: Object.values(PERMISSIONS.EMERGENCY) },
    { label: 'السجلات الطبية', perms: Object.values(PERMISSIONS.MEDICAL_RECORDS) },
    { label: 'المختبر',        perms: Object.values(PERMISSIONS.LAB) },
    { label: 'الوصفات',        perms: Object.values(PERMISSIONS.PRESCRIPTIONS) },
    { label: 'الفواتير',       perms: Object.values(PERMISSIONS.BILLING) },
    { label: 'الموظفون',       perms: Object.values(PERMISSIONS.STAFF) },
    { label: 'الأدوار',        perms: Object.values(PERMISSIONS.ROLES) },
    { label: 'التدقيق',        perms: Object.values(PERMISSIONS.AUDIT) },
  ];

  ngOnInit(): void { this.layout.setPageTitle('Permissions', 'الصلاحيات'); }
}
