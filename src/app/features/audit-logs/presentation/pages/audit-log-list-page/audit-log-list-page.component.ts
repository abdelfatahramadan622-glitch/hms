import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { LayoutService } from '../../../../../core/application/services/layout.service';

@Component({
  selector: 'hms-audit-log-list-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './audit-log-list-page.component.html',
  styleUrl: './audit-log-list-page.component.scss',
})
export class AuditLogListPageComponent implements OnInit {
  private readonly layout = inject(LayoutService);

  readonly sampleLogs = [
    { id: 1, action: 'إنشاء',  description: 'إنشاء مريض جديد: أحمد محمد',       user: 'د. سارة',    entity: 'المرضى',         timestamp: '24/06/2026 09:15' },
    { id: 2, action: 'تعديل',  description: 'تعديل موعد #APT-0042',             user: 'موظف الاستقبال', entity: 'المواعيد',    timestamp: '24/06/2026 09:30' },
    { id: 3, action: 'دخول',   description: 'تسجيل دخول ناجح',                 user: 'د. خالد',    entity: 'النظام',         timestamp: '24/06/2026 08:55' },
    { id: 4, action: 'حذف',    description: 'حذف ملف مرفق من سجل طبي',         user: 'د. سارة',    entity: 'السجلات الطبية', timestamp: '24/06/2026 08:40' },
    { id: 5, action: 'إنشاء',  description: 'إصدار فاتورة جديدة #INV-0115',    user: 'المحاسب',    entity: 'الفواتير',       timestamp: '24/06/2026 08:20' },
  ];

  ngOnInit(): void { this.layout.setPageTitle('Audit Logs', 'سجل التدقيق'); }
}