import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { PERMISSIONS } from '../../../../../core/constants/permissions.constants';

@Component({
  selector: 'hms-permissions-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="h4 fw-bold mb-4"><i class="bi bi-lock-fill me-2 text-warning"></i>إدارة الصلاحيات</h1>
    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <p class="text-muted small mb-4">قائمة بجميع الصلاحيات المتاحة في النظام</p>
        <div class="row g-3">
          @for (group of permissionGroups; track group.label) {
            <div class="col-12 col-md-6 col-lg-4">
              <div class="border rounded-3 p-3">
                <h6 class="fw-bold mb-2 text-primary">{{ group.label }}</h6>
                <ul class="list-unstyled mb-0 small text-muted">
                  @for (perm of group.perms; track perm) {
                    <li class="py-1 border-bottom d-flex align-items-center gap-2">
                      <i class="bi bi-check-circle-fill text-success flex-shrink-0"></i>
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
    { label: 'المرضى',        perms: Object.values(PERMISSIONS.PATIENTS) },
    { label: 'الأطباء',       perms: Object.values(PERMISSIONS.DOCTORS) },
    { label: 'المواعيد',      perms: Object.values(PERMISSIONS.APPOINTMENTS) },
    { label: 'الطوارئ',       perms: Object.values(PERMISSIONS.EMERGENCY) },
    { label: 'السجلات الطبية',perms: Object.values(PERMISSIONS.MEDICAL_RECORDS) },
    { label: 'المختبر',       perms: Object.values(PERMISSIONS.LAB) },
    { label: 'الوصفات',       perms: Object.values(PERMISSIONS.PRESCRIPTIONS) },
    { label: 'الفواتير',      perms: Object.values(PERMISSIONS.BILLING) },
    { label: 'الموظفون',      perms: Object.values(PERMISSIONS.STAFF) },
    { label: 'الأدوار',       perms: Object.values(PERMISSIONS.ROLES) },
    { label: 'التدقيق',       perms: Object.values(PERMISSIONS.AUDIT) },
  ];

  ngOnInit(): void { this.layout.setPageTitle('Permissions', 'الصلاحيات'); }
}