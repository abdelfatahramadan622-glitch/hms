import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutService } from '../../../../../core/application/services/layout.service';

interface NotificationItem {
  id: string;
  title: string;
  body: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  icon: string;
  createdAt: string;
  isRead: boolean;
  link?: string;
}

@Component({
  selector: 'hms-notification-center-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes cardIn {
      from { opacity: 0; transform: translateX(-8px); }
      to { opacity: 1; transform: translateX(0); }
    }
    :host {
      display: block;
      animation: fadeUp 0.5s ease-out;
    }
    .h4 .bi-bell-fill {
      color: #15803d;
    }
    .btn-primary {
      background: linear-gradient(135deg, #15803d, #22c55e);
      border: none;
      border-radius: 8px;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    .btn-primary:hover {
      background: linear-gradient(135deg, #166534, #16a34a);
      box-shadow: 0 4px 14px rgba(22, 163, 74, 0.35);
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
    .btn-group .btn {
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    .card {
      border-radius: 14px;
      animation: cardIn 0.4s ease-out both;
    }
    .card-body.border-bottom {
      border-bottom-color: #f0fdf4;
      transition: background-color 0.25s ease, padding-left 0.25s ease, padding-right 0.25s ease;
    }
    .card-body.border-bottom:hover {
      background-color: #f0fdf4;
      padding-left: 16px;
      padding-right: 16px;
    }
    .card-body.bg-light {
      background-color: #f0fdf4 !important;
    }
    .card-body.border-bottom:nth-child(1) { animation-delay: 0.03s; }
    .card-body.border-bottom:nth-child(2) { animation-delay: 0.06s; }
    .card-body.border-bottom:nth-child(3) { animation-delay: 0.09s; }
    .card-body.border-bottom:nth-child(4) { animation-delay: 0.12s; }
    .card-body.border-bottom:nth-child(5) { animation-delay: 0.15s; }
    .card-body.border-bottom:nth-child(6) { animation-delay: 0.18s; }
    .card-body.border-bottom:nth-child(7) { animation-delay: 0.21s; }
    .card-body.border-bottom:nth-child(8) { animation-delay: 0.24s; }
    .card-body.border-bottom:nth-child(9) { animation-delay: 0.27s; }
    .card-body.border-bottom:nth-child(10) { animation-delay: 0.3s; }
    .rounded-circle[style*="width:40px"] {
      border-radius: 12px !important;
      transition: transform 0.3s ease;
    }
    .card-body.border-bottom:hover .rounded-circle[style*="width:40px"] {
      transform: scale(1.08);
    }
    .rounded-circle.bg-primary {
      background: #22c55e !important;
    }
    .btn-outline-primary {
      border-radius: 7px;
      border-color: #bbf7d0;
      color: #15803d;
      transition: all 0.3s ease;
    }
    .btn-outline-primary:hover {
      background-color: #dcfce7;
      border-color: #22c55e;
    }
    .btn-outline-danger {
      border-radius: 7px;
      border-color: #fecaca;
      color: #dc2626;
      transition: all 0.3s ease;
    }
    .btn-outline-danger:hover {
      background-color: #fef2f2;
      border-color: #f87171;
    }
    .text-center .bi-bell-slash {
      color: #86efac;
    }
  `],
  template: `
    <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
      <div>
        <h1 class="h4 fw-bold mb-0">
          <i class="bi bi-bell-fill me-2"></i>الإشعارات
        </h1>
        @if (unreadCount() > 0) {
          <p class="text-muted small mb-0">{{ unreadCount() }} إشعار غير مقروء</p>
        }
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-outline-secondary" (click)="markAllRead()">
          <i class="bi bi-check2-all me-1"></i>تحديد الكل كمقروء
        </button>
        <div class="btn-group btn-group-sm">
          <button type="button" class="btn"
            [class.btn-primary]="filter() === 'all'"
            [class.btn-outline-secondary]="filter() !== 'all'"
            (click)="filter.set('all')">الكل</button>
          <button type="button" class="btn"
            [class.btn-primary]="filter() === 'unread'"
            [class.btn-outline-secondary]="filter() !== 'unread'"
            (click)="filter.set('unread')">غير مقروءة</button>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm">

      @if (filteredNotifications().length === 0) {
        <div class="card-body text-center py-5 text-muted">
          <i class="bi bi-bell-slash fs-1 d-block mb-3"></i>
          <h5 class="fw-bold mb-2">لا توجد إشعارات</h5>
          <p class="small mb-0">ستظهر هنا إشعارات النظام الجديدة</p>
        </div>
      } @else {
        @for (notif of filteredNotifications(); track notif.id) {
          <div class="card-body border-bottom py-3 d-flex align-items-start gap-3"
            [class.bg-light]="!notif.isRead">
            <!-- Icon -->
            <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              style="width:40px;height:40px;"
              [ngClass]="'bg-' + notif.type + '-subtle'">
              <i class="bi" [ngClass]="[notif.icon, 'text-' + notif.type]"></i>
            </div>

            <!-- Content -->
            <div class="flex-grow-1 min-w-0">
              <div class="d-flex align-items-start justify-content-between gap-2">
                <div class="fw-semibold small" [class.fw-bold]="!notif.isRead">
                  {{ notif.title }}
                </div>
                @if (!notif.isRead) {
                  <div class="rounded-circle bg-primary flex-shrink-0" style="width:8px;height:8px;margin-top:4px;"></div>
                }
              </div>
              <div class="text-muted small">{{ notif.body }}</div>
              <div class="text-muted mt-1" style="font-size:0.72rem;">{{ notif.createdAt }}</div>
            </div>

            <!-- Actions -->
            <div class="d-flex gap-1 flex-shrink-0">
              @if (!notif.isRead) {
                <button type="button" class="btn btn-sm btn-outline-primary" (click)="markRead(notif.id)" title="تحديد كمقروء">
                  <i class="bi bi-check"></i>
                </button>
              }
              <button type="button" class="btn btn-sm btn-outline-danger" (click)="remove(notif.id)" title="حذف">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        }
      }

    </div>
  `,
})
export class NotificationCenterPageComponent implements OnInit {
  private readonly layout = inject(LayoutService);

  readonly filter = signal<'all' | 'unread'>('all');

  readonly notifications = signal<NotificationItem[]>([
    {
      id: '1',
      title: 'موعد جديد',
      body: 'تم حجز موعد جديد للمريض أحمد محمد مع د. خالد في تمام الساعة 10:00',
      type: 'info',
      icon: 'bi-calendar-plus',
      createdAt: 'منذ 5 دقائق',
      isRead: false,
      link: '/appointments',
    },
    {
      id: '2',
      title: 'نتيجة مختبر حرجة',
      body: 'نتيجة تحليل مريض سلمى علي تحتاج مراجعة عاجلة — قيم حرجة',
      type: 'danger',
      icon: 'fa-solid fa-triangle-exclamation',
      createdAt: 'منذ 15 دقيقة',
      isRead: false,
      link: '/lab-results',
    },
    {
      id: '3',
      title: 'دفعة مستلمة',
      body: 'تم استلام دفعة بقيمة 500 ج.م للفاتورة #INV-0112',
      type: 'success',
      icon: 'bi-check-circle-fill',
      createdAt: 'منذ ساعة',
      isRead: false,
      link: '/billing/invoices',
    },
    {
      id: '4',
      title: 'وصفة جديدة',
      body: 'أصدر د. سارة وصفة طبية جديدة للمريض محمود حسن',
      type: 'info',
      icon: 'fa-solid fa-capsules',
      createdAt: 'منذ ساعتين',
      isRead: true,
      link: '/prescriptions',
    },
    {
      id: '5',
      title: 'فاتورة متأخرة',
      body: 'الفاتورة #INV-0089 تجاوزت تاريخ الاستحقاق، يرجى المتابعة',
      type: 'warning',
      icon: 'bi-clock-history',
      createdAt: 'منذ يوم',
      isRead: true,
      link: '/billing/invoices',
    },
  ]);

  readonly unreadCount = () => this.notifications().filter((n) => !n.isRead).length;

  readonly filteredNotifications = () => {
    if (this.filter() === 'unread') return this.notifications().filter((n) => !n.isRead);
    return this.notifications();
  };

  ngOnInit(): void {
    this.layout.setPageTitle('Notifications', 'الإشعارات');
  }

  markRead(id: string): void {
    this.notifications.update((list) =>
      list.map((n) => n.id === id ? { ...n, isRead: true } : n)
    );
  }

  markAllRead(): void {
    this.notifications.update((list) => list.map((n) => ({ ...n, isRead: true })));
  }

  remove(id: string): void {
    this.notifications.update((list) => list.filter((n) => n.id !== id));
  }
}