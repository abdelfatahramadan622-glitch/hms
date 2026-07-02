import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../../../../core/application/services/layout.service';

interface LiveEvent {
  id: string;
  type: 'appointment' | 'emergency' | 'lab' | 'payment' | 'system';
  title: string;
  body: string;
  timestamp: string;
  color: string;
  icon: string;
}

@Component({
  selector: 'hms-realtime-monitor-page',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes cardIn {
      from { opacity: 0; transform: scale(0.97) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes eventSlide {
      from { opacity: 0; transform: translateX(-12px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    :host {
      display: block;
      animation: fadeUp 0.5s ease-out;
    }
    .h4 .bi-broadcast {
      color: #15803d !important;
    }
    .rounded-circle[style*="width:8px"] {
      animation: pulse 2s infinite;
    }
    .rounded-circle.bg-success[style*="width:8px"] {
      background-color: #22c55e !important;
    }
    .rounded-circle.bg-danger[style*="width:8px"] {
      background-color: #dc2626 !important;
    }
    .text-success { color: #15803d !important; }
    .text-danger { color: #dc2626 !important; }

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
    .btn-danger {
      background: linear-gradient(135deg, #dc2626, #ef4444);
      border: none;
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    .btn-danger:hover {
      background: linear-gradient(135deg, #b91c1c, #dc2626);
      box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
    }
    .btn-success {
      background: linear-gradient(135deg, #15803d, #22c55e);
      border: none;
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    .btn-success:hover {
      background: linear-gradient(135deg, #166534, #16a34a);
      box-shadow: 0 4px 14px rgba(22, 163, 74, 0.35);
    }

    .card {
      border-radius: 14px;
      animation: cardIn 0.4s ease-out both;
    }
    .card-header {
      border-bottom-color: #dcfce7;
    }
    .card-header h6 {
      color: #1f2937;
    }
    .badge.bg-success-subtle {
      background-color: #dcfce7 !important;
      color: #15803d !important;
    }
    .badge .bi-circle-fill {
      animation: pulse 1.5s infinite;
      color: #22c55e;
    }

    .fs-5 { color: #15803d; }

    .event-item {
      animation: eventSlide 0.35s ease-out both;
      transition: background-color 0.25s ease;
    }
    .event-item:hover {
      background-color: #f0fdf4;
    }
    .event-item .rounded-circle {
      border-radius: 10px !important;
      transition: transform 0.3s ease;
    }
    .event-item:hover .rounded-circle {
      transform: scale(1.08);
    }

    .text-center .bi-broadcast {
      color: #86efac;
    }
  `],
  template: `
    <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
      <div>
        <h1 class="h4 fw-bold mb-0">
          <i class="bi bi-broadcast me-2 text-success"></i>التحديثات الفورية
        </h1>
        <div class="d-flex align-items-center gap-2 small mt-1">
          <div class="rounded-circle"
            [class.bg-success]="isConnected()"
            [class.bg-danger]="!isConnected()"
            style="width:8px;height:8px;"></div>
          <span [class.text-success]="isConnected()" [class.text-danger]="!isConnected()">
            {{ isConnected() ? 'متصل' : 'غير متصل' }}
          </span>
        </div>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-outline-secondary" (click)="clearEvents()">
          <i class="bi bi-trash me-1"></i>مسح
        </button>
        <button class="btn btn-sm"
          [class.btn-danger]="isConnected()"
          [class.btn-success]="!isConnected()"
          (click)="toggleConnection()">
          <i class="bi me-1" [class.bi-wifi-off]="isConnected()" [class.bi-wifi]="!isConnected()"></i>
          {{ isConnected() ? 'قطع الاتصال' : 'إعادة الاتصال' }}
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="row g-3 mb-4">
      @for (stat of eventStats(); track stat.label) {
        <div class="col-6 col-md-3">
          <div class="card border-0 shadow-sm">
            <div class="card-body p-3 text-center">
              <div class="fw-bold fs-5" [ngClass]="'text-' + stat.color">{{ stat.count }}</div>
              <div class="text-muted small">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      }
    </div>

    <!-- Live Events Feed -->
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white border-bottom py-3 d-flex align-items-center gap-2">
        <h6 class="mb-0 fw-bold">تدفق الأحداث الحية</h6>
        @if (isConnected()) {
          <span class="badge bg-success-subtle text-success rounded-pill small">
            <i class="bi bi-circle-fill me-1" style="font-size:0.5rem;"></i>مباشر
          </span>
        }
      </div>
      <div class="card-body p-0" style="max-height: 500px; overflow-y: auto;">
        @if (events().length === 0) {
          <div class="text-center py-5 text-muted">
            <i class="bi bi-broadcast fs-2 d-block mb-2"></i>
            <p class="small mb-0">في انتظار الأحداث...</p>
          </div>
        } @else {
          @for (event of events(); track event.id) {
            <div class="d-flex align-items-start gap-3 px-3 py-3 border-bottom event-item">
              <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                style="width:36px;height:36px;"
                [ngClass]="'bg-' + event.color + '-subtle'">
                <i class="bi small" [ngClass]="[event.icon, 'text-' + event.color]"></i>
              </div>
              <div class="flex-grow-1 min-w-0">
                <div class="fw-semibold small">{{ event.title }}</div>
                <div class="text-muted small text-truncate">{{ event.body }}</div>
              </div>
              <div class="text-muted flex-shrink-0" style="font-size:0.7rem;">{{ event.timestamp }}</div>
            </div>
          }
        }
      </div>
    </div>
  `,
})
export class RealtimeMonitorPageComponent implements OnInit, OnDestroy {
  private readonly layout = inject(LayoutService);
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private eventCounter = 0;

  readonly isConnected = signal(true);
  readonly events = signal<LiveEvent[]>([]);

  readonly eventStats = () => [
    { label: 'مواعيد',  count: this.events().filter((e) => e.type === 'appointment').length, color: 'info' },
    { label: 'طوارئ',   count: this.events().filter((e) => e.type === 'emergency').length,   color: 'danger' },
    { label: 'مختبر',   count: this.events().filter((e) => e.type === 'lab').length,         color: 'warning' },
    { label: 'مدفوعات', count: this.events().filter((e) => e.type === 'payment').length,     color: 'success' },
  ];

  private readonly sampleEvents: Omit<LiveEvent, 'id' | 'timestamp'>[] = [
    { type: 'appointment', title: 'موعد مؤكد', body: 'تأكيد موعد أحمد محمد مع د. خالد', color: 'info',    icon: 'bi-calendar-check' },
    { type: 'emergency',   title: 'حالة طوارئ جديدة', body: 'وصول حالة طوارئ مستوى 2 — ألم صدري', color: 'danger',  icon: 'fa-solid fa-triangle-exclamation' },
    { type: 'lab',         title: 'نتيجة مختبر', body: 'اكتمال تحليل الدم للمريض سلمى علي', color: 'warning', icon: 'bi-thermometer' },
    { type: 'payment',     title: 'دفعة مستلمة', body: 'تم استلام 750 ج.م للفاتورة #INV-0119', color: 'success', icon: 'bi-credit-card' },
    { type: 'appointment', title: 'إلغاء موعد', body: 'إلغاء موعد محمود حسن الساعة 3:00 م', color: 'info',    icon: 'bi-calendar-x' },
    { type: 'system',      title: 'نسخ احتياطي', body: 'اكتمال النسخ الاحتياطي التلقائي بنجاح', color: 'secondary', icon: 'bi-cloud-check' },
  ];

  ngOnInit(): void {
    this.layout.setPageTitle('Realtime Monitor', 'مراقبة الأحداث الحية');
    this.startSimulation();
  }

  ngOnDestroy(): void {
    this.stopSimulation();
  }

  private startSimulation(): void {
    // Add initial events
    this.addSampleEvent();
    this.addSampleEvent();

    this.intervalId = setInterval(() => {
      if (this.isConnected()) this.addSampleEvent();
    }, 4000);
  }

  private stopSimulation(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private addSampleEvent(): void {
    const sample = this.sampleEvents[this.eventCounter % this.sampleEvents.length];
    this.eventCounter++;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    this.events.update((list) => [
      {
        ...sample,
        id: `evt-${Date.now()}-${Math.random()}`,
        timestamp: timeStr,
      },
      ...list.slice(0, 49),
    ]);
  }

  toggleConnection(): void {
    this.isConnected.update((v) => !v);
  }

  clearEvents(): void {
    this.events.set([]);
  }
}