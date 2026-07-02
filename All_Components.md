# Angular Components

Base Path: E:\projects\Angular Projects\Hospital Management System\HMS
Generated: Wed 07/01/2026 19:14:23.25


================================================================================
## src\app\app.component
================================================================================

### TypeScript

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class AppComponent {}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\errors\forbidden-page\forbidden-page.component
================================================================================

### TypeScript

```typescript
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hms-forbidden-page',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div class="text-center p-4">
        <div class="mb-4" style="font-size: 6rem; line-height: 1;">
          <i class="bi bi-shield-x text-danger"></i>
        </div>
        <h1 class="display-1 fw-bold text-danger">403</h1>
        <h2 class="h4 fw-bold mb-2">غير مصرح بالوصول</h2>
        <p class="text-muted mb-4">ليس لديك صلاحية للوصول إلى هذه الصفحة.</p>
        <div class="d-flex gap-2 justify-content-center">
          <button class="btn btn-outline-secondary" (click)="goBack()">
            <i class="bi bi-arrow-right me-2"></i>
            رجوع
          </button>
          <a routerLink="/dashboard" class="btn btn-primary">
            <i class="bi bi-house me-2"></i>
            لوحة التحكم
          </a>
        </div>
      </div>
    </div>
  `,
})
export class ForbiddenPageComponent {
  goBack(): void { history.back(); }
}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\errors\not-found-page\not-found-page.component
================================================================================

### TypeScript

```typescript
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hms-not-found-page',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div class="text-center p-4">
        <div class="mb-4" style="font-size: 6rem; line-height: 1;">
          <i class="bi bi-search text-muted"></i>
        </div>
        <h1 class="display-1 fw-bold text-muted">404</h1>
        <h2 class="h4 fw-bold mb-2">الصفحة غير موجودة</h2>
        <p class="text-muted mb-4">الصفحة التي تبحث عنها غير موجودة أو تم نقلها.</p>
        <a routerLink="/dashboard" class="btn btn-primary px-4">
          <i class="bi bi-house me-2"></i>
          العودة للرئيسية
        </a>
      </div>
    </div>
  `,
})
export class NotFoundPageComponent {}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\errors\server-error-page\server-error-page.component
================================================================================

### TypeScript

```typescript
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hms-server-error-page',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div class="text-center p-4">
        <div class="mb-4" style="font-size: 6rem; line-height: 1;">
          <i class="bi bi-exclamation-triangle text-warning"></i>
        </div>
        <h1 class="display-1 fw-bold text-warning">500</h1>
        <h2 class="h4 fw-bold mb-2">خطأ في الخادم</h2>
        <p class="text-muted mb-4">حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقاً.</p>
        <div class="d-flex gap-2 justify-content-center">
          <button class="btn btn-outline-secondary" (click)="reload()">
            <i class="bi bi-arrow-clockwise me-2"></i>
            إعادة المحاولة
          </button>
          <a routerLink="/dashboard" class="btn btn-primary">
            <i class="bi bi-house me-2"></i>
            لوحة التحكم
          </a>
        </div>
      </div>
    </div>
  `,
})
export class ServerErrorPageComponent {
  reload(): void { window.location.reload(); }
}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\appointments\presentation\components\appointment-card\appointment-card.component
================================================================================

### TypeScript

```typescript
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppointmentModel, APPOINTMENT_TYPE_LABELS } from '../../../domain/models/appointment.model';
import { AppointmentStatusBadgeComponent } from '../appointment-status-badge/appointment-status-badge.component';

@Component({
  selector: 'hms-appointment-card',
  standalone: true,
  imports: [CommonModule, RouterModule, AppointmentStatusBadgeComponent],
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.scss',
})
export class AppointmentCardComponent {
  readonly appointment = input.required<AppointmentModel>();
  readonly confirmed = output<string>();
  readonly cancelled = output<string>();
  readonly completed = output<string>();

  readonly typeLabels = APPOINTMENT_TYPE_LABELS;

  onConfirm(e: Event): void { e.preventDefault(); this.confirmed.emit(this.appointment().id); }
  onCancel(e: Event): void { e.preventDefault(); this.cancelled.emit(this.appointment().id); }
  onComplete(e: Event): void { e.preventDefault(); this.completed.emit(this.appointment().id); }

  canConfirm(): boolean { return this.appointment().status === 'scheduled'; }
  canCancel(): boolean { return ['scheduled', 'confirmed'].includes(this.appointment().status); }
  canComplete(): boolean { return this.appointment().status === 'in-progress'; }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(amount);
  }
}
```

### HTML

```html
<div class="card border-0 shadow-sm h-100 appointment-card">
  <div class="card-body p-3">

    <!-- Header: Date + Status -->
    <div class="d-flex align-items-start justify-content-between mb-3">
      <div>
        <div class="fw-bold text-primary" dir="ltr">{{ appointment().startTime }} – {{ appointment().endTime }}</div>
        <div class="text-muted small">{{ appointment().date | date:'EEE dd/MM/yyyy':'':'ar' }}</div>
      </div>
      <hms-appointment-status-badge [status]="appointment().status" />
    </div>

    <!-- Patient & Doctor -->
    <div class="mb-3">
      <div class="d-flex align-items-center gap-2 mb-1">
        <i class="bi bi-person-fill text-muted flex-shrink-0"></i>
        <a [routerLink]="['/patients', appointment().patientId]"
          class="small fw-semibold text-dark text-decoration-none text-truncate">
          {{ appointment().patientName }}
        </a>
      </div>
      <div class="d-flex align-items-center gap-2">
        <i class="bi bi-person-badge text-muted flex-shrink-0"></i>
        <a [routerLink]="['/doctors', appointment().doctorId]"
          class="small text-muted text-decoration-none text-truncate">
          د. {{ appointment().doctorName }}
        </a>
      </div>
    </div>

    <!-- Meta -->
    <div class="d-flex align-items-center justify-content-between mb-3 small">
      <span class="badge bg-light text-dark border">{{ typeLabels[appointment().type] }}</span>
      <div class="d-flex align-items-center gap-1"
        [class.text-success]="appointment().isPaid"
        [class.text-danger]="!appointment().isPaid">
        <i class="bi" [class.bi-check-circle-fill]="appointment().isPaid" [class.bi-clock]="!appointment().isPaid"></i>
        <span>{{ appointment().isPaid ? 'مدفوع' : 'غير مدفوع' }}</span>
      </div>
    </div>

    @if (appointment().reason) {
      <p class="text-muted small mb-3 text-truncate">
        <i class="bi bi-chat-text me-1"></i>{{ appointment().reason }}
      </p>
    }

    <!-- Actions -->
    <div class="d-flex gap-1 pt-2 border-top flex-wrap">
      <a [routerLink]="['/appointments', appointment().id]"
        class="btn btn-sm btn-outline-primary flex-grow-1">
        <i class="bi bi-eye me-1"></i>عرض
      </a>
      @if (canConfirm()) {
        <button type="button" class="btn btn-sm btn-outline-success" (click)="onConfirm($event)" title="تأكيد">
          <i class="bi bi-check-lg"></i>
        </button>
      }
      @if (canComplete()) {
        <button type="button" class="btn btn-sm btn-outline-info" (click)="onComplete($event)" title="إنهاء">
          <i class="bi bi-check2-all"></i>
        </button>
      }
      @if (canCancel()) {
        <button type="button" class="btn btn-sm btn-outline-danger" (click)="onCancel($event)" title="إلغاء">
          <i class="bi bi-x-lg"></i>
        </button>
      }
    </div>

  </div>
</div>
```

### SCSS

```scss

```


================================================================================
## src\app\features\appointments\presentation\components\appointment-filter\appointment-filter.component
================================================================================

### TypeScript

```typescript
import { Component, inject, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AppointmentFilter } from '../../../domain/models/appointment-filter.model';
import { AppointmentStatus, AppointmentType, APPOINTMENT_TYPE_LABELS } from '../../../domain/models/appointment.model';

@Component({
  selector: 'hms-appointment-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointment-filter.component.html',
  styleUrl: './appointment-filter.component.scss',
})
export class AppointmentFilterComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  readonly filterChanged = output<Partial<AppointmentFilter>>();
  readonly filterReset = output<void>();

  readonly typeLabels = APPOINTMENT_TYPE_LABELS;
  readonly types = Object.keys(APPOINTMENT_TYPE_LABELS) as AppointmentType[];

  form = this.fb.group({
    search:   [''],
    status:   ['' as AppointmentStatus | ''],
    type:     ['' as AppointmentType | ''],
    dateFrom: [''],
    dateTo:   [''],
    isPaid:   ['' as 'true' | 'false' | ''],
  });

  ngOnInit(): void {
    this.form.get('search')!.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.emit());
    this.form.valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.emit());
  }

  emit(): void {
    const v = this.form.value;
    this.filterChanged.emit({
      search:   v.search ?? '',
      status:   (v.status as AppointmentStatus) || undefined,
      type:     (v.type as AppointmentType) || undefined,
      dateFrom: v.dateFrom || undefined,
      dateTo:   v.dateTo || undefined,
      isPaid:   v.isPaid ? v.isPaid === 'true' : undefined,
      page: 1,
    });
  }

  reset(): void {
    this.form.reset({ search: '', status: '', type: '', dateFrom: '', dateTo: '', isPaid: '' });
    this.filterReset.emit();
  }

  get hasActive(): boolean {
    const v = this.form.value;
    return !!(v.search || v.status || v.type || v.dateFrom || v.dateTo || v.isPaid);
  }
}
```

### HTML

```html
<div class="card border-0 shadow-sm mb-4">
  <div class="card-body p-3">
    <div [formGroup]="form" class="row g-2 align-items-end">

      <div class="col-12 col-md-4">
        <label class="form-label small fw-semibold mb-1">بحث</label>
        <div class="input-group input-group-sm">
          <span class="input-group-text bg-light"><i class="bi bi-search text-muted"></i></span>
          <input type="text" class="form-control border-start-0" formControlName="search"
            placeholder="اسم المريض أو الطبيب..." />
        </div>
      </div>

      <div class="col-6 col-md-2">
        <label class="form-label small fw-semibold mb-1">الحالة</label>
        <select class="form-select form-select-sm" formControlName="status">
          <option value="">الكل</option>
          <option value="scheduled">مجدول</option>
          <option value="confirmed">مؤكد</option>
          <option value="in-progress">جارٍ</option>
          <option value="completed">مكتمل</option>
          <option value="cancelled">ملغى</option>
          <option value="no-show">لم يحضر</option>
        </select>
      </div>

      <div class="col-6 col-md-2">
        <label class="form-label small fw-semibold mb-1">النوع</label>
        <select class="form-select form-select-sm" formControlName="type">
          <option value="">الكل</option>
          @for (type of types; track type) {
            <option [value]="type">{{ typeLabels[type] }}</option>
          }
        </select>
      </div>

      <div class="col-6 col-md-2">
        <label class="form-label small fw-semibold mb-1">من تاريخ</label>
        <input type="date" class="form-control form-control-sm" formControlName="dateFrom" />
      </div>

      <div class="col-6 col-md-1">
        <label class="form-label small fw-semibold mb-1">الدفع</label>
        <select class="form-select form-select-sm" formControlName="isPaid">
          <option value="">الكل</option>
          <option value="true">مدفوع</option>
          <option value="false">غير مدفوع</option>
        </select>
      </div>

      <div class="col-12 col-md-1">
        @if (hasActive) {
          <button type="button" class="btn btn-sm btn-outline-secondary w-100" (click)="reset()">
            <i class="bi bi-x-circle me-1"></i>مسح
          </button>
        }
      </div>

    </div>
  </div>
</div>
```

### SCSS

```scss

```


================================================================================
## src\app\features\appointments\presentation\components\appointment-form\appointment-form.component
================================================================================

### TypeScript

```typescript
import { Component, inject, input, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AppointmentModel, APPOINTMENT_TYPE_LABELS, AppointmentType } from '../../../domain/models/appointment.model';
import { CreateAppointmentRequest } from '../../../domain/repositories/appointment.repository';

@Component({
  selector: 'hms-appointment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss',
})
export class AppointmentFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  readonly appointment = input<AppointmentModel | null>(null);
  readonly isSaving = input<boolean>(false);
  readonly prefillPatientId = input<string>('');
  readonly prefillDoctorId = input<string>('');
  readonly submitted = output<CreateAppointmentRequest>();
  readonly cancelled = output<void>();

  readonly typeLabels = APPOINTMENT_TYPE_LABELS;
  readonly types = Object.keys(APPOINTMENT_TYPE_LABELS) as AppointmentType[];

  form = this.fb.group({
    patientId:    ['', Validators.required],
    doctorId:     ['', Validators.required],
    departmentId: ['', Validators.required],
    date:         ['', Validators.required],
    startTime:    ['', Validators.required],
    endTime:      ['', Validators.required],
    type:         ['consultation', Validators.required],
    reason:       ['', [Validators.required, Validators.minLength(5)]],
    notes:        [''],
    fee:          [0, [Validators.required, Validators.min(0)]],
  });

  get f() { return this.form.controls; }
  get isEdit(): boolean { return !!this.appointment(); }

  ngOnInit(): void {
    const a = this.appointment();
    if (a) {
      this.form.patchValue({
        patientId: a.patientId, doctorId: a.doctorId, departmentId: a.departmentId,
        date: a.date, startTime: a.startTime, endTime: a.endTime,
        type: a.type, reason: a.reason, notes: a.notes ?? '', fee: a.fee,
      });
    } else {
      if (this.prefillPatientId()) this.form.patchValue({ patientId: this.prefillPatientId() });
      if (this.prefillDoctorId()) this.form.patchValue({ doctorId: this.prefillDoctorId() });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.getRawValue();
    this.submitted.emit({
      patientId:    v.patientId!,
      doctorId:     v.doctorId!,
      departmentId: v.departmentId!,
      date:         v.date!,
      startTime:    v.startTime!,
      endTime:      v.endTime!,
      type:         v.type!,
      reason:       v.reason!,
      notes:        v.notes || undefined,
      fee:          v.fee!,
    });
  }
}
```

### HTML

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>

  <div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-white py-3 border-bottom">
      <h6 class="mb-0 fw-bold">
        <i class="bi bi-calendar-plus text-primary me-2"></i>
        بيانات الموعد
      </h6>
    </div>
    <div class="card-body p-4">
      <div class="row g-3">

        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">رقم المريض <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="patientId"
            [class.is-invalid]="f['patientId'].invalid && f['patientId'].touched"
            placeholder="معرّف المريض" dir="ltr" />
          <div class="invalid-feedback">رقم المريض مطلوب</div>
        </div>

        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">رقم الطبيب <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="doctorId"
            [class.is-invalid]="f['doctorId'].invalid && f['doctorId'].touched"
            placeholder="معرّف الطبيب" dir="ltr" />
          <div class="invalid-feedback">رقم الطبيب مطلوب</div>
        </div>

        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">القسم <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="departmentId"
            [class.is-invalid]="f['departmentId'].invalid && f['departmentId'].touched"
            placeholder="معرّف القسم" dir="ltr" />
          <div class="invalid-feedback">القسم مطلوب</div>
        </div>

        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">نوع الموعد <span class="text-danger">*</span></label>
          <select class="form-select" formControlName="type"
            [class.is-invalid]="f['type'].invalid && f['type'].touched">
            @for (type of types; track type) {
              <option [value]="type">{{ typeLabels[type] }}</option>
            }
          </select>
        </div>

        <div class="col-12 col-md-4">
          <label class="form-label fw-semibold">التاريخ <span class="text-danger">*</span></label>
          <input type="date" class="form-control" formControlName="date"
            [class.is-invalid]="f['date'].invalid && f['date'].touched" />
          <div class="invalid-feedback">التاريخ مطلوب</div>
        </div>

        <div class="col-6 col-md-4">
          <label class="form-label fw-semibold">وقت البداية <span class="text-danger">*</span></label>
          <input type="time" class="form-control" formControlName="startTime"
            [class.is-invalid]="f['startTime'].invalid && f['startTime'].touched" />
          <div class="invalid-feedback">وقت البداية مطلوب</div>
        </div>

        <div class="col-6 col-md-4">
          <label class="form-label fw-semibold">وقت النهاية <span class="text-danger">*</span></label>
          <input type="time" class="form-control" formControlName="endTime"
            [class.is-invalid]="f['endTime'].invalid && f['endTime'].touched" />
          <div class="invalid-feedback">وقت النهاية مطلوب</div>
        </div>

        <div class="col-12 col-md-8">
          <label class="form-label fw-semibold">سبب الزيارة <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="reason"
            [class.is-invalid]="f['reason'].invalid && f['reason'].touched"
            placeholder="سبب الزيارة أو الشكوى الرئيسية" />
          <div class="invalid-feedback">سبب الزيارة مطلوب (5 أحرف على الأقل)</div>
        </div>

        <div class="col-12 col-md-4">
          <label class="form-label fw-semibold">رسوم الكشف (ج.م) <span class="text-danger">*</span></label>
          <input type="number" class="form-control" formControlName="fee" min="0" />
        </div>

        <div class="col-12">
          <label class="form-label fw-semibold">ملاحظات</label>
          <textarea class="form-control" formControlName="notes" rows="2"
            placeholder="أي ملاحظات إضافية..."></textarea>
        </div>

      </div>
    </div>
  </div>

  <div class="d-flex gap-3 justify-content-end">
    <button type="button" class="btn btn-outline-secondary px-4" (click)="cancelled.emit()">إلغاء</button>
    <button type="submit" class="btn btn-primary px-4" [disabled]="isSaving()">
      @if (isSaving()) {
        <span class="spinner-border spinner-border-sm me-2"></span>جاري الحفظ...
      } @else {
        <i class="bi bi-check-lg me-2"></i>{{ isEdit ? 'حفظ التعديلات' : 'إضافة الموعد' }}
      }
    </button>
  </div>

</form>
```

### SCSS

```scss

```


================================================================================
## src\app\features\appointments\presentation\components\appointment-status-badge\appointment-status-badge.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentStatus, APPOINTMENT_STATUS_CONFIG } from '../../../domain/models/appointment.model';

@Component({
  selector: 'hms-appointment-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge rounded-pill d-inline-flex align-items-center gap-1"
      [ngClass]="config[status()].class">
      <i class="bi small" [ngClass]="config[status()].icon"></i>
      {{ config[status()].label }}
    </span>
  `,
})
export class AppointmentStatusBadgeComponent {
  readonly status = input.required<AppointmentStatus>();
  readonly config = APPOINTMENT_STATUS_CONFIG;
}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\appointments\presentation\pages\appointment-calendar-page\appointment-calendar-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppointmentsFacade } from '../../../application/facades/appointments.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';

@Component({
  selector: 'hms-appointment-calendar-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './appointment-calendar-page.component.html',
  styleUrl: './appointment-calendar-page.component.scss',
})
export class AppointmentCalendarPageComponent implements OnInit {
  readonly facade = inject(AppointmentsFacade);
  private readonly layout = inject(LayoutService);

  readonly currentDate = signal(new Date());

  readonly calendarDays = computed(() => {
    const date = this.currentDate();
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (number | null)[] = Array(firstDay).fill(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  });

  readonly monthYearLabel = computed(() => {
    return this.currentDate().toLocaleDateString('ar-EG', { month: 'long', year: 'numeric' });
  });

  ngOnInit(): void {
    this.layout.setPageTitle('Appointment Calendar', 'تقويم المواعيد');
    this.loadCurrentMonth();
  }

  loadCurrentMonth(): void {
    const d = this.currentDate();
    const dateFrom = new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split('T')[0];
    const dateTo = new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString().split('T')[0];
    this.facade.loadAll({ page: 1, pageSize: 200, dateFrom, dateTo });
  }

  prevMonth(): void {
    const d = this.currentDate();
    this.currentDate.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
    this.loadCurrentMonth();
  }

  nextMonth(): void {
    const d = this.currentDate();
    this.currentDate.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
    this.loadCurrentMonth();
  }

  getAppointmentsForDay(day: number): any[] {
    if (!day) return [];
    const d = this.currentDate();
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    return this.facade.appointments().items.filter((a) => a.date === dateStr).slice(0, 3);
  }

  isToday(day: number | null): boolean {
    if (!day) return false;
    const d = this.currentDate();
    const today = new Date();
    return d.getFullYear() === today.getFullYear()
      && d.getMonth() === today.getMonth()
      && day === today.getDate();
  }

  readonly weekDays = ['أح', 'اث', 'ث', 'أر', 'خ', 'ج', 'س'];
}
```

### HTML

```html
<div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
  <h1 class="h4 fw-bold mb-0">
    <i class="bi bi-calendar3 text-primary me-2"></i>تقويم المواعيد
  </h1>
  <div class="d-flex gap-2">
    <a routerLink="/appointments" class="btn btn-sm btn-outline-secondary">
      <i class="bi bi-list-ul me-1"></i>قائمة
    </a>
    <a routerLink="/appointments/new" class="btn btn-sm btn-primary">
      <i class="bi bi-calendar-plus me-1"></i>موعد جديد
    </a>
  </div>
</div>

<!-- Month Navigation -->
<div class="card border-0 shadow-sm mb-4">
  <div class="card-body p-3">
    <div class="d-flex align-items-center justify-content-between">
      <button class="btn btn-sm btn-outline-secondary" (click)="prevMonth()">
        <i class="bi bi-chevron-right"></i>
      </button>
      <h5 class="fw-bold mb-0">{{ monthYearLabel() }}</h5>
      <button class="btn btn-sm btn-outline-secondary" (click)="nextMonth()">
        <i class="bi bi-chevron-left"></i>
      </button>
    </div>
  </div>
</div>

<!-- Calendar Grid -->
<div class="card border-0 shadow-sm">
  <div class="card-body p-0">

    <!-- Week Header -->
    <div class="row g-0 border-bottom">
      @for (day of weekDays; track day) {
        <div class="col text-center py-2 text-muted small fw-semibold border-end">{{ day }}</div>
      }
    </div>

    <!-- Days Grid -->
    @if (facade.isLoading()) {
      <div class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
      </div>
    } @else {
      <div class="calendar-grid">
        @for (chunk of [calendarDays().slice(0,7), calendarDays().slice(7,14), calendarDays().slice(14,21), calendarDays().slice(21,28), calendarDays().slice(28,35)]; track $index) {
          <div class="row g-0 border-bottom">
            @for (day of chunk; track $index) {
              <div class="col border-end calendar-day p-1"
                [class.bg-primary-subtle]="isToday(day)"
                style="min-height: 90px;">
                @if (day) {
                  <div class="small fw-semibold mb-1 px-1"
                    [class.text-primary]="isToday(day)">
                    {{ day }}
                  </div>
                  @for (apt of getAppointmentsForDay(day); track apt.id) {
                    <a [routerLink]="['/appointments', apt.id]"
                      class="d-block text-decoration-none mb-1 px-1 py-0 rounded small text-truncate"
                      [class.bg-info-subtle]="apt.status === 'scheduled'"
                      [class.bg-success-subtle]="apt.status === 'confirmed'"
                      [class.bg-warning-subtle]="apt.status === 'in-progress'"
                      [class.bg-secondary-subtle]="apt.status === 'completed'"
                      style="font-size: 0.7rem; line-height: 1.4;">
                      <span dir="ltr">{{ apt.startTime }}</span> {{ apt.patientName }}
                    </a>
                  }
                }
              </div>
            }
          </div>
        }
      </div>
    }

  </div>
</div>
```

### SCSS

```scss

```


================================================================================
## src\app\features\appointments\presentation\pages\appointment-detail-page\appointment-detail-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AppointmentsFacade } from '../../../application/facades/appointments.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { AppointmentStatusBadgeComponent } from '../../components/appointment-status-badge/appointment-status-badge.component';
import { APPOINTMENT_TYPE_LABELS } from '../../../domain/models/appointment.model';

@Component({
  selector: 'hms-appointment-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, AppointmentStatusBadgeComponent],
  templateUrl: './appointment-detail-page.component.html',
  styleUrl: './appointment-detail-page.component.scss',
})
export class AppointmentDetailPageComponent implements OnInit, OnDestroy {
  readonly facade = inject(AppointmentsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  readonly typeLabels = APPOINTMENT_TYPE_LABELS;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.facade.loadById(id);
    this.layout.setPageTitle('Appointment Detail', 'تفاصيل الموعد');
  }

  ngOnDestroy(): void { this.facade.clearSelected(); }

  onConfirm(): void {
    const a = this.facade.selectedAppointment();
    if (a) this.facade.confirm(a.id).subscribe();
  }

  onCancel(): void {
    const a = this.facade.selectedAppointment();
    if (!a) return;
    const reason = prompt('سبب الإلغاء:');
    if (reason) this.facade.cancel(a.id, reason).subscribe();
  }

  onComplete(): void {
    const a = this.facade.selectedAppointment();
    if (a) this.facade.complete(a.id).subscribe();
  }

  onDelete(): void {
    const a = this.facade.selectedAppointment();
    if (!a || !confirm('هل أنت متأكد من حذف هذا الموعد؟')) return;
    this.facade.delete(a.id).subscribe({ next: () => this.nav.goTo('/appointments') });
  }

  formatCurrency(v: number): string {
    return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(v);
  }
}
```

### HTML

```html
<nav aria-label="breadcrumb" class="mb-3">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a routerLink="/appointments" class="text-decoration-none">المواعيد</a></li>
    <li class="breadcrumb-item active">تفاصيل الموعد</li>
  </ol>
</nav>

@if (facade.isDetailLoading()) {
  <div class="text-center py-5">
    <div class="spinner-border text-primary" role="status"></div>
  </div>
}

@if (facade.selectedAppointment(); as apt) {

  <!-- Header -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-body p-4">
      <div class="d-flex align-items-start justify-content-between flex-wrap gap-3">
        <div>
          <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
            <h2 class="h5 fw-bold mb-0">موعد #{{ apt.appointmentNumber }}</h2>
            <hms-appointment-status-badge [status]="apt.status" />
            <span class="badge bg-light text-dark border">{{ typeLabels[apt.type] }}</span>
          </div>
          <div class="text-muted small">
            <i class="bi bi-calendar me-1"></i>{{ apt.date | date:'EEEE dd MMMM yyyy':'':'ar' }}
            &nbsp;|&nbsp;
            <i class="bi bi-clock me-1"></i>
            <span dir="ltr">{{ apt.startTime }} – {{ apt.endTime }}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="d-flex gap-2 flex-wrap">
          @if (apt.status === 'scheduled') {
            <button type="button" class="btn btn-sm btn-success" (click)="onConfirm()">
              <i class="bi bi-check-lg me-1"></i>تأكيد
            </button>
          }
          @if (apt.status === 'in-progress') {
            <button type="button" class="btn btn-sm btn-info" (click)="onComplete()">
              <i class="bi bi-check2-all me-1"></i>إنهاء
            </button>
          }
          @if (['scheduled','confirmed'].includes(apt.status)) {
            <button type="button" class="btn btn-sm btn-outline-danger" (click)="onCancel()">
              <i class="bi bi-x-lg me-1"></i>إلغاء
            </button>
          }
          <a [routerLink]="['/appointments', apt.id, 'edit']" class="btn btn-sm btn-outline-secondary">
            <i class="bi bi-pencil me-1"></i>تعديل
          </a>
          <button type="button" class="btn btn-sm btn-outline-danger" (click)="onDelete()">
            <i class="bi bi-trash me-1"></i>حذف
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Details -->
  <div class="row g-4">

    <div class="col-12 col-lg-6">
      <div class="card border-0 shadow-sm h-100">
        <div class="card-header bg-white border-bottom py-3">
          <h6 class="mb-0 fw-bold"><i class="bi bi-people text-primary me-2"></i>أطراف الموعد</h6>
        </div>
        <div class="card-body">
          <dl class="row small mb-0">
            <dt class="col-4 text-muted fw-normal">المريض</dt>
            <dd class="col-8">
              <a [routerLink]="['/patients', apt.patientId]" class="text-decoration-none fw-semibold">
                {{ apt.patientName }}
              </a>
            </dd>
            <dt class="col-4 text-muted fw-normal">الطبيب</dt>
            <dd class="col-8">
              <a [routerLink]="['/doctors', apt.doctorId]" class="text-decoration-none fw-semibold">
                د. {{ apt.doctorName }}
              </a>
            </dd>
            <dt class="col-4 text-muted fw-normal">القسم</dt>
            <dd class="col-8">{{ apt.departmentName }}</dd>
          </dl>
        </div>
      </div>
    </div>

    <div class="col-12 col-lg-6">
      <div class="card border-0 shadow-sm h-100">
        <div class="card-header bg-white border-bottom py-3">
          <h6 class="mb-0 fw-bold"><i class="bi bi-receipt text-success me-2"></i>معلومات الدفع</h6>
        </div>
        <div class="card-body">
          <dl class="row small mb-0">
            <dt class="col-4 text-muted fw-normal">رسوم الكشف</dt>
            <dd class="col-8 fw-bold" dir="ltr">{{ formatCurrency(apt.fee) }}</dd>
            <dt class="col-4 text-muted fw-normal">حالة الدفع</dt>
            <dd class="col-8">
              <span class="badge" [class.bg-success]="apt.isPaid" [class.bg-danger]="!apt.isPaid">
                {{ apt.isPaid ? 'مدفوع' : 'غير مدفوع' }}
              </span>
            </dd>
          </dl>
          @if (!apt.isPaid) {
            <a [routerLink]="['/billing/payment']" [queryParams]="{ appointmentId: apt.id }"
              class="btn btn-sm btn-success mt-3 w-100">
              <i class="bi bi-credit-card me-1"></i>تسجيل الدفع
            </a>
          }
        </div>
      </div>
    </div>

    @if (apt.reason || apt.notes || apt.cancelReason) {
      <div class="col-12">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white border-bottom py-3">
            <h6 class="mb-0 fw-bold"><i class="bi bi-chat-text text-info me-2"></i>تفاصيل إضافية</h6>
          </div>
          <div class="card-body">
            @if (apt.reason) {
              <p class="small mb-2"><span class="text-muted">سبب الزيارة:</span> {{ apt.reason }}</p>
            }
            @if (apt.notes) {
              <p class="small mb-2"><span class="text-muted">ملاحظات:</span> {{ apt.notes }}</p>
            }
            @if (apt.cancelReason) {
              <p class="small mb-0 text-danger">
                <i class="bi bi-x-circle me-1"></i>
                <span class="text-muted">سبب الإلغاء:</span> {{ apt.cancelReason }}
              </p>
            }
          </div>
        </div>
      </div>
    }

  </div>
}
```

### SCSS

```scss

```


================================================================================
## src\app\features\appointments\presentation\pages\appointment-form-page\appointment-form-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AppointmentsFacade } from '../../../application/facades/appointments.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { AppointmentFormComponent } from '../../components/appointment-form/appointment-form.component';
import { CreateAppointmentRequest } from '../../../domain/repositories/appointment.repository';

@Component({
  selector: 'hms-appointment-form-page',
  standalone: true,
  imports: [CommonModule, RouterModule, AppointmentFormComponent],
  template: `
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb small">
        <li class="breadcrumb-item"><a routerLink="/appointments" class="text-decoration-none">المواعيد</a></li>
        <li class="breadcrumb-item active">{{ isEditMode ? 'تعديل الموعد' : 'إضافة موعد جديد' }}</li>
      </ol>
    </nav>

    <h1 class="h4 fw-bold mb-4">
      <i class="bi me-2"
        [class.bi-calendar-plus-fill]="!isEditMode"
        [class.bi-pencil-square]="isEditMode"
        [class.text-primary]="!isEditMode"
        [class.text-warning]="isEditMode"></i>
      {{ isEditMode ? 'تعديل الموعد' : 'إضافة موعد جديد' }}
    </h1>

    @if (facade.hasError()) {
      <div class="alert alert-danger d-flex gap-2 align-items-center mb-4">
        <i class="bi bi-exclamation-circle-fill"></i>{{ facade.error() }}
        <button class="btn-close ms-auto" (click)="facade.clearError()"></button>
      </div>
    }

    @if (isEditMode && facade.isDetailLoading()) {
      <div class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
      </div>
    } @else {
      <hms-appointment-form
        [appointment]="isEditMode ? facade.selectedAppointment() : null"
        [isSaving]="facade.isSaving()"
        [prefillPatientId]="prefillPatientId"
        [prefillDoctorId]="prefillDoctorId"
        (submitted)="onSubmit($event)"
        (cancelled)="onCancel()"
      />
    }
  `,
})
export class AppointmentFormPageComponent implements OnInit {
  readonly facade = inject(AppointmentsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  appointmentId: string | null = null;
  prefillPatientId = '';
  prefillDoctorId = '';

  get isEditMode(): boolean { return !!this.appointmentId; }

  ngOnInit(): void {
    this.appointmentId = this.route.snapshot.paramMap.get('id');
    this.prefillPatientId = this.route.snapshot.queryParams['patientId'] ?? '';
    this.prefillDoctorId = this.route.snapshot.queryParams['doctorId'] ?? '';

    if (this.isEditMode) {
      this.facade.loadById(this.appointmentId!);
      this.layout.setPageTitle('Edit Appointment', 'تعديل الموعد');
    } else {
      this.layout.setPageTitle('New Appointment', 'إضافة موعد جديد');
    }
  }

  onSubmit(request: CreateAppointmentRequest): void {
    const action$ = this.isEditMode
      ? this.facade.update(this.appointmentId!, request)
      : this.facade.create(request);
    action$.subscribe({ next: (a) => this.nav.goTo(`/appointments/${a.id}`) });
  }

  onCancel(): void {
    this.isEditMode
      ? this.nav.goTo(`/appointments/${this.appointmentId}`)
      : this.nav.goTo('/appointments');
  }
}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\appointments\presentation\pages\appointment-list-page\appointment-list-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppointmentsFacade } from '../../../application/facades/appointments.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { AppointmentCardComponent } from '../../components/appointment-card/appointment-card.component';
import { AppointmentFilterComponent } from '../../components/appointment-filter/appointment-filter.component';
import { AppointmentFilter } from '../../../domain/models/appointment-filter.model';

@Component({
  selector: 'hms-appointment-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, AppointmentCardComponent, AppointmentFilterComponent],
  templateUrl: './appointment-list-page.component.html',
  styleUrl: './appointment-list-page.component.scss',
})
export class AppointmentListPageComponent implements OnInit {
  readonly facade = inject(AppointmentsFacade);
  private readonly layout = inject(LayoutService);

  ngOnInit(): void {
    this.layout.setPageTitle('Appointments', 'المواعيد');
    this.facade.loadAll();
  }

  onFilterChanged(filter: Partial<AppointmentFilter>): void {
    this.facade.applyFilter({ ...this.facade.filter(), ...filter, page: 1 });
  }

  onFilterReset(): void { this.facade.loadAll(); }

  onConfirm(id: string): void { this.facade.confirm(id).subscribe(); }

  onCancel(id: string): void {
    const reason = prompt('سبب الإلغاء:');
    if (reason) this.facade.cancel(id, reason).subscribe();
  }

  onComplete(id: string): void { this.facade.complete(id).subscribe(); }

  onPageChange(page: number): void { this.facade.changePage(page); }

  get pages(): number[] {
    return Array.from({ length: this.facade.totalPages() }, (_, i) => i + 1);
  }
}
```

### HTML

```html
<div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
  <div>
    <h1 class="h4 fw-bold mb-0">المواعيد</h1>
    @if (!facade.isLoading()) {
      <p class="text-muted small mb-0">إجمالي: {{ facade.totalAppointments() | number }} موعد</p>
    }
  </div>
  <a routerLink="/appointments/new" class="btn btn-primary">
    <i class="bi bi-calendar-plus-fill me-2"></i>إضافة موعد جديد
  </a>
</div>

<hms-appointment-filter
  (filterChanged)="onFilterChanged($event)"
  (filterReset)="onFilterReset()"
/>

@if (facade.hasError()) {
  <div class="alert alert-danger d-flex gap-2 align-items-center mb-4">
    <i class="bi bi-exclamation-circle-fill"></i>{{ facade.error() }}
    <button class="btn btn-sm btn-danger ms-auto" (click)="facade.loadAll()">إعادة المحاولة</button>
  </div>
}

@if (facade.isLoading()) {
  <div class="row g-3">
    @for (i of [1,2,3,4,5,6]; track i) {
      <div class="col-12 col-md-6 col-xl-4">
        <div class="card border-0 shadow-sm p-3 placeholder-glow">
          <span class="placeholder col-6 d-block mb-2 rounded"></span>
          <span class="placeholder col-9 d-block mb-1 rounded"></span>
          <span class="placeholder col-7 d-block mb-3 rounded"></span>
          <span class="placeholder col-12 rounded" style="height: 32px;"></span>
        </div>
      </div>
    }
  </div>
} @else if (!facade.hasAppointments()) {
  <div class="text-center py-5">
    <i class="bi bi-calendar-x fs-1 text-muted d-block mb-3"></i>
    <h5 class="fw-bold text-muted">لا توجد مواعيد</h5>
    <p class="text-muted small mb-4">لم يتم العثور على مواعيد مطابقة للفلتر</p>
    <a routerLink="/appointments/new" class="btn btn-primary">
      <i class="bi bi-calendar-plus me-2"></i>إضافة موعد جديد
    </a>
  </div>
} @else {
  <div class="row g-3 mb-4">
    @for (apt of facade.appointments().items; track apt.id) {
      <div class="col-12 col-md-6 col-xl-4">
        <hms-appointment-card
          [appointment]="apt"
          (confirmed)="onConfirm($event)"
          (cancelled)="onCancel($event)"
          (completed)="onComplete($event)"
        />
      </div>
    }
  </div>

  @if (facade.totalPages() > 1) {
    <nav>
      <ul class="pagination justify-content-center">
        <li class="page-item" [class.disabled]="facade.currentPage() === 1">
          <button class="page-link" (click)="onPageChange(facade.currentPage() - 1)">
            <i class="bi bi-chevron-right"></i>
          </button>
        </li>
        @for (p of pages; track p) {
          <li class="page-item" [class.active]="p === facade.currentPage()">
            <button class="page-link" (click)="onPageChange(p)">{{ p }}</button>
          </li>
        }
        <li class="page-item" [class.disabled]="facade.currentPage() === facade.totalPages()">
          <button class="page-link" (click)="onPageChange(facade.currentPage() + 1)">
            <i class="bi bi-chevron-left"></i>
          </button>
        </li>
      </ul>
    </nav>
  }
}
```

### SCSS

```scss

```


================================================================================
## src\app\features\audit-logs\presentation\components\audit-log-filter\audit-log-filter.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\audit-logs\presentation\pages\audit-log-list-page\audit-log-list-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { LayoutService } from '../../../../../core/application/services/layout.service';

@Component({
  selector: 'hms-audit-log-list-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h1 class="h4 fw-bold mb-0"><i class="bi bi-journal-text me-2 text-secondary"></i>سجل التدقيق</h1>
      <button class="btn btn-sm btn-outline-secondary">
        <i class="bi bi-download me-1"></i>تصدير
      </button>
    </div>

    <!-- Filter -->
    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body p-3">
        <div class="row g-2">
          <div class="col-12 col-md-4">
            <div class="input-group input-group-sm">
              <span class="input-group-text bg-light"><i class="bi bi-search text-muted"></i></span>
              <input type="text" class="form-control border-start-0" placeholder="بحث في الأحداث..." />
            </div>
          </div>
          <div class="col-6 col-md-2">
            <input type="date" class="form-control form-control-sm" placeholder="من تاريخ" />
          </div>
          <div class="col-6 col-md-2">
            <input type="date" class="form-control form-control-sm" placeholder="إلى تاريخ" />
          </div>
          <div class="col-12 col-md-2">
            <select class="form-select form-select-sm">
              <option value="">كل الإجراءات</option>
              <option>إنشاء</option>
              <option>تعديل</option>
              <option>حذف</option>
              <option>تسجيل دخول</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Sample Audit Log Entries -->
    <div class="card border-0 shadow-sm">
      @for (log of sampleLogs; track log.id) {
        <div class="card-body border-bottom py-3 d-flex align-items-start gap-3">
          <div class="flex-shrink-0">
            <span class="badge rounded-pill"
              [class.bg-success-subtle]="log.action === 'إنشاء'"
              [class.text-success]="log.action === 'إنشاء'"
              [class.bg-warning-subtle]="log.action === 'تعديل'"
              [class.text-warning]="log.action === 'تعديل'"
              [class.bg-danger-subtle]="log.action === 'حذف'"
              [class.text-danger]="log.action === 'حذف'"
              [class.bg-info-subtle]="log.action === 'دخول'"
              [class.text-info]="log.action === 'دخول'">
              {{ log.action }}
            </span>
          </div>
          <div class="flex-grow-1">
            <div class="small fw-semibold">{{ log.description }}</div>
            <div class="text-muted" style="font-size:0.75rem;">
              {{ log.user }} &nbsp;|&nbsp; {{ log.entity }}
              &nbsp;|&nbsp; {{ log.timestamp }}
            </div>
          </div>
        </div>
      }
    </div>
  `,
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
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\authentication\presentation\components\login-form\login-form.component
================================================================================

### TypeScript

```typescript
import { Component, inject, input, output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginRequest } from '../../../domain/models/login-request.model';
import { ROUTE_PATHS } from '../../../../../core/constants/route-paths.constants';

@Component({
  selector: 'hms-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly submitted = output<LoginRequest>();

  readonly isLoading = input<boolean>(false);
  readonly errorMessage = input<string>('');

  readonly forgotPasswordPath = `/${ROUTE_PATHS.AUTH.FORGOT_PASSWORD}`;

  showPassword = false;

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });

  get email() { return this.form.get('email')!; }
  get password() { return this.form.get('password')!; }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.emit(this.form.getRawValue() as LoginRequest);
  }
}
```

### HTML

```html
<!-- رسالة خطأ عامة من السيرفر -->
@if (errorMessage()) {
  <div class="lf-error">
    <i class="fa-solid fa-circle-exclamation"></i>
    <span>{{ errorMessage() }}</span>
  </div>
}

<form [formGroup]="form" (ngSubmit)="onSubmit()" class="lf-form">

  <!-- البريد الإلكتروني -->
  <div class="lf-field">
    <label for="login-email">البريد الإلكتروني</label>
    <div class="lf-input-wrap">
      <input
        id="login-email"
        type="email"
        formControlName="email"
        placeholder="name@hospital.org"
        autocomplete="email"
        [attr.aria-invalid]="email.invalid && email.touched"
      />
      <i class="fa-regular fa-envelope lf-icon"></i>
    </div>
    @if (email.hasError('required') && email.touched) {
      <div class="lf-field-err">
        <i class="fa-solid fa-triangle-exclamation"></i>
        البريد الإلكتروني مطلوب
      </div>
    }
    @if (email.hasError('email') && email.touched && !email.hasError('required')) {
      <div class="lf-field-err">
        <i class="fa-solid fa-triangle-exclamation"></i>
        صيغة البريد الإلكتروني غير صحيحة
      </div>
    }
  </div>

  <!-- كلمة المرور -->
  <div class="lf-field">
    <label for="login-pass">كلمة المرور</label>
    <div class="lf-input-wrap">
      <input
        id="login-pass"
        [type]="showPassword ? 'text' : 'password'"
        formControlName="password"
        placeholder="أدخل كلمة المرور"
        autocomplete="current-password"
        [attr.aria-invalid]="password.invalid && password.touched"
      />
      <i class="fa-solid fa-lock lf-icon"></i>
      <button
        type="button"
        class="lf-toggle-pass"
        (click)="togglePassword()"
        [attr.aria-label]="showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'"
      >
        <i [class]="showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"></i>
      </button>
    </div>
    @if (password.hasError('required') && password.touched) {
      <div class="lf-field-err">
        <i class="fa-solid fa-triangle-exclamation"></i>
        كلمة المرور مطلوبة
      </div>
    }
    @if (password.hasError('minlength') && password.touched && !password.hasError('required')) {
      <div class="lf-field-err">
        <i class="fa-solid fa-triangle-exclamation"></i>
        كلمة المرور يجب أن تكون 6 أحرف على الأقل
      </div>
    }
  </div>

  <!-- تذكرني + نسيت كلمة المرور -->
  <div class="lf-options">
    <label class="lf-remember cursor-pointer">
      <input type="checkbox" formControlName="rememberMe" />
      <span>تذكرني</span>
    </label>
    <a class="lf-forgot" [routerLink]="forgotPasswordPath">نسيت كلمة المرور؟</a>
  </div>

  <!-- زر تسجيل الدخول -->
  <button
    type="submit"
    class="lf-submit"
    [disabled]="form.invalid || isLoading()"
  >
    @if (!isLoading()) {
      <span>تسجيل الدخول</span>
    } @else {
      <span class="lf-spinner"></span>
    }
  </button>
</form>
```

### SCSS

```scss
// ================================================================
//  متغيرات الألوان — متوافقة مع الصفحة الأم
// ================================================================
:host {
  --g-50: #f0fdf4;
  --g-100: #dcfce7;
  --g-200: #bbf7d0;
  --g-300: #86efac;
  --g-400: #4ade80;
  --g-500: #22c55e;
  --g-600: #16a34a;
  --g-700: #15803d;
  --g-800: #166534;
  --g-900: #14532d;

  --t-primary: #0c2e1a;
  --t-secondary: #3d6b4f;
  --t-muted: #6b9a7e;
  --t-faint: #a3c4b0;

  --border: #d1e7da;
  --border-hover: #a7d7b8;
  --border-focus: var(--g-600);
  --input-bg: #f7fdf9;
  --input-bg-hover: #f0faf4;
  --input-bg-focus: #ffffff;

  display: block;
  width: 100%;
}

// ================================================================
//  رسالة خطأ عامة (من السيرفر)
// ================================================================
.lf-error {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.7rem 1rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #fef2f2 0%, #fff5f5 100%);
  border: 1px solid #fecaca;
  color: #b91c1c;
  font-size: 0.84rem;
  font-weight: 500;
  margin-bottom: 1.2rem;
  animation: lfShake 0.45s ease;
  line-height: 1.5;

  i {
    font-size: 0.95rem;
    flex-shrink: 0;
  }
}

@keyframes lfShake {
  0%, 100% { transform: translateX(0); }
  15%      { transform: translateX(-7px); }
  30%      { transform: translateX(6px); }
  45%      { transform: translateX(-4px); }
  60%      { transform: translateX(3px); }
  75%      { transform: translateX(-1px); }
}

// ================================================================
//  الفورم
// ================================================================
.lf-form {
  display: flex;
  flex-direction: column;
}

// ================================================================
//  الحقول
// ================================================================
.lf-field {
  margin-bottom: 1.15rem;
}

.lf-field label {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--t-primary);
  margin-bottom: 0.4rem;
  letter-spacing: 0.005em;
}

.lf-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.lf-icon {
  position: absolute;
  left: 14px;
  color: var(--t-faint);
  font-size: 0.9rem;
  pointer-events: none;
  transition: color 0.25s ease;
  z-index: 1;
}

.lf-input-wrap input {
  width: 100%;
  padding: 0.78rem 0.9rem 0.78rem 2.5rem;
  border: 1.5px solid var(--border);
  border-radius: 12px;
  font-size: 0.9rem;
  color: var(--t-primary);
  background: var(--input-bg);
  transition: all 0.25s ease;
  outline: none;
  font-family: inherit;

  &::placeholder {
    color: var(--t-faint);
    font-weight: 400;
  }

  &:hover {
    border-color: var(--border-hover);
    background: var(--input-bg-hover);
  }

  &:focus {
    border-color: var(--border-focus);
    background: var(--input-bg-focus);
    box-shadow: 0 0 0 3.5px rgba(22, 163, 74, 0.1);
  }

  &:focus ~ .lf-icon {
    color: var(--g-600);
  }

  // حالة الخطأ
  &.ng-invalid.ng-touched:not(:focus) {
    border-color: #e74c3c;
    background: #fef8f8;

    & ~ .lf-icon {
      color: #e74c3c;
    }
  }
}

// زر إظهار/إخفاء كلمة المرور
.lf-toggle-pass {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: var(--t-faint);
  cursor: pointer;
  padding: 4px;
  font-size: 0.9rem;
  transition: color 0.2s;
  display: grid;
  place-items: center;
  line-height: 1;

  &:hover {
    color: var(--g-600);
  }
}

// رسالة خطأ تحت الحقل
.lf-field-err {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.35rem;
  font-size: 0.77rem;
  color: #c0392b;
  font-weight: 500;
  animation: lfFieldErr 0.3s ease;

  i {
    font-size: 0.7rem;
    flex-shrink: 0;
  }
}

@keyframes lfFieldErr {
  from { opacity: 0; transform: translateY(-3px); }
  to   { opacity: 1; transform: translateY(0); }
}

// ================================================================
//  خيارات — تذكرني + نسيت كلمة المرور
// ================================================================
.lf-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  font-size: 0.83rem;
}

.lf-remember {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--t-secondary);
  font-weight: 500;
  user-select: none;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: var(--g-600);
    border-radius: 4px;
    cursor: pointer;
  }

  span {
    line-height: 1;
  }
}

.lf-forgot {
  color: var(--g-700);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.82rem;
  transition: color 0.2s;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1.5px;
    background: var(--g-700);
    transition: width 0.25s ease;
  }

  &:hover {
    color: var(--g-800);

    &::after {
      width: 100%;
    }
  }
}

// ================================================================
//  زر تسجيل الدخول
// ================================================================
.lf-submit {
  width: 100%;
  padding: 0.85rem;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--g-700) 0%, var(--g-600) 50%, var(--g-500) 100%);
  background-size: 200% 100%;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.01em;
  font-family: inherit;
  line-height: 1.4;

  // لمعان يمر على الزر
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.14), transparent);
    transition: left 0.6s ease;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow:
      0 6px 20px rgba(22, 101, 52, 0.28),
      0 12px 36px rgba(22, 101, 52, 0.12);
    background-position: 100% 50%;
  }

  &:hover:not(:disabled)::before {
    left: 100%;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(22, 101, 52, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &::before {
      display: none;
    }
  }
}

// سبينر التحميل
.lf-spinner {
  width: 20px;
  height: 20px;
  border: 2.5px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: lfSpin 0.65s linear infinite;
  display: inline-block;
}

@keyframes lfSpin {
  to { transform: rotate(360deg); }
}

// ================================================================
//  Responsive
// ================================================================
@media (max-width: 480px) {
  .lf-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
  }

  .lf-forgot {
    align-self: flex-end;
  }
}

// ================================================================
//  تقليل الحركة
// ================================================================
@media (prefers-reduced-motion: reduce) {
  .lf-error {
    animation: none;
  }

  .lf-field-err {
    animation: none;
  }

  .lf-submit::before {
    display: none;
  }
}

// استبقاء الـ cursor-pointer اللي كانت موجودة
.cursor-pointer {
  cursor: pointer;
}
```


================================================================================
## src\app\features\authentication\presentation\components\password-policy\password-policy.component
================================================================================

### TypeScript

```typescript
import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  evaluatePasswordStrength,
  PasswordStrength,
} from '../../../domain/models/password-reset.model';

@Component({
  selector: 'hms-password-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password-policy.component.html',
  styleUrl: './password-policy.component.scss',
})
export class PasswordPolicyComponent {
  readonly password = input<string>('');

  readonly strength = computed<PasswordStrength>(() =>
    evaluatePasswordStrength(this.password())
  );

  readonly strengthWidths = ['0%', '25%', '50%', '75%', '100%'];

  get progressWidth(): string {
    return this.strengthWidths[this.strength().score];
  }
}
```

### HTML

```html
@if (password()) {
  <div class="password-policy mt-2">

    <!-- Strength Bar -->
    <div class="d-flex align-items-center gap-2 mb-2">
      <div class="progress flex-grow-1" style="height: 6px;">
        <div
          class="progress-bar transition-all"
          [class]="'bg-' + strength().color"
          [style.width]="progressWidth"
        ></div>
      </div>
      <small [class]="'text-' + strength().color + ' fw-semibold'">
        {{ strength().label }}
      </small>
    </div>

    <!-- Checks List -->
    <ul class="list-unstyled mb-0 small">
      <li class="d-flex align-items-center gap-1 mb-1">
        <i class="bi"
          [class.bi-check-circle-fill]="strength().checks.hasMinLength"
          [class.bi-circle]="!strength().checks.hasMinLength"
          [class.text-success]="strength().checks.hasMinLength"
          [class.text-muted]="!strength().checks.hasMinLength">
        </i>
        <span [class.text-muted]="!strength().checks.hasMinLength">
          8 أحرف على الأقل
        </span>
      </li>
      <li class="d-flex align-items-center gap-1 mb-1">
        <i class="bi"
          [class.bi-check-circle-fill]="strength().checks.hasUppercase"
          [class.bi-circle]="!strength().checks.hasUppercase"
          [class.text-success]="strength().checks.hasUppercase"
          [class.text-muted]="!strength().checks.hasUppercase">
        </i>
        <span [class.text-muted]="!strength().checks.hasUppercase">
          حرف كبير (A-Z)
        </span>
      </li>
      <li class="d-flex align-items-center gap-1 mb-1">
        <i class="bi"
          [class.bi-check-circle-fill]="strength().checks.hasLowercase"
          [class.bi-circle]="!strength().checks.hasLowercase"
          [class.text-success]="strength().checks.hasLowercase"
          [class.text-muted]="!strength().checks.hasLowercase">
        </i>
        <span [class.text-muted]="!strength().checks.hasLowercase">
          حرف صغير (a-z)
        </span>
      </li>
      <li class="d-flex align-items-center gap-1 mb-1">
        <i class="bi"
          [class.bi-check-circle-fill]="strength().checks.hasNumber"
          [class.bi-circle]="!strength().checks.hasNumber"
          [class.text-success]="strength().checks.hasNumber"
          [class.text-muted]="!strength().checks.hasNumber">
        </i>
        <span [class.text-muted]="!strength().checks.hasNumber">
          رقم (0-9)
        </span>
      </li>
      <li class="d-flex align-items-center gap-1">
        <i class="bi"
          [class.bi-check-circle-fill]="strength().checks.hasSpecialChar"
          [class.bi-circle]="!strength().checks.hasSpecialChar"
          [class.text-success]="strength().checks.hasSpecialChar"
          [class.text-muted]="!strength().checks.hasSpecialChar">
        </i>
        <span [class.text-muted]="!strength().checks.hasSpecialChar">
          رمز خاص (!&#64;#$%)
        </span>
      </li>
    </ul>

  </div>
}
```

### SCSS

```scss

```


================================================================================
## src\app\features\authentication\presentation\pages\change-password-page\change-password-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthenticationFacade } from '../../../application/facades/authentication.facade';
import { PasswordPolicyComponent } from '../../components/password-policy/password-policy.component';
import { ROUTE_PATHS } from '../../../../../core/constants/route-paths.constants';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const pw = control.get('newPassword')?.value;
  const confirm = control.get('confirmPassword')?.value;
  return pw && confirm && pw !== confirm ? { passwordMismatch: true } : null;
}

@Component({
  selector: 'hms-change-password-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, PasswordPolicyComponent],
  templateUrl: './change-password-page.component.html',
  styleUrl: './change-password-page.component.scss',
})
export class ChangePasswordPageComponent {
  private readonly fb = inject(FormBuilder);
  readonly facade = inject(AuthenticationFacade);

  readonly dashboardPath = `/${ROUTE_PATHS.DASHBOARD}`;
  readonly changeSuccess = signal(false);
  showCurrent = false;
  showNew = false;

  form = this.fb.group(
    {
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordMatchValidator }
  );

  get currentPassword() { return this.form.get('currentPassword')!; }
  get newPassword() { return this.form.get('newPassword')!; }
  get confirmPassword() { return this.form.get('confirmPassword')!; }
  get newPasswordValue() { return this.newPassword.value ?? ''; }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.facade
      .changePassword({
        currentPassword: this.currentPassword.value!,
        newPassword: this.newPassword.value!,
        confirmPassword: this.confirmPassword.value!,
      })
      .subscribe({ next: () => this.changeSuccess.set(true) });
  }
}

```

### HTML

```html
<div class="container py-4">
  <div class="row justify-content-center">
    <div class="col-12 col-md-8 col-lg-6 col-xl-5">

      <div class="card shadow-sm border-0 rounded-4">
        <div class="card-body p-4">

          <h1 class="h5 fw-bold mb-1">
            <i class="bi bi-shield-lock me-2 text-primary"></i>
            تغيير كلمة المرور
          </h1>
          <p class="text-muted small mb-4">يُنصح بتغيير كلمة المرور بشكل دوري للحفاظ على أمان حسابك</p>

          @if (changeSuccess()) {
            <div class="alert alert-success d-flex align-items-center gap-2">
              <i class="bi bi-check-circle-fill"></i>
              تم تغيير كلمة المرور بنجاح!
            </div>
            <a [routerLink]="dashboardPath" class="btn btn-primary w-100">
              العودة للوحة التحكم
            </a>
          } @else {

            @if (facade.hasError()) {
              <div class="alert alert-danger d-flex gap-2 align-items-center py-2 small mb-3">
                <i class="bi bi-exclamation-circle-fill"></i>
                {{ facade.error() }}
              </div>
            }

            <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>

              <!-- Current Password -->
              <div class="mb-3">
                <label for="currentPassword" class="form-label fw-semibold">كلمة المرور الحالية</label>
                <div class="input-group">
                  <span class="input-group-text bg-light border-end-0">
                    <i class="bi bi-lock text-muted"></i>
                  </span>
                  <input
                    id="currentPassword"
                    [type]="showCurrent ? 'text' : 'password'"
                    class="form-control border-start-0 border-end-0"
                    [class.is-invalid]="currentPassword.invalid && currentPassword.touched"
                    formControlName="currentPassword"
                    placeholder="أدخل كلمة المرور الحالية"
                    dir="ltr"
                  />
                  <button type="button" class="input-group-text bg-light border-start-0"
                    (click)="showCurrent = !showCurrent">
                    <i class="bi" [class.bi-eye]="!showCurrent" [class.bi-eye-slash]="showCurrent"></i>
                  </button>
                  <div class="invalid-feedback">كلمة المرور الحالية مطلوبة</div>
                </div>
              </div>

              <!-- New Password -->
              <div class="mb-3">
                <label for="newPassword" class="form-label fw-semibold">كلمة المرور الجديدة</label>
                <div class="input-group">
                  <span class="input-group-text bg-light border-end-0">
                    <i class="bi bi-key text-muted"></i>
                  </span>
                  <input
                    id="newPassword"
                    [type]="showNew ? 'text' : 'password'"
                    class="form-control border-start-0 border-end-0"
                    [class.is-invalid]="newPassword.invalid && newPassword.touched"
                    formControlName="newPassword"
                    placeholder="أدخل كلمة مرور جديدة"
                    dir="ltr"
                  />
                  <button type="button" class="input-group-text bg-light border-start-0"
                    (click)="showNew = !showNew">
                    <i class="bi" [class.bi-eye]="!showNew" [class.bi-eye-slash]="showNew"></i>
                  </button>
                  <div class="invalid-feedback">كلمة المرور يجب أن تكون 8 أحرف على الأقل</div>
                </div>
                <hms-password-policy [password]="newPasswordValue" />
              </div>

              <!-- Confirm Password -->
              <div class="mb-4">
                <label for="confirmPassword" class="form-label fw-semibold">تأكيد كلمة المرور</label>
                <input
                  id="confirmPassword"
                  type="password"
                  class="form-control"
                  [class.is-invalid]="confirmPassword.touched && form.errors?.['passwordMismatch']"
                  formControlName="confirmPassword"
                  placeholder="أعد إدخال كلمة المرور الجديدة"
                  dir="ltr"
                />
                <div class="invalid-feedback">كلمتا المرور غير متطابقتين</div>
              </div>

              <div class="d-flex gap-2">
                <button
                  type="submit"
                  class="btn btn-primary flex-grow-1 py-2 fw-semibold"
                  [disabled]="facade.isLoading()"
                >
                  @if (facade.isLoading()) {
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    جاري الحفظ...
                  } @else {
                    <i class="bi bi-check-lg me-2"></i>
                    حفظ التغييرات
                  }
                </button>
                <a [routerLink]="dashboardPath" class="btn btn-outline-secondary py-2">
                  إلغاء
                </a>
              </div>

            </form>
          }

        </div>
      </div>
    </div>
  </div>
</div>
```

### SCSS

```scss

```


================================================================================
## src\app\features\authentication\presentation\pages\forgot-password-page\forgot-password-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationFacade } from '../../../application/facades/authentication.facade';
import { ROUTE_PATHS } from '../../../../../core/constants/route-paths.constants';

@Component({
  selector: 'hms-forgot-password-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.scss',
})
export class ForgotPasswordPageComponent {
  private readonly fb = inject(FormBuilder);
  readonly facade = inject(AuthenticationFacade);

  readonly loginPath = `/${ROUTE_PATHS.AUTH.LOGIN}`;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  get email() { return this.form.get('email')!; }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.facade.forgotPassword({ email: this.email.value! }).subscribe();
  }
}

```

### HTML

```html
<div class="auth-page min-vh-100 d-flex align-items-center">
  <div class="container-fluid px-3 px-sm-4">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-body p-4 p-md-5">

            <!-- Success State -->
            @if (facade.passwordResetSent()) {
              <div class="text-center py-3">
                <div class="mb-3">
                  <i class="bi bi-envelope-check text-success" style="font-size: 3rem;"></i>
                </div>
                <h2 class="h5 fw-bold mb-2">تم إرسال الرابط!</h2>
                <p class="text-muted small mb-1">
                  تم إرسال رابط إعادة تعيين كلمة المرور إلى
                </p>
                <p class="fw-semibold text-primary mb-4" dir="ltr">
                  {{ facade.passwordResetEmail() }}
                </p>
                <p class="text-muted small mb-4">
                  تحقق من بريدك الإلكتروني واتبع التعليمات. قد يصل الرابط خلال بضع دقائق.
                </p>
                <a [routerLink]="loginPath" class="btn btn-primary w-100">
                  العودة لتسجيل الدخول
                </a>
              </div>
            } @else {

              <!-- Header -->
              <div class="text-center mb-4">
                <i class="bi bi-lock-fill text-primary mb-3 d-block" style="font-size: 2.5rem;"></i>
                <h1 class="h5 fw-bold mb-1">نسيت كلمة المرور؟</h1>
                <p class="text-muted small">أدخل بريدك الإلكتروني وسنرسل لك رابط الاسترداد</p>
              </div>

              <!-- Error -->
              @if (facade.hasError()) {
                <div class="alert alert-danger d-flex align-items-center gap-2 py-2 small mb-3">
                  <i class="bi bi-exclamation-circle-fill"></i>
                  {{ facade.error() }}
                </div>
              }

              <!-- Form -->
              <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
                <div class="mb-4">
                  <label for="email" class="form-label fw-semibold">البريد الإلكتروني</label>
                  <div class="input-group">
                    <span class="input-group-text bg-light border-end-0">
                      <i class="bi bi-envelope text-muted"></i>
                    </span>
                    <input
                      id="email"
                      type="email"
                      class="form-control border-start-0"
                      [class.is-invalid]="email.invalid && email.touched"
                      formControlName="email"
                      placeholder="example&#64;hospital.com"
                      dir="ltr"
                    />
                    <div class="invalid-feedback">
                      @if (email.errors?.['required']) { البريد الإلكتروني مطلوب }
                      @else if (email.errors?.['email']) { صيغة البريد غير صحيحة }
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  class="btn btn-primary w-100 py-2 fw-semibold mb-3"
                  [disabled]="facade.isLoading()"
                >
                  @if (facade.isLoading()) {
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    جاري الإرسال...
                  } @else {
                    <i class="bi bi-send me-2"></i>
                    إرسال رابط الاسترداد
                  }
                </button>

                <div class="text-center">
                  <a [routerLink]="loginPath" class="small text-muted text-decoration-none">
                    <i class="bi bi-arrow-right me-1"></i>
                    العودة لتسجيل الدخول
                  </a>
                </div>
              </form>
            }

          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### SCSS

```scss

```


================================================================================
## src\app\features\authentication\presentation\pages\login-page\login-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationFacade } from '../../../application/facades/authentication.facade';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { LoginRequest } from '../../../domain/models/login-request.model';
import { ROUTE_PATHS } from '../../../../../core/constants/route-paths.constants';

@Component({
  selector: 'hms-login-page',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  readonly facade = inject(AuthenticationFacade);
  private readonly nav = inject(NavigationService);
  private readonly route = inject(ActivatedRoute);

  readonly isLoading = this.facade.isLoading;
  readonly error = this.facade.error;
  readonly hasError = this.facade.hasError;

  private returnUrl = `/${ROUTE_PATHS.DASHBOARD}`;
  readonly currentYear = new Date().getFullYear();

  ngOnInit(): void {
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] ?? `/${ROUTE_PATHS.DASHBOARD}`;
    this.facade.clearError();
  }

  onLogin(request: LoginRequest): void {
    this.facade.login(request).subscribe({
      next: () => this.nav.goTo(this.returnUrl),
    });
  }
}
```

### HTML

```html
<div class="auth-page">
  <div class="auth-card">

    <!-- ========== اللوحة اليسرى — Hero ========== -->
    <div class="auth-hero-panel">
      <div class="auth-hero-glow"></div>
      <div class="auth-hero-glow-secondary"></div>

      <div class="auth-hero-content">
        <div class="auth-badge">
          <span class="auth-badge-dot"></span>
          نظام إدارة المستشفى
        </div>

        <h2>بوابة الوصول<br>للمنظومة الطبية المتكاملة</h2>

        <p>
          منصة مركزية تربط جميع الأقسام — السجلات الطبية، المختبرات،
          الأشعة، والصيدلية — في بيئة واحدة آمنة وموحدة.
        </p>

        <ul class="auth-highlights">
          <li>
            <span class="auth-highlight-icon">
              <i class="fa-solid fa-shield-halved"></i>
            </span>
            تشفير متقدم لبيانات المرضى
          </li>
          <li>
            <span class="auth-highlight-icon">
              <i class="fa-solid fa-bolt"></i>
            </span>
            وصول فوري للسجلات والمواعيد
          </li>
          <li>
            <span class="auth-highlight-icon">
              <i class="fa-solid fa-chart-line"></i>
            </span>
            تقارير وإحصائيات لحظية
          </li>
          <li>
            <span class="auth-highlight-icon">
              <i class="fa-solid fa-clipboard-check"></i>
            </span>
            سجل تدقيق كامل لكل عملية
          </li>
        </ul>

        <div class="auth-hero-stats">
          <div class="auth-hero-stat">
            <span class="auth-hero-stat-value">+2,400</span>
            <span class="auth-hero-stat-label">موظف نشط</span>
          </div>
          <div class="auth-hero-stat">
            <span class="auth-hero-stat-value">99.8%</span>
            <span class="auth-hero-stat-label">وقت التشغيل</span>
          </div>
          <div class="auth-hero-stat">
            <span class="auth-hero-stat-value">ISO 27001</span>
            <span class="auth-hero-stat-label">معتمد</span>
          </div>
        </div>
      </div>

      <!-- خط نبض القلب المتحرك -->
      <div class="auth-hero-pulse">
        <svg viewBox="0 0 1200 50" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke="#fff"
            stroke-width="1.5"
            stroke-linejoin="round"
            points="
              0,25 100,25 130,25 150,8 170,42 190,12 210,38 230,25
              350,25 380,25 400,8 420,42 440,12 460,38 480,25
              600,25 630,25 650,8 670,42 690,12 710,38 730,25
              850,25 880,25 900,8 920,42 940,12 960,38 980,25
              1100,25 1130,25 1150,8 1170,42 1190,25 1200,25
            "
          />
        </svg>
      </div>
    </div>

    <!-- ========== اللوحة اليمنى — النموذج ========== -->
    <div class="auth-form-panel">

      <div class="auth-brand">
        <i class="fa-solid fa-heart-pulse"></i>
      </div>

      <h1 class="auth-form-title">تسجيل الدخول</h1>
      <p class="auth-form-subtitle">أدخل بياناتك للوصول إلى لوحة التحكم</p>

      <!-- كومبوننت الفورم — هو اللي بي-handle الحقول والـ validation -->
  <hms-login-form
  [isLoading]="isLoading()"
[errorMessage]="error() ?? ''"
(submitted)="onLogin($event)"
></hms-login-form>

      <div class="auth-security-note">
        <i class="fa-solid fa-lock"></i>
        <span>محمي بتشفير TLS 1.3 — جميع البيانات مشفرة</span>
      </div>

      <div class="auth-copyright">
        &copy; {{ currentYear }} HMS — جميع الحقوق محفوظة
      </div>

    </div>
  </div>
</div>
```

### SCSS

```scss
// ================================================================
//  متغيرات الألوان الطبية — أخضر فاتح → أخضر غامق
// ================================================================
:host {
  --green-50: #f0fdf4;
  --green-100: #dcfce7;
  --green-200: #bbf7d0;
  --green-300: #86efac;
  --green-400: #4ade80;
  --green-500: #22c55e;
  --green-600: #16a34a;
  --green-700: #15803d;
  --green-800: #166534;
  --green-900: #14532d;
  --green-950: #052e16;

  --text-primary: #0c2e1a;
  --text-secondary: #3d6b4f;
  --text-muted: #6b9a7e;
  --text-faint: #a3c4b0;

  --surface: #ffffff;
  --surface-tinted: #f7fdf9;
  --border: #d1e7da;
  --border-focus: #16a34a;

  display: block;
  animation: pageEntry 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes pageEntry {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

// ================================================================
//  الصفحة — خلفية بنمط طبي دقيق
// ================================================================
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  background:
    radial-gradient(ellipse 65% 50% at 5% 95%, rgba(22, 101, 52, 0.06), transparent),
    radial-gradient(ellipse 50% 40% at 95% 5%, rgba(34, 197, 94, 0.04), transparent),
    linear-gradient(175deg, var(--green-50) 0%, #edf7f0 50%, var(--green-50) 100%);
  position: relative;
  overflow: hidden;

  // نقاط خلفية دقيقة
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(22, 101, 52, 0.035) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
  }

  // شريط علوي متلألئ
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      var(--green-700),
      var(--green-500),
      var(--green-400),
      var(--green-500),
      var(--green-700)
    );
    background-size: 200% 100%;
    animation: shimmerBar 5s ease-in-out infinite;
  }
}

@keyframes shimmerBar {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

// ================================================================
//  الكارت الرئيسي
// ================================================================
.auth-card {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  min-height: 720px;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  border-radius: 28px;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid rgba(22, 101, 52, 0.06);
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.03),
    0 4px 16px rgba(22, 101, 52, 0.05),
    0 16px 48px rgba(0, 0, 0, 0.04);
  position: relative;
  z-index: 1;
}

// ================================================================
//  اللوحة اليسرى — Hero
// ================================================================
.auth-hero-panel {
  padding: 3rem 2.8rem;
  background: linear-gradient(
    158deg,
    var(--green-950) 0%,
    #083319 20%,
    var(--green-900) 50%,
    var(--green-800) 100%
  );
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;

  // شبكة خطوط شفافة
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }
}

// توهج علوي أيمن
.auth-hero-glow {
  position: absolute;
  top: -120px;
  right: -100px;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.15), transparent 70%);
  pointer-events: none;
  animation: glowDrift 8s ease-in-out infinite alternate;
}

// توهج سفلي أيسر
.auth-hero-glow-secondary {
  position: absolute;
  bottom: -80px;
  left: -60px;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(22, 163, 74, 0.12), transparent 70%);
  pointer-events: none;
  animation: glowDrift 10s ease-in-out 3s infinite alternate-reverse;
}

@keyframes glowDrift {
  0%   { transform: translate(0, 0) scale(1);    opacity: 0.5; }
  100% { transform: translate(-25px, 20px) scale(1.15); opacity: 1; }
}

.auth-hero-content {
  position: relative;
  z-index: 1;
}

// شارة النظام
.auth-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  margin-bottom: 1.6rem;
  color: rgba(255, 255, 255, 0.85);
}

.auth-badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--green-400);
  box-shadow: 0 0 10px rgba(74, 222, 128, 0.6);
  animation: dotPulse 2.2s ease-in-out infinite;
}

@keyframes dotPulse {
  0%, 100% { opacity: 1;   transform: scale(1);   box-shadow: 0 0 10px rgba(74, 222, 128, 0.6); }
  50%      { opacity: 0.45; transform: scale(0.75); box-shadow: 0 0 4px rgba(74, 222, 128, 0.25); }
}

// العنوان
.auth-hero-content h2 {
  font-size: 1.85rem;
  font-weight: 800;
  margin-bottom: 0.85rem;
  line-height: 1.3;
  letter-spacing: -0.025em;
}

.auth-hero-content p {
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.9;
  font-size: 0.93rem;
  max-width: 390px;
}

// قائمة المميزات
.auth-highlights {
  list-style: none;
  padding: 0;
  margin: 1.8rem 0 0;
  display: grid;
  gap: 0.85rem;
}

.auth-highlights li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  transition: transform 0.2s ease, color 0.2s ease;

  &:hover {
    transform: translateX(5px);
    color: #fff;
  }
}

.auth-highlight-icon {
  width: 34px;
  height: 34px;
  min-width: 34px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.06);
  display: grid;
  place-items: center;
  font-size: 0.8rem;
  color: var(--green-300);
  transition: background 0.2s, color 0.2s;
}

.auth-highlights li:hover .auth-highlight-icon {
  background: rgba(255, 255, 255, 0.13);
  color: var(--green-200);
}

// إحصائيات
.auth-hero-stats {
  display: flex;
  gap: 2rem;
  margin-top: 2.2rem;
  padding-top: 1.6rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  position: relative;
  z-index: 1;
}

.auth-hero-stat {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.auth-hero-stat-value {
  font-size: 1.25rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.02em;
}

.auth-hero-stat-label {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-weight: 500;
}

// خط نبض القلب
.auth-hero-pulse {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  overflow: hidden;
  opacity: 0.1;
  pointer-events: none;
}

.auth-hero-pulse svg {
  width: 200%;
  height: 100%;
  animation: pulseScroll 3.8s linear infinite;
}

@keyframes pulseScroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

// ================================================================
//  اللوحة اليمنى — النموذج
// ================================================================
.auth-form-panel {
  padding: 2.8rem 2.6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background: var(--surface);

  // شريط علوي ملون
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      var(--green-700),
      var(--green-500),
      var(--green-400),
      var(--green-500),
      var(--green-700)
    );
    background-size: 200% 100%;
    animation: shimmerBar 5s ease-in-out infinite;
  }

  // تُوسِّع المحتوى لأقصى عرض
  > * {
    width: 100%;
    max-width: 360px;
  }
}

// اللوجو
.auth-brand {
  width: 56px;
  height: 56px;
  margin: 0 auto 1.4rem;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--green-700) 0%, var(--green-500) 100%);
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 1.4rem;
  box-shadow: 0 8px 28px rgba(22, 101, 52, 0.22);
  position: relative;

  // حلقة نبض
  &::after {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: 21px;
    border: 2px solid rgba(22, 101, 52, 0.12);
    animation: brandRing 3.5s ease-in-out infinite;
  }
}

@keyframes brandRing {
  0%, 100% { transform: scale(1);   opacity: 0.5; }
  50%      { transform: scale(1.12); opacity: 0; }
}

// العنوان
.auth-form-title {
  text-align: center;
  margin-bottom: 0.3rem;
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.025em;
}

.auth-form-subtitle {
  text-align: center;
  color: var(--text-muted);
  font-size: 0.87rem;
  margin-bottom: 1.8rem;
  line-height: 1.5;
}

// ملاحظة الأمان
.auth-security-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  margin-top: 1.8rem;
  font-size: 0.72rem;
  color: var(--text-faint);

  i {
    font-size: 0.7rem;
    opacity: 0.7;
  }

  span {
    line-height: 1.4;
  }
}

// حقوق النشر
.auth-copyright {
  text-align: center;
  margin-top: 0.7rem;
  font-size: 0.7rem;
  color: var(--text-faint);
  opacity: 0.7;
}

// ================================================================
//  Responsive
// ================================================================
@media (max-width: 991px) {
  .auth-card {
    grid-template-columns: 1fr;
    min-height: auto;
    max-width: 460px;
    border-radius: 22px;
  }

  .auth-hero-panel {
    display: none;
  }

  .auth-form-panel {
    padding: 2.4rem 2rem;

    &::before {
      height: 3px;
    }
  }
}

@media (max-width: 480px) {
  .auth-page {
    padding: 0.8rem;
  }

  .auth-card {
    border-radius: 18px;
  }

  .auth-form-panel {
    padding: 2rem 1.4rem;

    > * {
      max-width: 100%;
    }
  }

  .auth-form-title {
    font-size: 1.2rem;
  }

  .auth-form-subtitle {
    font-size: 0.82rem;
    margin-bottom: 1.5rem;
  }

  .auth-brand {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    font-size: 1.2rem;
  }
}

// ================================================================
//  تقليل الحركة
// ================================================================
@media (prefers-reduced-motion: reduce) {
  :host {
    animation: none;
  }

  .auth-hero-glow,
  .auth-hero-glow-secondary,
  .auth-badge-dot,
  .auth-brand::after,
  .auth-hero-pulse svg,
  .auth-page::after,
  .auth-form-panel::before {
    animation: none;
  }

  .auth-highlights li:hover {
    transform: none;
  }
}
```


================================================================================
## src\app\features\authentication\presentation\pages\reset-password-page\reset-password-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthenticationFacade } from '../../../application/facades/authentication.facade';
import { PasswordPolicyComponent } from '../../components/password-policy/password-policy.component';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { ROUTE_PATHS } from '../../../../../core/constants/route-paths.constants';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const pw = control.get('newPassword')?.value;
  const confirm = control.get('confirmPassword')?.value;
  return pw && confirm && pw !== confirm ? { passwordMismatch: true } : null;
}

@Component({
  selector: 'hms-reset-password-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, PasswordPolicyComponent],
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.scss',
})
export class ResetPasswordPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly nav = inject(NavigationService);
  readonly facade = inject(AuthenticationFacade);

  readonly loginPath = `/${ROUTE_PATHS.AUTH.LOGIN}`;
  readonly resetSuccess = signal(false);
  showPassword = false;

  form = this.fb.group(
    {
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordMatchValidator }
  );

  private token = '';

  get newPassword() { return this.form.get('newPassword')!; }
  get confirmPassword() { return this.form.get('confirmPassword')!; }
  get passwordValue() { return this.newPassword.value ?? ''; }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'] ?? '';
    if (!this.token) this.nav.goToLogin();
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.facade
      .resetPassword({
        token: this.token,
        newPassword: this.newPassword.value!,
        confirmPassword: this.confirmPassword.value!,
      })
      .subscribe({ next: () => this.resetSuccess.set(true) });
  }
}

```

### HTML

```html
<div class="auth-page min-vh-100 d-flex align-items-center">
  <div class="container-fluid px-3 px-sm-4">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-body p-4 p-md-5">

            <!-- Success State -->
            @if (resetSuccess()) {
              <div class="text-center py-3">
                <i class="bi bi-check-circle-fill text-success mb-3 d-block" style="font-size: 3rem;"></i>
                <h2 class="h5 fw-bold mb-2">تم تغيير كلمة المرور!</h2>
                <p class="text-muted small mb-4">يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة</p>
                <a [routerLink]="loginPath" class="btn btn-primary w-100">
                  تسجيل الدخول
                </a>
              </div>
            } @else {

              <div class="text-center mb-4">
                <i class="bi bi-shield-lock text-primary mb-3 d-block" style="font-size: 2.5rem;"></i>
                <h1 class="h5 fw-bold mb-1">إعادة تعيين كلمة المرور</h1>
                <p class="text-muted small">أدخل كلمة مرور جديدة قوية</p>
              </div>

              @if (facade.hasError()) {
                <div class="alert alert-danger d-flex gap-2 align-items-center py-2 small mb-3">
                  <i class="bi bi-exclamation-circle-fill"></i>
                  {{ facade.error() }}
                </div>
              }

              <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>

                <div class="mb-3">
                  <label for="newPassword" class="form-label fw-semibold">كلمة المرور الجديدة</label>
                  <div class="input-group">
                    <span class="input-group-text bg-light border-end-0">
                      <i class="bi bi-lock text-muted"></i>
                    </span>
                    <input
                      id="newPassword"
                      [type]="showPassword ? 'text' : 'password'"
                      class="form-control border-start-0 border-end-0"
                      [class.is-invalid]="newPassword.invalid && newPassword.touched"
                      formControlName="newPassword"
                      placeholder="أدخل كلمة مرور قوية"
                      dir="ltr"
                    />
                    <button type="button" class="input-group-text bg-light border-start-0"
                      (click)="showPassword = !showPassword">
                      <i class="bi" [class.bi-eye]="!showPassword" [class.bi-eye-slash]="showPassword"></i>
                    </button>
                    <div class="invalid-feedback">كلمة المرور يجب أن تكون 8 أحرف على الأقل</div>
                  </div>
                  <hms-password-policy [password]="passwordValue" />
                </div>

                <div class="mb-4">
                  <label for="confirmPassword" class="form-label fw-semibold">تأكيد كلمة المرور</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    class="form-control"
                    [class.is-invalid]="(confirmPassword.invalid && confirmPassword.touched) || form.errors?.['passwordMismatch']"
                    formControlName="confirmPassword"
                    placeholder="أعد إدخال كلمة المرور"
                    dir="ltr"
                  />
                  <div class="invalid-feedback">كلمتا المرور غير متطابقتين</div>
                </div>

                <button
                  type="submit"
                  class="btn btn-primary w-100 py-2 fw-semibold"
                  [disabled]="facade.isLoading()"
                >
                  @if (facade.isLoading()) {
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    جاري الحفظ...
                  } @else {
                    <i class="bi bi-check-lg me-2"></i>
                    حفظ كلمة المرور
                  }
                </button>

              </form>
            }

          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### SCSS

```scss

```


================================================================================
## src\app\features\authorization\presentation\components\permission-matrix\permission-matrix.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\authorization\presentation\pages\permissions-page\permissions-page.component
================================================================================

### TypeScript

```typescript
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
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\billing\presentation\components\billing-summary\billing-summary.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingSummary } from '../../../domain/repositories/billing.repository';
import { formatCurrency } from '../../../domain/entities/invoice.entity';

@Component({
  selector: 'hms-billing-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="row g-3">
      @for (card of cards(); track card.label) {
        <div class="col-6 col-lg-3">
          <div class="card border-0 shadow-sm">
            <div class="card-body p-3 text-center">
              <div class="fw-bold fs-5" [ngClass]="card.color" dir="ltr">{{ card.value }}</div>
              <div class="text-muted small">{{ card.label }}</div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class BillingSummaryComponent {
  readonly summary = input<BillingSummary | null>(null);

  cards() {
    const s = this.summary();
    if (!s) return [];
    return [
      { label: 'إجمالي الإيرادات',   value: formatCurrency(s.totalRevenue),     color: 'text-success' },
      { label: 'المبالغ المحصَّلة',   value: formatCurrency(s.totalPaid),        color: 'text-primary' },
      { label: 'المبالغ المستحقة',    value: formatCurrency(s.totalOutstanding), color: 'text-warning' },
      { label: 'المبالغ المتأخرة',    value: formatCurrency(s.totalOverdue),     color: 'text-danger' },
    ];
  }
}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\billing\presentation\components\invoice-form\invoice-form.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\billing\presentation\components\invoice-items-table\invoice-items-table.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceItemModel, ITEM_TYPE_LABELS } from '../../../domain/models/invoice.model';
import { formatCurrency } from '../../../domain/entities/invoice.entity';

@Component({
  selector: 'hms-invoice-items-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-items-table.component.html',
  styleUrl: './invoice-items-table.component.scss',
})
export class InvoiceItemsTableComponent {
  readonly items = input<InvoiceItemModel[]>([]);
  readonly typeLabels = ITEM_TYPE_LABELS;
  readonly fmt = formatCurrency;
}
```

### HTML

```html
<div class="table-responsive">
  <table class="table table-sm align-middle mb-0">
    <thead class="table-light">
      <tr>
        <th class="small fw-semibold">الوصف</th>
        <th class="small fw-semibold">النوع</th>
        <th class="small fw-semibold text-center">الكمية</th>
        <th class="small fw-semibold text-end" dir="ltr">سعر الوحدة</th>
        <th class="small fw-semibold text-center">الخصم%</th>
        <th class="small fw-semibold text-end" dir="ltr">الإجمالي</th>
      </tr>
    </thead>
    <tbody>
      @for (item of items(); track item.id) {
        <tr>
          <td class="small fw-semibold">{{ item.description }}</td>
          <td>
            <span class="badge bg-light text-dark border small">{{ typeLabels[item.type] }}</span>
          </td>
          <td class="text-center small">{{ item.quantity }}</td>
          <td class="text-end small" dir="ltr">{{ fmt(item.unitPrice) }}</td>
          <td class="text-center small">
            @if (item.discount > 0) {
              <span class="text-danger">{{ item.discount }}%</span>
            } @else { — }
          </td>
          <td class="text-end fw-semibold small" dir="ltr">{{ fmt(item.total) }}</td>
        </tr>
      }
    </tbody>
  </table>
</div>
```

### SCSS

```scss

```


================================================================================
## src\app\features\billing\presentation\components\payment-form\payment-form.component
================================================================================

### TypeScript

```typescript
import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PAYMENT_METHOD_LABELS, PaymentMethod } from '../../../domain/models/invoice.model';
import { CreatePaymentRequest } from '../../../domain/models/billing-filter.model';
import { formatCurrency } from '../../../domain/entities/invoice.entity';

@Component({
  selector: 'hms-payment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss',
})
export class PaymentFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly invoiceId = input.required<string>();
  readonly remainingAmount = input<number>(0);
  readonly isProcessing = input<boolean>(false);
  readonly submitted = output<CreatePaymentRequest>();
  readonly cancelled = output<void>();

  readonly methodLabels = PAYMENT_METHOD_LABELS;
  readonly methods = Object.keys(PAYMENT_METHOD_LABELS) as PaymentMethod[];
  readonly fmt = formatCurrency;

  form = this.fb.group({
    amount:    [0, [Validators.required, Validators.min(0.01)]],
    method:    ['cash' as PaymentMethod, Validators.required],
    reference: [''],
    notes:     [''],
  });

  get f() { return this.form.controls; }

  setFullAmount(): void { this.form.patchValue({ amount: this.remainingAmount() }); }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.getRawValue();
    this.submitted.emit({
      invoiceId:  this.invoiceId(),
      amount:     v.amount!,
      method:     v.method!,
      reference:  v.reference || undefined,
      notes:      v.notes || undefined,
    });
  }
}
```

### HTML

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>

  <div class="card border-0 shadow-sm">
    <div class="card-header bg-white border-bottom py-3">
      <h6 class="mb-0 fw-bold">
        <i class="bi bi-credit-card text-success me-2"></i>تسجيل دفعة
      </h6>
    </div>
    <div class="card-body p-4">

      @if (remainingAmount() > 0) {
        <div class="alert alert-info d-flex align-items-center justify-content-between py-2 mb-4 small">
          <span>
            <i class="bi bi-info-circle me-1"></i>
            المبلغ المتبقي: <strong dir="ltr">{{ fmt(remainingAmount()) }}</strong>
          </span>
          <button type="button" class="btn btn-sm btn-outline-info" (click)="setFullAmount()">
            دفع الكامل
          </button>
        </div>
      }

      <div class="row g-3">
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">المبلغ (ج.م) <span class="text-danger">*</span></label>
          <input type="number" class="form-control" formControlName="amount"
            [class.is-invalid]="f['amount'].invalid && f['amount'].touched"
            min="0.01" step="0.01" dir="ltr" />
          <div class="invalid-feedback">مبلغ صحيح مطلوب</div>
        </div>

        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">طريقة الدفع <span class="text-danger">*</span></label>
          <select class="form-select" formControlName="method">
            @for (m of methods; track m) {
              <option [value]="m">{{ methodLabels[m] }}</option>
            }
          </select>
        </div>

        @if (form.value.method !== 'cash') {
          <div class="col-12">
            <label class="form-label fw-semibold">رقم المرجع / التفويض</label>
            <input type="text" class="form-control" formControlName="reference"
              placeholder="رقم التحويل، رقم الشيك، رقم المعاملة..." dir="ltr" />
          </div>
        }

        <div class="col-12">
          <label class="form-label fw-semibold">ملاحظات</label>
          <textarea class="form-control" formControlName="notes" rows="2"
            placeholder="أي ملاحظات على الدفعة..."></textarea>
        </div>
      </div>

    </div>
    <div class="card-footer bg-white border-top py-3">
      <div class="d-flex gap-3 justify-content-end">
        <button type="button" class="btn btn-outline-secondary px-4" (click)="cancelled.emit()">إلغاء</button>
        <button type="submit" class="btn btn-success px-4" [disabled]="isProcessing()">
          @if (isProcessing()) {
            <span class="spinner-border spinner-border-sm me-2"></span>جاري المعالجة...
          } @else {
            <i class="bi bi-check-circle me-2"></i>تأكيد الدفع
          }
        </button>
      </div>
    </div>
  </div>

</form>
```

### SCSS

```scss

```


================================================================================
## src\app\features\billing\presentation\pages\invoice-detail-page\invoice-detail-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { BillingFacade } from '../../../application/facades/billing.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { InvoiceItemsTableComponent } from '../../components/invoice-items-table/invoice-items-table.component';
import { PaymentFormComponent } from '../../components/payment-form/payment-form.component';
import { INVOICE_STATUS_CONFIG, PAYMENT_METHOD_LABELS } from '../../../domain/models/invoice.model';
import { formatCurrency } from '../../../domain/entities/invoice.entity';
import { CreatePaymentRequest } from '../../../domain/models/billing-filter.model';

@Component({
  selector: 'hms-invoice-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, InvoiceItemsTableComponent, PaymentFormComponent],
  templateUrl: './invoice-detail-page.component.html',
  styleUrl: './invoice-detail-page.component.scss',
})
export class InvoiceDetailPageComponent implements OnInit, OnDestroy {
  readonly facade = inject(BillingFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  readonly statusConfig = INVOICE_STATUS_CONFIG;
  readonly methodLabels = PAYMENT_METHOD_LABELS;
  readonly fmt = formatCurrency;
  showPaymentForm = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.facade.loadById(id);
    this.layout.setPageTitle('Invoice', 'تفاصيل الفاتورة');
  }

  ngOnDestroy(): void { this.facade.clearSelected(); }

  onIssue(): void { const inv = this.facade.selectedInvoice(); if (inv) this.facade.issue(inv.id).subscribe(); }

  onCancel(): void {
    const inv = this.facade.selectedInvoice();
    if (!inv) return;
    const reason = prompt('سبب الإلغاء:');
    if (reason) this.facade.cancel(inv.id, reason).subscribe();
  }

  onRefund(): void {
    const inv = this.facade.selectedInvoice();
    if (!inv) return;
    const reason = prompt('سبب الاسترداد:');
    if (reason) this.facade.refund(inv.id, reason).subscribe();
  }

  onDelete(): void {
    const inv = this.facade.selectedInvoice();
    if (!inv || !confirm('هل أنت متأكد من حذف هذه الفاتورة؟')) return;
    this.facade.delete(inv.id).subscribe({ next: () => this.nav.goTo('/billing/invoices') });
  }

  onPaymentSubmit(req: CreatePaymentRequest): void {
    this.facade.processPayment(req).subscribe({
      next: () => this.showPaymentForm.set(false),
    });
  }

  paymentPercent(inv: any): number {
    return inv.totalAmount > 0 ? Math.round((inv.paidAmount / inv.totalAmount) * 100) : 0;
  }
}
```

### HTML

```html
<nav aria-label="breadcrumb" class="mb-3">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a routerLink="/billing/invoices" class="text-decoration-none">الفواتير</a></li>
    <li class="breadcrumb-item active">تفاصيل الفاتورة</li>
  </ol>
</nav>

@if (facade.isDetailLoading()) {
  <div class="text-center py-5"><div class="spinner-border text-primary" role="status"></div></div>
}

@if (facade.selectedInvoice(); as inv) {

  <!-- Header -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-body p-4">
      <div class="d-flex align-items-start justify-content-between flex-wrap gap-3">
        <div>
          <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
            <h2 class="h5 fw-bold mb-0">فاتورة #{{ inv.invoiceNumber }}</h2>
            <span class="badge rounded-pill" [ngClass]="statusConfig[inv.status]?.class ?? 'bg-secondary-subtle text-secondary'">
              <i class="bi me-1" [ngClass]="statusConfig[inv.status]?.icon ?? 'bi-circle'"></i>
              {{ statusConfig[inv.status]?.label ?? inv.status }}
            </span>
          </div>
          <div class="text-muted small">
            <a [routerLink]="['/patients', inv.patientId]" class="text-decoration-none fw-semibold">
              {{ inv.patientName }}
            </a>
            &nbsp;|&nbsp; صدرت: {{ inv.issuedAt | date:'dd/MM/yyyy' }}
            &nbsp;|&nbsp; تستحق: {{ inv.dueDate | date:'dd/MM/yyyy' }}
          </div>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          @if (inv.status === 'draft') {
            <button type="button" class="btn btn-sm btn-success" (click)="onIssue()">
              <i class="bi bi-send me-1"></i>إصدار
            </button>
          }
          @if (['issued','partially-paid','overdue'].includes(inv.status)) {
            <button type="button" class="btn btn-sm btn-success" (click)="showPaymentForm.set(true)">
              <i class="bi bi-credit-card me-1"></i>تسجيل دفعة
            </button>
          }
          @if (inv.status === 'paid') {
            <button type="button" class="btn btn-sm btn-outline-warning" (click)="onRefund()">
              <i class="bi bi-arrow-return-left me-1"></i>استرداد
            </button>
          }
          <a [routerLink]="['/billing/invoices', inv.id, 'edit']" class="btn btn-sm btn-outline-secondary">
            <i class="bi bi-pencil me-1"></i>تعديل
          </a>
          @if (['draft','issued'].includes(inv.status)) {
            <button type="button" class="btn btn-sm btn-outline-warning" (click)="onCancel()">
              <i class="bi bi-x-circle me-1"></i>إلغاء
            </button>
          }
          @if (inv.status === 'draft') {
            <button type="button" class="btn btn-sm btn-outline-danger" (click)="onDelete()">
              <i class="bi bi-trash me-1"></i>حذف
            </button>
          }
        </div>
      </div>
    </div>
  </div>

  <!-- Payment Form -->
  @if (showPaymentForm()) {
    <div class="mb-4">
      <hms-payment-form
        [invoiceId]="inv.id"
        [remainingAmount]="inv.remainingAmount"
        [isProcessing]="facade.isProcessingPayment()"
        (submitted)="onPaymentSubmit($event)"
        (cancelled)="showPaymentForm.set(false)"
      />
    </div>
  }

  <div class="row g-4">

    <!-- Items -->
    <div class="col-12 col-lg-8">
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-white border-bottom py-3">
          <h6 class="mb-0 fw-bold"><i class="bi bi-list-ul text-primary me-2"></i>بنود الفاتورة</h6>
        </div>
        <div class="card-body p-0">
          <hms-invoice-items-table [items]="inv.items" />
        </div>
        <!-- Totals -->
        <div class="card-footer bg-white border-top p-3">
          <div class="row justify-content-end">
            <div class="col-12 col-md-6">
              <dl class="row small mb-0">
                <dt class="col-6 text-muted fw-normal">المجموع الجزئي</dt>
                <dd class="col-6 text-end" dir="ltr">{{ fmt(inv.subtotal) }}</dd>
                @if (inv.discountAmount > 0) {
                  <dt class="col-6 text-muted fw-normal">خصم ({{ inv.discountPercent }}%)</dt>
                  <dd class="col-6 text-end text-danger" dir="ltr">– {{ fmt(inv.discountAmount) }}</dd>
                }
                @if (inv.taxAmount > 0) {
                  <dt class="col-6 text-muted fw-normal">ضريبة ({{ inv.taxPercent }}%)</dt>
                  <dd class="col-6 text-end" dir="ltr">{{ fmt(inv.taxAmount) }}</dd>
                }
                <dt class="col-6 fw-bold border-top pt-2">الإجمالي</dt>
                <dd class="col-6 text-end fw-bold border-top pt-2 fs-6" dir="ltr">{{ fmt(inv.totalAmount) }}</dd>
                <dt class="col-6 text-success fw-normal">المدفوع</dt>
                <dd class="col-6 text-end text-success" dir="ltr">{{ fmt(inv.paidAmount) }}</dd>
                @if (inv.remainingAmount > 0) {
                  <dt class="col-6 text-danger fw-semibold">المتبقي</dt>
                  <dd class="col-6 text-end text-danger fw-semibold" dir="ltr">{{ fmt(inv.remainingAmount) }}</dd>
                }
              </dl>
              <!-- Progress -->
              <div class="mt-2">
                <div class="d-flex justify-content-between small text-muted mb-1">
                  <span>نسبة السداد</span>
                  <span>{{ paymentPercent(inv) }}%</span>
                </div>
                <div class="progress" style="height: 6px;">
                  <div class="progress-bar bg-success" [style.width]="paymentPercent(inv) + '%'"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Payments History -->
    <div class="col-12 col-lg-4">
      <div class="card border-0 shadow-sm h-100">
        <div class="card-header bg-white border-bottom py-3">
          <h6 class="mb-0 fw-bold">
            <i class="bi bi-clock-history text-success me-2"></i>سجل الدفعات
          </h6>
        </div>
        <div class="card-body p-3">
          @if (inv.payments.length === 0) {
            <div class="text-center py-4 text-muted">
              <i class="bi bi-credit-card fs-3 d-block mb-2"></i>
              <small>لا توجد دفعات مسجلة</small>
            </div>
          } @else {
            @for (payment of inv.payments; track payment.id) {
              <div class="border rounded-3 p-2 mb-2 small">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <div class="fw-semibold" dir="ltr">{{ fmt(payment.amount) }}</div>
                    <div class="text-muted">{{ methodLabels[payment.method] }}</div>
                  </div>
                  <div class="text-end">
                    <div class="text-muted">{{ payment.paidAt | date:'dd/MM/yyyy' }}</div>
                    <div class="text-muted" style="font-size:0.7rem;">{{ payment.receivedBy }}</div>
                  </div>
                </div>
                @if (payment.reference) {
                  <div class="text-muted mt-1" style="font-size:0.7rem;" dir="ltr">
                    مرجع: {{ payment.reference }}
                  </div>
                }
              </div>
            }
          }
        </div>
      </div>
    </div>

  </div>

}
```

### SCSS

```scss

```


================================================================================
## src\app\features\billing\presentation\pages\invoice-form-page\invoice-form-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BillingFacade } from '../../../application/facades/billing.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { ITEM_TYPE_LABELS, InvoiceItemType } from '../../../domain/models/invoice.model';
import { CreateInvoiceRequest } from '../../../domain/repositories/billing.repository';

@Component({
  selector: 'hms-invoice-form-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './invoice-form-page.component.html',
  styleUrl: './invoice-form-page.component.scss',
})
export class InvoiceFormPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly facade = inject(BillingFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  readonly typeLabels = ITEM_TYPE_LABELS;
  readonly types = Object.keys(ITEM_TYPE_LABELS) as InvoiceItemType[];
  invoiceId: string | null = null;

  form = this.fb.group({
    patientId:       ['', Validators.required],
    appointmentId:   [''],
    dueDate:         ['', Validators.required],
    discountPercent: [0, [Validators.min(0), Validators.max(100)]],
    taxPercent:      [0, [Validators.min(0), Validators.max(100)]],
    notes:           [''],
    items:           this.fb.array([]),
  });

  get itemsArray(): FormArray { return this.form.get('items') as FormArray; }
  get f() { return this.form.controls; }
  get isEdit(): boolean { return !!this.invoiceId; }

  get calculatedSubtotal(): number {
    return this.itemsArray.controls.reduce((sum, ctrl) => {
      const q = ctrl.get('quantity')?.value ?? 0;
      const p = ctrl.get('unitPrice')?.value ?? 0;
      const d = ctrl.get('discount')?.value ?? 0;
      return sum + (q * p * (1 - d / 100));
    }, 0);
  }

  get calculatedTotal(): number {
    const sub = this.calculatedSubtotal;
    const disc = this.form.value.discountPercent ?? 0;
    const tax = this.form.value.taxPercent ?? 0;
    return sub * (1 - disc / 100) * (1 + tax / 100);
  }

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.paramMap.get('id');
    const patientId = this.route.snapshot.queryParams['patientId'] ?? '';
    const appointmentId = this.route.snapshot.queryParams['appointmentId'] ?? '';
    if (patientId) this.form.patchValue({ patientId });
    if (appointmentId) this.form.patchValue({ appointmentId });

    const defaultDue = new Date();
    defaultDue.setDate(defaultDue.getDate() + 30);
    this.form.patchValue({ dueDate: defaultDue.toISOString().split('T')[0] });
    this.addItem();

    if (this.isEdit) {
      this.facade.loadById(this.invoiceId!);
      this.layout.setPageTitle('Edit Invoice', 'تعديل الفاتورة');
    } else {
      this.layout.setPageTitle('New Invoice', 'فاتورة جديدة');
    }
  }

  addItem(): void {
    this.itemsArray.push(this.fb.group({
      type:        ['consultation', Validators.required],
      description: ['',            [Validators.required, Validators.minLength(3)]],
      quantity:    [1,             [Validators.required, Validators.min(1)]],
      unitPrice:   [0,             [Validators.required, Validators.min(0)]],
      discount:    [0,             [Validators.min(0), Validators.max(100)]],
    }));
  }

  removeItem(i: number): void {
    if (this.itemsArray.length > 1) this.itemsArray.removeAt(i);
  }

  formatCurrency(v: number): string {
    return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 2 }).format(v);
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.getRawValue();
    const req: CreateInvoiceRequest = {
      patientId:       v.patientId!,
      appointmentId:   v.appointmentId || undefined,
      dueDate:         v.dueDate!,
      discountPercent: v.discountPercent ?? 0,
      taxPercent:      v.taxPercent ?? 0,
      notes:           v.notes || undefined,
      items:           (v.items as any[]).map((it) => ({
        type:        it.type,
        description: it.description,
        quantity:    it.quantity,
        unitPrice:   it.unitPrice,
        discount:    it.discount ?? 0,
      })),
    };
    const action$ = this.isEdit
      ? this.facade.update(this.invoiceId!, req)
      : this.facade.create(req);
    action$.subscribe({ next: (inv) => this.nav.goTo(`/billing/invoices/${inv.id}`) });
  }

  onCancel(): void {
    this.isEdit ? this.nav.goTo(`/billing/invoices/${this.invoiceId}`) : this.nav.goTo('/billing/invoices');
  }
}
```

### HTML

```html
<nav aria-label="breadcrumb" class="mb-3">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a routerLink="/billing/invoices" class="text-decoration-none">الفواتير</a></li>
    <li class="breadcrumb-item active">{{ isEdit ? 'تعديل' : 'فاتورة جديدة' }}</li>
  </ol>
</nav>

<h1 class="h4 fw-bold mb-4">
  <i class="bi me-2"
    [class.bi-receipt]="!isEdit"
    [class.bi-pencil-square]="isEdit"
    [class.text-primary]="!isEdit"
    [class.text-warning]="isEdit"></i>
  {{ isEdit ? 'تعديل الفاتورة' : 'إنشاء فاتورة جديدة' }}
</h1>

@if (facade.hasError()) {
  <div class="alert alert-danger d-flex gap-2 mb-4">
    <i class="bi bi-exclamation-circle-fill"></i>{{ facade.error() }}
    <button class="btn-close ms-auto" (click)="facade.clearError()"></button>
  </div>
}

<form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>

  <!-- Basic Info -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-white py-3 border-bottom">
      <h6 class="mb-0 fw-bold"><i class="bi bi-info-circle text-primary me-2"></i>معلومات الفاتورة</h6>
    </div>
    <div class="card-body p-4">
      <div class="row g-3">
        <div class="col-12 col-md-4">
          <label class="form-label fw-semibold">معرّف المريض <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="patientId"
            [class.is-invalid]="f['patientId'].invalid && f['patientId'].touched" dir="ltr" />
          <div class="invalid-feedback">معرّف المريض مطلوب</div>
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label fw-semibold">معرّف الموعد</label>
          <input type="text" class="form-control" formControlName="appointmentId" dir="ltr" placeholder="اختياري" />
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label fw-semibold">تاريخ الاستحقاق <span class="text-danger">*</span></label>
          <input type="date" class="form-control" formControlName="dueDate"
            [class.is-invalid]="f['dueDate'].invalid && f['dueDate'].touched" />
          <div class="invalid-feedback">تاريخ الاستحقاق مطلوب</div>
        </div>
        <div class="col-6 col-md-3">
          <label class="form-label fw-semibold">خصم عام (%)</label>
          <input type="number" class="form-control" formControlName="discountPercent" min="0" max="100" />
        </div>
        <div class="col-6 col-md-3">
          <label class="form-label fw-semibold">ضريبة (%)</label>
          <input type="number" class="form-control" formControlName="taxPercent" min="0" max="100" />
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">ملاحظات</label>
          <input type="text" class="form-control" formControlName="notes" placeholder="ملاحظات اختيارية..." />
        </div>
      </div>
    </div>
  </div>

  <!-- Items -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-white py-3 border-bottom d-flex align-items-center justify-content-between">
      <h6 class="mb-0 fw-bold"><i class="bi bi-list-ul text-success me-2"></i>البنود</h6>
      <button type="button" class="btn btn-sm btn-outline-success" (click)="addItem()">
        <i class="bi bi-plus-lg me-1"></i>إضافة بند
      </button>
    </div>
    <div class="card-body p-3">
      <div formArrayName="items">
        @for (item of itemsArray.controls; track $index; let i = $index) {
          <div [formGroupName]="i" class="row g-2 align-items-end border rounded-3 p-2 mb-2">
            <div class="col-12 col-md-2">
              <label class="form-label small fw-semibold mb-1">النوع</label>
              <select class="form-select form-select-sm" formControlName="type">
                @for (t of types; track t) {
                  <option [value]="t">{{ typeLabels[t] }}</option>
                }
              </select>
            </div>
            <div class="col-12 col-md-4">
              <label class="form-label small fw-semibold mb-1">الوصف <span class="text-danger">*</span></label>
              <input type="text" class="form-control form-control-sm" formControlName="description"
                [class.is-invalid]="item.get('description')!.invalid && item.get('description')!.touched"
                placeholder="وصف الخدمة أو البند" />
              <div class="invalid-feedback">الوصف مطلوب</div>
            </div>
            <div class="col-4 col-md-2">
              <label class="form-label small fw-semibold mb-1">الكمية</label>
              <input type="number" class="form-control form-control-sm" formControlName="quantity" min="1" />
            </div>
            <div class="col-4 col-md-2">
              <label class="form-label small fw-semibold mb-1">سعر الوحدة</label>
              <input type="number" class="form-control form-control-sm" formControlName="unitPrice" min="0" dir="ltr" />
            </div>
            <div class="col-3 col-md-1">
              <label class="form-label small fw-semibold mb-1">خصم%</label>
              <input type="number" class="form-control form-control-sm" formControlName="discount" min="0" max="100" />
            </div>
            <div class="col-1">
              @if (itemsArray.length > 1) {
                <button type="button" class="btn btn-sm btn-outline-danger w-100" (click)="removeItem(i)">
                  <i class="bi bi-trash"></i>
                </button>
              }
            </div>
          </div>
        }
      </div>
    </div>

    <!-- Totals Preview -->
    <div class="card-footer bg-light border-top p-3">
      <div class="d-flex justify-content-end gap-4 small">
        <div class="text-muted">الإجمالي الجزئي: <span class="fw-bold text-dark" dir="ltr">{{ formatCurrency(calculatedSubtotal) }}</span></div>
        <div class="fw-bold text-primary">الإجمالي الكلي: <span dir="ltr">{{ formatCurrency(calculatedTotal) }}</span></div>
      </div>
    </div>
  </div>

  <div class="d-flex gap-3 justify-content-end">
    <button type="button" class="btn btn-outline-secondary px-4" (click)="onCancel()">إلغاء</button>
    <button type="submit" class="btn btn-primary px-4" [disabled]="facade.isSaving()">
      @if (facade.isSaving()) {
        <span class="spinner-border spinner-border-sm me-2"></span>جاري الحفظ...
      } @else {
        <i class="bi bi-check-lg me-2"></i>{{ isEdit ? 'حفظ التعديلات' : 'إنشاء الفاتورة' }}
      }
    </button>
  </div>

</form>
```

### SCSS

```scss

```


================================================================================
## src\app\features\billing\presentation\pages\invoice-list-page\invoice-list-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BillingFacade } from '../../../application/facades/billing.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { BillingSummaryComponent } from '../../components/billing-summary/billing-summary.component';
import { INVOICE_STATUS_CONFIG } from '../../../domain/models/invoice.model';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { formatCurrency } from '../../../domain/entities/invoice.entity';

@Component({
  selector: 'hms-invoice-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, BillingSummaryComponent],
  templateUrl: './invoice-list-page.component.html',
  styleUrl: './invoice-list-page.component.scss',
})
export class InvoiceListPageComponent implements OnInit {
  readonly facade = inject(BillingFacade);
  private readonly layout = inject(LayoutService);
  private readonly fb = inject(FormBuilder);

  readonly statusConfig = INVOICE_STATUS_CONFIG;
  readonly fmt = formatCurrency;

  searchForm = this.fb.group({ search: [''], status: [''] });

  ngOnInit(): void {
    this.layout.setPageTitle('Billing', 'الفواتير');
    this.facade.loadAll();
    this.facade.loadSummary();
    this.searchForm.get('search')!.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.applyFilter());
    this.searchForm.valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.applyFilter());
  }

  applyFilter(): void {
    const v = this.searchForm.value;
    this.facade.applyFilter({
      ...this.facade.filter(),
      search: v.search ?? '',
      status: (v.status as any) || undefined,
      page: 1,
    });
  }

  onIssue(id: string): void { this.facade.issue(id).subscribe(); }

  onCancel(id: string): void {
    const reason = prompt('سبب الإلغاء:');
    if (reason) this.facade.cancel(id, reason).subscribe();
  }

  onDelete(id: string): void {
    if (!confirm('هل أنت متأكد من حذف هذه الفاتورة؟')) return;
    this.facade.delete(id).subscribe();
  }

  onPageChange(page: number): void { this.facade.changePage(page); }

  get pages(): number[] {
    return Array.from({ length: this.facade.totalPages() }, (_, i) => i + 1);
  }
}
```

### HTML

```html
<div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
  <div>
    <h1 class="h4 fw-bold mb-0">الفواتير والمدفوعات</h1>
    @if (facade.overdueCount() > 0) {
      <p class="text-danger small mb-0">
        <i class="bi bi-exclamation-triangle me-1"></i>{{ facade.overdueCount() }} فاتورة متأخرة
      </p>
    }
  </div>
  <a routerLink="/billing/invoices/new" class="btn btn-primary">
    <i class="bi bi-receipt me-2"></i>فاتورة جديدة
  </a>
</div>

<!-- Summary -->
@if (facade.summary()) {
  <div class="mb-4">
    <hms-billing-summary [summary]="facade.summary()" />
  </div>
}

<!-- Filter -->
<div class="card border-0 shadow-sm mb-4">
  <div class="card-body p-3">
    <div [formGroup]="searchForm" class="row g-2">
      <div class="col-12 col-md-7">
        <div class="input-group input-group-sm">
          <span class="input-group-text bg-light"><i class="bi bi-search text-muted"></i></span>
          <input type="text" class="form-control border-start-0" formControlName="search"
            placeholder="اسم المريض، رقم الفاتورة..." />
        </div>
      </div>
      <div class="col-12 col-md-3">
        <select class="form-select form-select-sm" formControlName="status">
          <option value="">كل الحالات</option>
          @for (s of statusConfig | keyvalue; track s.key) {
            <option [value]="s.key">{{ s.value.label }}</option>
          }
        </select>
      </div>
    </div>
  </div>
</div>

@if (facade.hasError()) {
  <div class="alert alert-danger d-flex gap-2 align-items-center mb-4">
    <i class="bi bi-exclamation-circle-fill"></i>{{ facade.error() }}
    <button class="btn btn-sm btn-danger ms-auto" (click)="facade.loadAll()">إعادة المحاولة</button>
  </div>
}

@if (facade.isLoading()) {
  <div class="card border-0 shadow-sm">
    @for (i of [1,2,3,4,5]; track i) {
      <div class="card-body border-bottom py-3 placeholder-glow">
        <span class="placeholder col-4 d-block mb-1 rounded"></span>
        <span class="placeholder col-7 rounded"></span>
      </div>
    }
  </div>
} @else if (!facade.hasInvoices()) {
  <div class="text-center py-5">
    <i class="bi bi-receipt fs-1 text-muted d-block mb-3"></i>
    <h5 class="fw-bold text-muted">لا توجد فواتير</h5>
    <a routerLink="/billing/invoices/new" class="btn btn-primary mt-3">إنشاء فاتورة جديدة</a>
  </div>
} @else {
  <div class="card border-0 shadow-sm mb-4">
    @for (inv of facade.invoices().items; track inv.id) {
      <div class="card-body border-bottom py-3">
        <div class="d-flex align-items-start gap-3">

          <!-- Status Indicator -->
          <div class="flex-shrink-0 mt-1">
            <span class="badge rounded-pill small" [ngClass]="statusConfig[inv.status]?.class ?? 'bg-secondary-subtle text-secondary'">
              <i class="bi me-1" [ngClass]="statusConfig[inv.status]?.icon ?? 'bi-circle'"></i>
              {{ statusConfig[inv.status]?.label ?? inv.status }}
            </span>
          </div>

          <div class="flex-grow-1 min-w-0">
            <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
              <a [routerLink]="['/billing/invoices', inv.id]"
                class="fw-semibold text-dark text-decoration-none">
                #{{ inv.invoiceNumber }}
              </a>
              <span class="text-muted small">— {{ inv.patientName }}</span>
            </div>
            <div class="small text-muted">
              صدرت: {{ inv.issuedAt | date:'dd/MM/yyyy' }}
              &nbsp;|&nbsp; تستحق: {{ inv.dueDate | date:'dd/MM/yyyy' }}
              &nbsp;|&nbsp; {{ inv.items.length }} بنود
            </div>
            <!-- Payment Progress -->
            <div class="d-flex align-items-center gap-2 mt-1">
              <div class="progress flex-grow-1" style="height: 4px; max-width: 150px;">
                <div class="progress-bar bg-success"
                  [style.width]="(inv.totalAmount > 0 ? (inv.paidAmount / inv.totalAmount * 100) : 0) + '%'">
                </div>
              </div>
              <span class="small text-muted" dir="ltr">
                {{ fmt(inv.paidAmount) }} / {{ fmt(inv.totalAmount) }}
              </span>
            </div>
          </div>

          <div class="d-flex gap-1 flex-shrink-0">
            <a [routerLink]="['/billing/invoices', inv.id]" class="btn btn-sm btn-outline-primary">
              <i class="bi bi-eye"></i>
            </a>
            @if (inv.status === 'draft') {
              <button type="button" class="btn btn-sm btn-outline-success" (click)="onIssue(inv.id)" title="إصدار">
                <i class="bi bi-send"></i>
              </button>
            }
            @if (['issued','partially-paid','overdue'].includes(inv.status)) {
              <a [routerLink]="['/billing/payment']" [queryParams]="{ invoiceId: inv.id }"
                class="btn btn-sm btn-success" title="دفع">
                <i class="bi bi-credit-card"></i>
              </a>
            }
            @if (['draft','issued'].includes(inv.status)) {
              <button type="button" class="btn btn-sm btn-outline-warning" (click)="onCancel(inv.id)" title="إلغاء">
                <i class="bi bi-x-circle"></i>
              </button>
            }
            @if (inv.status === 'draft') {
              <button type="button" class="btn btn-sm btn-outline-danger" (click)="onDelete(inv.id)">
                <i class="bi bi-trash"></i>
              </button>
            }
          </div>

        </div>
      </div>
    }
  </div>

  @if (facade.totalPages() > 1) {
    <nav>
      <ul class="pagination justify-content-center">
        <li class="page-item" [class.disabled]="facade.currentPage() === 1">
          <button class="page-link" (click)="onPageChange(facade.currentPage() - 1)">
            <i class="bi bi-chevron-right"></i>
          </button>
        </li>
        @for (p of pages; track p) {
          <li class="page-item" [class.active]="p === facade.currentPage()">
            <button class="page-link" (click)="onPageChange(p)">{{ p }}</button>
          </li>
        }
        <li class="page-item" [class.disabled]="facade.currentPage() === facade.totalPages()">
          <button class="page-link" (click)="onPageChange(facade.currentPage() + 1)">
            <i class="bi bi-chevron-left"></i>
          </button>
        </li>
      </ul>
    </nav>
  }
}
```

### SCSS

```scss

```


================================================================================
## src\app\features\billing\presentation\pages\payment-page\payment-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { BillingFacade } from '../../../application/facades/billing.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { PaymentFormComponent } from '../../components/payment-form/payment-form.component';
import { CreatePaymentRequest } from '../../../domain/models/billing-filter.model';
import { formatCurrency } from '../../../domain/entities/invoice.entity';

@Component({
  selector: 'hms-payment-page',
  standalone: true,
  imports: [CommonModule, RouterModule, PaymentFormComponent],
  template: `
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb small">
        <li class="breadcrumb-item"><a routerLink="/billing/invoices" class="text-decoration-none">الفواتير</a></li>
        <li class="breadcrumb-item active">تسجيل دفعة</li>
      </ol>
    </nav>

    <h1 class="h4 fw-bold mb-4">
      <i class="bi bi-credit-card-fill text-success me-2"></i>تسجيل دفعة
    </h1>

    @if (facade.isDetailLoading()) {
      <div class="text-center py-5"><div class="spinner-border text-primary" role="status"></div></div>
    } @else {
      @if (facade.selectedInvoice(); as inv) {
        <!-- Invoice Summary -->
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body p-3">
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
              <div>
                <div class="fw-bold">فاتورة #{{ inv.invoiceNumber }}</div>
                <div class="text-muted small">{{ inv.patientName }}</div>
              </div>
              <div class="text-end">
                <div class="text-muted small">الإجمالي</div>
                <div class="fw-bold fs-5" dir="ltr">{{ fmt(inv.totalAmount) }}</div>
              </div>
              <div class="text-end">
                <div class="text-muted small">المدفوع</div>
                <div class="fw-bold text-success" dir="ltr">{{ fmt(inv.paidAmount) }}</div>
              </div>
              <div class="text-end">
                <div class="text-muted small">المتبقي</div>
                <div class="fw-bold text-danger" dir="ltr">{{ fmt(inv.remainingAmount) }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-12 col-md-8 col-lg-6">
            <hms-payment-form
              [invoiceId]="inv.id"
              [remainingAmount]="inv.remainingAmount"
              [isProcessing]="facade.isProcessingPayment()"
              (submitted)="onSubmit($event)"
              (cancelled)="nav.goTo('/billing/invoices/' + inv.id)"
            />
          </div>
        </div>
      } @else {
        <div class="text-center py-5">
          <i class="bi bi-receipt fs-2 text-muted d-block mb-3"></i>
          <p class="text-muted">لم يتم تحديد فاتورة</p>
          <a routerLink="/billing/invoices" class="btn btn-primary">عرض الفواتير</a>
        </div>
      }
    }
  `,
})
export class PaymentPageComponent implements OnInit {
  readonly facade = inject(BillingFacade);
  readonly nav = inject(NavigationService);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);

  readonly fmt = formatCurrency;

  ngOnInit(): void {
    this.layout.setPageTitle('Payment', 'تسجيل دفعة');
    const invoiceId = this.route.snapshot.queryParams['invoiceId'];
    if (invoiceId) this.facade.loadById(invoiceId);
  }

  onSubmit(req: CreatePaymentRequest): void {
    this.facade.processPayment(req).subscribe({
      next: () => this.nav.goTo(`/billing/invoices/${req.invoiceId}`),
    });
  }
}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\calendar-scheduling\presentation\components\calendar-event-form\calendar-event-form.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\calendar-scheduling\presentation\components\calendar-filters\calendar-filters.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\calendar-scheduling\presentation\components\calendar-view\calendar-view.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\calendar-scheduling\presentation\pages\calendar-page\calendar-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutService } from '../../../../../core/application/services/layout.service';

@Component({
  selector: 'hms-calendar-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
      <h1 class="h4 fw-bold mb-0">
        <i class="bi bi-calendar3 me-2 text-primary"></i>التقويم والجدولة
      </h1>
      <div class="d-flex gap-2">
        <a routerLink="/appointments/calendar" class="btn btn-sm btn-outline-primary">
          <i class="bi bi-calendar-check me-1"></i>تقويم المواعيد
        </a>
        <button class="btn btn-sm btn-primary">
          <i class="bi bi-plus-lg me-1"></i>حدث جديد
        </button>
      </div>
    </div>
    <div class="card border-0 shadow-sm">
      <div class="card-body text-center py-5">
        <i class="bi bi-calendar3 fs-1 text-primary d-block mb-3"></i>
        <h5 class="fw-bold text-muted mb-2">التقويم والجدولة</h5>
        <p class="text-muted small mb-3">سيتم عرض التقويم الكامل هنا مع أحداث المستشفى</p>
        <a routerLink="/appointments/calendar" class="btn btn-outline-primary">
          <i class="bi bi-calendar-check me-2"></i>عرض تقويم المواعيد
        </a>
      </div>
    </div>
  `,
})
export class CalendarPageComponent implements OnInit {
  private readonly layout = inject(LayoutService);
  ngOnInit(): void { this.layout.setPageTitle('Calendar', 'التقويم'); }
}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\charts-analytics\presentation\components\occupancy-chart\occupancy-chart.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\charts-analytics\presentation\components\patient-flow-chart\patient-flow-chart.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\charts-analytics\presentation\components\report-filter\report-filter.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\charts-analytics\presentation\components\revenue-chart\revenue-chart.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\charts-analytics\presentation\pages\analytics-dashboard-page\analytics-dashboard-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutService } from '../../../../../core/application/services/layout.service';

@Component({
  selector: 'hms-analytics-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h1 class="h4 fw-bold mb-0">
        <i class="bi bi-bar-chart-fill me-2 text-info"></i>لوحة التحليلات
      </h1>
      <div class="d-flex gap-2">
        <select class="form-select form-select-sm" style="width: auto;">
          <option>هذا الشهر</option>
          <option>هذا الأسبوع</option>
          <option>هذا العام</option>
        </select>
        <button class="btn btn-sm btn-outline-secondary">
          <i class="bi bi-download me-1"></i>تصدير
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row g-3 mb-4">
      @for (stat of stats; track stat.label) {
        <div class="col-6 col-lg-3">
          <div class="card border-0 shadow-sm">
            <div class="card-body p-3 text-center">
              <i class="bi fs-2 d-block mb-2" [ngClass]="[stat.icon, 'text-' + stat.color]"></i>
              <h4 class="fw-bold mb-0" [ngClass]="'text-' + stat.color">{{ stat.value }}</h4>
              <div class="text-muted small">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      }
    </div>

    <!-- Charts Placeholder -->
    <div class="row g-4">
      <div class="col-12 col-lg-8">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white border-bottom py-3">
            <h6 class="mb-0 fw-bold"><i class="bi bi-graph-up text-primary me-2"></i>تدفق المرضى</h6>
          </div>
          <div class="card-body text-center py-5 text-muted">
            <i class="bi bi-bar-chart fs-1 d-block mb-2"></i>
            <p class="small mb-0">سيتم عرض الرسم البياني هنا عند ربط مكتبة الرسوم</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white border-bottom py-3">
            <h6 class="mb-0 fw-bold"><i class="bi bi-pie-chart text-success me-2"></i>توزيع الإيرادات</h6>
          </div>
          <div class="card-body text-center py-5 text-muted">
            <i class="bi bi-pie-chart fs-1 d-block mb-2"></i>
            <p class="small mb-0">الرسم البياني الدائري</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AnalyticsDashboardPageComponent implements OnInit {
  private readonly layout = inject(LayoutService);

  readonly stats = [
    { label: 'إجمالي المرضى',   value: '2,450', icon: 'bi-people-fill',         color: 'primary' },
    { label: 'المواعيد هذا الشهر', value: '384',  icon: 'bi-calendar-check-fill', color: 'success' },
    { label: 'نسبة الإشغال',    value: '78%',   icon: 'bi-hospital',             color: 'info' },
    { label: 'الإيرادات',       value: '125K',  icon: 'bi-cash-coin',            color: 'warning' },
  ];

  ngOnInit(): void {
    this.layout.setPageTitle('Analytics', 'التحليلات');
  }
}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\dashboard\presentation\components\appointments-widget\appointments-widget.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppointmentWidgetItem } from '../../../domain/repositories/dashboard.repository';

@Component({
  selector: 'hms-appointments-widget',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './appointments-widget.component.html',
  styleUrl: './appointments-widget.component.scss',
})
export class AppointmentsWidgetComponent {
  readonly appointments = input<AppointmentWidgetItem[]>([]);
  readonly isLoading = input<boolean>(false);

  readonly statusConfig: Record<string, { label: string; class: string }> = {
    scheduled:   { label: 'مجدول',   class: 'bg-info-subtle text-info' },
    confirmed:   { label: 'مؤكد',    class: 'bg-primary-subtle text-primary' },
    'in-progress': { label: 'جارٍ',  class: 'bg-warning-subtle text-warning' },
    completed:   { label: 'مكتمل',   class: 'bg-success-subtle text-success' },
    cancelled:   { label: 'ملغى',    class: 'bg-danger-subtle text-danger' },
  };
}
```

### HTML

```html
<div class="card border-0 shadow-sm h-100">
  <div class="card-header bg-white border-bottom d-flex align-items-center justify-content-between py-3">
    <h6 class="mb-0 fw-bold">
      <i class="bi bi-calendar-check text-primary me-2"></i>
      مواعيد اليوم
    </h6>
    <a routerLink="/appointments" class="btn btn-sm btn-outline-primary">
      عرض الكل
    </a>
  </div>
  <div class="card-body p-0">

    @if (isLoading()) {
      @for (i of [1,2,3,4,5]; track i) {
        <div class="d-flex align-items-center gap-3 px-3 py-3 border-bottom">
          <div class="placeholder-glow flex-grow-1">
            <span class="placeholder col-6 d-block mb-1 rounded"></span>
            <span class="placeholder col-4 rounded"></span>
          </div>
          <span class="placeholder col-2 rounded-pill"></span>
        </div>
      }
    } @else if (appointments().length === 0) {
      <div class="text-center py-5 text-muted">
        <i class="bi bi-calendar-x fs-2 d-block mb-2"></i>
        <small>لا توجد مواعيد اليوم</small>
      </div>
    } @else {
      @for (apt of appointments(); track apt.id) {
        <a [routerLink]="['/appointments', apt.id]"
          class="d-flex align-items-center gap-3 px-3 py-3 border-bottom text-decoration-none text-dark widget-row">
          <div class="text-center flex-shrink-0" style="min-width: 48px;">
            <div class="fw-bold text-primary small">{{ apt.time }}</div>
          </div>
          <div class="flex-grow-1 min-w-0">
            <div class="fw-semibold small text-truncate">{{ apt.patientName }}</div>
            <div class="text-muted" style="font-size: 0.75rem;">{{ apt.doctorName }}</div>
          </div>
          <span class="badge rounded-pill small flex-shrink-0"
            [ngClass]="statusConfig[apt.status]?.class ?? 'bg-secondary-subtle text-secondary'">
            {{ statusConfig[apt.status]?.label ?? apt.status ?? 'غير محدد' }}
          </span>
        </a>
      }
    }

  </div>
</div>
```

### SCSS

```scss

```


================================================================================
## src\app\features\dashboard\presentation\components\emergency-widget\emergency-widget.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmergencyWidgetItem } from '../../../domain/repositories/dashboard.repository';

@Component({
  selector: 'hms-emergency-widget',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './emergency-widget.component.html',
  styleUrl: './emergency-widget.component.scss',
})
export class EmergencyWidgetComponent {
  readonly emergencies = input<EmergencyWidgetItem[]>([]);
  readonly isLoading = input<boolean>(false);

  readonly triageConfig: Record<number, { label: string; class: string; color: string }> = {
    1: { label: 'بالغ الخطورة', class: 'bg-danger text-white',          color: '#dc3545' },
    2: { label: 'طارئ',         class: 'bg-warning text-dark',           color: '#ffc107' },
    3: { label: 'عاجل',         class: 'bg-info text-white',             color: '#0dcaf0' },
    4: { label: 'أقل إلحاحاً',  class: 'bg-success text-white',         color: '#198754' },
    5: { label: 'غير طارئ',     class: 'bg-secondary text-white',       color: '#6c757d' },
  };

  getElapsedTime(arrivedAt: string): string {
    const diff = Date.now() - new Date(arrivedAt).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `منذ ${mins} دقيقة`;
    const hrs = Math.floor(mins / 60);
    return `منذ ${hrs} ساعة`;
  }
}
```

### HTML

```html
<div class="card border-0 shadow-sm h-100">
  <div class="card-header bg-white border-bottom d-flex align-items-center justify-content-between py-3">
    <h6 class="mb-0 fw-bold">
      <i class="bi bi-exclamation-triangle-fill text-danger me-2"></i>
      الطوارئ النشطة
    </h6>
    <a routerLink="/emergency-cases" class="btn btn-sm btn-outline-danger">
      عرض الكل
    </a>
  </div>
  <div class="card-body p-0">

    @if (isLoading()) {
      @for (i of [1,2,3]; track i) {
        <div class="d-flex align-items-center gap-3 px-3 py-3 border-bottom">
          <div class="placeholder-glow" style="width: 40px;">
            <span class="placeholder col-12 rounded d-block" style="height: 40px;"></span>
          </div>
          <div class="placeholder-glow flex-grow-1">
            <span class="placeholder col-7 d-block mb-1 rounded"></span>
            <span class="placeholder col-4 rounded"></span>
          </div>
        </div>
      }
    } @else if (emergencies().length === 0) {
      <div class="text-center py-5 text-muted">
        <i class="bi bi-check-circle fs-2 d-block mb-2 text-success"></i>
        <small>لا توجد حالات طوارئ نشطة</small>
      </div>
    } @else {
      @for (em of emergencies(); track em.id) {
        <a [routerLink]="['/emergency-cases', em.id]"
          class="d-flex align-items-center gap-3 px-3 py-3 border-bottom text-decoration-none text-dark widget-row">
          <div class="triage-badge rounded d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
            [ngClass]="triageConfig[em.triageLevel]?.class ?? 'bg-secondary-subtle text-secondary'"
            style="width: 40px; height: 40px; font-size: 1.1rem;">
            {{ em.triageLevel }}
          </div>
          <div class="flex-grow-1 min-w-0">
            <div class="fw-semibold small text-truncate">{{ em.patientName }}</div>
            <div class="text-muted text-truncate" style="font-size: 0.75rem;">{{ em.complaint }}</div>
          </div>
          <div class="text-end flex-shrink-0">
            <div class="text-muted" style="font-size: 0.7rem;">{{ getElapsedTime(em.arrivedAt) }}</div>
            @if (em.assignedDoctor) {
              <div class="text-primary" style="font-size: 0.7rem;">{{ em.assignedDoctor }}</div>
            } @else {
              <div class="text-danger" style="font-size: 0.7rem;">غير معين</div>
            }
          </div>
        </a>
      }
    }

  </div>
</div>
```

### SCSS

```scss

```


================================================================================
## src\app\features\dashboard\presentation\components\occupancy-widget\occupancy-widget.component
================================================================================

### TypeScript

```typescript
import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMetric } from '../../../domain/entities/dashboard-metric.entity';

@Component({
  selector: 'hms-occupancy-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './occupancy-widget.component.html',
  styleUrl: './occupancy-widget.component.scss',
})
export class OccupancyWidgetComponent {
  readonly metric = input<DashboardMetric | null>(null);
  readonly availableBeds = input<DashboardMetric | null>(null);
  readonly isLoading = input<boolean>(false);

  readonly occupancyPercent = computed(() => this.metric()?.value ?? 0);

  readonly progressColor = computed(() => {
    const pct = this.occupancyPercent();
    if (pct >= 90) return 'bg-danger';
    if (pct >= 75) return 'bg-warning';
    return 'bg-success';
  });

  readonly statusLabel = computed(() => {
    const pct = this.occupancyPercent();
    if (pct >= 90) return 'مكتظ';
    if (pct >= 75) return 'مشغول';
    return 'متاح';
  });
}
```

### HTML

```html
<div class="card border-0 shadow-sm h-100">
  <div class="card-body p-4">

    @if (isLoading()) {
      <div class="placeholder-glow">
        <span class="placeholder col-6 d-block mb-3 rounded"></span>
        <span class="placeholder col-12 d-block mb-2 rounded" style="height: 12px;"></span>
        <span class="placeholder col-4 rounded"></span>
      </div>
    } @else {
      <div class="d-flex align-items-start justify-content-between mb-3">
        <div>
          <p class="text-muted small mb-1">نسبة الإشغال</p>
          <h3 class="fw-bold mb-0">{{ occupancyPercent() }}<small class="fs-5">%</small></h3>
        </div>
        <span class="badge rounded-pill px-3 py-2"
          [ngClass]="{
            'bg-danger-subtle text-danger': occupancyPercent() >= 90,
            'bg-warning-subtle text-warning': occupancyPercent() >= 75 && occupancyPercent() < 90,
            'bg-success-subtle text-success': occupancyPercent() < 75
          }">
          {{ statusLabel() }}
        </span>
      </div>

      <div class="progress mb-3" style="height: 12px; border-radius: 6px;">
        <div
          class="progress-bar transition-all"
          [ngClass]="progressColor()"
          [style.width]="occupancyPercent() + '%'"
          role="progressbar"
          [attr.aria-valuenow]="occupancyPercent()"
          aria-valuemin="0"
          aria-valuemax="100">
        </div>
      </div>

      @if (availableBeds()) {
        <div class="d-flex align-items-center gap-2 text-muted small">
          <i class="bi bi-hospital"></i>
          <span>{{ availableBeds()!.value }} سرير متاح</span>
        </div>
      }
    }

  </div>
</div>
```

### SCSS

```scss

```


================================================================================
## src\app\features\dashboard\presentation\components\revenue-widget\revenue-widget.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMetric, getTrendIcon, getTrendClass } from '../../../domain/entities/dashboard-metric.entity';

@Component({
  selector: 'hms-revenue-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './revenue-widget.component.html',
  styleUrl: './revenue-widget.component.scss',
})
export class RevenueWidgetComponent {
  readonly metric = input<DashboardMetric | null>(null);
  readonly isLoading = input<boolean>(false);

  getTrendIcon = getTrendIcon;
  getTrendClass = getTrendClass;

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      maximumFractionDigits: 0,
    }).format(value);
  }
}
```

### HTML

```html
<div class="card border-0 shadow-sm h-100">
  <div class="card-body p-4">

    @if (isLoading()) {
      <div class="placeholder-glow">
        <span class="placeholder col-5 d-block mb-2 rounded"></span>
        <span class="placeholder col-8 d-block mb-1 rounded" style="height: 2rem;"></span>
        <span class="placeholder col-3 rounded"></span>
      </div>
    } @else if (metric()) {
      <div class="d-flex align-items-start justify-content-between">
        <div>
          <p class="text-muted small mb-1">إيرادات اليوم</p>
          <h3 class="fw-bold mb-1" dir="ltr">{{ formatCurrency(metric()!.value) }}</h3>
          <div class="d-flex align-items-center gap-1 small"
            [ngClass]="getTrendClass(metric()!.trend)">
            <i class="bi" [ngClass]="getTrendIcon(metric()!.trend)"></i>
            <span>{{ metric()!.trendPercent }}% مقارنة بالأمس</span>
          </div>
        </div>
        <div class="rounded-3 p-3 bg-success-subtle">
          <i class="bi bi-cash-coin text-success fs-4"></i>
        </div>
      </div>
    }

  </div>
</div>
```

### SCSS

```scss

```


================================================================================
## src\app\features\dashboard\presentation\pages\hospital-dashboard-page\hospital-dashboard-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardFacade } from '../../../application/facades/dashboard.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { AppointmentsWidgetComponent } from '../../components/appointments-widget/appointments-widget.component';
import { EmergencyWidgetComponent } from '../../components/emergency-widget/emergency-widget.component';
import { OccupancyWidgetComponent } from '../../components/occupancy-widget/occupancy-widget.component';
import { RevenueWidgetComponent } from '../../components/revenue-widget/revenue-widget.component';
import {
  DashboardPeriod,
  PERIOD_LABELS,
} from '../../../domain/models/dashboard-filter.model';
import { getTrendIcon, getTrendClass, MetricTrend } from '../../../domain/entities/dashboard-metric.entity';

@Component({
  selector: 'hms-hospital-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AppointmentsWidgetComponent,
    EmergencyWidgetComponent,
    OccupancyWidgetComponent,
    RevenueWidgetComponent,
  ],
  templateUrl: './hospital-dashboard-page.component.html',
  styleUrl: './hospital-dashboard-page.component.scss',
})
export class HospitalDashboardPageComponent implements OnInit {
  readonly facade = inject(DashboardFacade);
  private readonly layout = inject(LayoutService);

  readonly periods: DashboardPeriod[] = ['today', 'week', 'month', 'year'];
  readonly periodLabels = PERIOD_LABELS;
  readonly getTrendIcon = getTrendIcon;
  readonly getTrendClass = getTrendClass;

  readonly quickStats = [
    { key: 'totalPatients',     icon: 'bi-people-fill',          color: 'primary',  label: 'إجمالي المرضى' },
    { key: 'todayAppointments', icon: 'bi-calendar-check-fill',  color: 'info',     label: 'مواعيد اليوم' },
    { key: 'activeEmergencies', icon: 'bi-exclamation-triangle-fill', color: 'danger', label: 'حالات طوارئ' },
    { key: 'availableDoctors',  icon: 'bi-person-badge-fill',    color: 'success',  label: 'أطباء متاحون' },
  ];

  ngOnInit(): void {
    this.layout.setPageTitle('Dashboard', 'لوحة التحكم');
    this.facade.load();
  }

  onPeriodChange(period: DashboardPeriod): void {
    this.facade.changePeriod({ period });
  }

  onRefresh(): void {
    this.facade.refresh();
  }

  getMetricValue(key: string): number {
    const summary = this.facade.summary();
    if (!summary) return 0;
    return (summary as unknown as Record<string, { value: number }>)[key]?.value ?? 0;
  }

  getMetricTrend(key: string): { trend: MetricTrend; trendPercent: number } | null {
    const summary = this.facade.summary();
    if (!summary) return null;
    return (summary as unknown as Record<string, { trend: MetricTrend; trendPercent: number }>)[key] ?? null;
  }
}
```

### HTML

```html
<!-- Page Header -->
<div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
  <div>
    <h1 class="h4 fw-bold mb-1">لوحة التحكم</h1>
    <p class="text-muted small mb-0">
      آخر تحديث:
      @if (facade.lastUpdated()) {
        {{ facade.lastUpdated() | date:'shortTime' }}
      } @else { الآن }
    </p>
  </div>
  <div class="d-flex align-items-center gap-2 flex-wrap">
    <!-- Period Filter -->
    <div class="btn-group btn-group-sm" role="group">
      @for (period of periods; track period) {
        <button
          type="button"
          class="btn"
          [class.btn-primary]="facade.filter().period === period"
          [class.btn-outline-secondary]="facade.filter().period !== period"
          (click)="onPeriodChange(period)">
          {{ periodLabels[period] }}
        </button>
      }
    </div>
    <!-- Refresh -->
    <button class="btn btn-sm btn-outline-secondary" (click)="onRefresh()" [disabled]="facade.isLoading()">
      <i class="bi bi-arrow-clockwise" [class.spin]="facade.isLoading()"></i>
    </button>
  </div>
</div>

<!-- Error Alert -->
@if (facade.hasError()) {
  <div class="alert alert-danger d-flex align-items-center gap-2 mb-4">
    <i class="bi bi-exclamation-circle-fill"></i>
    <span>{{ facade.error() }} —</span>
    <button class="btn btn-sm btn-danger ms-2" (click)="onRefresh()">إعادة المحاولة</button>
  </div>
}

<!-- Quick Stats Row -->
<div class="row g-3 mb-4">
  @for (stat of quickStats; track stat.key) {
    <div class="col-6 col-lg-3">
      <div class="card border-0 shadow-sm">
        <div class="card-body p-3">
          @if (facade.isSummaryLoading()) {
            <div class="placeholder-glow">
              <span class="placeholder col-8 d-block mb-2 rounded"></span>
              <span class="placeholder col-5 rounded" style="height: 1.8rem;"></span>
            </div>
          } @else {
            <div class="d-flex align-items-start justify-content-between">
              <div>
                <p class="text-muted small mb-1">{{ stat.label }}</p>
                <h4 class="fw-bold mb-0">{{ getMetricValue(stat.key) | number }}</h4>
                @if (getMetricTrend(stat.key); as trend) {
                  <div class="small mt-1" [ngClass]="getTrendClass(trend.trend)">
                    <i class="bi" [ngClass]="getTrendIcon(trend.trend)"></i>
                    {{ trend.trendPercent }}%
                  </div>
                }
              </div>
              <div class="rounded-3 p-2" [ngClass]="'bg-' + stat.color + '-subtle'">
                <i class="bi fs-5" [ngClass]="[stat.icon, 'text-' + stat.color]"></i>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  }
</div>

<!-- Occupancy + Revenue Row -->
<div class="row g-3 mb-4">
  <div class="col-12 col-md-6">
    <hms-occupancy-widget
      [metric]="facade.summary()?.occupancyRate ?? null"
      [availableBeds]="facade.summary()?.availableBeds ?? null"
      [isLoading]="facade.isSummaryLoading()"
    />
  </div>
  <div class="col-12 col-md-6">
    <hms-revenue-widget
      [metric]="facade.summary()?.todayRevenue ?? null"
      [isLoading]="facade.isSummaryLoading()"
    />
  </div>
</div>

<!-- Appointments + Emergency Row -->
<div class="row g-3">
  <div class="col-12 col-xl-6">
    <hms-appointments-widget
      [appointments]="facade.appointments()"
      [isLoading]="facade.isLoading()"
    />
  </div>
  <div class="col-12 col-xl-6">
    <hms-emergency-widget
      [emergencies]="facade.emergencies()"
      [isLoading]="facade.isLoading()"
    />
  </div>
</div>
```

### SCSS

```scss

```


================================================================================
## src\app\features\doctors\presentation\components\doctor-card\doctor-card.component
================================================================================

### TypeScript

```typescript
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DoctorModel, DOCTOR_STATUS_CONFIG, DAY_LABELS } from '../../../domain/models/doctor.model';

@Component({
  selector: 'hms-doctor-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './doctor-card.component.html',
  styleUrl: './doctor-card.component.scss',
})
export class DoctorCardComponent {
  readonly doctor = input.required<DoctorModel>();
  readonly deleted = output<string>();

  readonly statusConfig = DOCTOR_STATUS_CONFIG;
  readonly dayLabels = DAY_LABELS;

  getInitials(): string {
    const d = this.doctor();
    return `${d.firstName.charAt(0)}${d.lastName.charAt(0)}`.toUpperCase();
  }

  onDelete(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this.deleted.emit(this.doctor().id);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(amount);
  }
}
```

### HTML

```html
<div class="card border-0 shadow-sm h-100 doctor-card">
  <div class="card-body p-3">

    <!-- Header -->
    <div class="d-flex align-items-start gap-3 mb-3">
      @if (doctor().avatar) {
        <img [src]="doctor().avatar" [alt]="doctor().fullName"
          class="rounded-circle object-fit-cover flex-shrink-0" width="56" height="56" />
      } @else {
        <div class="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center flex-shrink-0"
          style="width: 56px; height: 56px; font-size: 1.1rem;">
          {{ getInitials() }}
        </div>
      }
      <div class="flex-grow-1 min-w-0">
        <a [routerLink]="['/doctors', doctor().id]"
          class="fw-bold text-dark text-decoration-none d-block text-truncate">
          د. {{ doctor().fullName }}
        </a>
        <div class="text-primary small fw-semibold text-truncate">{{ doctor().specialization }}</div>
        <div class="text-muted" style="font-size:0.75rem;">{{ doctor().departmentName }}</div>
      </div>
      <span class="badge rounded-pill small flex-shrink-0"
        [ngClass]="statusConfig[doctor().status]?.class ?? 'bg-secondary-subtle text-secondary'">
        {{ statusConfig[doctor().status]?.label ?? doctor().status }}
      </span>
    </div>

    <!-- Stats Row -->
    <div class="row g-2 small text-center mb-3">
      <div class="col-4">
        <div class="bg-light rounded p-2">
          <div class="fw-bold text-primary">{{ doctor().yearsOfExperience }}</div>
          <div class="text-muted" style="font-size:0.7rem;">سنوات خبرة</div>
        </div>
      </div>
      <div class="col-4">
        <div class="bg-light rounded p-2">
          <div class="fw-bold text-success" style="font-size:0.8rem;">
            {{ formatCurrency(doctor().consultationFee) }}
          </div>
          <div class="text-muted" style="font-size:0.7rem;">الكشف</div>
        </div>
      </div>
      <div class="col-4">
        <div class="bg-light rounded p-2">
          <div class="fw-bold text-info">{{ doctor().availableDays.length }}</div>
          <div class="text-muted" style="font-size:0.7rem;">أيام عمل</div>
        </div>
      </div>
    </div>

    <!-- Work Hours -->
    <div class="d-flex align-items-center gap-2 small text-muted mb-3">
      <i class="bi bi-clock"></i>
      <span dir="ltr">{{ doctor().shiftStart }} – {{ doctor().shiftEnd }}</span>
    </div>

    <!-- Actions -->
    <div class="d-flex gap-2 pt-2 border-top">
      <a [routerLink]="['/doctors', doctor().id]"
        class="btn btn-sm btn-outline-primary flex-grow-1">
        <i class="bi bi-eye me-1"></i> عرض
      </a>
      <a [routerLink]="['/doctors', doctor().id, 'schedule']"
        class="btn btn-sm btn-outline-info">
        <i class="bi bi-calendar3"></i>
      </a>
      <a [routerLink]="['/doctors', doctor().id, 'edit']"
        class="btn btn-sm btn-outline-secondary">
        <i class="bi bi-pencil"></i>
      </a>
      <button type="button" class="btn btn-sm btn-outline-danger" (click)="onDelete($event)">
        <i class="bi bi-trash"></i>
      </button>
    </div>

  </div>
</div>
```

### SCSS

```scss

```


================================================================================
## src\app\features\doctors\presentation\components\doctor-filter\doctor-filter.component
================================================================================

### TypeScript

```typescript
import { Component, inject, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DoctorFilter } from '../../../domain/models/doctor-filter.model';
import { DoctorStatus } from '../../../domain/models/doctor.model';

@Component({
  selector: 'hms-doctor-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './doctor-filter.component.html',
  styleUrl: './doctor-filter.component.scss',
})
export class DoctorFilterComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  readonly filterChanged = output<Partial<DoctorFilter>>();
  readonly filterReset = output<void>();

  form = this.fb.group({
    search:         [''],
    status:         ['' as DoctorStatus | ''],
    specialization: [''],
    departmentId:   [''],
  });

  ngOnInit(): void {
    this.form.get('search')!.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.emit());
    this.form.valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.emit());
  }

  emit(): void {
    const v = this.form.value;
    this.filterChanged.emit({
      search: v.search ?? '',
      status: (v.status as DoctorStatus) || undefined,
      specialization: v.specialization || undefined,
      departmentId: v.departmentId || undefined,
      page: 1,
    });
  }

  reset(): void {
    this.form.reset({ search: '', status: '', specialization: '', departmentId: '' });
    this.filterReset.emit();
  }

  get hasActive(): boolean {
    const v = this.form.value;
    return !!(v.search || v.status || v.specialization || v.departmentId);
  }
}
```

### HTML

```html
<div class="card border-0 shadow-sm mb-4">
  <div class="card-body p-3">
    <div [formGroup]="form" class="row g-2 align-items-end">
      <div class="col-12 col-md-5">
        <label class="form-label small fw-semibold mb-1">بحث</label>
        <div class="input-group input-group-sm">
          <span class="input-group-text bg-light"><i class="bi bi-search text-muted"></i></span>
          <input type="text" class="form-control border-start-0" formControlName="search"
            placeholder="اسم الطبيب، التخصص، رقم الترخيص..." />
        </div>
      </div>
      <div class="col-6 col-md-2">
        <label class="form-label small fw-semibold mb-1">الحالة</label>
        <select class="form-select form-select-sm" formControlName="status">
          <option value="">الكل</option>
          <option value="active">نشط</option>
          <option value="inactive">غير نشط</option>
          <option value="on-leave">إجازة</option>
        </select>
      </div>
      <div class="col-6 col-md-3">
        <label class="form-label small fw-semibold mb-1">التخصص</label>
        <input type="text" class="form-select form-select-sm" formControlName="specialization"
          placeholder="القلب، العظام..." />
      </div>
      <div class="col-12 col-md-2">
        @if (hasActive) {
          <button type="button" class="btn btn-sm btn-outline-secondary w-100" (click)="reset()">
            <i class="bi bi-x-circle me-1"></i>مسح
          </button>
        }
      </div>
    </div>
  </div>
</div>
```

### SCSS

```scss

```


================================================================================
## src\app\features\doctors\presentation\components\doctor-form\doctor-form.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\doctors\presentation\components\doctor-schedule-calendar\doctor-schedule-calendar.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\doctors\presentation\pages\doctor-detail-page\doctor-detail-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DoctorsFacade } from '../../../application/facades/doctors.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { DOCTOR_STATUS_CONFIG, DAY_LABELS } from '../../../domain/models/doctor.model';

@Component({
  selector: 'hms-doctor-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './doctor-detail-page.component.html',
  styleUrl: './doctor-detail-page.component.scss',
})
export class DoctorDetailPageComponent implements OnInit, OnDestroy {
  readonly facade = inject(DoctorsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  readonly statusConfig = DOCTOR_STATUS_CONFIG;
  readonly dayLabels = DAY_LABELS;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.facade.loadById(id);
    this.layout.setPageTitle('Doctor Detail', 'تفاصيل الطبيب');
  }

  ngOnDestroy(): void { this.facade.clearSelected(); }

  onDelete(): void {
    const d = this.facade.selectedDoctor();
    if (!d || !confirm(`هل أنت متأكد من حذف الطبيب "${d.fullName}"؟`)) return;
    this.facade.delete(d.id).subscribe({ next: () => this.nav.goTo('/doctors') });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(amount);
  }
}
```

### HTML

```html
<nav aria-label="breadcrumb" class="mb-3">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a routerLink="/doctors" class="text-decoration-none">الأطباء</a></li>
    <li class="breadcrumb-item active">{{ facade.selectedDoctor()?.fullName ?? 'تفاصيل الطبيب' }}</li>
  </ol>
</nav>

@if (facade.isDetailLoading()) {
  <div class="text-center py-5">
    <div class="spinner-border text-primary" role="status"></div>
  </div>
}

@if (facade.selectedDoctor(); as doctor) {

  <!-- Header Card -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-body p-4">
      <div class="d-flex align-items-start gap-4 flex-wrap">
        <!-- Avatar -->
        <div class="flex-shrink-0">
          @if (doctor.avatar) {
            <img [src]="doctor.avatar" [alt]="doctor.fullName"
              class="rounded-circle object-fit-cover" width="80" height="80" />
          } @else {
            <div class="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center"
              style="width:80px;height:80px;font-size:1.6rem;">
              {{ doctor.firstName.charAt(0) }}{{ doctor.lastName.charAt(0) }}
            </div>
          }
        </div>

        <!-- Info -->
        <div class="flex-grow-1">
          <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
            <h2 class="h5 fw-bold mb-0">د. {{ doctor.fullName }}</h2>
            <span class="badge rounded-pill" [ngClass]="statusConfig[doctor.status]?.class ?? 'bg-secondary-subtle text-secondary'">
              {{ statusConfig[doctor.status]?.label ?? doctor.status }}
            </span>
          </div>
          <div class="text-primary fw-semibold mb-1">{{ doctor.specialization }}</div>
          <div class="text-muted small mb-2">{{ doctor.departmentName }}</div>
          <div class="d-flex flex-wrap gap-3 small text-muted">
            <span><i class="bi bi-telephone me-1"></i><span dir="ltr">{{ doctor.phone }}</span></span>
            <span><i class="bi bi-envelope me-1"></i>{{ doctor.email }}</span>
            <span><i class="bi bi-award me-1"></i>{{ doctor.yearsOfExperience }} سنوات خبرة</span>
            <span><i class="bi bi-cash-coin me-1"></i>{{ formatCurrency(doctor.consultationFee) }}</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="d-flex gap-2 flex-shrink-0">
          <a [routerLink]="['/doctors', doctor.id, 'schedule']" class="btn btn-sm btn-outline-info">
            <i class="bi bi-calendar3 me-1"></i>الجدول
          </a>
          <a [routerLink]="['/doctors', doctor.id, 'edit']" class="btn btn-sm btn-outline-secondary">
            <i class="bi bi-pencil me-1"></i>تعديل
          </a>
          <button type="button" class="btn btn-sm btn-outline-danger" (click)="onDelete()">
            <i class="bi bi-trash me-1"></i>حذف
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Details Row -->
  <div class="row g-4">
    <div class="col-12 col-lg-6">
      <div class="card border-0 shadow-sm h-100">
        <div class="card-header bg-white border-bottom py-3">
          <h6 class="mb-0 fw-bold"><i class="bi bi-person-badge text-primary me-2"></i>بيانات مهنية</h6>
        </div>
        <div class="card-body">
          <dl class="row small mb-0">
            <dt class="col-5 text-muted fw-normal">رقم الترخيص</dt>
            <dd class="col-7" dir="ltr">{{ doctor.licenseNumber }}</dd>
            <dt class="col-5 text-muted fw-normal">انتهاء الترخيص</dt>
            <dd class="col-7">{{ doctor.licenseExpiryDate | date:'dd/MM/yyyy' }}</dd>
            <dt class="col-5 text-muted fw-normal">القسم</dt>
            <dd class="col-7">{{ doctor.departmentName }}</dd>
            <dt class="col-5 text-muted fw-normal">تاريخ الانضمام</dt>
            <dd class="col-7">{{ doctor.joinedAt | date:'dd/MM/yyyy' }}</dd>
            <dt class="col-5 text-muted fw-normal">اللغات</dt>
            <dd class="col-7">{{ doctor.languages.join('، ') }}</dd>
          </dl>
        </div>
      </div>
    </div>

    <div class="col-12 col-lg-6">
      <div class="card border-0 shadow-sm h-100">
        <div class="card-header bg-white border-bottom py-3">
          <h6 class="mb-0 fw-bold"><i class="bi bi-clock text-info me-2"></i>جدول العمل</h6>
        </div>
        <div class="card-body">
          <p class="small text-muted mb-2">أيام العمل:</p>
          <div class="d-flex flex-wrap gap-1 mb-3">
            @for (day of doctor.availableDays; track day) {
              <span class="badge bg-primary-subtle text-primary rounded-pill">{{ dayLabels[day] }}</span>
            }
          </div>
          <p class="small text-muted mb-1">ساعات العمل:</p>
          <div class="d-flex align-items-center gap-2 small" dir="ltr">
            <i class="bi bi-clock text-muted"></i>
            <span>{{ doctor.shiftStart }} – {{ doctor.shiftEnd }}</span>
          </div>
          @if (doctor.bio) {
            <hr class="my-3">
            <p class="small text-muted mb-1">نبذة:</p>
            <p class="small mb-0">{{ doctor.bio }}</p>
          }
        </div>
      </div>
    </div>
  </div>

}

```

### SCSS

```scss

```


================================================================================
## src\app\features\doctors\presentation\pages\doctor-form-page\doctor-form-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DoctorsFacade } from '../../../application/facades/doctors.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { DAY_LABELS, DayOfWeek } from '../../../domain/models/doctor.model';
import { CreateDoctorRequest } from '../../../domain/repositories/doctor.repository';

@Component({
  selector: 'hms-doctor-form-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './doctor-form-page.component.html',
  styleUrl: './doctor-form-page.component.scss',
})
export class DoctorFormPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly facade = inject(DoctorsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  readonly dayLabels = DAY_LABELS;
  readonly allDays: DayOfWeek[] = ['saturday','sunday','monday','tuesday','wednesday','thursday','friday'];
  doctorId: string | null = null;

  form = this.fb.group({
    firstName:          ['', [Validators.required, Validators.minLength(2)]],
    lastName:           ['', [Validators.required, Validators.minLength(2)]],
    specialization:     ['', Validators.required],
    subSpecialization:  [''],
    licenseNumber:      ['', Validators.required],
    licenseExpiryDate:  ['', Validators.required],
    phone:              ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
    email:              ['', [Validators.required, Validators.email]],
    departmentId:       ['', Validators.required],
    departmentName:     ['', Validators.required],
    status:             ['active', Validators.required],
    yearsOfExperience:  [0, [Validators.required, Validators.min(0)]],
    consultationFee:    [0, [Validators.required, Validators.min(0)]],
    shiftStart:         ['08:00', Validators.required],
    shiftEnd:           ['16:00', Validators.required],
    languages:          ['عربي'],
    bio:                [''],
  });

  selectedDays = new Set<DayOfWeek>();

  get isEditMode(): boolean { return !!this.doctorId; }
  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.doctorId = this.route.snapshot.paramMap.get('id');
    if (this.isEditMode) {
      this.facade.loadById(this.doctorId!);
      this.layout.setPageTitle('Edit Doctor', 'تعديل بيانات الطبيب');
    } else {
      this.layout.setPageTitle('New Doctor', 'إضافة طبيب جديد');
    }
  }

  toggleDay(day: DayOfWeek): void {
    this.selectedDays.has(day) ? this.selectedDays.delete(day) : this.selectedDays.add(day);
  }

  onSubmit(): void {
    if (this.form.invalid || this.selectedDays.size === 0) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const request: CreateDoctorRequest = {
      firstName: v.firstName!,
      lastName: v.lastName!,
      specialization: v.specialization!,
      subSpecialization: v.subSpecialization || undefined,
      licenseNumber: v.licenseNumber!,
      licenseExpiryDate: v.licenseExpiryDate!,
      phone: v.phone!,
      email: v.email!,
      departmentId: v.departmentId!,
      departmentName: v.departmentName!,
      status: v.status as any,
      yearsOfExperience: v.yearsOfExperience!,
      consultationFee: v.consultationFee!,
      shiftStart: v.shiftStart!,
      shiftEnd: v.shiftEnd!,
      availableDays: Array.from(this.selectedDays),
      languages: v.languages ? v.languages.split(',').map((s: string) => s.trim()) : ['عربي'],
      bio: v.bio || undefined,
    };

    const action$ = this.isEditMode
      ? this.facade.update(this.doctorId!, request)
      : this.facade.create(request);

    action$.subscribe({ next: (d) => this.nav.goTo(`/doctors/${d.id}`) });
  }

  onCancel(): void {
    this.isEditMode ? this.nav.goTo(`/doctors/${this.doctorId}`) : this.nav.goTo('/doctors');
  }
}
```

### HTML

```html
<nav aria-label="breadcrumb" class="mb-3">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a routerLink="/doctors" class="text-decoration-none">الأطباء</a></li>
    <li class="breadcrumb-item active">{{ isEditMode ? 'تعديل البيانات' : 'إضافة طبيب جديد' }}</li>
  </ol>
</nav>

<h1 class="h4 fw-bold mb-4">
  <i class="bi me-2"
    [class.bi-person-plus-fill]="!isEditMode"
    [class.bi-pencil-square]="isEditMode"
    [class.text-primary]="!isEditMode"
    [class.text-warning]="isEditMode"></i>
  {{ isEditMode ? 'تعديل بيانات الطبيب' : 'إضافة طبيب جديد' }}
</h1>

@if (facade.hasError()) {
  <div class="alert alert-danger d-flex gap-2 align-items-center mb-4">
    <i class="bi bi-exclamation-circle-fill"></i>{{ facade.error() }}
    <button class="btn-close ms-auto" (click)="facade.clearError()"></button>
  </div>
}

<form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>

  <!-- Personal Info -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-white py-3 border-bottom">
      <h6 class="mb-0 fw-bold"><i class="bi bi-person-fill text-primary me-2"></i>البيانات الشخصية</h6>
    </div>
    <div class="card-body p-4">
      <div class="row g-3">
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">الاسم الأول <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="firstName"
            [class.is-invalid]="f['firstName'].invalid && f['firstName'].touched" />
          <div class="invalid-feedback">الاسم الأول مطلوب</div>
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">الاسم الأخير <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="lastName"
            [class.is-invalid]="f['lastName'].invalid && f['lastName'].touched" />
          <div class="invalid-feedback">الاسم الأخير مطلوب</div>
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">الهاتف <span class="text-danger">*</span></label>
          <input type="tel" class="form-control" formControlName="phone"
            [class.is-invalid]="f['phone'].invalid && f['phone'].touched" dir="ltr" />
          <div class="invalid-feedback">رقم هاتف صحيح مطلوب</div>
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">البريد الإلكتروني <span class="text-danger">*</span></label>
          <input type="email" class="form-control" formControlName="email"
            [class.is-invalid]="f['email'].invalid && f['email'].touched" dir="ltr" />
          <div class="invalid-feedback">بريد إلكتروني صحيح مطلوب</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Professional Info -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-white py-3 border-bottom">
      <h6 class="mb-0 fw-bold"><i class="bi bi-award text-warning me-2"></i>البيانات المهنية</h6>
    </div>
    <div class="card-body p-4">
      <div class="row g-3">
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">التخصص <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="specialization"
            [class.is-invalid]="f['specialization'].invalid && f['specialization'].touched"
            placeholder="القلب، الأعصاب، العظام..." />
          <div class="invalid-feedback">التخصص مطلوب</div>
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">التخصص الفرعي</label>
          <input type="text" class="form-control" formControlName="subSpecialization"
            placeholder="تخصص أدق اختياري" />
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">رقم الترخيص <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="licenseNumber"
            [class.is-invalid]="f['licenseNumber'].invalid && f['licenseNumber'].touched" dir="ltr" />
          <div class="invalid-feedback">رقم الترخيص مطلوب</div>
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">تاريخ انتهاء الترخيص <span class="text-danger">*</span></label>
          <input type="date" class="form-control" formControlName="licenseExpiryDate"
            [class.is-invalid]="f['licenseExpiryDate'].invalid && f['licenseExpiryDate'].touched" />
          <div class="invalid-feedback">تاريخ انتهاء الترخيص مطلوب</div>
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label fw-semibold">القسم <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="departmentName"
            [class.is-invalid]="f['departmentName'].invalid && f['departmentName'].touched"
            placeholder="اسم القسم" />
          <div class="invalid-feedback">القسم مطلوب</div>
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label fw-semibold">سنوات الخبرة <span class="text-danger">*</span></label>
          <input type="number" class="form-control" formControlName="yearsOfExperience" min="0" />
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label fw-semibold">رسوم الكشف (ج.م) <span class="text-danger">*</span></label>
          <input type="number" class="form-control" formControlName="consultationFee" min="0" />
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">الحالة</label>
          <select class="form-select" formControlName="status">
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
            <option value="on-leave">إجازة</option>
          </select>
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">اللغات</label>
          <input type="text" class="form-control" formControlName="languages"
            placeholder="عربي، English (مفصولة بفاصلة)" />
        </div>
      </div>
    </div>
  </div>

  <!-- Schedule -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-white py-3 border-bottom">
      <h6 class="mb-0 fw-bold"><i class="bi bi-clock text-info me-2"></i>جدول العمل</h6>
    </div>
    <div class="card-body p-4">
      <div class="row g-3">
        <div class="col-12">
          <label class="form-label fw-semibold">أيام العمل <span class="text-danger">*</span></label>
          <div class="d-flex flex-wrap gap-2">
            @for (day of allDays; track day) {
              <button type="button"
                class="btn btn-sm"
                [class.btn-primary]="selectedDays.has(day)"
                [class.btn-outline-secondary]="!selectedDays.has(day)"
                (click)="toggleDay(day)">
                {{ dayLabels[day] }}
              </button>
            }
          </div>
          @if (form.touched && selectedDays.size === 0) {
            <div class="text-danger small mt-1">يرجى اختيار يوم عمل واحد على الأقل</div>
          }
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">بداية الدوام <span class="text-danger">*</span></label>
          <input type="time" class="form-control" formControlName="shiftStart" />
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">نهاية الدوام <span class="text-danger">*</span></label>
          <input type="time" class="form-control" formControlName="shiftEnd" />
        </div>
        <div class="col-12">
          <label class="form-label fw-semibold">نبذة مختصرة</label>
          <textarea class="form-control" formControlName="bio" rows="3"
            placeholder="نبذة عن الطبيب وخبراته..."></textarea>
        </div>
      </div>
    </div>
  </div>

  <!-- Actions -->
  <div class="d-flex gap-3 justify-content-end">
    <button type="button" class="btn btn-outline-secondary px-4" (click)="onCancel()">إلغاء</button>
    <button type="submit" class="btn btn-primary px-4" [disabled]="facade.isSaving()">
      @if (facade.isSaving()) {
        <span class="spinner-border spinner-border-sm me-2"></span>جاري الحفظ...
      } @else {
        <i class="bi bi-check-lg me-2"></i>{{ isEditMode ? 'حفظ التعديلات' : 'إضافة الطبيب' }}
      }
    </button>
  </div>

</form>
```

### SCSS

```scss

```


================================================================================
## src\app\features\doctors\presentation\pages\doctor-list-page\doctor-list-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DoctorsFacade } from '../../../application/facades/doctors.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { DoctorCardComponent } from '../../components/doctor-card/doctor-card.component';
import { DoctorFilterComponent } from '../../components/doctor-filter/doctor-filter.component';
import { DoctorFilter } from '../../../domain/models/doctor-filter.model';

@Component({
  selector: 'hms-doctor-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, DoctorCardComponent, DoctorFilterComponent],
  templateUrl: './doctor-list-page.component.html',
  styleUrl: './doctor-list-page.component.scss',
})
export class DoctorListPageComponent implements OnInit {
  readonly facade = inject(DoctorsFacade);
  private readonly layout = inject(LayoutService);

  ngOnInit(): void {
    this.layout.setPageTitle('Doctors', 'الأطباء');
    this.facade.loadAll();
  }

  onFilterChanged(filter: Partial<DoctorFilter>): void {
    this.facade.applyFilter({ ...this.facade.filter(), ...filter, page: 1 });
  }

  onFilterReset(): void { this.facade.loadAll(); }

  onDelete(id: string): void {
    if (!confirm('هل أنت متأكد من حذف هذا الطبيب؟')) return;
    this.facade.delete(id).subscribe();
  }

  onPageChange(page: number): void { this.facade.changePage(page); }

  get pages(): number[] {
    return Array.from({ length: this.facade.totalPages() }, (_, i) => i + 1);
  }
}
```

### HTML

```html
<div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
  <div>
    <h1 class="h4 fw-bold mb-0">الأطباء</h1>
    @if (!facade.isLoading()) {
      <p class="text-muted small mb-0">إجمالي: {{ facade.totalDoctors() | number }} طبيب</p>
    }
  </div>
  <a routerLink="/doctors/new" class="btn btn-primary">
    <i class="bi bi-person-plus-fill me-2"></i>إضافة طبيب جديد
  </a>
</div>

<hms-doctor-filter (filterChanged)="onFilterChanged($event)" (filterReset)="onFilterReset()" />

@if (facade.hasError()) {
  <div class="alert alert-danger d-flex align-items-center gap-2 mb-4">
    <i class="bi bi-exclamation-circle-fill"></i>{{ facade.error() }}
    <button class="btn btn-sm btn-danger ms-auto" (click)="facade.loadAll()">إعادة المحاولة</button>
  </div>
}

@if (facade.isLoading()) {
  <div class="row g-3">
    @for (i of [1,2,3,4,6,8,9,12]; track i) {
      <div class="col-12 col-md-6 col-xl-4 col-xxl-3">
        <div class="card border-0 shadow-sm p-3">
          <div class="d-flex gap-3 mb-3">
            <span class="placeholder rounded-circle flex-shrink-0" style="width:56px;height:56px;"></span>
            <div class="placeholder-glow flex-grow-1">
              <span class="placeholder col-7 d-block mb-1 rounded"></span>
              <span class="placeholder col-5 d-block mb-1 rounded"></span>
              <span class="placeholder col-4 rounded"></span>
            </div>
          </div>
          <div class="placeholder-glow">
            <span class="placeholder col-12 rounded mb-2" style="height:48px;"></span>
            <span class="placeholder col-12 rounded" style="height:32px;"></span>
          </div>
        </div>
      </div>
    }
  </div>
} @else if (!facade.hasDoctors()) {
  <div class="text-center py-5">
    <i class="bi bi-person-badge fs-1 text-muted d-block mb-3"></i>
    <h5 class="fw-bold text-muted">لا يوجد أطباء</h5>
    <p class="text-muted small mb-4">لم يتم العثور على أطباء مطابقين للبحث</p>
    <a routerLink="/doctors/new" class="btn btn-primary">
      <i class="bi bi-person-plus me-2"></i>إضافة أول طبيب
    </a>
  </div>
} @else {
  <div class="row g-3 mb-4">
    @for (doctor of facade.doctors().items; track doctor.id) {
      <div class="col-12 col-md-6 col-xl-4 col-xxl-3">
        <hms-doctor-card [doctor]="doctor" (deleted)="onDelete($event)" />
      </div>
    }
  </div>
  @if (facade.totalPages() > 1) {
    <nav>
      <ul class="pagination justify-content-center">
        <li class="page-item" [class.disabled]="facade.currentPage() === 1">
          <button class="page-link" (click)="onPageChange(facade.currentPage() - 1)">
            <i class="bi bi-chevron-right"></i>
          </button>
        </li>
        @for (p of pages; track p) {
          <li class="page-item" [class.active]="p === facade.currentPage()">
            <button class="page-link" (click)="onPageChange(p)">{{ p }}</button>
          </li>
        }
        <li class="page-item" [class.disabled]="facade.currentPage() === facade.totalPages()">
          <button class="page-link" (click)="onPageChange(facade.currentPage() + 1)">
            <i class="bi bi-chevron-left"></i>
          </button>
        </li>
      </ul>
    </nav>
  }
}
```

### SCSS

```scss

```


================================================================================
## src\app\features\doctors\presentation\pages\doctor-schedule-page\doctor-schedule-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DoctorsFacade } from '../../../application/facades/doctors.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';

@Component({
  selector: 'hms-doctor-schedule-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './doctor-schedule-page.component.html',
  styleUrl: './doctor-schedule-page.component.scss',
})
export class DoctorSchedulePageComponent implements OnInit {
  readonly facade = inject(DoctorsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);

  doctorId = '';
  selectedDate = signal(new Date().toISOString().split('T')[0]);

  ngOnInit(): void {
    this.doctorId = this.route.snapshot.paramMap.get('id')!;
    this.facade.loadById(this.doctorId);
    this.loadSchedule();
    this.layout.setPageTitle('Doctor Schedule', 'جدول الطبيب');
  }

  loadSchedule(): void {
    this.facade.loadSchedule(this.doctorId, this.selectedDate());
  }

  onDateChange(date: string): void {
    this.selectedDate.set(date);
    this.loadSchedule();
  }

  prevDay(): void {
    const d = new Date(this.selectedDate());
    d.setDate(d.getDate() - 1);
    this.onDateChange(d.toISOString().split('T')[0]);
  }

  nextDay(): void {
    const d = new Date(this.selectedDate());
    d.setDate(d.getDate() + 1);
    this.onDateChange(d.toISOString().split('T')[0]);
  }
}
```

### HTML

```html
<nav aria-label="breadcrumb" class="mb-3">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a routerLink="/doctors" class="text-decoration-none">الأطباء</a></li>
    <li class="breadcrumb-item">
      <a [routerLink]="['/doctors', doctorId]" class="text-decoration-none">
        {{ facade.selectedDoctor()?.fullName ?? '...' }}
      </a>
    </li>
    <li class="breadcrumb-item active">الجدول</li>
  </ol>
</nav>

<div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
  <h1 class="h4 fw-bold mb-0">
    <i class="bi bi-calendar3 text-info me-2"></i>
    جدول د. {{ facade.selectedDoctor()?.fullName }}
  </h1>
  <a [routerLink]="['/appointments/new']"
    [queryParams]="{ doctorId: doctorId }"
    class="btn btn-primary btn-sm">
    <i class="bi bi-calendar-plus me-1"></i> موعد جديد
  </a>
</div>

<!-- Date Navigation -->
<div class="card border-0 shadow-sm mb-4">
  <div class="card-body p-3">
    <div class="d-flex align-items-center gap-3 justify-content-center">
      <button class="btn btn-sm btn-outline-secondary" (click)="prevDay()">
        <i class="bi bi-chevron-right"></i>
      </button>
      <div class="text-center">
        <input type="date" class="form-control form-control-sm text-center fw-semibold"
          [value]="selectedDate()"
          (change)="onDateChange($any($event.target).value)"
          style="max-width: 180px;" />
      </div>
      <button class="btn btn-sm btn-outline-secondary" (click)="nextDay()">
        <i class="bi bi-chevron-left"></i>
      </button>
    </div>
  </div>
</div>

<!-- Schedule Slots -->
@if (facade.isScheduleLoading()) {
  <div class="row g-2">
    @for (i of [1,2,3,4,5,6,8]; track i) {
      <div class="col-6 col-md-4 col-lg-3">
        <div class="card border-0 shadow-sm p-3 placeholder-glow">
          <span class="placeholder col-8 d-block mb-1 rounded"></span>
          <span class="placeholder col-5 rounded"></span>
        </div>
      </div>
    }
  </div>
} @else if (!facade.schedule()?.slots?.length) {
  <div class="text-center py-5 text-muted">
    <i class="bi bi-calendar-x fs-2 d-block mb-2"></i>
    <p class="small">لا توجد مواعيد في هذا اليوم</p>
  </div>
} @else {
  <div class="row g-2">
    @for (slot of facade.schedule()!.slots; track slot.id) {
      <div class="col-6 col-md-4 col-lg-3">
        <div class="card border-0 shadow-sm h-100"
          [class.border-success]="!slot.isBooked"
          [class.border-danger]="slot.isBooked"
          [class.opacity-75]="slot.isBooked">
          <div class="card-body p-3">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="fw-bold small" dir="ltr">{{ slot.startTime }} – {{ slot.endTime }}</span>
              <span class="badge rounded-pill"
                [class.bg-success-subtle]="!slot.isBooked"
                [class.text-success]="!slot.isBooked"
                [class.bg-danger-subtle]="slot.isBooked"
                [class.text-danger]="slot.isBooked"
                style="font-size: 0.65rem;">
                {{ slot.isBooked ? 'محجوز' : 'متاح' }}
              </span>
            </div>
            @if (slot.isBooked && slot.patientName) {
              <div class="small text-truncate">
                <i class="bi bi-person-fill text-muted me-1"></i>
                <a [routerLink]="['/appointments', slot.appointmentId]"
                  class="text-decoration-none text-dark">
                  {{ slot.patientName }}
                </a>
              </div>
            } @else if (!slot.isBooked) {
              <a [routerLink]="['/appointments/new']"
                [queryParams]="{ doctorId: doctorId, date: selectedDate(), slotId: slot.id }"
                class="btn btn-sm btn-outline-success w-100 mt-1">
                <i class="bi bi-plus me-1"></i> حجز
              </a>
            }
          </div>
        </div>
      </div>
    }
  </div>
}
```

### SCSS

```scss

```


================================================================================
## src\app\features\emergency-cases\presentation\components\emergency-case-card\emergency-case-card.component
================================================================================

### TypeScript

```typescript
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmergencyCaseModel, TRIAGE_CONFIG, EMERGENCY_STATUS_CONFIG } from '../../../domain/models/emergency-case.model';

@Component({
  selector: 'hms-emergency-case-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './emergency-case-card.component.html',
  styleUrl: './emergency-case-card.component.scss',
})
export class EmergencyCaseCardComponent {
  readonly case = input.required<EmergencyCaseModel>();
  readonly assigned = output<string>();
  readonly closed = output<string>();

  readonly triageConfig = TRIAGE_CONFIG;
  readonly statusConfig = EMERGENCY_STATUS_CONFIG;

  getWaitingTime(): string {
    const diff = Date.now() - new Date(this.case().arrivedAt).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} دقيقة`;
    return `${Math.floor(mins / 60)} ساعة ${mins % 60} دقيقة`;
  }

  onAssign(e: Event): void { e.preventDefault(); this.assigned.emit(this.case().id); }
  onClose(e: Event): void { e.preventDefault(); this.closed.emit(this.case().id); }

  isActive(): boolean {
    return ['waiting', 'in-treatment', 'critical'].includes(this.case().status);
  }
}
```

### HTML

```html
<div class="card border-0 shadow-sm h-100 emergency-card"
  [class.border-start]="true"
  [class.border-4]="true"
  [style.border-color]="triageConfig[case().triageLevel].color + ' !important'">
  <div class="card-body p-3">

    <!-- Header: Triage + Status -->
    <div class="d-flex align-items-start gap-2 mb-3">
      <div class="rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
        [ngClass]="[triageConfig[case().triageLevel].bgClass, triageConfig[case().triageLevel].textClass]"
        style="width: 40px; height: 40px; font-size: 1.1rem;">
        {{ case().triageLevel }}
      </div>
      <div class="flex-grow-1 min-w-0">
        <div class="small fw-semibold">{{ triageConfig[case().triageLevel].label }}</div>
        <div class="text-muted" style="font-size: 0.72rem;">
          انتظار أقصاه: {{ triageConfig[case().triageLevel].waitTime }}
        </div>
      </div>
      <span class="badge rounded-pill small flex-shrink-0"
        [ngClass]="statusConfig[case().status]?.class ?? 'bg-secondary-subtle text-secondary'">
        {{ statusConfig[case().status]?.label ?? case().status }}
      </span>
    </div>

    <!-- Patient Info -->
    <div class="mb-2">
      <div class="fw-semibold small text-truncate">{{ case().patientName }}</div>
      @if (case().patientAge) {
        <div class="text-muted" style="font-size:0.75rem;">
          {{ case().patientAge }} سنة
          @if (case().patientPhone) { • <span dir="ltr">{{ case().patientPhone }}</span> }
        </div>
      }
    </div>

    <!-- Complaint -->
    <p class="small text-muted mb-2 text-truncate">
      <i class="bi bi-chat-text me-1"></i>{{ case().chiefComplaint }}
    </p>

    <!-- Doctor & Timing -->
    <div class="small mb-3">
      @if (case().assignedDoctorName) {
        <div class="text-success d-flex align-items-center gap-1 mb-1">
          <i class="bi bi-person-badge-fill"></i>
          <span class="text-truncate">د. {{ case().assignedDoctorName }}</span>
        </div>
      } @else {
        <div class="text-danger d-flex align-items-center gap-1 mb-1">
          <i class="bi bi-person-x"></i>
          <span>لم يتعين طبيب</span>
        </div>
      }
      <div class="text-muted d-flex align-items-center gap-1">
        <i class="bi bi-clock"></i>
        <span>وقت الانتظار: {{ getWaitingTime() }}</span>
      </div>
    </div>

    <!-- Actions -->
    <div class="d-flex gap-1 pt-2 border-top">
      <a [routerLink]="['/emergency-cases', case().id]"
        class="btn btn-sm btn-outline-danger flex-grow-1">
        <i class="bi bi-eye me-1"></i>عرض
      </a>
      @if (isActive() && !case().assignedDoctorId) {
        <button type="button" class="btn btn-sm btn-outline-success" (click)="onAssign($event)" title="تعيين طبيب">
          <i class="bi bi-person-plus"></i>
        </button>
      }
      @if (isActive()) {
        <button type="button" class="btn btn-sm btn-outline-secondary" (click)="onClose($event)" title="إغلاق الحالة">
          <i class="bi bi-x-circle"></i>
        </button>
      }
    </div>

  </div>
</div>
```

### SCSS

```scss

```


================================================================================
## src\app\features\emergency-cases\presentation\components\emergency-case-form\emergency-case-form.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\emergency-cases\presentation\components\triage-board\triage-board.component
================================================================================

### TypeScript

```typescript
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmergencyCaseModel, TriageLevel, TRIAGE_CONFIG } from '../../../domain/models/emergency-case.model';

@Component({
  selector: 'hms-triage-board',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './triage-board.component.html',
  styleUrl: './triage-board.component.scss',
})
export class TriageBoardComponent {
  readonly casesByTriage = input.required<Record<TriageLevel, EmergencyCaseModel[]>>();
  readonly isLoading = input<boolean>(false);

  readonly triageConfig = TRIAGE_CONFIG;
  readonly levels: TriageLevel[] = [1, 2, 3, 4, 5];
}
```

### HTML

```html
<div class="row g-3">
  @for (level of levels; track level) {
    <div class="col-12 col-md-6 col-xxl">
      <div class="card border-0 shadow-sm h-100">

        <!-- Column Header -->
        <div class="card-header py-2 border-bottom d-flex align-items-center justify-content-between"
          [ngClass]="[triageConfig[level].bgClass, triageConfig[level].textClass]">
          <div class="d-flex align-items-center gap-2">
            <span class="fw-bold fs-5">{{ level }}</span>
            <div>
              <div class="fw-semibold small">{{ triageConfig[level].label }}</div>
              <div style="font-size: 0.68rem; opacity: 0.85;">{{ triageConfig[level].waitTime }}</div>
            </div>
          </div>
          <span class="badge bg-white text-dark rounded-pill">
            {{ (casesByTriage()[level]?.length) ?? 0 }}
          </span>
        </div>

        <!-- Cases -->
        <div class="card-body p-2" style="max-height: 500px; overflow-y: auto;">
          @if (isLoading()) {
            @for (i of [1,2]; track i) {
              <div class="card border-0 bg-light mb-2 p-2 placeholder-glow">
                <span class="placeholder col-8 d-block mb-1 rounded"></span>
                <span class="placeholder col-5 rounded"></span>
              </div>
            }
          } @else if (!((casesByTriage()[level]?.length) ?? 0)) {
            <div class="text-center py-4 text-muted">
              <i class="bi bi-check-circle d-block mb-1 fs-5 text-success"></i>
              <small>لا توجد حالات</small>
            </div>
          } @else {
            @for (c of casesByTriage()[level]; track c.id) {
              <a [routerLink]="['/emergency-cases', c.id]"
                class="card border-0 bg-light mb-2 p-2 text-decoration-none text-dark d-block triage-case-item">
                <div class="fw-semibold small text-truncate">{{ c.patientName }}</div>
                <div class="text-muted text-truncate" style="font-size:0.72rem;">{{ c.chiefComplaint }}</div>
                <div class="d-flex align-items-center justify-content-between mt-1">
                  @if (c.assignedDoctorName) {
                    <span class="text-success" style="font-size:0.7rem;">
                      <i class="bi bi-person-badge me-1"></i>{{ c.assignedDoctorName }}
                    </span>
                  } @else {
                    <span class="text-danger" style="font-size:0.7rem;">
                      <i class="bi bi-exclamation-circle me-1"></i>بدون طبيب
                    </span>
                  }
                  <span class="badge bg-white text-dark border" style="font-size:0.65rem;">
                    {{ c.status }}
                  </span>
                </div>
              </a>
            }
          }
        </div>

      </div>
    </div>
  }
</div>
```

### SCSS

```scss

```


================================================================================
## src\app\features\emergency-cases\presentation\pages\emergency-case-detail-page\emergency-case-detail-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { EmergencyCasesFacade } from '../../../application/facades/emergency-cases.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { TRIAGE_CONFIG, EMERGENCY_STATUS_CONFIG } from '../../../domain/models/emergency-case.model';

@Component({
  selector: 'hms-emergency-case-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './emergency-case-detail-page.component.html',
  styleUrl: './emergency-case-detail-page.component.scss',
})
export class EmergencyCaseDetailPageComponent implements OnInit, OnDestroy {
  readonly facade = inject(EmergencyCasesFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  readonly triageConfig = TRIAGE_CONFIG;
  readonly statusConfig = EMERGENCY_STATUS_CONFIG;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.facade.loadById(id);
    this.layout.setPageTitle('Emergency Detail', 'تفاصيل الحالة');
  }

  ngOnDestroy(): void { this.facade.clearSelected(); }

  onAssignDoctor(): void {
    const c = this.facade.selectedCase();
    if (!c) return;
    const doctorId = prompt('أدخل معرّف الطبيب:');
    if (doctorId) this.facade.assignDoctor(c.id, doctorId).subscribe();
  }

  onClose(): void {
    const c = this.facade.selectedCase();
    if (!c) return;
    const outcome = prompt('نتيجة الحالة:');
    if (outcome) this.facade.close(c.id, outcome).subscribe({ next: () => this.nav.goTo('/emergency-cases') });
  }

  onDelete(): void {
    const c = this.facade.selectedCase();
    if (!c || !confirm('هل أنت متأكد من حذف هذه الحالة؟')) return;
    this.facade.delete(c.id).subscribe({ next: () => this.nav.goTo('/emergency-cases') });
  }

  getWaitingTime(): string {
    const c = this.facade.selectedCase();
    if (!c) return '';
    const diff = Date.now() - new Date(c.arrivedAt).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} دقيقة`;
    return `${Math.floor(mins / 60)} ساعة ${mins % 60} دقيقة`;
  }
}
```

### HTML

```html
<nav aria-label="breadcrumb" class="mb-3">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a routerLink="/emergency-cases" class="text-decoration-none">الطوارئ</a></li>
    <li class="breadcrumb-item active">تفاصيل الحالة</li>
  </ol>
</nav>

@if (facade.isDetailLoading()) {
  <div class="text-center py-5"><div class="spinner-border text-danger" role="status"></div></div>
}

@if (facade.selectedCase(); as c) {
  <div class="card border-0 shadow-sm mb-4 border-start border-4"
    [style.border-color]="triageConfig[c.triageLevel].color + ' !important'">
    <div class="card-body p-4">
      <div class="d-flex align-items-start justify-content-between flex-wrap gap-3">
        <div class="d-flex align-items-start gap-3">
          <div class="rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
            [ngClass]="[triageConfig[c.triageLevel].bgClass, triageConfig[c.triageLevel].textClass]"
            style="width:56px;height:56px;font-size:1.4rem;">
            {{ c.triageLevel }}
          </div>
          <div>
            <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
              <h2 class="h5 fw-bold mb-0">{{ c.patientName }}</h2>
              <span class="badge rounded-pill" [ngClass]="statusConfig[c.status]?.class ?? 'bg-secondary-subtle text-secondary'">
                {{ statusConfig[c.status]?.label ?? c.status }}
              </span>
            </div>
            <div class="text-primary fw-semibold small mb-1">{{ triageConfig[c.triageLevel].label }}</div>
            <div class="text-muted small">
              وصل: {{ c.arrivedAt | date:'dd/MM/yyyy HH:mm' }} •
              وقت الانتظار: {{ getWaitingTime() }}
            </div>
          </div>
        </div>

        <div class="d-flex gap-2 flex-wrap">
          @if (!c.assignedDoctorId) {
            <button type="button" class="btn btn-sm btn-success" (click)="onAssignDoctor()">
              <i class="bi bi-person-plus me-1"></i>تعيين طبيب
            </button>
          }
          @if (['waiting','in-treatment','stable','critical'].includes(c.status)) {
            <button type="button" class="btn btn-sm btn-outline-secondary" (click)="onClose()">
              <i class="bi bi-x-circle me-1"></i>إغلاق الحالة
            </button>
          }
          <a [routerLink]="['/emergency-cases', c.id, 'edit']" class="btn btn-sm btn-outline-warning">
            <i class="bi bi-pencil me-1"></i>تعديل
          </a>
          <button type="button" class="btn btn-sm btn-outline-danger" (click)="onDelete()">
            <i class="bi bi-trash me-1"></i>حذف
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="row g-4">
    <div class="col-12 col-lg-6">
      <div class="card border-0 shadow-sm h-100">
        <div class="card-header bg-white border-bottom py-3">
          <h6 class="mb-0 fw-bold"><i class="bi bi-person text-primary me-2"></i>بيانات المريض</h6>
        </div>
        <div class="card-body">
          <dl class="row small mb-0">
            <dt class="col-5 text-muted fw-normal">الاسم</dt>
            <dd class="col-7 fw-semibold">{{ c.patientName }}</dd>
            <dt class="col-5 text-muted fw-normal">العمر</dt>
            <dd class="col-7">{{ c.patientAge ? c.patientAge + ' سنة' : '—' }}</dd>
            <dt class="col-5 text-muted fw-normal">الجنس</dt>
            <dd class="col-7">{{ c.patientGender === 'male' ? 'ذكر' : c.patientGender === 'female' ? 'أنثى' : '—' }}</dd>
            <dt class="col-5 text-muted fw-normal">الهاتف</dt>
            <dd class="col-7" dir="ltr">{{ c.patientPhone ?? '—' }}</dd>
            <dt class="col-5 text-muted fw-normal">رقم الهوية</dt>
            <dd class="col-7" dir="ltr">{{ c.nationalId ?? '—' }}</dd>
          </dl>
        </div>
      </div>
    </div>

    <div class="col-12 col-lg-6">
      <div class="card border-0 shadow-sm h-100">
        <div class="card-header bg-white border-bottom py-3">
          <h6 class="mb-0 fw-bold"><i class="bi bi-file-medical text-danger me-2"></i>المعلومات الطبية</h6>
        </div>
        <div class="card-body">
          <p class="small mb-2"><span class="text-muted">الشكوى الرئيسية:</span> {{ c.chiefComplaint }}</p>
          @if (c.symptoms?.length) {
            <p class="small mb-2 text-muted">الأعراض:</p>
            <div class="d-flex flex-wrap gap-1 mb-2">
              @for (s of c.symptoms; track s) {
                <span class="badge bg-warning-subtle text-warning rounded-pill">{{ s }}</span>
              }
            </div>
          }
          @if (c.assignedDoctorName) {
            <p class="small mb-0 text-success">
              <i class="bi bi-person-badge-fill me-1"></i>
              الطبيب المعالج: د. {{ c.assignedDoctorName }}
            </p>
          }
          @if (c.assignedBed) {
            <p class="small mb-0 mt-1 text-info">
              <i class="bi bi-hospital me-1"></i>السرير: {{ c.assignedBed }}
            </p>
          }
          @if (c.diagnosis) {
            <hr class="my-2">
            <p class="small mb-0"><span class="text-muted">التشخيص:</span> {{ c.diagnosis }}</p>
          }
          @if (c.notes) {
            <p class="small mb-0 mt-1"><span class="text-muted">ملاحظات:</span> {{ c.notes }}</p>
          }
        </div>
      </div>
    </div>

    <!-- Vital Signs -->
    @if (c.vitalSigns) {
      <div class="col-12">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white border-bottom py-3">
            <h6 class="mb-0 fw-bold"><i class="bi bi-heart-pulse text-danger me-2"></i>العلامات الحيوية</h6>
          </div>
          <div class="card-body">
            <div class="row g-3 text-center">
              @if (c.vitalSigns.temperature) {
                <div class="col-6 col-md-3">
                  <div class="bg-danger-subtle rounded p-2">
                    <div class="fw-bold text-danger">{{ c.vitalSigns.temperature }}°</div>
                    <div class="text-muted small">الحرارة</div>
                  </div>
                </div>
              }
              @if (c.vitalSigns.heartRate) {
                <div class="col-6 col-md-3">
                  <div class="bg-primary-subtle rounded p-2">
                    <div class="fw-bold text-primary">{{ c.vitalSigns.heartRate }} bpm</div>
                    <div class="text-muted small">النبض</div>
                  </div>
                </div>
              }
              @if (c.vitalSigns.oxygenSaturation) {
                <div class="col-6 col-md-3">
                  <div class="bg-info-subtle rounded p-2">
                    <div class="fw-bold text-info">{{ c.vitalSigns.oxygenSaturation }}%</div>
                    <div class="text-muted small">تشبع الأكسجين</div>
                  </div>
                </div>
              }
              @if (c.vitalSigns.bloodPressureSystolic) {
                <div class="col-6 col-md-3">
                  <div class="bg-warning-subtle rounded p-2">
                    <div class="fw-bold text-warning" dir="ltr">
                      {{ c.vitalSigns.bloodPressureSystolic }}/{{ c.vitalSigns.bloodPressureDiastolic }}
                    </div>
                    <div class="text-muted small">ضغط الدم</div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    }

  </div>
}
```

### SCSS

```scss

```


================================================================================
## src\app\features\emergency-cases\presentation\pages\emergency-case-form-page\emergency-case-form-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EmergencyCasesFacade } from '../../../application/facades/emergency-cases.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { TRIAGE_CONFIG, TriageLevel } from '../../../domain/models/emergency-case.model';
import { CreateEmergencyCaseRequest } from '../../../domain/repositories/emergency-case.repository';

@Component({
  selector: 'hms-emergency-case-form-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './emergency-case-form-page.component.html',
  styleUrl: './emergency-case-form-page.component.scss',
})
export class EmergencyCaseFormPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly facade = inject(EmergencyCasesFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  readonly triageConfig = TRIAGE_CONFIG;
  readonly triageLevels: TriageLevel[] = [1, 2, 3, 4, 5];
  caseId: string | null = null;

  form = this.fb.group({
    patientName:   ['', [Validators.required, Validators.minLength(3)]],
    patientAge:    [null as number | null],
    patientGender: [''],
    patientPhone:  [''],
    nationalId:    [''],
    triageLevel:   [3 as TriageLevel, Validators.required],
    chiefComplaint:['', [Validators.required, Validators.minLength(5)]],
    symptoms:      [''],
    temperature:   [null as number | null],
    heartRate:     [null as number | null],
    oxygenSaturation: [null as number | null],
    bloodPressureSystolic:  [null as number | null],
    bloodPressureDiastolic: [null as number | null],
    notes:         [''],
  });

  get f() { return this.form.controls; }
  get isEdit(): boolean { return !!this.caseId; }

  ngOnInit(): void {
    this.caseId = this.route.snapshot.paramMap.get('id');
    if (this.isEdit) {
      this.facade.loadById(this.caseId!);
      this.layout.setPageTitle('Edit Emergency Case', 'تعديل حالة الطوارئ');
    } else {
      this.layout.setPageTitle('New Emergency Case', 'تسجيل حالة طوارئ جديدة');
    }
  }

  setTriageLevel(level: TriageLevel): void {
    this.form.patchValue({ triageLevel: level });
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.getRawValue();
    const request: CreateEmergencyCaseRequest = {
      patientName:    v.patientName!,
      patientAge:     v.patientAge ?? undefined,
      patientGender:  v.patientGender || undefined,
      patientPhone:   v.patientPhone || undefined,
      nationalId:     v.nationalId || undefined,
      triageLevel:    v.triageLevel!,
      chiefComplaint: v.chiefComplaint!,
      symptoms:       v.symptoms ? v.symptoms.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
      vitalSigns: {
        temperature:              v.temperature ?? undefined,
        heartRate:                v.heartRate ?? undefined,
        oxygenSaturation:         v.oxygenSaturation ?? undefined,
        bloodPressureSystolic:    v.bloodPressureSystolic ?? undefined,
        bloodPressureDiastolic:   v.bloodPressureDiastolic ?? undefined,
      },
      notes: v.notes || undefined,
    };

    const action$ = this.isEdit
      ? this.facade.update(this.caseId!, request)
      : this.facade.create(request);
    action$.subscribe({ next: (c) => this.nav.goTo(`/emergency-cases/${c.id}`) });
  }

  onCancel(): void {
    this.isEdit ? this.nav.goTo(`/emergency-cases/${this.caseId}`) : this.nav.goTo('/emergency-cases');
  }
}
```

### HTML

```html
<nav aria-label="breadcrumb" class="mb-3">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a routerLink="/emergency-cases" class="text-decoration-none">الطوارئ</a></li>
    <li class="breadcrumb-item active">{{ isEdit ? 'تعديل الحالة' : 'حالة جديدة' }}</li>
  </ol>
</nav>

<h1 class="h4 fw-bold mb-4">
  <i class="bi bi-plus-circle-fill text-danger me-2"></i>
  {{ isEdit ? 'تعديل حالة الطوارئ' : 'تسجيل حالة طوارئ جديدة' }}
</h1>

<form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>

  <!-- Triage Level - Most Important -->
  <div class="card border-0 shadow-sm mb-4 border-top border-4 border-danger">
    <div class="card-header bg-white py-3 border-bottom">
      <h6 class="mb-0 fw-bold"><i class="bi bi-shield-exclamation text-danger me-2"></i>مستوى الخطورة (Triage) <span class="text-danger">*</span></h6>
    </div>
    <div class="card-body p-4">
      <div class="row g-2">
        @for (level of triageLevels; track level) {
          <div class="col">
            <button type="button"
              class="btn w-100 py-3 d-flex flex-column align-items-center gap-1"
              [ngClass]="f['triageLevel'].value === level
                ? [triageConfig[level].bgClass, triageConfig[level].textClass]
                : 'btn-outline-secondary'"
              (click)="setTriageLevel(level)">
              <span class="fw-bold fs-4">{{ level }}</span>
              <span style="font-size: 0.7rem;" class="text-center">{{ triageConfig[level].label }}</span>
              <span style="font-size: 0.65rem;" class="opacity-75">{{ triageConfig[level].waitTime }}</span>
            </button>
          </div>
        }
      </div>
    </div>
  </div>

  <!-- Patient Info -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-white py-3 border-bottom">
      <h6 class="mb-0 fw-bold"><i class="bi bi-person-fill text-primary me-2"></i>بيانات المريض</h6>
    </div>
    <div class="card-body p-4">
      <div class="row g-3">
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">اسم المريض <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="patientName"
            [class.is-invalid]="f['patientName'].invalid && f['patientName'].touched"
            placeholder="اسم المريض كاملاً" />
          <div class="invalid-feedback">اسم المريض مطلوب</div>
        </div>
        <div class="col-6 col-md-3">
          <label class="form-label fw-semibold">العمر</label>
          <input type="number" class="form-control" formControlName="patientAge" min="0" max="150" placeholder="بالسنوات" />
        </div>
        <div class="col-6 col-md-3">
          <label class="form-label fw-semibold">الجنس</label>
          <select class="form-select" formControlName="patientGender">
            <option value="">غير محدد</option>
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </select>
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">رقم الهاتف</label>
          <input type="tel" class="form-control" formControlName="patientPhone" dir="ltr" />
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">رقم الهوية</label>
          <input type="text" class="form-control" formControlName="nationalId" dir="ltr" />
        </div>
      </div>
    </div>
  </div>

  <!-- Medical Info -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-white py-3 border-bottom">
      <h6 class="mb-0 fw-bold"><i class="bi bi-file-medical text-warning me-2"></i>المعلومات الطبية</h6>
    </div>
    <div class="card-body p-4">
      <div class="row g-3">
        <div class="col-12">
          <label class="form-label fw-semibold">الشكوى الرئيسية <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="chiefComplaint"
            [class.is-invalid]="f['chiefComplaint'].invalid && f['chiefComplaint'].touched"
            placeholder="وصف موجز للشكوى الطبية الرئيسية" />
          <div class="invalid-feedback">الشكوى الرئيسية مطلوبة</div>
        </div>
        <div class="col-12">
          <label class="form-label fw-semibold">الأعراض</label>
          <input type="text" class="form-control" formControlName="symptoms"
            placeholder="مفصولة بفاصلة: صداع، ألم صدر، ضيق تنفس..." />
        </div>
        <div class="col-12">
          <label class="form-label fw-semibold">ملاحظات إضافية</label>
          <textarea class="form-control" formControlName="notes" rows="2" placeholder="أي معلومات إضافية مهمة..."></textarea>
        </div>
      </div>
    </div>
  </div>

  <!-- Vital Signs -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-white py-3 border-bottom">
      <h6 class="mb-0 fw-bold"><i class="bi bi-heart-pulse text-danger me-2"></i>العلامات الحيوية</h6>
    </div>
    <div class="card-body p-4">
      <div class="row g-3">
        <div class="col-6 col-md-3">
          <label class="form-label small fw-semibold">الحرارة (°م)</label>
          <input type="number" class="form-control" formControlName="temperature" step="0.1" placeholder="36.5" />
        </div>
        <div class="col-6 col-md-3">
          <label class="form-label small fw-semibold">النبض (bpm)</label>
          <input type="number" class="form-control" formControlName="heartRate" placeholder="80" />
        </div>
        <div class="col-6 col-md-3">
          <label class="form-label small fw-semibold">تشبع الأكسجين (%)</label>
          <input type="number" class="form-control" formControlName="oxygenSaturation" min="0" max="100" placeholder="98" />
        </div>
        <div class="col-6 col-md-3">
          <label class="form-label small fw-semibold">ضغط الدم</label>
          <div class="input-group">
            <input type="number" class="form-control" formControlName="bloodPressureSystolic" placeholder="120" />
            <span class="input-group-text">/</span>
            <input type="number" class="form-control" formControlName="bloodPressureDiastolic" placeholder="80" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="d-flex gap-3 justify-content-end">
    <button type="button" class="btn btn-outline-secondary px-4" (click)="onCancel()">إلغاء</button>
    <button type="submit" class="btn btn-danger px-4" [disabled]="facade.isSaving()">
      @if (facade.isSaving()) {
        <span class="spinner-border spinner-border-sm me-2"></span>جاري الحفظ...
      } @else {
        <i class="bi bi-check-lg me-2"></i>{{ isEdit ? 'حفظ التعديلات' : 'تسجيل الحالة' }}
      }
    </button>
  </div>

</form>
```

### SCSS

```scss

```


================================================================================
## src\app\features\emergency-cases\presentation\pages\emergency-case-list-page\emergency-case-list-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmergencyCasesFacade } from '../../../application/facades/emergency-cases.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { EmergencyCaseCardComponent } from '../../components/emergency-case-card/emergency-case-card.component';
import { TriageBoardComponent } from '../../components/triage-board/triage-board.component';
import { EmergencyFilter } from '../../../domain/models/emergency-filter.model';

@Component({
  selector: 'hms-emergency-case-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, EmergencyCaseCardComponent, TriageBoardComponent],
  templateUrl: './emergency-case-list-page.component.html',
  styleUrl: './emergency-case-list-page.component.scss',
})
export class EmergencyCaseListPageComponent implements OnInit {
  readonly facade = inject(EmergencyCasesFacade);
  private readonly layout = inject(LayoutService);

  readonly viewMode = signal<'list' | 'board'>('board');

  ngOnInit(): void {
    this.layout.setPageTitle('Emergency Cases', 'حالات الطوارئ');
    this.facade.loadAll();
  }

  onAssignDoctor(id: string): void {
    const doctorId = prompt('أدخل معرّف الطبيب:');
    if (doctorId) this.facade.assignDoctor(id, doctorId).subscribe();
  }

  onClose(id: string): void {
    const outcome = prompt('نتيجة الحالة (خرج/محوَّل/وفاة):');
    if (outcome) this.facade.close(id, outcome).subscribe();
  }

  onFilterChanged(filter: Partial<EmergencyFilter>): void {
    this.facade.applyFilter({ ...this.facade.filter(), ...filter, page: 1 });
  }

  onPageChange(page: number): void { this.facade.changePage(page); }

  get pages(): number[] {
    return Array.from({ length: this.facade.totalPages() }, (_, i) => i + 1);
  }
}
```

### HTML

```html
<div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
  <div>
    <h1 class="h4 fw-bold mb-0">
      <i class="bi bi-exclamation-triangle-fill text-danger me-2"></i>حالات الطوارئ
    </h1>
    @if (!facade.isLoading()) {
      <p class="text-muted small mb-0">
        إجمالي: {{ facade.totalCases() | number }} حالة •
        <span class="text-danger fw-semibold">{{ facade.activeCases().length }} نشطة</span>
      </p>
    }
  </div>
  <div class="d-flex gap-2">
    <!-- View Toggle -->
    <div class="btn-group btn-group-sm">
      <button type="button" class="btn"
        [class.btn-danger]="viewMode() === 'board'"
        [class.btn-outline-secondary]="viewMode() !== 'board'"
        (click)="viewMode.set('board')">
        <i class="bi bi-columns-gap me-1"></i>لوحة
      </button>
      <button type="button" class="btn"
        [class.btn-danger]="viewMode() === 'list'"
        [class.btn-outline-secondary]="viewMode() !== 'list'"
        (click)="viewMode.set('list')">
        <i class="bi bi-list-ul me-1"></i>قائمة
      </button>
    </div>
    <a routerLink="/emergency-cases/new" class="btn btn-sm btn-danger">
      <i class="bi bi-plus-circle-fill me-1"></i>حالة جديدة
    </a>
    <button class="btn btn-sm btn-outline-secondary" (click)="facade.loadAll()" title="تحديث">
      <i class="bi bi-arrow-clockwise"></i>
    </button>
  </div>
</div>

@if (facade.hasError()) {
  <div class="alert alert-danger d-flex gap-2 align-items-center mb-4">
    <i class="bi bi-exclamation-circle-fill"></i>{{ facade.error() }}
    <button class="btn btn-sm btn-danger ms-auto" (click)="facade.loadAll()">إعادة المحاولة</button>
  </div>
}

<!-- Board View (Triage) -->
@if (viewMode() === 'board') {
  <hms-triage-board
    [casesByTriage]="facade.casesByTriage()"
    [isLoading]="facade.isLoading()"
  />
}

<!-- List View -->
@if (viewMode() === 'list') {
  @if (facade.isLoading()) {
    <div class="row g-3">
      @for (i of [1,2,3,4,6]; track i) {
        <div class="col-12 col-md-6 col-xl-4">
          <div class="card border-0 shadow-sm p-3 placeholder-glow">
            <div class="d-flex gap-2 mb-2">
              <span class="placeholder rounded-circle flex-shrink-0" style="width:40px;height:40px;"></span>
              <div class="flex-grow-1">
                <span class="placeholder col-6 d-block mb-1 rounded"></span>
                <span class="placeholder col-4 rounded"></span>
              </div>
            </div>
            <span class="placeholder col-12 d-block mb-2 rounded"></span>
            <span class="placeholder col-12 rounded" style="height:32px;"></span>
          </div>
        </div>
      }
    </div>
  } @else if (!facade.hasCases()) {
    <div class="text-center py-5">
      <i class="bi bi-check-circle-fill fs-1 text-success d-block mb-3"></i>
      <h5 class="fw-bold text-muted">لا توجد حالات طوارئ نشطة</h5>
      <p class="text-muted small mb-4">الوضع تحت السيطرة</p>
      <a routerLink="/emergency-cases/new" class="btn btn-danger">
        <i class="bi bi-plus-circle me-2"></i>تسجيل حالة جديدة
      </a>
    </div>
  } @else {
    <div class="row g-3 mb-4">
      @for (c of facade.cases().items; track c.id) {
        <div class="col-12 col-md-6 col-xl-4">
          <hms-emergency-case-card
            [case]="c"
            (assigned)="onAssignDoctor($event)"
            (closed)="onClose($event)"
          />
        </div>
      }
    </div>
    @if (facade.totalPages() > 1) {
      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item" [class.disabled]="facade.currentPage() === 1">
            <button class="page-link" (click)="onPageChange(facade.currentPage() - 1)">
              <i class="bi bi-chevron-right"></i>
            </button>
          </li>
          @for (p of pages; track p) {
            <li class="page-item" [class.active]="p === facade.currentPage()">
              <button class="page-link" (click)="onPageChange(p)">{{ p }}</button>
            </li>
          }
          <li class="page-item" [class.disabled]="facade.currentPage() === facade.totalPages()">
            <button class="page-link" (click)="onPageChange(facade.currentPage() + 1)">
              <i class="bi bi-chevron-left"></i>
            </button>
          </li>
        </ul>
      </nav>
    }
  }
}
```

### SCSS

```scss

```


================================================================================
## src\app\features\lab-results\presentation\components\lab-result-form\lab-result-form.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\lab-results\presentation\components\lab-result-viewer\lab-result-viewer.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabResultModel, LAB_STATUS_CONFIG } from '../../../domain/models/lab-result.model';
import { LabTestTableComponent } from '../lab-test-table/lab-test-table.component';

@Component({
  selector: 'hms-lab-result-viewer',
  standalone: true,
  imports: [CommonModule, LabTestTableComponent],
  templateUrl: './lab-result-viewer.component.html',
  styleUrl: './lab-result-viewer.component.scss',
})
export class LabResultViewerComponent {
  readonly result = input.required<LabResultModel>();
  readonly statusConfig = LAB_STATUS_CONFIG;

  get abnormalCount(): number {
    return this.result().tests.filter((t) => t.isAbnormal).length;
  }
  get criticalCount(): number {
    return this.result().tests.filter((t) => t.isCritical).length;
  }
}
```

### HTML

```html
<div class="lab-result-viewer">

  <!-- Summary Row -->
  <div class="row g-2 mb-3">
    <div class="col-4">
      <div class="bg-light rounded p-2 text-center">
        <div class="fw-bold">{{ result().tests.length }}</div>
        <div class="text-muted" style="font-size:0.72rem;">إجمالي الاختبارات</div>
      </div>
    </div>
    <div class="col-4">
      <div class="rounded p-2 text-center"
        [class.bg-warning-subtle]="abnormalCount > 0"
        [class.bg-light]="abnormalCount === 0">
        <div class="fw-bold" [class.text-warning]="abnormalCount > 0">{{ abnormalCount }}</div>
        <div class="text-muted" style="font-size:0.72rem;">غير طبيعي</div>
      </div>
    </div>
    <div class="col-4">
      <div class="rounded p-2 text-center"
        [class.bg-danger-subtle]="criticalCount > 0"
        [class.bg-light]="criticalCount === 0">
        <div class="fw-bold" [class.text-danger]="criticalCount > 0">{{ criticalCount }}</div>
        <div class="text-muted" style="font-size:0.72rem;">حرج</div>
      </div>
    </div>
  </div>

  <!-- Status + Meta -->
  <div class="d-flex align-items-center gap-2 mb-3 flex-wrap">
    <span class="badge rounded-pill" [ngClass]="statusConfig[result().status]?.class ?? 'bg-secondary-subtle text-secondary'">
      <i class="bi me-1" [ngClass]="statusConfig[result().status]?.icon ?? 'bi-circle'"></i>
      {{ statusConfig[result().status]?.label ?? result().status }}
    </span>
    <span class="text-muted small">
      طُلب: {{ result().orderedAt | date:'dd/MM/yyyy HH:mm' }}
    </span>
    @if (result().completedAt) {
      <span class="text-muted small">
        • اكتمل: {{ result().completedAt | date:'dd/MM/yyyy HH:mm' }}
      </span>
    }
    @if (result().approvedBy) {
      <span class="text-success small">
        • اعتمده: {{ result().approvedBy }}
      </span>
    }
  </div>

  <!-- Attached File -->
  @if (result().fileUrl) {
    <div class="alert alert-info d-flex align-items-center gap-2 py-2 mb-3 small">
      <i class="bi bi-file-earmark-pdf text-danger fs-5"></i>
      <span>يوجد ملف PDF مرفق</span>
      <a [href]="result().fileUrl" target="_blank" class="btn btn-sm btn-outline-info ms-auto">
        <i class="bi bi-download me-1"></i>تحميل
      </a>
    </div>
  }

  <!-- Tests Table -->
  <hms-lab-test-table [tests]="result().tests" />

  @if (result().notes) {
    <div class="mt-3 p-3 bg-light rounded-3 small">
      <span class="text-muted">ملاحظات:</span> {{ result().notes }}
    </div>
  }

</div>
```

### SCSS

```scss

```


================================================================================
## src\app\features\lab-results\presentation\components\lab-test-table\lab-test-table.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabTestModel, LAB_CATEGORY_LABELS } from '../../../domain/models/lab-result.model';

@Component({
  selector: 'hms-lab-test-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lab-test-table.component.html',
  styleUrl: './lab-test-table.component.scss',
})
export class LabTestTableComponent {
  readonly tests = input<LabTestModel[]>([]);
  readonly isLoading = input<boolean>(false);

  readonly categoryLabels = LAB_CATEGORY_LABELS;

  getRowClass(test: LabTestModel): string {
    if (test.isCritical) return 'table-danger';
    if (test.isAbnormal) return 'table-warning';
    return '';
  }

  getValueDisplay(test: LabTestModel): string {
    if (!test.value) return '—';
    return test.unit ? `${test.value} ${test.unit}` : test.value;
  }

  getReferenceRange(test: LabTestModel): string {
    if (test.referenceText) return test.referenceText;
    if (test.referenceMin !== undefined && test.referenceMax !== undefined) {
      return `${test.referenceMin} – ${test.referenceMax} ${test.unit ?? ''}`.trim();
    }
    return '—';
  }
}
```

### HTML

```html
@if (isLoading()) {
  <div class="table-responsive">
    <table class="table table-sm mb-0">
      <thead class="table-light">
        <tr>
          <th>الاختبار</th><th>الفئة</th><th>النتيجة</th><th>المرجع</th><th>الحالة</th>
        </tr>
      </thead>
      <tbody>
        @for (i of [1,2,3,4,5]; track i) {
          <tr class="placeholder-glow">
            <td><span class="placeholder col-8 rounded"></span></td>
            <td><span class="placeholder col-6 rounded"></span></td>
            <td><span class="placeholder col-4 rounded"></span></td>
            <td><span class="placeholder col-6 rounded"></span></td>
            <td><span class="placeholder col-5 rounded"></span></td>
          </tr>
        }
      </tbody>
    </table>
  </div>
} @else if (tests().length === 0) {
  <div class="text-center py-4 text-muted">
    <i class="bi bi-thermometer fs-2 d-block mb-2"></i>
    <small>لا توجد اختبارات مسجلة</small>
  </div>
} @else {
  <div class="table-responsive">
    <table class="table table-sm table-hover mb-0 align-middle">
      <thead class="table-light">
        <tr>
          <th class="small fw-semibold">الاختبار</th>
          <th class="small fw-semibold">الفئة</th>
          <th class="small fw-semibold">النتيجة</th>
          <th class="small fw-semibold">النطاق المرجعي</th>
          <th class="small fw-semibold">الحالة</th>
          <th class="small fw-semibold">ملاحظات</th>
        </tr>
      </thead>
      <tbody>
        @for (test of tests(); track test.id) {
          <tr [ngClass]="getRowClass(test)">
            <td class="fw-semibold small">{{ test.name }}</td>
            <td>
              <span class="badge bg-light text-dark border small">
                {{ categoryLabels[test.category] }}
              </span>
            </td>
            <td class="small" dir="ltr">
              <span [class.fw-bold]="test.isAbnormal || test.isCritical">
                {{ getValueDisplay(test) }}
              </span>
            </td>
            <td class="small text-muted" dir="ltr">{{ getReferenceRange(test) }}</td>
            <td>
              @if (test.isCritical) {
                <span class="badge bg-danger small">
                  <i class="bi bi-exclamation-triangle-fill me-1"></i>حرج
                </span>
              } @else if (test.isAbnormal) {
                <span class="badge bg-warning text-dark small">
                  <i class="bi bi-exclamation-circle-fill me-1"></i>غير طبيعي
                </span>
              } @else {
                <span class="badge bg-success-subtle text-success small">
                  <i class="bi bi-check-circle-fill me-1"></i>طبيعي
                </span>
              }
            </td>
            <td class="small text-muted">{{ test.notes ?? '—' }}</td>
          </tr>
        }
      </tbody>
    </table>
  </div>
}
```

### SCSS

```scss

```


================================================================================
## src\app\features\lab-results\presentation\pages\lab-result-detail-page\lab-result-detail-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { LabResultsFacade } from '../../../application/facades/lab-results.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { LabResultViewerComponent } from '../../components/lab-result-viewer/lab-result-viewer.component';
import { LAB_STATUS_CONFIG } from '../../../domain/models/lab-result.model';

@Component({
  selector: 'hms-lab-result-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, LabResultViewerComponent],
  templateUrl: './lab-result-detail-page.component.html',
  styleUrl: './lab-result-detail-page.component.scss',
})
export class LabResultDetailPageComponent implements OnInit, OnDestroy {
  readonly facade = inject(LabResultsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);
  readonly statusConfig = LAB_STATUS_CONFIG;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.facade.loadById(id);
    this.layout.setPageTitle('Lab Result', 'نتيجة المختبر');
  }

  ngOnDestroy(): void { this.facade.clearSelected(); }

  onApprove(): void {
    const r = this.facade.selectedResult();
    if (r) this.facade.approve(r.id).subscribe();
  }

  onReject(): void {
    const r = this.facade.selectedResult();
    if (!r) return;
    const reason = prompt('سبب الرفض:');
    if (reason) this.facade.reject(r.id, reason).subscribe();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    const r = this.facade.selectedResult();
    if (file && r) this.facade.upload(r.id, file).subscribe();
  }

  onDelete(): void {
    const r = this.facade.selectedResult();
    if (!r || !confirm('هل أنت متأكد من حذف هذه النتيجة؟')) return;
    this.facade.delete(r.id).subscribe({ next: () => this.nav.goTo('/lab-results') });
  }
}
```

### HTML

```html
<nav aria-label="breadcrumb" class="mb-3">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a routerLink="/lab-results" class="text-decoration-none">نتائج المختبر</a></li>
    <li class="breadcrumb-item active">تفاصيل النتيجة</li>
  </ol>
</nav>

@if (facade.isDetailLoading()) {
  <div class="text-center py-5"><div class="spinner-border text-primary" role="status"></div></div>
}

@if (facade.selectedResult(); as result) {

  <!-- Header -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-body p-4">
      <div class="d-flex align-items-start justify-content-between flex-wrap gap-3">
        <div>
          <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
            <h2 class="h5 fw-bold mb-0">نتيجة #{{ result.resultNumber }}</h2>
            <span class="badge rounded-pill" [ngClass]="statusConfig[result.status]?.class ?? 'bg-secondary-subtle text-secondary'">
              <i class="bi me-1" [ngClass]="statusConfig[result.status]?.icon ?? 'bi-circle'"></i>
              {{ statusConfig[result.status]?.label ?? result.status }}
            </span>
          </div>
          <div class="text-muted small">
            <a [routerLink]="['/patients', result.patientId]" class="text-decoration-none fw-semibold">
              {{ result.patientName }}
            </a>
            &nbsp;|&nbsp; د. {{ result.doctorName }}
            &nbsp;|&nbsp; {{ result.orderedAt | date:'dd/MM/yyyy' }}
          </div>
        </div>

        <div class="d-flex gap-2 flex-wrap">
          @if (result.status === 'completed') {
            <button type="button" class="btn btn-sm btn-success" (click)="onApprove()">
              <i class="bi bi-patch-check me-1"></i>اعتماد
            </button>
            <button type="button" class="btn btn-sm btn-outline-warning" (click)="onReject()">
              <i class="bi bi-x-circle me-1"></i>رفض
            </button>
          }
          <label class="btn btn-sm btn-outline-primary" [class.disabled]="facade.isUploading()">
            @if (facade.isUploading()) {
              <span class="spinner-border spinner-border-sm me-1"></span>جاري الرفع...
            } @else {
              <i class="bi bi-upload me-1"></i>رفع PDF
            }
            <input type="file" class="d-none" accept=".pdf" (change)="onFileSelected($event)" />
          </label>
          <a [routerLink]="['/lab-results', result.id, 'edit']" class="btn btn-sm btn-outline-secondary">
            <i class="bi bi-pencil me-1"></i>تعديل
          </a>
          <button type="button" class="btn btn-sm btn-outline-danger" (click)="onDelete()">
            <i class="bi bi-trash me-1"></i>حذف
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Viewer -->
  <div class="card border-0 shadow-sm">
    <div class="card-header bg-white border-bottom py-3">
      <h6 class="mb-0 fw-bold">
        <i class="bi bi-thermometer text-primary me-2"></i>نتائج الاختبارات
      </h6>
    </div>
    <div class="card-body p-3">
      <hms-lab-result-viewer [result]="result" />
    </div>
  </div>

}
```

### SCSS

```scss

```


================================================================================
## src\app\features\lab-results\presentation\pages\lab-result-list-page\lab-result-list-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { LabResultsFacade } from '../../../application/facades/lab-results.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { LAB_STATUS_CONFIG } from '../../../domain/models/lab-result.model';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'hms-lab-result-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './lab-result-list-page.component.html',
  styleUrl: './lab-result-list-page.component.scss',
})
export class LabResultListPageComponent implements OnInit {
  readonly facade = inject(LabResultsFacade);
  private readonly layout = inject(LayoutService);
  private readonly fb = inject(FormBuilder);

  readonly statusConfig = LAB_STATUS_CONFIG;

  searchForm = this.fb.group({ search: [''], status: [''] });

  ngOnInit(): void {
    this.layout.setPageTitle('Lab Results', 'نتائج المختبر');
    this.facade.loadAll();
    this.searchForm.get('search')!.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.applyFilter());
    this.searchForm.valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.applyFilter());
  }

  applyFilter(): void {
    const v = this.searchForm.value;
    this.facade.applyFilter({
      ...this.facade.filter(),
      search: v.search ?? '',
      status: (v.status as any) || undefined,
      page: 1,
    });
  }

  onApprove(id: string): void { this.facade.approve(id).subscribe(); }

  onReject(id: string): void {
    const reason = prompt('سبب الرفض:');
    if (reason) this.facade.reject(id, reason).subscribe();
  }

  onDelete(id: string): void {
    if (!confirm('هل أنت متأكد من حذف هذه النتيجة؟')) return;
    this.facade.delete(id).subscribe();
  }

  onPageChange(page: number): void { this.facade.changePage(page); }
  get pages(): number[] {
    return Array.from({ length: this.facade.totalPages() }, (_, i) => i + 1);
  }

  hasCriticalTest(result: { tests: Array<{ isCritical: boolean }> }): boolean {
    return result.tests.some((t) => t.isCritical);
  }

  hasAbnormalTest(result: { tests: Array<{ isAbnormal: boolean }> }): boolean {
    return result.tests.some((t) => t.isAbnormal);
  }
}
```

### HTML

```html
<div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
  <div>
    <h1 class="h4 fw-bold mb-0">نتائج المختبر</h1>
    @if (!facade.isLoading() && facade.pendingCount() > 0) {
      <p class="text-warning small mb-0">
        <i class="bi bi-hourglass me-1"></i>{{ facade.pendingCount() }} نتيجة في الانتظار
      </p>
    }
  </div>
  <div class="d-flex gap-2">
    <a routerLink="/lab-results/upload" class="btn btn-sm btn-outline-primary">
      <i class="bi bi-upload me-1"></i>رفع نتيجة
    </a>
    <a routerLink="/lab-results/new" class="btn btn-primary btn-sm">
      <i class="bi bi-plus-circle-fill me-1"></i>طلب اختبار جديد
    </a>
  </div>
</div>

<!-- Filter -->
<div class="card border-0 shadow-sm mb-4">
  <div class="card-body p-3">
    <div [formGroup]="searchForm" class="row g-2 align-items-end">
      <div class="col-12 col-md-7">
        <div class="input-group input-group-sm">
          <span class="input-group-text bg-light"><i class="bi bi-search text-muted"></i></span>
          <input type="text" class="form-control border-start-0" formControlName="search"
            placeholder="اسم المريض، رقم النتيجة، اسم الطبيب..." />
        </div>
      </div>
      <div class="col-12 col-md-3">
        <select class="form-select form-select-sm" formControlName="status">
          <option value="">كل الحالات</option>
          @for (s of statusConfig | keyvalue; track s.key) {
            <option [value]="s.key">{{ s.value.label }}</option>
          }
        </select>
      </div>
    </div>
  </div>
</div>

@if (facade.hasError()) {
  <div class="alert alert-danger d-flex gap-2 align-items-center mb-4">
    <i class="bi bi-exclamation-circle-fill"></i>{{ facade.error() }}
    <button class="btn btn-sm btn-danger ms-auto" (click)="facade.loadAll()">إعادة المحاولة</button>
  </div>
}

@if (facade.isLoading()) {
  <div class="card border-0 shadow-sm">
    @for (i of [1,2,3,4,5]; track i) {
      <div class="card-body border-bottom py-3 placeholder-glow">
        <span class="placeholder col-3 d-block mb-1 rounded"></span>
        <span class="placeholder col-5 rounded"></span>
      </div>
    }
  </div>
} @else if (!facade.hasResults()) {
  <div class="text-center py-5">
    <i class="bi bi-thermometer fs-1 text-muted d-block mb-3"></i>
    <h5 class="fw-bold text-muted">لا توجد نتائج مختبر</h5>
    <a routerLink="/lab-results/new" class="btn btn-primary mt-3">طلب اختبار جديد</a>
  </div>
} @else {
  <div class="card border-0 shadow-sm mb-4">
    @for (result of facade.results().items; track result.id) {
      <div class="card-body border-bottom py-3">
        <div class="d-flex align-items-start gap-3">
          <div class="flex-grow-1 min-w-0">
            <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
              <a [routerLink]="['/lab-results', result.id]"
                class="fw-semibold text-dark text-decoration-none">
                #{{ result.resultNumber }}
              </a>
              <span class="badge rounded-pill small" [ngClass]="statusConfig[result.status]?.class ?? 'bg-secondary-subtle text-secondary'">
                <i class="bi me-1" [ngClass]="statusConfig[result.status]?.icon ?? 'bi-circle'"></i>
                {{ statusConfig[result.status]?.label ?? result.status }}
              </span>
              @if (hasCriticalTest(result)) {
                <span class="badge bg-danger small">
                  <i class="bi bi-exclamation-triangle-fill me-1"></i>حرج
                </span>
              } @else if (hasAbnormalTest(result)) {
                <span class="badge bg-warning text-dark small">غير طبيعي</span>
              }
            </div>
            <div class="small text-muted">
              {{ result.patientName }} &nbsp;|&nbsp; د. {{ result.doctorName }}
              &nbsp;|&nbsp; {{ result.orderedAt | date:'dd/MM/yyyy' }}
              &nbsp;|&nbsp; {{ result.tests.length }} اختبار
            </div>
          </div>
          <div class="d-flex gap-1 flex-shrink-0">
            <a [routerLink]="['/lab-results', result.id]" class="btn btn-sm btn-outline-primary">
              <i class="bi bi-eye"></i>
            </a>
            @if (result.status === 'completed') {
              <button type="button" class="btn btn-sm btn-outline-success" (click)="onApprove(result.id)" title="اعتماد">
                <i class="bi bi-patch-check"></i>
              </button>
              <button type="button" class="btn btn-sm btn-outline-warning" (click)="onReject(result.id)" title="رفض">
                <i class="bi bi-x-circle"></i>
              </button>
            }
            <button type="button" class="btn btn-sm btn-outline-danger" (click)="onDelete(result.id)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    }
  </div>

  @if (facade.totalPages() > 1) {
    <nav>
      <ul class="pagination justify-content-center">
        <li class="page-item" [class.disabled]="facade.currentPage() === 1">
          <button class="page-link" (click)="onPageChange(facade.currentPage() - 1)">
            <i class="bi bi-chevron-right"></i>
          </button>
        </li>
        @for (p of pages; track p) {
          <li class="page-item" [class.active]="p === facade.currentPage()">
            <button class="page-link" (click)="onPageChange(p)">{{ p }}</button>
          </li>
        }
        <li class="page-item" [class.disabled]="facade.currentPage() === facade.totalPages()">
          <button class="page-link" (click)="onPageChange(facade.currentPage() + 1)">
            <i class="bi bi-chevron-left"></i>
          </button>
        </li>
      </ul>
    </nav>
  }
}
```

### SCSS

```scss

```


================================================================================
## src\app\features\lab-results\presentation\pages\lab-result-upload-page\lab-result-upload-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { LabResultsFacade } from '../../../application/facades/lab-results.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';

@Component({
  selector: 'hms-lab-result-upload-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './lab-result-upload-page.component.html',
  styleUrl: './lab-result-upload-page.component.scss',
})
export class LabResultUploadPageComponent {
  private readonly fb = inject(FormBuilder);
  readonly facade = inject(LabResultsFacade);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  selectedFile = signal<File | null>(null);
  uploadSuccess = signal(false);

  form = this.fb.group({
    resultId: ['', Validators.required],
  });

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.selectedFile.set(file);
  }

  onSubmit(): void {
    if (this.form.invalid || !this.selectedFile()) return;
    const resultId = this.form.value.resultId!;
    this.facade.upload(resultId, this.selectedFile()!).subscribe({
      next: (r) => {
        this.uploadSuccess.set(true);
        setTimeout(() => this.nav.goTo(`/lab-results/${r.id}`), 1500);
      },
    });
  }
}
```

### HTML

```html
<nav aria-label="breadcrumb" class="mb-3">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a routerLink="/lab-results" class="text-decoration-none">نتائج المختبر</a></li>
    <li class="breadcrumb-item active">رفع نتيجة</li>
  </ol>
</nav>

<div class="row justify-content-center">
  <div class="col-12 col-md-8 col-lg-6">

    <div class="card border-0 shadow-sm">
      <div class="card-body p-4">

        <h1 class="h5 fw-bold mb-1">
          <i class="bi bi-upload text-primary me-2"></i>رفع ملف نتيجة PDF
        </h1>
        <p class="text-muted small mb-4">يمكنك رفع ملف PDF لنتيجة مختبر موجودة بالفعل في النظام</p>

        @if (uploadSuccess()) {
          <div class="alert alert-success d-flex align-items-center gap-2">
            <i class="bi bi-check-circle-fill fs-4"></i>
            <div>
              <div class="fw-semibold">تم رفع الملف بنجاح!</div>
              <div class="small">جاري التحويل إلى صفحة النتيجة...</div>
            </div>
          </div>
        } @else {
          @if (facade.hasError()) {
            <div class="alert alert-danger d-flex gap-2 align-items-center mb-4">
              <i class="bi bi-exclamation-circle-fill"></i>{{ facade.error() }}
              <button class="btn-close ms-auto" (click)="facade.clearError()"></button>
            </div>
          }

          <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>

            <div class="mb-3">
              <label class="form-label fw-semibold">معرّف النتيجة <span class="text-danger">*</span></label>
              <input type="text" class="form-control" formControlName="resultId"
                [class.is-invalid]="form.get('resultId')!.invalid && form.get('resultId')!.touched"
                placeholder="أدخل معرّف نتيجة المختبر" dir="ltr" />
              <div class="invalid-feedback">معرّف النتيجة مطلوب</div>
            </div>

            <div class="mb-4">
              <label class="form-label fw-semibold">ملف PDF <span class="text-danger">*</span></label>
              <div class="border rounded-3 p-4 text-center"
                [class.border-primary]="selectedFile()"
                [class.bg-primary-subtle]="selectedFile()">
                @if (selectedFile()) {
                  <i class="bi bi-file-earmark-pdf-fill text-danger fs-2 d-block mb-2"></i>
                  <div class="fw-semibold small">{{ selectedFile()!.name }}</div>
                  <div class="text-muted" style="font-size:0.75rem;">
                    {{ (selectedFile()!.size / 1024).toFixed(1) }} KB
                  </div>
                  <label class="btn btn-sm btn-outline-secondary mt-2">
                    تغيير الملف
                    <input type="file" class="d-none" accept=".pdf" (change)="onFileChange($event)" />
                  </label>
                } @else {
                  <i class="bi bi-cloud-upload fs-2 text-muted d-block mb-2"></i>
                  <p class="text-muted small mb-2">اضغط لاختيار ملف PDF</p>
                  <label class="btn btn-sm btn-outline-primary">
                    اختيار ملف
                    <input type="file" class="d-none" accept=".pdf" (change)="onFileChange($event)" />
                  </label>
                }
              </div>
            </div>

            <div class="d-flex gap-3">
              <a routerLink="/lab-results" class="btn btn-outline-secondary flex-grow-1">إلغاء</a>
              <button type="submit" class="btn btn-primary flex-grow-1"
                [disabled]="form.invalid || !selectedFile() || facade.isUploading()">
                @if (facade.isUploading()) {
                  <span class="spinner-border spinner-border-sm me-2"></span>جاري الرفع...
                } @else {
                  <i class="bi bi-upload me-2"></i>رفع الملف
                }
              </button>
            </div>

          </form>
        }

      </div>
    </div>

  </div>
</div>
```

### SCSS

```scss

```


================================================================================
## src\app\features\medical-records\presentation\components\attachments-panel\attachments-panel.component
================================================================================

### TypeScript

```typescript
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordAttachment } from '../../../domain/models/medical-record.model';

@Component({
  selector: 'hms-attachments-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attachments-panel.component.html',
  styleUrl: './attachments-panel.component.scss',
})
export class AttachmentsPanelComponent {
  readonly attachments = input<RecordAttachment[]>([]);
  readonly isUploading = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly fileSelected = output<File>();
  readonly removed = output<string>();

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.fileSelected.emit(file);
  }

  getFileIcon(type: string): string {
    if (type.includes('pdf')) return 'bi-file-earmark-pdf text-danger';
    if (type.includes('image')) return 'bi-file-earmark-image text-primary';
    if (type.includes('word') || type.includes('document')) return 'bi-file-earmark-word text-info';
    return 'bi-file-earmark text-secondary';
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
```

### HTML

```html
<div class="attachments-panel">

  @if (!readonly()) {
    <div class="mb-3">
      <label class="btn btn-sm btn-outline-primary" [class.disabled]="isUploading()">
        @if (isUploading()) {
          <span class="spinner-border spinner-border-sm me-1"></span>جاري الرفع...
        } @else {
          <i class="bi bi-upload me-1"></i>رفع ملف
        }
        <input type="file" class="d-none" (change)="onFileChange($event)"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" [disabled]="isUploading()" />
      </label>
      <small class="text-muted ms-2">PDF، صور، Word (حد أقصى 10 ميجا)</small>
    </div>
  }

  @if (attachments().length === 0) {
    <div class="text-center py-4 text-muted border rounded-3">
      <i class="bi bi-paperclip fs-3 d-block mb-2"></i>
      <small>لا توجد مرفقات</small>
    </div>
  } @else {
    <div class="list-group list-group-flush">
      @for (att of attachments(); track att.id) {
        <div class="list-group-item px-0 py-2 d-flex align-items-center gap-3">
          <i class="bi fs-5 flex-shrink-0" [ngClass]="getFileIcon(att.type)"></i>
          <div class="flex-grow-1 min-w-0">
            <a [href]="att.url" target="_blank"
              class="small fw-semibold text-decoration-none text-dark text-truncate d-block">
              {{ att.name }}
            </a>
            <div class="text-muted" style="font-size:0.72rem;">
              {{ formatSize(att.size) }} • {{ att.uploadedAt | date:'dd/MM/yyyy' }}
            </div>
          </div>
          <div class="d-flex gap-1 flex-shrink-0">
            <a [href]="att.url" target="_blank" class="btn btn-sm btn-outline-primary" title="فتح">
              <i class="bi bi-eye"></i>
            </a>
            @if (!readonly()) {
              <button type="button" class="btn btn-sm btn-outline-danger" title="حذف"
                (click)="removed.emit(att.id)">
                <i class="bi bi-trash"></i>
              </button>
            }
          </div>
        </div>
      }
    </div>
  }

</div>
```

### SCSS

```scss

```


================================================================================
## src\app\features\medical-records\presentation\components\diagnosis-list\diagnosis-list.component
================================================================================

### TypeScript

```typescript
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagnosisModel } from '../../../domain/models/medical-record.model';

@Component({
  selector: 'hms-diagnosis-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diagnosis-list.component.html',
  styleUrl: './diagnosis-list.component.scss',
})
export class DiagnosisListComponent {
  readonly diagnoses = input<DiagnosisModel[]>([]);
  readonly readonly = input<boolean>(false);
  readonly removed = output<string>();

  readonly typeConfig: Record<string, { label: string; class: string }> = {
    primary:      { label: 'رئيسي',     class: 'bg-danger-subtle text-danger' },
    secondary:    { label: 'ثانوي',     class: 'bg-warning-subtle text-warning' },
    differential: { label: 'تفريقي',    class: 'bg-info-subtle text-info' },
  };
}
```

### HTML

```html
@if (diagnoses().length === 0) {
  <p class="text-muted small mb-0">لا توجد تشخيصات مسجلة</p>
} @else {
  <div class="list-group list-group-flush">
    @for (d of diagnoses(); track d.id) {
      <div class="list-group-item px-0 py-2 d-flex align-items-start gap-3">
        <span class="badge rounded-pill flex-shrink-0 mt-1"
          [ngClass]="typeConfig[d.type]?.class ?? 'bg-secondary-subtle text-secondary'">
          {{ typeConfig[d.type]?.label ?? d.type }}
        </span>
        <div class="flex-grow-1 min-w-0">
          <div class="fw-semibold small">{{ d.name }}</div>
          <div class="text-muted" style="font-size:0.72rem;" dir="ltr">{{ d.code }}</div>
          @if (d.notes) {
            <div class="text-muted small mt-1">{{ d.notes }}</div>
          }
        </div>
        @if (!readonly()) {
          <button type="button" class="btn btn-sm btn-outline-danger flex-shrink-0"
            (click)="removed.emit(d.id)">
            <i class="bi bi-x"></i>
          </button>
        }
      </div>
    }
  </div>
}
```

### SCSS

```scss

```


================================================================================
## src\app\features\medical-records\presentation\components\medical-record-form\medical-record-form.component
================================================================================

### TypeScript

```typescript
import { Component, inject, input, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MedicalRecordModel, RECORD_TYPE_LABELS, RecordType } from '../../../domain/models/medical-record.model';
import { CreateMedicalRecordRequest } from '../../../domain/repositories/medical-record.repository';

@Component({
  selector: 'hms-medical-record-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './medical-record-form.component.html',
  styleUrl: './medical-record-form.component.scss',
})
export class MedicalRecordFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  readonly record = input<MedicalRecordModel | null>(null);
  readonly isSaving = input<boolean>(false);
  readonly prefillPatientId = input<string>('');
  readonly submitted = output<CreateMedicalRecordRequest>();
  readonly cancelled = output<void>();

  readonly typeLabels = RECORD_TYPE_LABELS;
  readonly types = Object.keys(RECORD_TYPE_LABELS) as RecordType[];

  form = this.fb.group({
    patientId:            ['', Validators.required],
    doctorId:             ['', Validators.required],
    departmentId:         ['', Validators.required],
    type:                 ['visit', Validators.required],
    visitDate:            ['', Validators.required],
    chiefComplaint:       ['', [Validators.required, Validators.minLength(5)]],
    presentIllness:       ['', Validators.required],
    physicalExamination:  [''],
    treatmentPlan:        [''],
    followUpDate:         [''],
    followUpNotes:        [''],
    notes:                [''],
  });

  get f() { return this.form.controls; }
  get isEdit(): boolean { return !!this.record(); }

  ngOnInit(): void {
    const r = this.record();
    if (r) {
      this.form.patchValue({
        patientId: r.patientId, doctorId: r.doctorId, departmentId: r.departmentId,
        type: r.type, visitDate: r.visitDate, chiefComplaint: r.chiefComplaint,
        presentIllness: r.presentIllness, physicalExamination: r.physicalExamination ?? '',
        treatmentPlan: r.treatmentPlan ?? '', followUpDate: r.followUpDate ?? '',
        followUpNotes: r.followUpNotes ?? '', notes: r.notes ?? '',
      });
    } else if (this.prefillPatientId()) {
      this.form.patchValue({ patientId: this.prefillPatientId() });
    }
    // Default date to today
    if (!r) this.form.patchValue({ visitDate: new Date().toISOString().split('T')[0] });
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.getRawValue();
    this.submitted.emit({
      patientId: v.patientId!, doctorId: v.doctorId!, departmentId: v.departmentId!,
      type: v.type!, visitDate: v.visitDate!, chiefComplaint: v.chiefComplaint!,
      presentIllness: v.presentIllness!, physicalExamination: v.physicalExamination || undefined,
      treatmentPlan: v.treatmentPlan || undefined, followUpDate: v.followUpDate || undefined,
      followUpNotes: v.followUpNotes || undefined, notes: v.notes || undefined,
    });
  }
}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\medical-records\presentation\components\treatment-history\treatment-history.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TreatmentHistoryModel } from '../../../domain/models/medical-record-filter.model';

@Component({
  selector: 'hms-treatment-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    @if (history().length === 0) {
      <p class="text-muted small mb-0">لا يوجد تاريخ علاجي مسجل</p>
    } @else {
      <div class="timeline">
        @for (item of history(); track item.recordId; let last = $last) {
          <div class="d-flex gap-3 pb-3" [class.border-start]="!last" style="margin-right: 8px;">
            <div class="flex-shrink-0 mt-1" style="margin-right: -9px;">
              <div class="rounded-circle bg-primary" style="width: 10px; height: 10px;"></div>
            </div>
            <div class="flex-grow-1 min-w-0">
              <div class="d-flex align-items-center gap-2 mb-1">
                <span class="small fw-semibold">{{ item.visitDate | date:'dd/MM/yyyy' }}</span>
                <span class="text-muted small">— د. {{ item.doctorName }}</span>
              </div>
              <div class="small text-dark mb-1"><span class="text-muted">التشخيص:</span> {{ item.diagnosis }}</div>
              <div class="small text-dark mb-1"><span class="text-muted">العلاج:</span> {{ item.treatment }}</div>
              @if (item.outcome) {
                <div class="small text-success"><i class="bi bi-check-circle me-1"></i>{{ item.outcome }}</div>
              }
              <a [routerLink]="['/medical-records', item.recordId]"
                class="btn btn-xs btn-outline-primary mt-2" style="font-size:0.75rem; padding: 2px 8px;">
                عرض السجل
              </a>
            </div>
          </div>
        }
      </div>
    }
  `,
})
export class TreatmentHistoryComponent {
  readonly history = input<TreatmentHistoryModel[]>([]);
}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\medical-records\presentation\pages\medical-record-detail-page\medical-record-detail-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MedicalRecordsFacade } from '../../../application/facades/medical-records.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { DiagnosisListComponent } from '../../components/diagnosis-list/diagnosis-list.component';
import { AttachmentsPanelComponent } from '../../components/attachments-panel/attachments-panel.component';
import { RECORD_TYPE_LABELS } from '../../../domain/models/medical-record.model';

@Component({
  selector: 'hms-medical-record-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, DiagnosisListComponent, AttachmentsPanelComponent],
  templateUrl: './medical-record-detail-page.component.html',
  styleUrl: './medical-record-detail-page.component.scss',
})
export class MedicalRecordDetailPageComponent implements OnInit, OnDestroy {
  readonly facade = inject(MedicalRecordsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  readonly typeLabels = RECORD_TYPE_LABELS;
  activeTab = 'overview';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.facade.loadById(id);
    this.layout.setPageTitle('Medical Record', 'السجل الطبي');
  }

  ngOnDestroy(): void { this.facade.clearSelected(); }

  onDelete(): void {
    const r = this.facade.selectedRecord();
    if (!r || !confirm('هل أنت متأكد من حذف هذا السجل الطبي؟')) return;
    this.facade.delete(r.id).subscribe({ next: () => this.nav.goTo('/medical-records') });
  }

  onClose(): void {
    const r = this.facade.selectedRecord();
    if (!r) return;
    this.facade.update(r.id, { isClosed: true }).subscribe();
  }

  onFileSelected(file: File): void {
    const r = this.facade.selectedRecord();
    if (!r) return;
    this.facade.uploadAttachment(r.id, file).subscribe();
  }

  onRemoveAttachment(attachmentId: string): void {
    const r = this.facade.selectedRecord();
    if (!r || !confirm('هل أنت متأكد من حذف هذا المرفق؟')) return;
    this.facade.removeAttachment(r.id, attachmentId).subscribe();
  }
}
```

### HTML

```html
<nav aria-label="breadcrumb" class="mb-3">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a routerLink="/medical-records" class="text-decoration-none">السجلات الطبية</a></li>
    <li class="breadcrumb-item active">تفاصيل السجل</li>
  </ol>
</nav>

@if (facade.isDetailLoading()) {
  <div class="text-center py-5"><div class="spinner-border text-primary" role="status"></div></div>
}

@if (facade.selectedRecord(); as record) {

  <!-- Header -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-body p-4">
      <div class="d-flex align-items-start justify-content-between flex-wrap gap-3">
        <div>
          <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
            <h2 class="h5 fw-bold mb-0">سجل #{{ record.recordNumber }}</h2>
            <span class="badge bg-primary-subtle text-primary rounded-pill">{{ typeLabels[record.type] }}</span>
            @if (record.isClosed) {
              <span class="badge bg-secondary-subtle text-secondary rounded-pill">مغلق</span>
            } @else {
              <span class="badge bg-success-subtle text-success rounded-pill">مفتوح</span>
            }
          </div>
          <div class="text-muted small">
            <a [routerLink]="['/patients', record.patientId]" class="text-decoration-none fw-semibold">
              {{ record.patientName }}
            </a>
            &nbsp;|&nbsp; د. {{ record.doctorName }} &nbsp;|&nbsp;
            {{ record.visitDate | date:'dd/MM/yyyy' }}
          </div>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          @if (!record.isClosed) {
            <button type="button" class="btn btn-sm btn-outline-secondary" (click)="onClose()">
              <i class="bi bi-lock me-1"></i>إغلاق السجل
            </button>
          }
          <a [routerLink]="['/medical-records', record.id, 'edit']" class="btn btn-sm btn-outline-warning">
            <i class="bi bi-pencil me-1"></i>تعديل
          </a>
          <button type="button" class="btn btn-sm btn-outline-danger" (click)="onDelete()">
            <i class="bi bi-trash me-1"></i>حذف
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Tabs -->
  <ul class="nav nav-tabs mb-4">
    <li class="nav-item">
      <button class="nav-link" [class.active]="activeTab==='overview'" (click)="activeTab='overview'">
        <i class="bi bi-file-text me-1"></i>نظرة عامة
      </button>
    </li>
    <li class="nav-item">
      <button class="nav-link" [class.active]="activeTab==='diagnoses'" (click)="activeTab='diagnoses'">
        <i class="bi bi-clipboard2-pulse me-1"></i>التشخيصات
        <span class="badge bg-primary rounded-pill ms-1">{{ record.diagnoses.length }}</span>
      </button>
    </li>
    <li class="nav-item">
      <button class="nav-link" [class.active]="activeTab==='attachments'" (click)="activeTab='attachments'">
        <i class="bi bi-paperclip me-1"></i>المرفقات
        <span class="badge bg-secondary rounded-pill ms-1">{{ record.attachments.length }}</span>
      </button>
    </li>
  </ul>

  <!-- Tab: Overview -->
  @if (activeTab === 'overview') {
    <div class="row g-4">
      <div class="col-12 col-lg-6">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-header bg-white border-bottom py-3">
            <h6 class="mb-0 fw-bold"><i class="bi bi-clipboard text-primary me-2"></i>تفاصيل الزيارة</h6>
          </div>
          <div class="card-body">
            <dl class="row small mb-0">
              <dt class="col-5 text-muted fw-normal">الشكوى الرئيسية</dt>
              <dd class="col-7">{{ record.chiefComplaint }}</dd>
              <dt class="col-5 text-muted fw-normal">القسم</dt>
              <dd class="col-7">{{ record.departmentName }}</dd>
              @if (record.followUpDate) {
                <dt class="col-5 text-muted fw-normal">موعد المتابعة</dt>
                <dd class="col-7 text-success">{{ record.followUpDate | date:'dd/MM/yyyy' }}</dd>
              }
            </dl>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-header bg-white border-bottom py-3">
            <h6 class="mb-0 fw-bold"><i class="bi bi-journal-medical text-success me-2"></i>خطة العلاج</h6>
          </div>
          <div class="card-body">
            @if (record.treatmentPlan) {
              <p class="small mb-0">{{ record.treatmentPlan }}</p>
            } @else {
              <p class="text-muted small mb-0">لم يتم تحديد خطة علاج</p>
            }
          </div>
        </div>
      </div>
      @if (record.presentIllness) {
        <div class="col-12">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-white border-bottom py-3">
              <h6 class="mb-0 fw-bold"><i class="bi bi-file-text text-info me-2"></i>تاريخ المرض الحالي</h6>
            </div>
            <div class="card-body">
              <p class="small mb-0" style="white-space: pre-wrap;">{{ record.presentIllness }}</p>
            </div>
          </div>
        </div>
      }
      @if (record.physicalExamination) {
        <div class="col-12">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-white border-bottom py-3">
              <h6 class="mb-0 fw-bold"><i class="bi bi-stethoscope text-warning me-2"></i>الفحص السريري</h6>
            </div>
            <div class="card-body">
              <p class="small mb-0" style="white-space: pre-wrap;">{{ record.physicalExamination }}</p>
            </div>
          </div>
        </div>
      }
    </div>
  }

  <!-- Tab: Diagnoses -->
  @if (activeTab === 'diagnoses') {
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white border-bottom py-3 d-flex align-items-center justify-content-between">
        <h6 class="mb-0 fw-bold"><i class="bi bi-clipboard2-pulse text-danger me-2"></i>التشخيصات</h6>
      </div>
      <div class="card-body p-3">
        <hms-diagnosis-list [diagnoses]="record.diagnoses" [readonly]="record.isClosed" />
      </div>
    </div>
  }

  <!-- Tab: Attachments -->
  @if (activeTab === 'attachments') {
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white border-bottom py-3">
        <h6 class="mb-0 fw-bold"><i class="bi bi-paperclip text-secondary me-2"></i>المرفقات</h6>
      </div>
      <div class="card-body p-3">
        <hms-attachments-panel
          [attachments]="record.attachments"
          [isUploading]="facade.isUploading()"
          [readonly]="record.isClosed"
          (fileSelected)="onFileSelected($event)"
          (removed)="onRemoveAttachment($event)"
        />
      </div>
    </div>
  }

}
```

### SCSS

```scss

```


================================================================================
## src\app\features\medical-records\presentation\pages\medical-record-form-page\medical-record-form-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MedicalRecordsFacade } from '../../../application/facades/medical-records.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { MedicalRecordFormComponent } from '../../components/medical-record-form/medical-record-form.component';
import { CreateMedicalRecordRequest } from '../../../domain/repositories/medical-record.repository';

@Component({
  selector: 'hms-medical-record-form-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MedicalRecordFormComponent],
  template: `
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb small">
        <li class="breadcrumb-item"><a routerLink="/medical-records" class="text-decoration-none">السجلات الطبية</a></li>
        <li class="breadcrumb-item active">{{ isEdit ? 'تعديل' : 'إنشاء' }}</li>
      </ol>
    </nav>
    <h1 class="h4 fw-bold mb-4">
      <i class="bi me-2" [class.bi-file-plus-fill]="!isEdit" [class.bi-pencil-square]="isEdit"
        [class.text-primary]="!isEdit" [class.text-warning]="isEdit"></i>
      {{ isEdit ? 'تعديل السجل الطبي' : 'إنشاء سجل طبي جديد' }}
    </h1>
    @if (facade.hasError()) {
      <div class="alert alert-danger d-flex gap-2 align-items-center mb-4">
        <i class="bi bi-exclamation-circle-fill"></i>{{ facade.error() }}
        <button class="btn-close ms-auto" (click)="facade.clearError()"></button>
      </div>
    }
    @if (isEdit && facade.isDetailLoading()) {
      <div class="text-center py-5"><div class="spinner-border text-primary" role="status"></div></div>
    } @else {
      <hms-medical-record-form
        [record]="isEdit ? facade.selectedRecord() : null"
        [isSaving]="facade.isSaving()"
        [prefillPatientId]="prefillPatientId"
        (submitted)="onSubmit($event)"
        (cancelled)="onCancel()"
      />
    }
  `,
})
export class MedicalRecordFormPageComponent implements OnInit {
  readonly facade = inject(MedicalRecordsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  recordId: string | null = null;
  prefillPatientId = '';

  get isEdit(): boolean { return !!this.recordId; }

  ngOnInit(): void {
    this.recordId = this.route.snapshot.paramMap.get('id');
    this.prefillPatientId = this.route.snapshot.queryParams['patientId'] ?? '';
    if (this.isEdit) {
      this.facade.loadById(this.recordId!);
      this.layout.setPageTitle('Edit Medical Record', 'تعديل السجل الطبي');
    } else {
      this.layout.setPageTitle('New Medical Record', 'إنشاء سجل طبي');
    }
  }

  onSubmit(req: CreateMedicalRecordRequest): void {
    const action$ = this.isEdit
      ? this.facade.update(this.recordId!, req)
      : this.facade.create(req);
    action$.subscribe({ next: (r) => this.nav.goTo(`/medical-records/${r.id}`) });
  }

  onCancel(): void {
    this.isEdit ? this.nav.goTo(`/medical-records/${this.recordId}`) : this.nav.goTo('/medical-records');
  }
}
```

### HTML

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>

  <div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-white py-3 border-bottom">
      <h6 class="mb-0 fw-bold"><i class="bi bi-info-circle text-primary me-2"></i>معلومات أساسية</h6>
    </div>
    <div class="card-body p-4">
      <div class="row g-3">
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">معرّف المريض <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="patientId"
            [class.is-invalid]="f['patientId'].invalid && f['patientId'].touched" dir="ltr" />
          <div class="invalid-feedback">معرّف المريض مطلوب</div>
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">معرّف الطبيب <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="doctorId"
            [class.is-invalid]="f['doctorId'].invalid && f['doctorId'].touched" dir="ltr" />
          <div class="invalid-feedback">معرّف الطبيب مطلوب</div>
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label fw-semibold">نوع السجل <span class="text-danger">*</span></label>
          <select class="form-select" formControlName="type">
            @for (type of types; track type) {
              <option [value]="type">{{ typeLabels[type] }}</option>
            }
          </select>
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label fw-semibold">تاريخ الزيارة <span class="text-danger">*</span></label>
          <input type="date" class="form-control" formControlName="visitDate"
            [class.is-invalid]="f['visitDate'].invalid && f['visitDate'].touched" />
          <div class="invalid-feedback">التاريخ مطلوب</div>
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label fw-semibold">القسم <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="departmentId" dir="ltr" />
        </div>
      </div>
    </div>
  </div>

  <div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-white py-3 border-bottom">
      <h6 class="mb-0 fw-bold"><i class="bi bi-file-medical text-danger me-2"></i>التفاصيل الطبية</h6>
    </div>
    <div class="card-body p-4">
      <div class="row g-3">
        <div class="col-12">
          <label class="form-label fw-semibold">الشكوى الرئيسية <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="chiefComplaint"
            [class.is-invalid]="f['chiefComplaint'].invalid && f['chiefComplaint'].touched"
            placeholder="وصف موجز للشكوى" />
          <div class="invalid-feedback">الشكوى الرئيسية مطلوبة</div>
        </div>
        <div class="col-12">
          <label class="form-label fw-semibold">تاريخ المرض الحالي <span class="text-danger">*</span></label>
          <textarea class="form-control" formControlName="presentIllness" rows="3"
            [class.is-invalid]="f['presentIllness'].invalid && f['presentIllness'].touched"
            placeholder="وصف تفصيلي لتطور المرض والأعراض..."></textarea>
          <div class="invalid-feedback">تاريخ المرض الحالي مطلوب</div>
        </div>
        <div class="col-12">
          <label class="form-label fw-semibold">الفحص السريري</label>
          <textarea class="form-control" formControlName="physicalExamination" rows="3"
            placeholder="نتائج الفحص السريري..."></textarea>
        </div>
        <div class="col-12">
          <label class="form-label fw-semibold">خطة العلاج</label>
          <textarea class="form-control" formControlName="treatmentPlan" rows="3"
            placeholder="الأدوية الموصوفة، الإجراءات المطلوبة..."></textarea>
        </div>
      </div>
    </div>
  </div>

  <div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-white py-3 border-bottom">
      <h6 class="mb-0 fw-bold"><i class="bi bi-calendar-event text-success me-2"></i>المتابعة والملاحظات</h6>
    </div>
    <div class="card-body p-4">
      <div class="row g-3">
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">تاريخ المتابعة</label>
          <input type="date" class="form-control" formControlName="followUpDate" />
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">ملاحظات المتابعة</label>
          <input type="text" class="form-control" formControlName="followUpNotes"
            placeholder="تعليمات أو ملاحظات للزيارة القادمة..." />
        </div>
        <div class="col-12">
          <label class="form-label fw-semibold">ملاحظات إضافية</label>
          <textarea class="form-control" formControlName="notes" rows="2"
            placeholder="أي ملاحظات أخرى..."></textarea>
        </div>
      </div>
    </div>
  </div>

  <div class="d-flex gap-3 justify-content-end">
    <button type="button" class="btn btn-outline-secondary px-4" (click)="cancelled.emit()">إلغاء</button>
    <button type="submit" class="btn btn-primary px-4" [disabled]="isSaving()">
      @if (isSaving()) {
        <span class="spinner-border spinner-border-sm me-2"></span>جاري الحفظ...
      } @else {
        <i class="bi bi-check-lg me-2"></i>{{ isEdit ? 'حفظ التعديلات' : 'إنشاء السجل' }}
      }
    </button>
  </div>

</form>
```

### SCSS

```scss

```


================================================================================
## src\app\features\medical-records\presentation\pages\medical-record-list-page\medical-record-list-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MedicalRecordsFacade } from '../../../application/facades/medical-records.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { RECORD_TYPE_LABELS } from '../../../domain/models/medical-record.model';
import { MedicalRecordFilter } from '../../../domain/models/medical-record-filter.model';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'hms-medical-record-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './medical-record-list-page.component.html',
  styleUrl: './medical-record-list-page.component.scss',
})
export class MedicalRecordListPageComponent implements OnInit {
  readonly facade = inject(MedicalRecordsFacade);
  private readonly layout = inject(LayoutService);
  private readonly fb = inject(FormBuilder);

  readonly typeLabels = RECORD_TYPE_LABELS;

  searchForm = this.fb.group({ search: [''], type: [''], isClosed: [''] });

  ngOnInit(): void {
    this.layout.setPageTitle('Medical Records', 'السجلات الطبية');
    this.facade.loadAll();
    this.searchForm.get('search')!.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.applyFilter());
    this.searchForm.valueChanges.pipe(distinctUntilChanged())
      .subscribe(() => this.applyFilter());
  }

  applyFilter(): void {
    const v = this.searchForm.value;
    this.facade.applyFilter({
      ...this.facade.filter(),
      search: v.search ?? '',
      type: (v.type as any) || undefined,
      isClosed: v.isClosed ? v.isClosed === 'true' : undefined,
      page: 1,
    } as MedicalRecordFilter);
  }

  onDelete(id: string): void {
    if (!confirm('هل أنت متأكد من حذف هذا السجل الطبي؟')) return;
    this.facade.delete(id).subscribe();
  }

  onPageChange(page: number): void { this.facade.changePage(page); }

  get pages(): number[] {
    return Array.from({ length: this.facade.totalPages() }, (_, i) => i + 1);
  }
}
```

### HTML

```html
<div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
  <div>
    <h1 class="h4 fw-bold mb-0">السجلات الطبية</h1>
    @if (!facade.isLoading()) {
      <p class="text-muted small mb-0">إجمالي: {{ facade.totalRecords() | number }} سجل</p>
    }
  </div>
  <a routerLink="/medical-records/new" class="btn btn-primary">
    <i class="bi bi-file-plus-fill me-2"></i>إنشاء سجل جديد
  </a>
</div>

<!-- Filter -->
<div class="card border-0 shadow-sm mb-4">
  <div class="card-body p-3">
    <div [formGroup]="searchForm" class="row g-2 align-items-end">
      <div class="col-12 col-md-5">
        <div class="input-group input-group-sm">
          <span class="input-group-text bg-light"><i class="bi bi-search text-muted"></i></span>
          <input type="text" class="form-control border-start-0" formControlName="search"
            placeholder="اسم المريض، الشكوى، الطبيب..." />
        </div>
      </div>
      <div class="col-6 col-md-3">
        <select class="form-select form-select-sm" formControlName="type">
          <option value="">كل الأنواع</option>
          @for (t of typeLabels | keyvalue; track t.key) {
            <option [value]="t.key">{{ t.value }}</option>
          }
        </select>
      </div>
      <div class="col-6 col-md-2">
        <select class="form-select form-select-sm" formControlName="isClosed">
          <option value="">الكل</option>
          <option value="false">مفتوح</option>
          <option value="true">مغلق</option>
        </select>
      </div>
    </div>
  </div>
</div>

@if (facade.hasError()) {
  <div class="alert alert-danger d-flex gap-2 align-items-center mb-4">
    <i class="bi bi-exclamation-circle-fill"></i>{{ facade.error() }}
    <button class="btn btn-sm btn-danger ms-auto" (click)="facade.loadAll()">إعادة المحاولة</button>
  </div>
}

@if (facade.isLoading()) {
  <div class="card border-0 shadow-sm">
    @for (i of [1,2,3,4,5]; track i) {
      <div class="card-body border-bottom py-3 placeholder-glow">
        <span class="placeholder col-4 d-block mb-1 rounded"></span>
        <span class="placeholder col-6 d-block rounded"></span>
      </div>
    }
  </div>
} @else if (!facade.hasRecords()) {
  <div class="text-center py-5">
    <i class="bi bi-file-medical fs-1 text-muted d-block mb-3"></i>
    <h5 class="fw-bold text-muted">لا توجد سجلات طبية</h5>
    <a routerLink="/medical-records/new" class="btn btn-primary mt-3">إنشاء سجل جديد</a>
  </div>
} @else {
  <div class="card border-0 shadow-sm mb-4">
    @for (record of facade.records().items; track record.id) {
      <div class="card-body border-bottom py-3 d-flex align-items-start gap-3">
        <div class="flex-shrink-0 mt-1">
          <span class="badge bg-primary-subtle text-primary rounded-pill small">
            {{ typeLabels[record.type] }}
          </span>
        </div>
        <div class="flex-grow-1 min-w-0">
          <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
            <a [routerLink]="['/medical-records', record.id]"
              class="fw-semibold text-dark text-decoration-none">
              {{ record.patientName }}
            </a>
            <span class="text-muted small">— د. {{ record.doctorName }}</span>
            @if (record.isClosed) {
              <span class="badge bg-secondary-subtle text-secondary rounded-pill small">مغلق</span>
            }
          </div>
          <div class="text-muted small text-truncate">{{ record.chiefComplaint }}</div>
          <div class="text-muted" style="font-size:0.72rem;">
            {{ record.visitDate | date:'dd/MM/yyyy' }} • {{ record.departmentName }}
            @if (record.diagnoses.length > 0) {
              • {{ record.diagnoses[0].name }}
            }
          </div>
        </div>
        <div class="d-flex gap-1 flex-shrink-0">
          <a [routerLink]="['/medical-records', record.id]" class="btn btn-sm btn-outline-primary">
            <i class="bi bi-eye"></i>
          </a>
          <a [routerLink]="['/medical-records', record.id, 'edit']" class="btn btn-sm btn-outline-secondary">
            <i class="bi bi-pencil"></i>
          </a>
          <button type="button" class="btn btn-sm btn-outline-danger" (click)="onDelete(record.id)">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    }
  </div>

  @if (facade.totalPages() > 1) {
    <nav>
      <ul class="pagination justify-content-center">
        <li class="page-item" [class.disabled]="facade.currentPage() === 1">
          <button class="page-link" (click)="onPageChange(facade.currentPage() - 1)">
            <i class="bi bi-chevron-right"></i>
          </button>
        </li>
        @for (p of pages; track p) {
          <li class="page-item" [class.active]="p === facade.currentPage()">
            <button class="page-link" (click)="onPageChange(p)">{{ p }}</button>
          </li>
        }
        <li class="page-item" [class.disabled]="facade.currentPage() === facade.totalPages()">
          <button class="page-link" (click)="onPageChange(facade.currentPage() + 1)">
            <i class="bi bi-chevron-left"></i>
          </button>
        </li>
      </ul>
    </nav>
  }
}
```

### SCSS

```scss

```


================================================================================
## src\app\features\notifications\presentation\components\notification-item\notification-item.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\notifications\presentation\components\notification-list\notification-list.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\notifications\presentation\components\notification-preferences\notification-preferences.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\notifications\presentation\pages\notification-center-page\notification-center-page.component
================================================================================

### TypeScript

```typescript
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
  template: `
    <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
      <div>
        <h1 class="h4 fw-bold mb-0">
          <i class="bi bi-bell-fill me-2 text-primary"></i>الإشعارات
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
      icon: 'bi-exclamation-triangle-fill',
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
      icon: 'bi-capsule',
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
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\patients\presentation\components\patient-card\patient-card.component
================================================================================

### TypeScript

```typescript
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PatientModel, GENDER_LABELS, STATUS_CONFIG } from '../../../domain/models/patient.model';

@Component({
  selector: 'hms-patient-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './patient-card.component.html',
  styleUrl: './patient-card.component.scss',
})
export class PatientCardComponent {
  readonly patient = input.required<PatientModel>();
  readonly deleted = output<string>();

  readonly genderLabels = GENDER_LABELS;
  readonly statusConfig = STATUS_CONFIG;

  onDelete(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.deleted.emit(this.patient().id);
  }

  getInitials(): string {
    const p = this.patient();
    return `${p.firstName.charAt(0)}${p.lastName.charAt(0)}`.toUpperCase();
  }
}
```

### HTML

```html
<div class="card border-0 h-100 patient-card">
  <div class="card-body p-3 p-md-4">

    <!-- Header -->
    <div class="d-flex align-items-start gap-3 mb-3">
      <!-- Avatar -->
      <div class="flex-shrink-0">
        @if (patient().avatar) {
          <img [src]="patient().avatar" [alt]="patient().fullName"
            class="rounded-circle object-fit-cover" width="48" height="48" />
        } @else {
          <div class="rounded-circle bg-primary-subtle text-primary fw-bold d-flex align-items-center justify-content-center"
            style="width: 48px; height: 48px; font-size: 1rem;">
            {{ getInitials() }}
          </div>
        }
      </div>

      <!-- Info -->
      <div class="flex-grow-1 min-w-0">
        <a [routerLink]="['/patients', patient().id]"
          class="fw-bold text-decoration-none d-block text-truncate patient-name">
          {{ patient().fullName }}
        </a>
        <div class="text-muted small">P-{{ patient().patientNumber }}</div>
      </div>

      <!-- Status Badge -->
      <span class="badge rounded-pill small flex-shrink-0"
        [ngClass]="statusConfig[patient().status]?.class ?? 'bg-secondary-subtle text-secondary'">
        {{ statusConfig[patient().status]?.label ?? patient().status }}
      </span>
    </div>

    <!-- Details -->
    <div class="row g-2 small text-muted mb-3 patient-meta">
      <div class="col-6 d-flex align-items-center gap-1">
        <i class="bi bi-calendar3 flex-shrink-0"></i>
        <span>{{ patient().age }} سنة</span>
      </div>
      <div class="col-6 d-flex align-items-center gap-1">
        <i class="bi bi-gender-ambiguous flex-shrink-0"></i>
        <span>{{ genderLabels[patient().gender] }}</span>
      </div>
      <div class="col-6 d-flex align-items-center gap-1">
        <i class="bi bi-telephone flex-shrink-0"></i>
        <span class="text-truncate" dir="ltr">{{ patient().phone }}</span>
      </div>
      <div class="col-6 d-flex align-items-center gap-1">
        <i class="bi bi-droplet flex-shrink-0"></i>
        <span>{{ patient().bloodType ?? 'غير محدد' }}</span>
      </div>
    </div>

    @if (patient().allergies.length > 0) {
      <div class="mb-3">
        <div class="d-flex flex-wrap gap-1">
          @for (allergy of patient().allergies.slice(0,2); track allergy) {
            <span class="badge bg-danger-subtle text-danger rounded-pill" style="font-size: 0.7rem;">
              {{ allergy }}
            </span>
          }
          @if (patient().allergies.length > 2) {
            <span class="badge bg-secondary-subtle text-secondary rounded-pill" style="font-size: 0.7rem;">
              +{{ patient().allergies.length - 2 }}
            </span>
          }
        </div>
      </div>
    }

    <!-- Actions -->
    <div class="d-flex gap-2 pt-2 border-top card-actions">
      <a [routerLink]="['/patients', patient().id]"
        class="btn btn-sm btn-outline-primary flex-grow-1">
        <i class="bi bi-eye me-1"></i> عرض
      </a>
      <a [routerLink]="['/patients', patient().id, 'edit']"
        class="btn btn-sm btn-outline-secondary">
        <i class="bi bi-pencil"></i>
      </a>
      <button type="button" class="btn btn-sm btn-outline-danger" (click)="onDelete($event)">
        <i class="bi bi-trash"></i>
      </button>
    </div>

  </div>
</div>
```

### SCSS

```scss
:host {
  display: block;
}

.patient-card {
  border-radius: 20px;
  border: 1px solid var(--app-border);
  background: linear-gradient(180deg, var(--app-surface) 0%, var(--app-surface-alt) 100%);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.patient-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--app-shadow-sm);
}

.patient-name {
  color: var(--app-text);
  font-size: 1rem;
}

.patient-meta .col-6 {
  padding: 0.35rem 0.25rem;
  border-radius: 10px;
  background: rgba(148, 163, 184, 0.08);
}

.card-actions .btn {
  border-radius: 10px;
}

```


================================================================================
## src\app\features\patients\presentation\components\patient-filter\patient-filter.component
================================================================================

### TypeScript

```typescript
import { Component, inject, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { PatientFilter } from '../../../domain/models/patient-filter.model';
import { Gender, BloodType, PatientStatus, BLOOD_TYPES, GENDER_LABELS } from '../../../domain/models/patient.model';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'hms-patient-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-filter.component.html',
  styleUrl: './patient-filter.component.scss',
})
export class PatientFilterComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  readonly filterChanged = output<Partial<PatientFilter>>();
  readonly filterReset = output<void>();

  readonly bloodTypes = BLOOD_TYPES;
  readonly genderLabels = GENDER_LABELS;

  form = this.fb.group({
    search:     [''],
    gender:     ['' as Gender | ''],
    bloodType:  ['' as BloodType | ''],
    status:     ['' as PatientStatus | ''],
    hasInsurance: ['' as 'true' | 'false' | ''],
  });

  ngOnInit(): void {
    this.form.get('search')!.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(() => this.emitFilter());

    this.form.valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.emitFilter());
  }

  emitFilter(): void {
    const v = this.form.value;
    this.filterChanged.emit({
      search: v.search ?? '',
      gender: (v.gender as Gender) || undefined,
      bloodType: (v.bloodType as BloodType) || undefined,
      status: (v.status as PatientStatus) || undefined,
      hasInsurance: v.hasInsurance ? v.hasInsurance === 'true' : undefined,
      page: 1,
    });
  }

  reset(): void {
    this.form.reset({ search: '', gender: '', bloodType: '', status: '', hasInsurance: '' });
    this.filterReset.emit();
  }

  get hasActiveFilter(): boolean {
    const v = this.form.value;
    return !!(v.search || v.gender || v.bloodType || v.status || v.hasInsurance);
  }
}
```

### HTML

```html
<div class="card border-0 shadow-sm mb-4">
  <div class="card-body p-3">
    <div [formGroup]="form" class="row g-2 align-items-end">

      <!-- Search -->
      <div class="col-12 col-md-4">
        <label class="form-label small fw-semibold mb-1">بحث</label>
        <div class="input-group input-group-sm">
          <span class="input-group-text bg-light"><i class="bi bi-search text-muted"></i></span>
          <input type="text" class="form-control border-start-0"
            formControlName="search"
            placeholder="اسم المريض، رقم الهوية، رقم الهاتف..." />
        </div>
      </div>

      <!-- Gender -->
      <div class="col-6 col-md-2">
        <label class="form-label small fw-semibold mb-1">الجنس</label>
        <select class="form-select form-select-sm" formControlName="gender">
          <option value="">الكل</option>
          <option value="male">ذكر</option>
          <option value="female">أنثى</option>
        </select>
      </div>

      <!-- Blood Type -->
      <div class="col-6 col-md-2">
        <label class="form-label small fw-semibold mb-1">فصيلة الدم</label>
        <select class="form-select form-select-sm" formControlName="bloodType">
          <option value="">الكل</option>
          @for (bt of bloodTypes; track bt) {
            <option [value]="bt">{{ bt }}</option>
          }
        </select>
      </div>

      <!-- Status -->
      <div class="col-6 col-md-2">
        <label class="form-label small fw-semibold mb-1">الحالة</label>
        <select class="form-select form-select-sm" formControlName="status">
          <option value="">الكل</option>
          <option value="active">نشط</option>
          <option value="inactive">غير نشط</option>
          <option value="deceased">متوفى</option>
        </select>
      </div>

      <!-- Insurance -->
      <div class="col-6 col-md-1">
        <label class="form-label small fw-semibold mb-1">التأمين</label>
        <select class="form-select form-select-sm" formControlName="hasInsurance">
          <option value="">الكل</option>
          <option value="true">مؤمَّن</option>
          <option value="false">غير مؤمَّن</option>
        </select>
      </div>

      <!-- Reset -->
      <div class="col-12 col-md-1">
        @if (hasActiveFilter) {
          <button type="button" class="btn btn-sm btn-outline-secondary w-100" (click)="reset()">
            <i class="bi bi-x-circle me-1"></i> مسح
          </button>
        }
      </div>

    </div>
  </div>
</div>
```

### SCSS

```scss

```


================================================================================
## src\app\features\patients\presentation\components\patient-form\patient-form.component
================================================================================

### TypeScript

```typescript
import { Component, inject, input, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PatientModel, BLOOD_TYPES, GENDER_LABELS } from '../../../domain/models/patient.model';
import { CreatePatientRequest } from '../../../domain/repositories/patient.repository';

@Component({
  selector: 'hms-patient-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.scss',
})
export class PatientFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  readonly patient = input<PatientModel | null>(null);
  readonly isSaving = input<boolean>(false);
  readonly submitted = output<CreatePatientRequest>();
  readonly cancelled = output<void>();

  readonly bloodTypes = BLOOD_TYPES;
  readonly genderLabels = GENDER_LABELS;

  form = this.fb.group({
    firstName:   ['', [Validators.required, Validators.minLength(2)]],
    lastName:    ['', [Validators.required, Validators.minLength(2)]],
    dateOfBirth: ['', Validators.required],
    gender:      ['', Validators.required],
    bloodType:   [''],
    nationalId:  ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
    phone:       ['', [Validators.required, Validators.pattern(/^(\+?\d{10,15})$/)]],
    email:       ['', Validators.email],
    maritalStatus: ['', Validators.required],
    insuranceNumber: [''],
    insuranceProvider: [''],
    // Address
    street:      ['', Validators.required],
    city:        ['', Validators.required],
    governorate: ['', Validators.required],
    country:     ['مصر', Validators.required],
    postalCode:  [''],
    // Emergency Contact
    emergencyName:     ['', Validators.required],
    emergencyRelation: ['', Validators.required],
    emergencyPhone:    ['', [Validators.required, Validators.pattern(/^(\+?\d{10,15})$/)]],
    // Medical
    allergies:       [''],
    chronicDiseases: [''],
    notes:           [''],
  });

  ngOnInit(): void {
    const p = this.patient();
    if (p) this.patchForm(p);
  }

  private patchForm(p: PatientModel): void {
    this.form.patchValue({
      firstName: p.firstName,
      lastName: p.lastName,
      dateOfBirth: p.dateOfBirth,
      gender: p.gender,
      bloodType: p.bloodType ?? '',
      nationalId: p.nationalId,
      phone: p.phone,
      email: p.email ?? '',
      maritalStatus: p.maritalStatus,
      insuranceNumber: p.insuranceNumber ?? '',
      insuranceProvider: p.insuranceProvider ?? '',
      street: p.address.street,
      city: p.address.city,
      governorate: p.address.governorate,
      country: p.address.country,
      postalCode: p.address.postalCode ?? '',
      emergencyName: p.emergencyContact.name,
      emergencyRelation: p.emergencyContact.relation,
      emergencyPhone: p.emergencyContact.phone,
      allergies: p.allergies.join(', '),
      chronicDiseases: p.chronicDiseases.join(', '),
      notes: p.notes ?? '',
    });
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.getRawValue();
    const request: CreatePatientRequest = {
      firstName: v.firstName!,
      lastName: v.lastName!,
      dateOfBirth: v.dateOfBirth!,
      gender: v.gender as 'male' | 'female',
      bloodType: (v.bloodType as any) || undefined,
      nationalId: v.nationalId!,
      phone: v.phone!,
      email: v.email || undefined,
      maritalStatus: v.maritalStatus as any,
      insuranceNumber: v.insuranceNumber || undefined,
      insuranceProvider: v.insuranceProvider || undefined,
      status: 'active',
      address: {
        street: v.street!,
        city: v.city!,
        governorate: v.governorate!,
        country: v.country!,
        postalCode: v.postalCode || undefined,
      },
      emergencyContact: {
        name: v.emergencyName!,
        relation: v.emergencyRelation!,
        phone: v.emergencyPhone!,
      },
      allergies: v.allergies ? v.allergies.split(',').map((s) => s.trim()).filter(Boolean) : [],
      chronicDiseases: v.chronicDiseases ? v.chronicDiseases.split(',').map((s) => s.trim()).filter(Boolean) : [],
      notes: v.notes || undefined,
    };
    this.submitted.emit(request);
  }

  get f() { return this.form.controls; }
  get isEditMode(): boolean { return !!this.patient(); }
}
```

### HTML

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>

  <!-- Section: Personal Info -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-white py-3 border-bottom">
      <h6 class="mb-0 fw-bold">
        <i class="bi bi-person-fill text-primary me-2"></i>
        البيانات الشخصية
      </h6>
    </div>
    <div class="card-body p-4">
      <div class="row g-3">

        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">الاسم الأول <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="firstName"
            [class.is-invalid]="f['firstName'].invalid && f['firstName'].touched"
            placeholder="الاسم الأول" />
          <div class="invalid-feedback">الاسم الأول مطلوب (2 أحرف على الأقل)</div>
        </div>

        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">الاسم الأخير <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="lastName"
            [class.is-invalid]="f['lastName'].invalid && f['lastName'].touched"
            placeholder="الاسم الأخير" />
          <div class="invalid-feedback">الاسم الأخير مطلوب</div>
        </div>

        <div class="col-12 col-md-4">
          <label class="form-label fw-semibold">تاريخ الميلاد <span class="text-danger">*</span></label>
          <input type="date" class="form-control" formControlName="dateOfBirth"
            [class.is-invalid]="f['dateOfBirth'].invalid && f['dateOfBirth'].touched" />
          <div class="invalid-feedback">تاريخ الميلاد مطلوب</div>
        </div>

        <div class="col-12 col-md-4">
          <label class="form-label fw-semibold">الجنس <span class="text-danger">*</span></label>
          <select class="form-select" formControlName="gender"
            [class.is-invalid]="f['gender'].invalid && f['gender'].touched">
            <option value="">اختر الجنس</option>
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </select>
          <div class="invalid-feedback">الجنس مطلوب</div>
        </div>

        <div class="col-12 col-md-4">
          <label class="form-label fw-semibold">فصيلة الدم</label>
          <select class="form-select" formControlName="bloodType">
            <option value="">غير محدد</option>
            @for (bt of bloodTypes; track bt) {
              <option [value]="bt">{{ bt }}</option>
            }
          </select>
        </div>

        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">رقم الهوية الوطنية <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="nationalId"
            [class.is-invalid]="f['nationalId'].invalid && f['nationalId'].touched"
            placeholder="14 رقم" maxlength="14" dir="ltr" />
          <div class="invalid-feedback">رقم الهوية يجب أن يكون 14 رقماً</div>
        </div>

        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">الحالة الاجتماعية <span class="text-danger">*</span></label>
          <select class="form-select" formControlName="maritalStatus"
            [class.is-invalid]="f['maritalStatus'].invalid && f['maritalStatus'].touched">
            <option value="">اختر</option>
            <option value="single">أعزب</option>
            <option value="married">متزوج</option>
            <option value="divorced">مطلق</option>
            <option value="widowed">أرمل</option>
          </select>
          <div class="invalid-feedback">الحالة الاجتماعية مطلوبة</div>
        </div>

      </div>
    </div>
  </div>

  <!-- Section: Contact Info -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-white py-3 border-bottom">
      <h6 class="mb-0 fw-bold">
        <i class="bi bi-telephone-fill text-info me-2"></i>
        بيانات التواصل
      </h6>
    </div>
    <div class="card-body p-4">
      <div class="row g-3">

        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">رقم الهاتف <span class="text-danger">*</span></label>
          <input type="tel" class="form-control" formControlName="phone"
            [class.is-invalid]="f['phone'].invalid && f['phone'].touched"
            placeholder="+20xxxxxxxxxx" dir="ltr" />
          <div class="invalid-feedback">رقم هاتف صحيح مطلوب</div>
        </div>

        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">البريد الإلكتروني</label>
          <input type="email" class="form-control" formControlName="email"
            [class.is-invalid]="f['email'].invalid && f['email'].touched"
            placeholder="example&#64;email.com" dir="ltr" />
          <div class="invalid-feedback">بريد إلكتروني غير صحيح</div>
        </div>

        <div class="col-12">
          <label class="form-label fw-semibold">الشارع <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="street"
            [class.is-invalid]="f['street'].invalid && f['street'].touched"
            placeholder="اسم الشارع ورقم المبنى" />
          <div class="invalid-feedback">العنوان مطلوب</div>
        </div>

        <div class="col-12 col-md-4">
          <label class="form-label fw-semibold">المدينة <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="city"
            [class.is-invalid]="f['city'].invalid && f['city'].touched" placeholder="المدينة" />
          <div class="invalid-feedback">المدينة مطلوبة</div>
        </div>

        <div class="col-12 col-md-4">
          <label class="form-label fw-semibold">المحافظة <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="governorate"
            [class.is-invalid]="f['governorate'].invalid && f['governorate'].touched" placeholder="المحافظة" />
          <div class="invalid-feedback">المحافظة مطلوبة</div>
        </div>

        <div class="col-12 col-md-4">
          <label class="form-label fw-semibold">الدولة <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="country" />
        </div>

      </div>
    </div>
  </div>

  <!-- Section: Emergency Contact -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-white py-3 border-bottom">
      <h6 class="mb-0 fw-bold">
        <i class="bi bi-person-exclamation text-warning me-2"></i>
        جهة الاتصال في حالات الطوارئ
      </h6>
    </div>
    <div class="card-body p-4">
      <div class="row g-3">
        <div class="col-12 col-md-4">
          <label class="form-label fw-semibold">الاسم <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="emergencyName"
            [class.is-invalid]="f['emergencyName'].invalid && f['emergencyName'].touched"
            placeholder="اسم جهة الاتصال" />
          <div class="invalid-feedback">الاسم مطلوب</div>
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label fw-semibold">صلة القرابة <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="emergencyRelation"
            [class.is-invalid]="f['emergencyRelation'].invalid && f['emergencyRelation'].touched"
            placeholder="زوج، أب، أخ..." />
          <div class="invalid-feedback">صلة القرابة مطلوبة</div>
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label fw-semibold">رقم الهاتف <span class="text-danger">*</span></label>
          <input type="tel" class="form-control" formControlName="emergencyPhone"
            [class.is-invalid]="f['emergencyPhone'].invalid && f['emergencyPhone'].touched"
            placeholder="+20xxxxxxxxxx" dir="ltr" />
          <div class="invalid-feedback">رقم هاتف صحيح مطلوب</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Section: Insurance -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-white py-3 border-bottom">
      <h6 class="mb-0 fw-bold">
        <i class="bi bi-shield-check text-success me-2"></i>
        التأمين الصحي
      </h6>
    </div>
    <div class="card-body p-4">
      <div class="row g-3">
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">رقم التأمين</label>
          <input type="text" class="form-control" formControlName="insuranceNumber"
            placeholder="رقم بوليصة التأمين" dir="ltr" />
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">شركة التأمين</label>
          <input type="text" class="form-control" formControlName="insuranceProvider"
            placeholder="اسم شركة التأمين" />
        </div>
      </div>
    </div>
  </div>

  <!-- Section: Medical Info -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-white py-3 border-bottom">
      <h6 class="mb-0 fw-bold">
        <i class="bi bi-file-medical text-danger me-2"></i>
        المعلومات الطبية
      </h6>
    </div>
    <div class="card-body p-4">
      <div class="row g-3">
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">الحساسية</label>
          <input type="text" class="form-control" formControlName="allergies"
            placeholder="مفصولة بفاصلة: بنسلين، أسبرين..." />
          <div class="form-text">أدخل أنواع الحساسية مفصولة بفاصلة</div>
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">الأمراض المزمنة</label>
          <input type="text" class="form-control" formControlName="chronicDiseases"
            placeholder="مفصولة بفاصلة: سكري، ضغط..." />
          <div class="form-text">أدخل الأمراض المزمنة مفصولة بفاصلة</div>
        </div>
        <div class="col-12">
          <label class="form-label fw-semibold">ملاحظات</label>
          <textarea class="form-control" formControlName="notes" rows="3"
            placeholder="أي ملاحظات إضافية..."></textarea>
        </div>
      </div>
    </div>
  </div>

  <!-- Actions -->
  <div class="d-flex gap-3 justify-content-end">
    <button type="button" class="btn btn-outline-secondary px-4" (click)="cancelled.emit()">
      إلغاء
    </button>
    <button type="submit" class="btn btn-primary px-4" [disabled]="isSaving()">
      @if (isSaving()) {
        <span class="spinner-border spinner-border-sm me-2"></span>
        جاري الحفظ...
      } @else {
        <i class="bi bi-check-lg me-2"></i>
        {{ isEditMode ? 'حفظ التعديلات' : 'إضافة المريض' }}
      }
    </button>
  </div>

</form>
```

### SCSS

```scss

```


================================================================================
## src\app\features\patients\presentation\components\patient-summary\patient-summary.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PatientModel, GENDER_LABELS, STATUS_CONFIG } from '../../../domain/models/patient.model';

@Component({
  selector: 'hms-patient-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './patient-summary.component.html',
  styleUrl: './patient-summary.component.scss',
})
export class PatientSummaryComponent {
  readonly patient = input.required<PatientModel>();
  readonly genderLabels = GENDER_LABELS;
  readonly statusConfig = STATUS_CONFIG;

  getInitials(): string {
    const p = this.patient();
    return `${p.firstName.charAt(0)}${p.lastName.charAt(0)}`.toUpperCase();
  }
}
```

### HTML

```html
<div class="d-flex align-items-center gap-3 p-3 bg-white rounded-3 border">

  <!-- Avatar -->
  @if (patient().avatar) {
    <img [src]="patient().avatar" [alt]="patient().fullName"
      class="rounded-circle object-fit-cover flex-shrink-0" width="64" height="64" />
  } @else {
    <div class="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center flex-shrink-0"
      style="width: 64px; height: 64px; font-size: 1.3rem;">
      {{ getInitials() }}
    </div>
  }

  <!-- Info -->
  <div class="flex-grow-1 min-w-0">
    <div class="d-flex align-items-center gap-2 flex-wrap">
      <h5 class="fw-bold mb-0">{{ patient().fullName }}</h5>
      <span class="badge rounded-pill small"
        [ngClass]="statusConfig[patient().status]?.class ?? 'bg-secondary-subtle text-secondary'">
        {{ statusConfig[patient().status]?.label ?? patient().status }}
      </span>
    </div>
    <div class="text-muted small mt-1">
      P-{{ patient().patientNumber }} &bull;
      {{ genderLabels[patient().gender] }} &bull;
      {{ patient().age }} سنة &bull;
      فصيلة الدم: {{ patient().bloodType ?? 'غير محدد' }}
    </div>
    <div class="small mt-1 d-flex flex-wrap gap-3">
      <span class="d-flex align-items-center gap-1 text-muted">
        <i class="bi bi-telephone"></i>
        <span dir="ltr">{{ patient().phone }}</span>
      </span>
      @if (patient().insuranceNumber) {
        <span class="d-flex align-items-center gap-1 text-success">
          <i class="bi bi-shield-check"></i>
          مؤمَّن — {{ patient().insuranceProvider }}
        </span>
      }
    </div>
  </div>

  <!-- Quick Actions -->
  <div class="d-flex flex-column gap-2 flex-shrink-0">
    <a [routerLink]="['/appointments/new']" [queryParams]="{ patientId: patient().id }"
      class="btn btn-sm btn-primary">
      <i class="bi bi-calendar-plus me-1"></i> موعد جديد
    </a>
    <a [routerLink]="['/patients', patient().id, 'edit']"
      class="btn btn-sm btn-outline-secondary">
      <i class="bi bi-pencil me-1"></i> تعديل
    </a>
  </div>

</div>
```

### SCSS

```scss

```


================================================================================
## src\app\features\patients\presentation\pages\patient-detail-page\patient-detail-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PatientsFacade } from '../../../application/facades/patients.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { PatientSummaryComponent } from '../../components/patient-summary/patient-summary.component';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { GENDER_LABELS, STATUS_CONFIG } from '../../../domain/models/patient.model';

@Component({
  selector: 'hms-patient-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, PatientSummaryComponent],
  templateUrl: './patient-detail-page.component.html',
  styleUrl: './patient-detail-page.component.scss',
})
export class PatientDetailPageComponent implements OnInit, OnDestroy {
  readonly facade = inject(PatientsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  readonly genderLabels = GENDER_LABELS;
  readonly statusConfig = STATUS_CONFIG;
  activeTab = 'overview';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.facade.loadById(id);
    this.layout.setPageTitle('Patient Detail', 'تفاصيل المريض');
  }

  ngOnDestroy(): void {
    this.facade.clearSelected();
  }

  onDelete(): void {
    const patient = this.facade.selectedPatient();
    if (!patient) return;
    if (!confirm(`هل أنت متأكد من حذف المريض "${patient.fullName}"؟`)) return;
    this.facade.delete(patient.id).subscribe({
      next: () => this.nav.goTo('/patients'),
    });
  }

  setTab(tab: string): void {
    this.activeTab = tab;
  }
}
```

### HTML

```html
<!-- Breadcrumb -->
<nav aria-label="breadcrumb" class="mb-3">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a routerLink="/patients" class="text-decoration-none">المرضى</a></li>
    <li class="breadcrumb-item active">
      {{ facade.selectedPatient()?.fullName ?? 'تفاصيل المريض' }}
    </li>
  </ol>
</nav>

<!-- Loading -->
@if (facade.isDetailLoading()) {
  <div class="card border-0 shadow-sm p-4 mb-4">
    <div class="d-flex gap-3">
      <div class="placeholder-glow">
        <span class="placeholder rounded-circle d-block" style="width: 64px; height: 64px;"></span>
      </div>
      <div class="placeholder-glow flex-grow-1">
        <span class="placeholder col-5 d-block mb-2 rounded" style="height: 1.5rem;"></span>
        <span class="placeholder col-8 d-block mb-1 rounded"></span>
        <span class="placeholder col-4 rounded"></span>
      </div>
    </div>
  </div>
}

@if (facade.selectedPatient(); as patient) {

  <!-- Patient Summary -->
  <hms-patient-summary [patient]="patient" class="d-block mb-4" />

  <!-- Action Bar -->
  <div class="d-flex gap-2 mb-4 flex-wrap">
    <a [routerLink]="['/appointments/new']" [queryParams]="{ patientId: patient.id }"
      class="btn btn-sm btn-outline-primary">
      <i class="bi bi-calendar-plus me-1"></i> موعد جديد
    </a>
    <a [routerLink]="['/medical-records/new']" [queryParams]="{ patientId: patient.id }"
      class="btn btn-sm btn-outline-info">
      <i class="bi bi-file-plus me-1"></i> سجل طبي
    </a>
    <a [routerLink]="['/prescriptions/new']" [queryParams]="{ patientId: patient.id }"
      class="btn btn-sm btn-outline-success">
      <i class="bi bi-capsule me-1"></i> وصفة طبية
    </a>
    <a [routerLink]="['/patients', patient.id, 'edit']" class="btn btn-sm btn-outline-secondary">
      <i class="bi bi-pencil me-1"></i> تعديل
    </a>
    <button type="button" class="btn btn-sm btn-outline-danger ms-auto" (click)="onDelete()">
      <i class="bi bi-trash me-1"></i> حذف
    </button>
  </div>

  <!-- Tabs -->
  <ul class="nav nav-tabs mb-4">
    <li class="nav-item">
      <button class="nav-link" [class.active]="activeTab === 'overview'" (click)="setTab('overview')">
        <i class="bi bi-person me-1"></i> نظرة عامة
      </button>
    </li>
    <li class="nav-item">
      <button class="nav-link" [class.active]="activeTab === 'medical'" (click)="setTab('medical')">
        <i class="bi bi-file-medical me-1"></i> السجلات الطبية
      </button>
    </li>
    <li class="nav-item">
      <button class="nav-link" [class.active]="activeTab === 'appointments'" (click)="setTab('appointments')">
        <i class="bi bi-calendar-check me-1"></i> المواعيد
      </button>
    </li>
    <li class="nav-item">
      <button class="nav-link" [class.active]="activeTab === 'billing'" (click)="setTab('billing')">
        <i class="bi bi-receipt me-1"></i> الفواتير
      </button>
    </li>
  </ul>

  <!-- Tab: Overview -->
  @if (activeTab === 'overview') {
    <div class="row g-4">

      <!-- Personal Info -->
      <div class="col-12 col-lg-6">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-header bg-white border-bottom py-3">
            <h6 class="mb-0 fw-bold"><i class="bi bi-person-fill text-primary me-2"></i>البيانات الشخصية</h6>
          </div>
          <div class="card-body">
            <dl class="row mb-0 small">
              <dt class="col-5 text-muted fw-normal">الاسم الكامل</dt>
              <dd class="col-7 fw-semibold">{{ patient.fullName }}</dd>
              <dt class="col-5 text-muted fw-normal">تاريخ الميلاد</dt>
              <dd class="col-7">{{ patient.dateOfBirth | date:'dd/MM/yyyy' }}</dd>
              <dt class="col-5 text-muted fw-normal">الجنس</dt>
              <dd class="col-7">{{ genderLabels[patient.gender] }}</dd>
              <dt class="col-5 text-muted fw-normal">فصيلة الدم</dt>
              <dd class="col-7">{{ patient.bloodType ?? '—' }}</dd>
              <dt class="col-5 text-muted fw-normal">رقم الهوية</dt>
              <dd class="col-7" dir="ltr">{{ patient.nationalId }}</dd>
              <dt class="col-5 text-muted fw-normal">الحالة الاجتماعية</dt>
              <dd class="col-7">{{ patient.maritalStatus }}</dd>
            </dl>
          </div>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="col-12 col-lg-6">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-header bg-white border-bottom py-3">
            <h6 class="mb-0 fw-bold"><i class="bi bi-telephone-fill text-info me-2"></i>بيانات التواصل</h6>
          </div>
          <div class="card-body">
            <dl class="row mb-0 small">
              <dt class="col-5 text-muted fw-normal">الهاتف</dt>
              <dd class="col-7" dir="ltr">{{ patient.phone }}</dd>
              <dt class="col-5 text-muted fw-normal">البريد الإلكتروني</dt>
              <dd class="col-7">{{ patient.email ?? '—' }}</dd>
              <dt class="col-5 text-muted fw-normal">المحافظة</dt>
              <dd class="col-7">{{ patient.address.governorate }}</dd>
              <dt class="col-5 text-muted fw-normal">المدينة</dt>
              <dd class="col-7">{{ patient.address.city }}</dd>
              <dt class="col-5 text-muted fw-normal">العنوان</dt>
              <dd class="col-7">{{ patient.address.street }}</dd>
              <dt class="col-5 text-muted fw-normal">طوارئ</dt>
              <dd class="col-7">
                {{ patient.emergencyContact.name }} ({{ patient.emergencyContact.relation }})
                — <span dir="ltr">{{ patient.emergencyContact.phone }}</span>
              </dd>
            </dl>
          </div>
        </div>
      </div>

      <!-- Medical Info -->
      <div class="col-12">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white border-bottom py-3">
            <h6 class="mb-0 fw-bold"><i class="bi bi-file-medical text-danger me-2"></i>المعلومات الطبية</h6>
          </div>
          <div class="card-body">
            <div class="row g-3 small">
              <div class="col-12 col-md-6">
                <p class="text-muted mb-1">الحساسية</p>
                @if (patient.allergies.length > 0) {
                  <div class="d-flex flex-wrap gap-1">
                    @for (a of patient.allergies; track a) {
                      <span class="badge bg-danger-subtle text-danger rounded-pill">{{ a }}</span>
                    }
                  </div>
                } @else {
                  <span class="text-muted">لا توجد حساسية مسجلة</span>
                }
              </div>
              <div class="col-12 col-md-6">
                <p class="text-muted mb-1">الأمراض المزمنة</p>
                @if (patient.chronicDiseases.length > 0) {
                  <div class="d-flex flex-wrap gap-1">
                    @for (d of patient.chronicDiseases; track d) {
                      <span class="badge bg-warning-subtle text-warning rounded-pill">{{ d }}</span>
                    }
                  </div>
                } @else {
                  <span class="text-muted">لا توجد أمراض مزمنة مسجلة</span>
                }
              </div>
              @if (patient.notes) {
                <div class="col-12">
                  <p class="text-muted mb-1">ملاحظات</p>
                  <p class="mb-0">{{ patient.notes }}</p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  }

  <!-- Tab: Medical Records -->
  @if (activeTab === 'medical') {
    <div class="text-center py-5 text-muted">
      <i class="bi bi-file-medical fs-2 d-block mb-2"></i>
      <p class="small">سيتم عرض السجلات الطبية هنا</p>
      <a [routerLink]="['/medical-records']" [queryParams]="{ patientId: patient.id }"
        class="btn btn-sm btn-outline-primary">عرض السجلات</a>
    </div>
  }

  <!-- Tab: Appointments -->
  @if (activeTab === 'appointments') {
    <div class="text-center py-5 text-muted">
      <i class="bi bi-calendar-check fs-2 d-block mb-2"></i>
      <p class="small">سيتم عرض المواعيد هنا</p>
      <a [routerLink]="['/appointments']" [queryParams]="{ patientId: patient.id }"
        class="btn btn-sm btn-outline-primary">عرض المواعيد</a>
    </div>
  }

  <!-- Tab: Billing -->
  @if (activeTab === 'billing') {
    <div class="text-center py-5 text-muted">
      <i class="bi bi-receipt fs-2 d-block mb-2"></i>
      <p class="small">سيتم عرض الفواتير هنا</p>
      <a [routerLink]="['/billing/invoices']" [queryParams]="{ patientId: patient.id }"
        class="btn btn-sm btn-outline-primary">عرض الفواتير</a>
    </div>
  }

}
```

### SCSS

```scss

```


================================================================================
## src\app\features\patients\presentation\pages\patient-form-page\patient-form-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PatientsFacade } from '../../../application/facades/patients.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { PatientFormComponent } from '../../components/patient-form/patient-form.component';
import { CreatePatientRequest } from '../../../domain/repositories/patient.repository';

@Component({
  selector: 'hms-patient-form-page',
  standalone: true,
  imports: [CommonModule, RouterModule, PatientFormComponent],
  templateUrl: './patient-form-page.component.html',
  styleUrl: './patient-form-page.component.scss',
})
export class PatientFormPageComponent implements OnInit {
  readonly facade = inject(PatientsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  patientId: string | null = null;

  get isEditMode(): boolean { return !!this.patientId; }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id');
    if (this.isEditMode) {
      this.facade.loadById(this.patientId!);
      this.layout.setPageTitle('Edit Patient', 'تعديل بيانات المريض');
    } else {
      this.layout.setPageTitle('New Patient', 'إضافة مريض جديد');
    }
  }

  onSubmit(request: CreatePatientRequest): void {
    const action$ = this.isEditMode
      ? this.facade.update(this.patientId!, request)
      : this.facade.create(request);

    action$.subscribe({
      next: (patient) => this.nav.goTo(`/patients/${patient.id}`),
    });
  }

  onCancel(): void {
    this.isEditMode
      ? this.nav.goTo(`/patients/${this.patientId}`)
      : this.nav.goTo('/patients');
  }
}
```

### HTML

```html
<!-- Breadcrumb -->
<nav aria-label="breadcrumb" class="mb-3">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item">
      <a routerLink="/patients" class="text-decoration-none">المرضى</a>
    </li>
    @if (isEditMode && facade.selectedPatient()) {
      <li class="breadcrumb-item">
        <a [routerLink]="['/patients', patientId]" class="text-decoration-none">
          {{ facade.selectedPatient()!.fullName }}
        </a>
      </li>
    }
    <li class="breadcrumb-item active">
      {{ isEditMode ? 'تعديل البيانات' : 'إضافة مريض جديد' }}
    </li>
  </ol>
</nav>

<!-- Page Title -->
<div class="d-flex align-items-center justify-content-between mb-4">
  <h1 class="h4 fw-bold mb-0">
    <i class="bi me-2" [class.bi-person-plus-fill]="!isEditMode" [class.bi-pencil-square]="isEditMode"
      [class.text-primary]="!isEditMode" [class.text-warning]="isEditMode"></i>
    {{ isEditMode ? 'تعديل بيانات المريض' : 'إضافة مريض جديد' }}
  </h1>
</div>

<!-- Error Alert -->
@if (facade.hasError()) {
  <div class="alert alert-danger d-flex align-items-center gap-2 mb-4">
    <i class="bi bi-exclamation-circle-fill"></i>
    {{ facade.error() }}
    <button class="btn-close btn-close-sm ms-auto" (click)="facade.clearError()"></button>
  </div>
}

<!-- Loading (Edit Mode) -->
@if (isEditMode && facade.isDetailLoading()) {
  <div class="text-center py-5">
    <div class="spinner-border text-primary mb-3" role="status"></div>
    <p class="text-muted">جاري تحميل بيانات المريض...</p>
  </div>
} @else {
  <hms-patient-form
    [patient]="isEditMode ? facade.selectedPatient() : null"
    [isSaving]="facade.isSaving()"
    (submitted)="onSubmit($event)"
    (cancelled)="onCancel()"
  />
}
```

### SCSS

```scss

```


================================================================================
## src\app\features\patients\presentation\pages\patient-list-page\patient-list-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PatientsFacade } from '../../../application/facades/patients.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { PatientCardComponent } from '../../components/patient-card/patient-card.component';
import { PatientFilterComponent } from '../../components/patient-filter/patient-filter.component';
import { PatientFilter } from '../../../domain/models/patient-filter.model';

@Component({
  selector: 'hms-patient-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, PatientCardComponent, PatientFilterComponent],
  templateUrl: './patient-list-page.component.html',
  styleUrl: './patient-list-page.component.scss',
})
export class PatientListPageComponent implements OnInit {
  readonly facade = inject(PatientsFacade);
  private readonly layout = inject(LayoutService);

  ngOnInit(): void {
    this.layout.setPageTitle('Patients', 'المرضى');
    this.facade.loadAll();
  }

  onFilterChanged(filter: Partial<PatientFilter>): void {
    this.facade.applyFilter({ ...this.facade.filter(), ...filter, page: 1 });
  }

  onFilterReset(): void {
    this.facade.resetFilter();
  }

  onDelete(id: string): void {
    if (!confirm('هل أنت متأكد من حذف هذا المريض؟')) return;
    this.facade.delete(id).subscribe();
  }

  onPageChange(page: number): void {
    this.facade.changePage(page);
  }

  get pages(): number[] {
    return Array.from({ length: this.facade.totalPages() }, (_, i) => i + 1);
  }
}
```

### HTML

```html
<!-- Header -->
<div class="page-header card mb-4">
  <div class="card-body p-4 p-md-5">
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
      <div>
        <div class="d-flex align-items-center gap-2 mb-2">
          <span class="page-icon"><i class="bi bi-people-fill"></i></span>
          <h1 class="h4 fw-bold mb-0">المرضى</h1>
        </div>
        @if (!facade.isLoading()) {
          <p class="text-muted mb-0">إجمالي: {{ facade.totalPatients() | number }} مريض</p>
        }
      </div>
      <a routerLink="/patients/new" class="btn btn-primary">
        <i class="bi bi-person-plus-fill me-2"></i>
        إضافة مريض جديد
      </a>
    </div>
  </div>
</div>

<!-- Filter -->
<div class="mb-4">
  <hms-patient-filter
    (filterChanged)="onFilterChanged($event)"
    (filterReset)="onFilterReset()"
  />
</div>

<!-- Error -->
@if (facade.hasError()) {
  <div class="alert alert-danger d-flex align-items-center gap-2 mb-4">
    <i class="bi bi-exclamation-circle-fill"></i>
    {{ facade.error() }}
    <button class="btn btn-sm btn-danger ms-auto" (click)="facade.loadAll()">إعادة المحاولة</button>
  </div>
}

<!-- Loading Skeleton -->
@if (facade.isLoading()) {
  <div class="row g-3">
    @for (i of [1,2,3,4,6,8]; track i) {
      <div class="col-12 col-md-6 col-xl-4">
        <div class="card border-0 shadow-sm p-3">
          <div class="d-flex gap-3 mb-3">
            <div class="placeholder-glow">
              <span class="placeholder rounded-circle d-block" style="width: 48px; height: 48px;"></span>
            </div>
            <div class="placeholder-glow flex-grow-1">
              <span class="placeholder col-8 d-block mb-1 rounded"></span>
              <span class="placeholder col-4 rounded"></span>
            </div>
          </div>
          <div class="placeholder-glow">
            <span class="placeholder col-12 d-block mb-1 rounded"></span>
            <span class="placeholder col-8 rounded"></span>
          </div>
        </div>
      </div>
    }
  </div>

<!-- Empty State -->
} @else if (!facade.hasPatients()) {
  <div class="text-center py-5">
    <i class="bi bi-people fs-1 text-muted d-block mb-3"></i>
    <h5 class="fw-bold text-muted">لا يوجد مرضى</h5>
    <p class="text-muted small mb-4">لم يتم العثور على مرضى مطابقين للبحث</p>
    <a routerLink="/patients/new" class="btn btn-primary">
      <i class="bi bi-person-plus me-2"></i>
      إضافة أول مريض
    </a>
  </div>

<!-- Patients Grid -->
} @else {
  <div class="row g-4 mb-4">
    @for (patient of facade.patients().items; track patient.id) {
      <div class="col-12 col-md-6 col-xl-4">
        <hms-patient-card
          [patient]="patient"
          (deleted)="onDelete($event)"
        />
      </div>
    }
  </div>

  <!-- Pagination -->
  @if (facade.totalPages() > 1) {
    <nav aria-label="تصفح الصفحات">
      <ul class="pagination justify-content-center">
        <li class="page-item" [class.disabled]="facade.currentPage() === 1">
          <button class="page-link" (click)="onPageChange(facade.currentPage() - 1)">
            <i class="bi bi-chevron-right"></i>
          </button>
        </li>
        @for (page of pages; track page) {
          <li class="page-item" [class.active]="page === facade.currentPage()">
            <button class="page-link" (click)="onPageChange(page)">{{ page }}</button>
          </li>
        }
        <li class="page-item" [class.disabled]="facade.currentPage() === facade.totalPages()">
          <button class="page-link" (click)="onPageChange(facade.currentPage() + 1)">
            <i class="bi bi-chevron-left"></i>
          </button>
        </li>
      </ul>
    </nav>
  }
}
```

### SCSS

```scss
:host {
  display: block;
}

.page-header {
  border: 1px solid var(--app-border);
  border-radius: 22px;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(14, 165, 233, 0.06) 100%);
}

.page-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--app-primary) 0%, var(--app-accent) 100%);
  color: #fff;
  font-size: 1.1rem;
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.18);
}

```


================================================================================
## src\app\features\prescriptions\presentation\components\dosage-instructions\dosage-instructions.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicationModel } from '../../../domain/models/prescription.model';

@Component({
  selector: 'hms-dosage-instructions',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (medication()) {
      <div class="dosage-instructions p-3 bg-light rounded-3 small">
        <h6 class="fw-bold mb-2">
          <i class="bi bi-capsule text-primary me-2"></i>{{ medication()!.name }}
        </h6>
        <ul class="list-unstyled mb-0">
          <li class="d-flex gap-2 mb-1">
            <i class="bi bi-clock text-muted flex-shrink-0"></i>
            <span>{{ medication()!.dosage.frequency }} مرة يومياً عبر {{ medication()!.dosage.route }}</span>
          </li>
          @if (medication()!.dosage.times.length > 0) {
            <li class="d-flex gap-2 mb-1">
              <i class="bi bi-alarm text-muted flex-shrink-0"></i>
              <span>مواعيد: {{ medication()!.dosage.times.join(' ، ') }}</span>
            </li>
          }
          <li class="d-flex gap-2 mb-1">
            <i class="bi bi-egg-fried text-muted flex-shrink-0"></i>
            <span>{{ medication()!.dosage.withFood ? 'تُؤخذ مع الطعام' : 'تُؤخذ على معدة فارغة' }}</span>
          </li>
          @if (medication()!.dosage.notes) {
            <li class="d-flex gap-2">
              <i class="bi bi-info-circle text-info flex-shrink-0"></i>
              <span class="text-info">{{ medication()!.dosage.notes }}</span>
            </li>
          }
        </ul>
      </div>
    }
  `,
})
export class DosageInstructionsComponent {
  readonly medication = input<MedicationModel | null>(null);
}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\prescriptions\presentation\components\medication-list\medication-list.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicationModel } from '../../../domain/models/prescription.model';

@Component({
  selector: 'hms-medication-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medication-list.component.html',
  styleUrl: './medication-list.component.scss',
})
export class MedicationListComponent {
  readonly medications = input<MedicationModel[]>([]);

  getDurationLabel(unit: string): string {
    const map: Record<string, string> = { days: 'يوم', weeks: 'أسبوع', months: 'شهر' };
    return map[unit] ?? unit;
  }

  getTimesDisplay(times: string[]): string {
    return times.join(' ، ') || '—';
  }
}
```

### HTML

```html
@if (medications().length === 0) {
  <div class="text-center py-4 text-muted">
    <i class="bi bi-capsule fs-2 d-block mb-2"></i>
    <small>لا توجد أدوية في هذه الوصفة</small>
  </div>
} @else {
  <div class="list-group list-group-flush">
    @for (med of medications(); track med.id; let i = $index) {
      <div class="list-group-item px-0 py-3">
        <div class="d-flex align-items-start gap-3">
          <!-- Number -->
          <div class="rounded-circle bg-primary-subtle text-primary fw-bold d-flex align-items-center justify-content-center flex-shrink-0"
            style="width:32px;height:32px;font-size:0.85rem;">
            {{ i + 1 }}
          </div>

          <div class="flex-grow-1 min-w-0">
            <!-- Name + Form -->
            <div class="fw-bold">{{ med.name }}</div>
            @if (med.genericName) {
              <div class="text-muted small">({{ med.genericName }})</div>
            }
            <div class="d-flex flex-wrap gap-2 mt-1">
              <span class="badge bg-light text-dark border small">{{ med.form }}</span>
              <span class="badge bg-light text-dark border small" dir="ltr">{{ med.strength }}</span>
            </div>

            <!-- Dosage Details -->
            <div class="row g-2 mt-2 small text-muted">
              <div class="col-12 col-sm-6">
                <i class="bi bi-clock me-1"></i>
                {{ med.dosage.frequency }} مرة يومياً
                @if (med.dosage.times.length > 0) {
                  — {{ getTimesDisplay(med.dosage.times) }}
                }
              </div>
              <div class="col-12 col-sm-6">
                <i class="bi bi-arrow-right-circle me-1"></i>
                {{ med.dosage.route }}
                @if (med.dosage.withFood) { — مع الطعام }
              </div>
              <div class="col-12 col-sm-6">
                <i class="bi bi-calendar3 me-1"></i>
                المدة: {{ med.duration }} {{ getDurationLabel(med.durationUnit) }}
              </div>
              <div class="col-12 col-sm-6">
                <i class="bi bi-boxes me-1"></i>
                الكمية: {{ med.quantity }} {{ med.unit }}
              </div>
            </div>

            @if (med.instructions) {
              <div class="mt-2 small text-info">
                <i class="bi bi-info-circle me-1"></i>{{ med.instructions }}
              </div>
            }
            @if (med.isSubstitutionAllowed) {
              <div class="mt-1 small text-success">
                <i class="bi bi-check-circle me-1"></i>يُسمح بالبديل
              </div>
            }
          </div>
        </div>
      </div>
    }
  </div>
}
```

### SCSS

```scss

```


================================================================================
## src\app\features\prescriptions\presentation\components\prescription-form\prescription-form.component
================================================================================

### TypeScript

```typescript
import { Component, inject, input, output, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PrescriptionModel } from '../../../domain/models/prescription.model';
import { CreatePrescriptionRequest } from '../../../domain/repositories/prescription.repository';
import { MEDICATION_FORMS, MEDICATION_ROUTES, DURATION_UNITS } from '../../../domain/models/prescription-filter.model';

@Component({
  selector: 'hms-prescription-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './prescription-form.component.html',
  styleUrl: './prescription-form.component.scss',
})
export class PrescriptionFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  readonly prescription = input<PrescriptionModel | null>(null);
  readonly isSaving = input<boolean>(false);
  readonly prefillPatientId = input<string>('');
  readonly submitted = output<CreatePrescriptionRequest>();
  readonly cancelled = output<void>();

  readonly medicationForms = MEDICATION_FORMS;
  readonly medicationRoutes = MEDICATION_ROUTES;
  readonly durationUnits = DURATION_UNITS;

  form = this.fb.group({
    patientId:   ['', Validators.required],
    doctorId:    ['', Validators.required],
    expiresAt:   ['', Validators.required],
    diagnosis:   [''],
    notes:       [''],
    medications: this.fb.array([]),
  });

  get medicationsArray(): FormArray { return this.form.get('medications') as FormArray; }
  get f() { return this.form.controls; }
  get isEdit(): boolean { return !!this.prescription(); }

  ngOnInit(): void {
    const p = this.prescription();
    if (p) {
      this.form.patchValue({
        patientId: p.patientId, doctorId: p.doctorId,
        expiresAt: p.expiresAt.split('T')[0],
        diagnosis: p.diagnosis ?? '', notes: p.notes ?? '',
      });
      p.medications.forEach((med) => this.addMedication(med));
    } else {
      if (this.prefillPatientId()) this.form.patchValue({ patientId: this.prefillPatientId() });
      const defaultExpiry = new Date();
      defaultExpiry.setDate(defaultExpiry.getDate() + 30);
      this.form.patchValue({ expiresAt: defaultExpiry.toISOString().split('T')[0] });
      this.addMedication();
    }
  }

  addMedication(med?: any): void {
    this.medicationsArray.push(this.fb.group({
      name:                   [med?.name ?? '',       Validators.required],
      genericName:            [med?.genericName ?? ''],
      form:                   [med?.form ?? 'أقراص',  Validators.required],
      strength:               [med?.strength ?? '',   Validators.required],
      quantity:               [med?.quantity ?? 1,    [Validators.required, Validators.min(1)]],
      unit:                   [med?.unit ?? 'علبة',   Validators.required],
      frequency:              [med?.dosage?.frequency ?? 1, [Validators.required, Validators.min(1)]],
      times:                  [med?.dosage?.times?.join(', ') ?? ''],
      route:                  [med?.dosage?.route ?? 'فموي', Validators.required],
      withFood:               [med?.dosage?.withFood ?? false],
      duration:               [med?.duration ?? 7,   [Validators.required, Validators.min(1)]],
      durationUnit:           [med?.durationUnit ?? 'days', Validators.required],
      instructions:           [med?.instructions ?? ''],
      isSubstitutionAllowed:  [med?.isSubstitutionAllowed ?? false],
    }));
  }

  removeMedication(index: number): void {
    if (this.medicationsArray.length > 1) this.medicationsArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.getRawValue();
    this.submitted.emit({
      patientId:  v.patientId!,
      doctorId:   v.doctorId!,
      expiresAt:  v.expiresAt!,
      diagnosis:  v.diagnosis || undefined,
      notes:      v.notes || undefined,
      medications: (v.medications as any[]).map((m) => ({
        name:                   m.name,
        genericName:            m.genericName || undefined,
        form:                   m.form,
        strength:               m.strength,
        quantity:               m.quantity,
        unit:                   m.unit,
        frequency:              m.frequency,
        times:                  m.times ? m.times.split(',').map((t: string) => t.trim()) : [],
        route:                  m.route,
        withFood:               m.withFood,
        duration:               m.duration,
        durationUnit:           m.durationUnit,
        instructions:           m.instructions || undefined,
        isSubstitutionAllowed:  m.isSubstitutionAllowed,
      })),
    });
  }
}
```

### HTML

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>

  <!-- Header Info -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-white py-3 border-bottom">
      <h6 class="mb-0 fw-bold"><i class="bi bi-info-circle text-primary me-2"></i>معلومات الوصفة</h6>
    </div>
    <div class="card-body p-4">
      <div class="row g-3">
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">معرّف المريض <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="patientId"
            [class.is-invalid]="f['patientId'].invalid && f['patientId'].touched" dir="ltr" />
          <div class="invalid-feedback">معرّف المريض مطلوب</div>
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold">معرّف الطبيب <span class="text-danger">*</span></label>
          <input type="text" class="form-control" formControlName="doctorId"
            [class.is-invalid]="f['doctorId'].invalid && f['doctorId'].touched" dir="ltr" />
          <div class="invalid-feedback">معرّف الطبيب مطلوب</div>
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label fw-semibold">تاريخ الانتهاء <span class="text-danger">*</span></label>
          <input type="date" class="form-control" formControlName="expiresAt"
            [class.is-invalid]="f['expiresAt'].invalid && f['expiresAt'].touched" />
          <div class="invalid-feedback">تاريخ الانتهاء مطلوب</div>
        </div>
        <div class="col-12 col-md-8">
          <label class="form-label fw-semibold">التشخيص</label>
          <input type="text" class="form-control" formControlName="diagnosis"
            placeholder="التشخيص المرتبط بالوصفة" />
        </div>
        <div class="col-12">
          <label class="form-label fw-semibold">ملاحظات</label>
          <textarea class="form-control" formControlName="notes" rows="2"
            placeholder="تعليمات عامة للمريض..."></textarea>
        </div>
      </div>
    </div>
  </div>

  <!-- Medications -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-white py-3 border-bottom d-flex align-items-center justify-content-between">
      <h6 class="mb-0 fw-bold"><i class="bi bi-capsule text-success me-2"></i>الأدوية</h6>
      <button type="button" class="btn btn-sm btn-outline-success" (click)="addMedication()">
        <i class="bi bi-plus-lg me-1"></i>إضافة دواء
      </button>
    </div>
    <div class="card-body p-4">
      <div formArrayName="medications">
        @for (med of medicationsArray.controls; track $index; let i = $index) {
          <div [formGroupName]="i" class="border rounded-3 p-3 mb-3">

            <!-- Med Header -->
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h6 class="fw-bold mb-0 text-primary">
                <i class="bi bi-capsule me-2"></i>دواء {{ i + 1 }}
              </h6>
              @if (medicationsArray.length > 1) {
                <button type="button" class="btn btn-sm btn-outline-danger" (click)="removeMedication(i)">
                  <i class="bi bi-trash me-1"></i>إزالة
                </button>
              }
            </div>

            <div class="row g-3">
              <div class="col-12 col-md-6">
                <label class="form-label small fw-semibold">اسم الدواء <span class="text-danger">*</span></label>
                <input type="text" class="form-control form-control-sm" formControlName="name"
                  [class.is-invalid]="med.get('name')!.invalid && med.get('name')!.touched"
                  placeholder="اسم الدواء التجاري" />
                <div class="invalid-feedback">اسم الدواء مطلوب</div>
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label small fw-semibold">الاسم العلمي</label>
                <input type="text" class="form-control form-control-sm" formControlName="genericName"
                  placeholder="الاسم العلمي (اختياري)" />
              </div>
              <div class="col-6 col-md-3">
                <label class="form-label small fw-semibold">الشكل <span class="text-danger">*</span></label>
                <select class="form-select form-select-sm" formControlName="form">
                  @for (f of medicationForms; track f) {
                    <option [value]="f">{{ f }}</option>
                  }
                </select>
              </div>
              <div class="col-6 col-md-3">
                <label class="form-label small fw-semibold">التركيز <span class="text-danger">*</span></label>
                <input type="text" class="form-control form-control-sm" formControlName="strength"
                  placeholder="500mg" dir="ltr" />
              </div>
              <div class="col-6 col-md-3">
                <label class="form-label small fw-semibold">الكمية <span class="text-danger">*</span></label>
                <input type="number" class="form-control form-control-sm" formControlName="quantity" min="1" />
              </div>
              <div class="col-6 col-md-3">
                <label class="form-label small fw-semibold">الوحدة</label>
                <input type="text" class="form-control form-control-sm" formControlName="unit" placeholder="علبة، قرص..." />
              </div>
              <div class="col-6 col-md-3">
                <label class="form-label small fw-semibold">التكرار (مرة/يوم)</label>
                <input type="number" class="form-control form-control-sm" formControlName="frequency" min="1" />
              </div>
              <div class="col-6 col-md-3">
                <label class="form-label small fw-semibold">طريقة الاستخدام</label>
                <select class="form-select form-select-sm" formControlName="route">
                  @for (r of medicationRoutes; track r) {
                    <option [value]="r">{{ r }}</option>
                  }
                </select>
              </div>
              <div class="col-6 col-md-3">
                <label class="form-label small fw-semibold">المدة</label>
                <input type="number" class="form-control form-control-sm" formControlName="duration" min="1" />
              </div>
              <div class="col-6 col-md-3">
                <label class="form-label small fw-semibold">وحدة المدة</label>
                <select class="form-select form-select-sm" formControlName="durationUnit">
                  @for (du of durationUnits; track du.value) {
                    <option [value]="du.value">{{ du.label }}</option>
                  }
                </select>
              </div>
              <div class="col-12">
                <label class="form-label small fw-semibold">مواعيد الجرعات</label>
                <input type="text" class="form-control form-control-sm" formControlName="times"
                  placeholder="مفصولة بفاصلة: الصباح، الظهر، المساء" />
              </div>
              <div class="col-12">
                <label class="form-label small fw-semibold">تعليمات خاصة</label>
                <input type="text" class="form-control form-control-sm" formControlName="instructions"
                  placeholder="أي تعليمات خاصة للمريض..." />
              </div>
              <div class="col-12 d-flex gap-4">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" [id]="'withFood'+i" formControlName="withFood" />
                  <label class="form-check-label small" [for]="'withFood'+i">مع الطعام</label>
                </div>
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" [id]="'substitution'+i" formControlName="isSubstitutionAllowed" />
                  <label class="form-check-label small" [for]="'substitution'+i">يُسمح بالبديل</label>
                </div>
              </div>
            </div>

          </div>
        }
      </div>
    </div>
  </div>

  <!-- Actions -->
  <div class="d-flex gap-3 justify-content-end">
    <button type="button" class="btn btn-outline-secondary px-4" (click)="cancelled.emit()">إلغاء</button>
    <button type="submit" class="btn btn-primary px-4" [disabled]="isSaving()">
      @if (isSaving()) {
        <span class="spinner-border spinner-border-sm me-2"></span>جاري الحفظ...
      } @else {
        <i class="bi bi-check-lg me-2"></i>{{ isEdit ? 'حفظ التعديلات' : 'إصدار الوصفة' }}
      }
    </button>
  </div>

</form>
```

### SCSS

```scss

```


================================================================================
## src\app\features\prescriptions\presentation\pages\prescription-detail-page\prescription-detail-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PrescriptionsFacade } from '../../../application/facades/prescriptions.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { MedicationListComponent } from '../../components/medication-list/medication-list.component';
import { PRESCRIPTION_STATUS_CONFIG } from '../../../domain/models/prescription.model';

@Component({
  selector: 'hms-prescription-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MedicationListComponent],
  templateUrl: './prescription-detail-page.component.html',
  styleUrl: './prescription-detail-page.component.scss',
})
export class PrescriptionDetailPageComponent implements OnInit, OnDestroy {
  readonly facade = inject(PrescriptionsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  readonly statusConfig = PRESCRIPTION_STATUS_CONFIG;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.facade.loadById(id);
    this.layout.setPageTitle('Prescription', 'الوصفة الطبية');
  }

  ngOnDestroy(): void { this.facade.clearSelected(); }

  onDispense(): void {
    const p = this.facade.selectedPrescription();
    if (!p || !confirm('هل تريد تأكيد صرف هذه الوصفة؟')) return;
    this.facade.dispense(p.id).subscribe();
  }

  onCancel(): void {
    const p = this.facade.selectedPrescription();
    if (!p) return;
    const reason = prompt('سبب الإلغاء:');
    if (reason) this.facade.cancel(p.id, reason).subscribe();
  }

  onDelete(): void {
    const p = this.facade.selectedPrescription();
    if (!p || !confirm('هل أنت متأكد من حذف هذه الوصفة؟')) return;
    this.facade.delete(p.id).subscribe({ next: () => this.nav.goTo('/prescriptions') });
  }

  isExpired(expiresAt: string): boolean {
    return new Date(expiresAt) < new Date();
  }
}
```

### HTML

```html
<nav aria-label="breadcrumb" class="mb-3">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a routerLink="/prescriptions" class="text-decoration-none">الوصفات الطبية</a></li>
    <li class="breadcrumb-item active">تفاصيل الوصفة</li>
  </ol>
</nav>

@if (facade.isDetailLoading()) {
  <div class="text-center py-5"><div class="spinner-border text-primary" role="status"></div></div>
}

@if (facade.selectedPrescription(); as p) {

  <!-- Header -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-body p-4">
      <div class="d-flex align-items-start justify-content-between flex-wrap gap-3">
        <div>
          <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
            <h2 class="h5 fw-bold mb-0">وصفة #{{ p.prescriptionNumber }}</h2>
            <span class="badge rounded-pill" [ngClass]="statusConfig[p.status]?.class ?? 'bg-secondary-subtle text-secondary'">
              <i class="bi me-1" [ngClass]="statusConfig[p.status]?.icon ?? 'bi-circle'"></i>
              {{ statusConfig[p.status]?.label ?? p.status }}
            </span>
            @if (isExpired(p.expiresAt) && p.status === 'active') {
              <span class="badge bg-warning text-dark">منتهية الصلاحية</span>
            }
          </div>
          <div class="text-muted small">
            <a [routerLink]="['/patients', p.patientId]" class="text-decoration-none fw-semibold">
              {{ p.patientName }}
            </a>
            &nbsp;|&nbsp; د. {{ p.doctorName }}
            &nbsp;|&nbsp; صدرت: {{ p.issuedAt | date:'dd/MM/yyyy' }}
            &nbsp;|&nbsp; تنتهي: {{ p.expiresAt | date:'dd/MM/yyyy' }}
          </div>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          @if (p.status === 'active' && !isExpired(p.expiresAt)) {
            <button type="button" class="btn btn-sm btn-success" (click)="onDispense()">
              <i class="bi bi-bag-check me-1"></i>صرف الوصفة
            </button>
            <button type="button" class="btn btn-sm btn-outline-warning" (click)="onCancel()">
              <i class="bi bi-x-circle me-1"></i>إلغاء
            </button>
          }
          <a [routerLink]="['/prescriptions', p.id, 'edit']" class="btn btn-sm btn-outline-secondary">
            <i class="bi bi-pencil me-1"></i>تعديل
          </a>
          <button type="button" class="btn btn-sm btn-outline-danger" (click)="onDelete()">
            <i class="bi bi-trash me-1"></i>حذف
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Info Row -->
  <div class="row g-4 mb-4">
    <div class="col-12 col-lg-4">
      <div class="card border-0 shadow-sm h-100">
        <div class="card-header bg-white border-bottom py-3">
          <h6 class="mb-0 fw-bold"><i class="bi bi-info-circle text-primary me-2"></i>معلومات</h6>
        </div>
        <div class="card-body">
          <dl class="row small mb-0">
            <dt class="col-5 text-muted fw-normal">المريض</dt>
            <dd class="col-7">
              <a [routerLink]="['/patients', p.patientId]" class="text-decoration-none">{{ p.patientName }}</a>
            </dd>
            <dt class="col-5 text-muted fw-normal">الطبيب</dt>
            <dd class="col-7">
              <a [routerLink]="['/doctors', p.doctorId]" class="text-decoration-none">د. {{ p.doctorName }}</a>
            </dd>
            <dt class="col-5 text-muted fw-normal">التشخيص</dt>
            <dd class="col-7">{{ p.diagnosis ?? '—' }}</dd>
            <dt class="col-5 text-muted fw-normal">عدد الأدوية</dt>
            <dd class="col-7 fw-bold text-primary">{{ p.medications.length }}</dd>
            @if (p.dispensedAt) {
              <dt class="col-5 text-muted fw-normal">تاريخ الصرف</dt>
              <dd class="col-7 text-success">{{ p.dispensedAt | date:'dd/MM/yyyy' }}</dd>
              <dt class="col-5 text-muted fw-normal">صُرِّفت بواسطة</dt>
              <dd class="col-7">{{ p.dispensedBy }}</dd>
            }
          </dl>
          @if (p.notes) {
            <hr class="my-2">
            <p class="small mb-0"><span class="text-muted">ملاحظات:</span> {{ p.notes }}</p>
          }
        </div>
      </div>
    </div>

    <div class="col-12 col-lg-8">
      <div class="card border-0 shadow-sm h-100">
        <div class="card-header bg-white border-bottom py-3">
          <h6 class="mb-0 fw-bold"><i class="bi bi-capsule text-success me-2"></i>الأدوية الموصوفة</h6>
        </div>
        <div class="card-body p-3">
          <hms-medication-list [medications]="p.medications" />
        </div>
      </div>
    </div>
  </div>

}
```

### SCSS

```scss

```


================================================================================
## src\app\features\prescriptions\presentation\pages\prescription-form-page\prescription-form-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PrescriptionsFacade } from '../../../application/facades/prescriptions.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { PrescriptionFormComponent } from '../../components/prescription-form/prescription-form.component';
import { CreatePrescriptionRequest } from '../../../domain/repositories/prescription.repository';

@Component({
  selector: 'hms-prescription-form-page',
  standalone: true,
  imports: [CommonModule, RouterModule, PrescriptionFormComponent],
  template: `
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb small">
        <li class="breadcrumb-item"><a routerLink="/prescriptions" class="text-decoration-none">الوصفات الطبية</a></li>
        <li class="breadcrumb-item active">{{ isEdit ? 'تعديل' : 'وصفة جديدة' }}</li>
      </ol>
    </nav>
    <h1 class="h4 fw-bold mb-4">
      <i class="bi me-2"
        [class.bi-file-plus-fill]="!isEdit"
        [class.bi-pencil-square]="isEdit"
        [class.text-primary]="!isEdit"
        [class.text-warning]="isEdit"></i>
      {{ isEdit ? 'تعديل الوصفة الطبية' : 'إصدار وصفة طبية جديدة' }}
    </h1>
    @if (facade.hasError()) {
      <div class="alert alert-danger d-flex gap-2 align-items-center mb-4">
        <i class="bi bi-exclamation-circle-fill"></i>{{ facade.error() }}
        <button class="btn-close ms-auto" (click)="facade.clearError()"></button>
      </div>
    }
    @if (isEdit && facade.isDetailLoading()) {
      <div class="text-center py-5"><div class="spinner-border text-primary" role="status"></div></div>
    } @else {
      <hms-prescription-form
        [prescription]="isEdit ? facade.selectedPrescription() : null"
        [isSaving]="facade.isSaving()"
        [prefillPatientId]="prefillPatientId"
        (submitted)="onSubmit($event)"
        (cancelled)="onCancel()"
      />
    }
  `,
})
export class PrescriptionFormPageComponent implements OnInit {
  readonly facade = inject(PrescriptionsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  prescriptionId: string | null = null;
  prefillPatientId = '';

  get isEdit(): boolean { return !!this.prescriptionId; }

  ngOnInit(): void {
    this.prescriptionId = this.route.snapshot.paramMap.get('id');
    this.prefillPatientId = this.route.snapshot.queryParams['patientId'] ?? '';
    if (this.isEdit) {
      this.facade.loadById(this.prescriptionId!);
      this.layout.setPageTitle('Edit Prescription', 'تعديل الوصفة الطبية');
    } else {
      this.layout.setPageTitle('New Prescription', 'وصفة طبية جديدة');
    }
  }

  onSubmit(req: CreatePrescriptionRequest): void {
    const action$ = this.isEdit
      ? this.facade.update(this.prescriptionId!, req)
      : this.facade.create(req);
    action$.subscribe({ next: (p) => this.nav.goTo(`/prescriptions/${p.id}`) });
  }

  onCancel(): void {
    this.isEdit ? this.nav.goTo(`/prescriptions/${this.prescriptionId}`) : this.nav.goTo('/prescriptions');
  }
}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\prescriptions\presentation\pages\prescription-list-page\prescription-list-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { PrescriptionsFacade } from '../../../application/facades/prescriptions.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { PRESCRIPTION_STATUS_CONFIG } from '../../../domain/models/prescription.model';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'hms-prescription-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './prescription-list-page.component.html',
  styleUrl: './prescription-list-page.component.scss',
})
export class PrescriptionListPageComponent implements OnInit {
  readonly facade = inject(PrescriptionsFacade);
  private readonly layout = inject(LayoutService);
  private readonly fb = inject(FormBuilder);

  readonly statusConfig = PRESCRIPTION_STATUS_CONFIG;
  searchForm = this.fb.group({ search: [''], status: [''] });

  ngOnInit(): void {
    this.layout.setPageTitle('Prescriptions', 'الوصفات الطبية');
    this.facade.loadAll();
    this.searchForm.get('search')!.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.applyFilter());
    this.searchForm.valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.applyFilter());
  }

  applyFilter(): void {
    const v = this.searchForm.value;
    this.facade.applyFilter({
      ...this.facade.filter(),
      search: v.search ?? '',
      status: (v.status as any) || undefined,
      page: 1,
    });
  }

  onDispense(id: string): void {
    if (!confirm('هل تريد تأكيد صرف هذه الوصفة؟')) return;
    this.facade.dispense(id).subscribe();
  }

  onCancel(id: string): void {
    const reason = prompt('سبب الإلغاء:');
    if (reason) this.facade.cancel(id, reason).subscribe();
  }

  onDelete(id: string): void {
    if (!confirm('هل أنت متأكد من حذف هذه الوصفة؟')) return;
    this.facade.delete(id).subscribe();
  }

  onPageChange(page: number): void { this.facade.changePage(page); }
  get pages(): number[] {
    return Array.from({ length: this.facade.totalPages() }, (_, i) => i + 1);
  }

  isExpired(expiresAt: string): boolean {
    return new Date(expiresAt) < new Date();
  }
}
```

### HTML

```html
<div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
  <div>
    <h1 class="h4 fw-bold mb-0">الوصفات الطبية</h1>
    @if (!facade.isLoading() && facade.activeCount() > 0) {
      <p class="text-success small mb-0">
        <i class="bi bi-check-circle me-1"></i>{{ facade.activeCount() }} وصفة نشطة
      </p>
    }
  </div>
  <a routerLink="/prescriptions/new" class="btn btn-primary">
    <i class="bi bi-file-plus-fill me-2"></i>وصفة جديدة
  </a>
</div>

<!-- Filter -->
<div class="card border-0 shadow-sm mb-4">
  <div class="card-body p-3">
    <div [formGroup]="searchForm" class="row g-2">
      <div class="col-12 col-md-7">
        <div class="input-group input-group-sm">
          <span class="input-group-text bg-light"><i class="bi bi-search text-muted"></i></span>
          <input type="text" class="form-control border-start-0" formControlName="search"
            placeholder="اسم المريض، الطبيب، التشخيص..." />
        </div>
      </div>
      <div class="col-12 col-md-3">
        <select class="form-select form-select-sm" formControlName="status">
          <option value="">كل الحالات</option>
          @for (s of statusConfig | keyvalue; track s.key) {
            <option [value]="s.key">{{ s.value.label }}</option>
          }
        </select>
      </div>
    </div>
  </div>
</div>

@if (facade.hasError()) {
  <div class="alert alert-danger d-flex gap-2 align-items-center mb-4">
    <i class="bi bi-exclamation-circle-fill"></i>{{ facade.error() }}
    <button class="btn btn-sm btn-danger ms-auto" (click)="facade.loadAll()">إعادة المحاولة</button>
  </div>
}

@if (facade.isLoading()) {
  <div class="card border-0 shadow-sm">
    @for (i of [1,2,3,4]; track i) {
      <div class="card-body border-bottom py-3 placeholder-glow">
        <span class="placeholder col-4 d-block mb-1 rounded"></span>
        <span class="placeholder col-7 rounded"></span>
      </div>
    }
  </div>
} @else if (!facade.hasPrescriptions()) {
  <div class="text-center py-5">
    <i class="bi bi-file-earmark-medical fs-1 text-muted d-block mb-3"></i>
    <h5 class="fw-bold text-muted">لا توجد وصفات طبية</h5>
    <a routerLink="/prescriptions/new" class="btn btn-primary mt-3">إصدار وصفة جديدة</a>
  </div>
} @else {
  <div class="card border-0 shadow-sm mb-4">
    @for (p of facade.prescriptions().items; track p.id) {
      <div class="card-body border-bottom py-3">
        <div class="d-flex align-items-start gap-3">
          <div class="flex-grow-1 min-w-0">
            <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
              <a [routerLink]="['/prescriptions', p.id]"
                class="fw-semibold text-dark text-decoration-none">
                #{{ p.prescriptionNumber }}
              </a>
              <span class="badge rounded-pill small" [ngClass]="statusConfig[p.status]?.class ?? 'bg-secondary-subtle text-secondary'">
                <i class="bi me-1" [ngClass]="statusConfig[p.status]?.icon ?? 'bi-circle'"></i>
                {{ statusConfig[p.status]?.label ?? p.status }}
              </span>
              @if (isExpired(p.expiresAt) && p.status === 'active') {
                <span class="badge bg-warning text-dark small">منتهية الصلاحية</span>
              }
            </div>
            <div class="small text-muted">
              {{ p.patientName }} &nbsp;|&nbsp; د. {{ p.doctorName }}
              &nbsp;|&nbsp; {{ p.issuedAt | date:'dd/MM/yyyy' }}
              &nbsp;|&nbsp; تنتهي: {{ p.expiresAt | date:'dd/MM/yyyy' }}
              &nbsp;|&nbsp; {{ p.medications.length }} دواء
            </div>
            @if (p.diagnosis) {
              <div class="small text-muted mt-1">
                <i class="bi bi-clipboard2-pulse me-1"></i>{{ p.diagnosis }}
              </div>
            }
          </div>
          <div class="d-flex gap-1 flex-shrink-0">
            <a [routerLink]="['/prescriptions', p.id]" class="btn btn-sm btn-outline-primary">
              <i class="bi bi-eye"></i>
            </a>
            @if (p.status === 'active') {
              <button type="button" class="btn btn-sm btn-outline-success" (click)="onDispense(p.id)" title="صرف">
                <i class="bi bi-bag-check"></i>
              </button>
              <button type="button" class="btn btn-sm btn-outline-warning" (click)="onCancel(p.id)" title="إلغاء">
                <i class="bi bi-x-circle"></i>
              </button>
            }
            <button type="button" class="btn btn-sm btn-outline-danger" (click)="onDelete(p.id)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    }
  </div>

  @if (facade.totalPages() > 1) {
    <nav>
      <ul class="pagination justify-content-center">
        <li class="page-item" [class.disabled]="facade.currentPage() === 1">
          <button class="page-link" (click)="onPageChange(facade.currentPage() - 1)">
            <i class="bi bi-chevron-right"></i>
          </button>
        </li>
        @for (p of pages; track p) {
          <li class="page-item" [class.active]="p === facade.currentPage()">
            <button class="page-link" (click)="onPageChange(p)">{{ p }}</button>
          </li>
        }
        <li class="page-item" [class.disabled]="facade.currentPage() === facade.totalPages()">
          <button class="page-link" (click)="onPageChange(facade.currentPage() + 1)">
            <i class="bi bi-chevron-left"></i>
          </button>
        </li>
      </ul>
    </nav>
  }
}
```

### SCSS

```scss

```


================================================================================
## src\app\features\real-time-updates\presentation\components\connection-status\connection-status.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\real-time-updates\presentation\components\live-events-panel\live-events-panel.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\real-time-updates\presentation\pages\realtime-monitor-page\realtime-monitor-page.component
================================================================================

### TypeScript

```typescript
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
    { type: 'emergency',   title: 'حالة طوارئ جديدة', body: 'وصول حالة طوارئ مستوى 2 — ألم صدري', color: 'danger',  icon: 'bi-exclamation-triangle' },
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
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\role-management\presentation\components\role-form\role-form.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\role-management\presentation\components\role-permissions\role-permissions.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\role-management\presentation\pages\role-detail-page\role-detail-page.component
================================================================================

### TypeScript

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hms-role-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb small">
        <li class="breadcrumb-item"><a routerLink="/role-management" class="text-decoration-none">الأدوار</a></li>
        <li class="breadcrumb-item active">تفاصيل الدور</li>
      </ol>
    </nav>
    <div class="card border-0 shadow-sm">
      <div class="card-body text-center py-5 text-muted">
        <i class="bi bi-shield fs-1 d-block mb-3"></i>
        <h5 class="fw-bold mb-2">تفاصيل الدور</h5>
        <p class="small mb-0">هذه الصفحة قيد التطوير — سيتم عرض الصلاحيات المرتبطة بهذا الدور</p>
      </div>
    </div>
  `,
})
export class RoleDetailPageComponent {}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\role-management\presentation\pages\role-form-page\role-form-page.component
================================================================================

### TypeScript

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hms-role-form-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb small">
        <li class="breadcrumb-item"><a routerLink="/role-management" class="text-decoration-none">الأدوار</a></li>
        <li class="breadcrumb-item active">دور جديد</li>
      </ol>
    </nav>
    <div class="card border-0 shadow-sm">
      <div class="card-body text-center py-5 text-muted">
        <i class="bi bi-shield-plus fs-1 d-block mb-3 text-primary"></i>
        <h5 class="fw-bold mb-2">إضافة / تعديل دور</h5>
        <p class="small mb-0">هذه الصفحة قيد التطوير</p>
      </div>
    </div>
  `,
})
export class RoleFormPageComponent {}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\role-management\presentation\pages\role-list-page\role-list-page.component
================================================================================

### TypeScript

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { ROLES, ROLE_LABELS } from '../../../../../core/constants/roles.constants';

@Component({
  selector: 'hms-role-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
              <i class="bi bi-shield"></i>
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
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\staff-management\presentation\components\department-selector\department-selector.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\staff-management\presentation\components\staff-card\staff-card.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\staff-management\presentation\components\staff-form\staff-form.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\staff-management\presentation\pages\staff-detail-page\staff-detail-page.component
================================================================================

### TypeScript

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hms-staff-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h1 class="h4 fw-bold mb-0">
        <i class="bi bi-person-badge me-2 text-info"></i>تفاصيل الموظف
      </h1>
      <a routerLink="/staff-management" class="btn btn-outline-secondary">
        <i class="bi bi-arrow-right me-1"></i>رجوع
      </a>
    </div>
    <div class="card border-0 shadow-sm">
      <div class="card-body text-center py-5">
        <i class="bi bi-person-badge fs-1 text-info d-block mb-3"></i>
        <h5 class="fw-bold text-muted mb-2">تفاصيل الموظف</h5>
        <p class="text-muted small mb-0">هذه الصفحة قيد التطوير</p>
      </div>
    </div>
  `,
})
export class StaffDetailPageComponent {}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\staff-management\presentation\pages\staff-form-page\staff-form-page.component
================================================================================

### TypeScript

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hms-staff-form-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h1 class="h4 fw-bold mb-0">
        <i class="bi bi-person-plus-fill me-2 text-success"></i>إضافة / تعديل موظف
      </h1>
    </div>
    <div class="card border-0 shadow-sm">
      <div class="card-body text-center py-5">
        <i class="bi bi-person-plus fs-1 text-success d-block mb-3"></i>
        <h5 class="fw-bold text-muted mb-2">نموذج الموظف</h5>
        <p class="text-muted small mb-0">هذه الصفحة قيد التطوير</p>
      </div>
    </div>
  `,
})
export class StaffFormPageComponent {}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\features\staff-management\presentation\pages\staff-list-page\staff-list-page.component
================================================================================

### TypeScript

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hms-staff-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h1 class="h4 fw-bold mb-0">
        <i class="bi bi-person-workspace me-2 text-primary"></i>إدارة الموظفين
      </h1>
      <a routerLink="/staff-management/new" class="btn btn-primary">
        <i class="bi bi-person-plus-fill me-2"></i>موظف جديد
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
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\layout\admin-layout\admin-layout.component
================================================================================

### TypeScript

```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutService } from '../../core/application/services/layout.service';
import { ThemeService } from '../../core/application/services/theme.service';
import { AuthenticationFacade } from '../../features/authentication/application/facades/authentication.facade';

@Component({
  selector: 'hms-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {
  readonly layout = inject(LayoutService);
  readonly theme = inject(ThemeService);
  readonly auth = inject(AuthenticationFacade);

  onLogout(): void {
    this.auth.logout().subscribe();
  }
}
```

### HTML

```html
<div class="hms-layout d-flex" [class.sidebar-collapsed]="layout.isSidebarCollapsed()">

  <!-- Sidebar -->
  <aside class="hms-sidebar d-flex flex-column"
    [class.collapsed]="layout.isSidebarCollapsed()"
    [class.mobile-open]="layout.isSidebarMobileOpen()">

    <!-- Brand -->
    <div class="sidebar-brand d-flex align-items-center px-3 py-3 border-bottom">
      <i class="bi bi-hospital-fill text-primary fs-4 flex-shrink-0"></i>
      @if (!layout.isSidebarCollapsed()) {
        <div class="ms-2 overflow-hidden">
          <div class="fw-bold text-dark lh-sm small">نظام إدارة</div>
          <div class="fw-bold text-primary lh-sm small">المستشفى</div>
        </div>
      }
    </div>

    <!-- Nav -->
    <nav class="sidebar-nav flex-grow-1 overflow-y-auto py-2">
      <ul class="list-unstyled mb-0">
        <li>
          <a routerLink="/dashboard" routerLinkActive="active"
            class="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded mx-2">
            <i class="bi bi-speedometer2 flex-shrink-0"></i>
            @if (!layout.isSidebarCollapsed()) { <span>لوحة التحكم</span> }
          </a>
        </li>
        <li>
          <a routerLink="/patients" routerLinkActive="active"
            class="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded mx-2">
            <i class="bi bi-people flex-shrink-0"></i>
            @if (!layout.isSidebarCollapsed()) { <span>المرضى</span> }
          </a>
        </li>
        <li>
          <a routerLink="/doctors" routerLinkActive="active"
            class="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded mx-2">
            <i class="bi bi-person-badge flex-shrink-0"></i>
            @if (!layout.isSidebarCollapsed()) { <span>الأطباء</span> }
          </a>
        </li>
        <li>
          <a routerLink="/appointments" routerLinkActive="active"
            class="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded mx-2">
            <i class="bi bi-calendar-check flex-shrink-0"></i>
            @if (!layout.isSidebarCollapsed()) { <span>المواعيد</span> }
          </a>
        </li>
        <li>
          <a routerLink="/emergency-cases" routerLinkActive="active"
            class="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded mx-2">
            <i class="bi bi-exclamation-triangle flex-shrink-0 text-danger"></i>
            @if (!layout.isSidebarCollapsed()) { <span>الطوارئ</span> }
          </a>
        </li>
        <li>
          <a routerLink="/medical-records" routerLinkActive="active"
            class="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded mx-2">
            <i class="bi bi-file-medical flex-shrink-0"></i>
            @if (!layout.isSidebarCollapsed()) { <span>السجلات الطبية</span> }
          </a>
        </li>
        <li>
          <a routerLink="/lab-results" routerLinkActive="active"
            class="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded mx-2">
            <i class="bi bi-thermometer flex-shrink-0"></i>
            @if (!layout.isSidebarCollapsed()) { <span>نتائج المختبر</span> }
          </a>
        </li>
        <li>
          <a routerLink="/prescriptions" routerLinkActive="active"
            class="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded mx-2">
            <i class="bi bi-capsule flex-shrink-0"></i>
            @if (!layout.isSidebarCollapsed()) { <span>الوصفات الطبية</span> }
          </a>
        </li>
        <li>
          <a routerLink="/billing" routerLinkActive="active"
            class="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded mx-2">
            <i class="bi bi-receipt flex-shrink-0"></i>
            @if (!layout.isSidebarCollapsed()) { <span>الفواتير</span> }
          </a>
        </li>
        <li>
          <a routerLink="/staff-management" routerLinkActive="active"
            class="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded mx-2">
            <i class="bi bi-person-workspace flex-shrink-0"></i>
            @if (!layout.isSidebarCollapsed()) { <span>الموظفون</span> }
          </a>
        </li>
        <li>
          <a routerLink="/charts-analytics" routerLinkActive="active"
            class="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded mx-2">
            <i class="bi bi-bar-chart flex-shrink-0"></i>
            @if (!layout.isSidebarCollapsed()) { <span>التحليلات</span> }
          </a>
        </li>
        <li>
          <a routerLink="/calendar-scheduling" routerLinkActive="active"
            class="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded mx-2">
            <i class="bi bi-calendar3 flex-shrink-0"></i>
            @if (!layout.isSidebarCollapsed()) { <span>التقويم</span> }
          </a>
        </li>

        @if (!layout.isSidebarCollapsed()) {
          <li class="px-3 pt-3 pb-1">
            <small class="text-muted text-uppercase" style="font-size: 0.65rem; letter-spacing: 0.08em;">الإدارة</small>
          </li>
        }

        <li>
          <a routerLink="/role-management" routerLinkActive="active"
            class="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded mx-2">
            <i class="bi bi-shield flex-shrink-0"></i>
            @if (!layout.isSidebarCollapsed()) { <span>الأدوار</span> }
          </a>
        </li>
        <li>
          <a routerLink="/audit-logs" routerLinkActive="active"
            class="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded mx-2">
            <i class="bi bi-journal-text flex-shrink-0"></i>
            @if (!layout.isSidebarCollapsed()) { <span>سجل التدقيق</span> }
          </a>
        </li>
      </ul>
    </nav>

    <!-- User & Logout -->
    <div class="sidebar-footer border-top px-3 py-3">
      @if (!layout.isSidebarCollapsed()) {
        <div class="d-flex align-items-center gap-2 mb-2">
          <div class="avatar-sm bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
            style="width:32px; height:32px; font-size: 0.75rem;">
            {{ auth.userFullName().charAt(0) }}
          </div>
          <div class="overflow-hidden">
            <div class="small fw-semibold text-truncate">{{ auth.userFullName() }}</div>
          </div>
        </div>
      }
      <button class="btn btn-sm btn-outline-danger w-100" (click)="onLogout()">
        <i class="bi bi-box-arrow-right"></i>
        @if (!layout.isSidebarCollapsed()) { <span class="ms-1">تسجيل الخروج</span> }
      </button>
    </div>
  </aside>

  <!-- Mobile overlay -->
  @if (layout.isSidebarMobileOpen()) {
    <div class="sidebar-overlay d-md-none" (click)="layout.closeMobileSidebar()"></div>
  }

  <!-- Main content -->
  <div class="hms-main d-flex flex-column flex-grow-1 min-w-0">

    <!-- Topbar -->
    <header class="hms-topbar d-flex align-items-center px-3 px-md-4 border-bottom">
      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-sm btn-outline-secondary me-2 d-none d-md-flex" (click)="layout.toggleSidebar()">
          <i class="bi bi-layout-sidebar-reverse"></i>
        </button>
        <button class="btn btn-sm btn-outline-secondary me-2 d-md-none" (click)="layout.openMobileSidebar()">
          <i class="bi bi-list fs-5"></i>
        </button>
      </div>

      <h1 class="h6 fw-bold mb-0 flex-grow-1 text-truncate">
        {{ layout.pageTitleAr() || layout.pageTitle() }}
      </h1>

      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-sm btn-outline-secondary" (click)="theme.toggleTheme()" [title]="theme.isDark() ? 'الوضع النهاري' : 'الوضع الليلي'">
          <i class="bi" [class.bi-sun]="theme.isDark()" [class.bi-moon]="!theme.isDark()"></i>
        </button>
        <a routerLink="/notifications" class="btn btn-sm btn-outline-secondary position-relative">
          <i class="bi bi-bell"></i>
        </a>
      </div>
    </header>

    <!-- Loading bar -->
    @if (layout.isLoading()) {
      <div class="progress rounded-0" style="height: 3px;">
        <div class="progress-bar progress-bar-striped progress-bar-animated w-100"></div>
      </div>
    }

    <!-- Page content -->
    <main class="flex-grow-1 overflow-y-auto p-2 p-sm-3 p-md-4">
      <div class="page-shell">
        <router-outlet />
      </div>
    </main>

  </div>
</div>
```

### SCSS

```scss
:host {
  display: block;
  height: 100%;
}

.sidebar-brand {
  min-height: 62px;
  background: linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(14,165,233,0.08) 100%);
  border-bottom: 1px solid var(--app-border);
}

.sidebar-footer {
  background: transparent;
  border-top: 1px solid var(--app-border);
}

.sidebar-nav .nav-link {
  color: var(--app-text);
  border-radius: 10px;
  margin: 0.2rem 0.5rem;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.sidebar-nav .nav-link:hover {
  background: var(--app-primary-soft);
  color: var(--app-primary);
  transform: translateX(-2px);
}

.sidebar-nav .nav-link.active {
  background: linear-gradient(135deg, var(--app-primary) 0%, var(--app-accent) 100%);
  color: #fff;
  box-shadow: 0 10px 18px rgba(37,99,235,0.2);
}

```


================================================================================
## src\app\layout\auth-layout\auth-layout.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\layout\error-layout\error-layout.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\layout\shell\shell.component
================================================================================

### TypeScript

```typescript

```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\shared\components\buttons\icon-button\icon-button.component
================================================================================

### TypeScript

```typescript
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-icon-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      class="btn btn-sm"
      [ngClass]="'btn-' + (variant() === 'solid' ? color() : 'outline-' + color())"
      [disabled]="disabled()"
      [title]="tooltip()"
      (click)="clicked.emit($event)">
      <i class="bi" [ngClass]="icon()"></i>
    </button>
  `,
})
export class IconButtonComponent {
  readonly icon = input.required<string>();
  readonly color = input<string>('secondary');
  readonly variant = input<'solid' | 'outline'>('outline');
  readonly tooltip = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly clicked = output<MouseEvent>();
}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\shared\components\buttons\primary-button\primary-button.component
================================================================================

### TypeScript

```typescript
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-primary-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      [class]="'btn btn-primary ' + (size() === 'sm' ? 'btn-sm' : size() === 'lg' ? 'btn-lg' : '')"
      [disabled]="disabled() || loading()"
      (click)="clicked.emit($event)">
      @if (loading()) {
        <span class="spinner-border spinner-border-sm me-2"></span>
      } @else if (icon()) {
        <i class="bi me-2" [ngClass]="icon()!"></i>
      }
      <ng-content />
    </button>
  `,
})
export class PrimaryButtonComponent {
  readonly icon = input<string | null>(null);
  readonly loading = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly clicked = output<MouseEvent>();
}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\shared\components\buttons\split-button\split-button.component
================================================================================

### TypeScript

```typescript
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SplitButtonItem { label: string; icon?: string; action: string; }

@Component({
  selector: 'hms-split-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="btn-group">
      <button type="button" class="btn btn-primary btn-sm" (click)="mainAction.emit()">
        @if (icon()) { <i class="bi me-1" [ngClass]="icon()!"></i> }
        {{ label() }}
      </button>
      <button type="button" class="btn btn-primary btn-sm dropdown-toggle dropdown-toggle-split"
        data-bs-toggle="dropdown"></button>
      <ul class="dropdown-menu">
        @for (item of items(); track item.action) {
          <li>
            <button type="button" class="dropdown-item" (click)="itemClicked.emit(item.action)">
              @if (item.icon) { <i class="bi me-2" [ngClass]="item.icon"></i> }
              {{ item.label }}
            </button>
          </li>
        }
      </ul>
    </div>
  `,
})
export class SplitButtonComponent {
  readonly label = input.required<string>();
  readonly icon = input<string | null>(null);
  readonly items = input<SplitButtonItem[]>([]);
  readonly mainAction = output<void>();
  readonly itemClicked = output<string>();
}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\shared\components\charts\bar-chart\bar-chart.component
================================================================================

### TypeScript

```typescript
import { Component, input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ChartDataItem { label: string; value: number; color?: string; }

@Component({
  selector: 'hms-bar-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bar-chart">
      @if (title()) {
        <h6 class="fw-bold mb-3 small">{{ title() }}</h6>
      }
      @if (data().length === 0) {
        <div class="text-center py-4 text-muted small">لا توجد بيانات</div>
      } @else {
        <div class="d-flex flex-column gap-2">
          @for (item of data(); track item.label) {
            <div class="d-flex align-items-center gap-2 small">
              <div class="text-muted" style="min-width:80px;font-size:0.75rem;">{{ item.label }}</div>
              <div class="flex-grow-1 bg-light rounded" style="height:20px;">
                <div class="rounded h-100 d-flex align-items-center px-2"
                  [style.width]="getWidth(item.value) + '%'"
                  [style.background]="item.color ?? '#0d6efd'"
                  style="font-size:0.7rem;color:white;min-width:30px;transition:width 0.4s ease;">
                  {{ item.value }}
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class BarChartComponent implements OnChanges {
  readonly data = input<ChartDataItem[]>([]);
  readonly title = input<string>('');
  private maxValue = 0;

  ngOnChanges(): void {
    this.maxValue = Math.max(...this.data().map((d) => d.value), 1);
  }

  getWidth(value: number): number {
    return Math.round((value / this.maxValue) * 100);
  }
}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\shared\components\charts\dashboard-chart\dashboard-chart.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-dashboard-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white border-bottom py-3">
        <h6 class="mb-0 fw-bold">{{ title() }}</h6>
      </div>
      <div class="card-body text-center py-5 text-muted">
        <i class="bi bi-bar-chart-fill fs-2 d-block mb-2"></i>
        <small>{{ subtitle() }}</small>
      </div>
    </div>
  `,
})
export class DashboardChartComponent {
  readonly title = input<string>('رسم بياني');
  readonly subtitle = input<string>('سيتم عرض البيانات هنا');
}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\shared\components\charts\line-chart\line-chart.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface LineChartPoint { label: string; value: number; }

@Component({
  selector: 'hms-line-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="line-chart">
      @if (title()) { <h6 class="fw-bold mb-3 small">{{ title() }}</h6> }
      <div class="text-center py-5 text-muted bg-light rounded">
        <i class="bi bi-graph-up fs-2 d-block mb-2"></i>
        <small>{{ title() || 'الرسم البياني الخطي' }}</small>
        @if (data().length > 0) {
          <div class="d-flex justify-content-center gap-3 mt-3 flex-wrap">
            @for (p of data().slice(0, 6); track p.label) {
              <div class="text-center">
                <div class="fw-bold" style="font-size:0.75rem;">{{ p.value }}</div>
                <div class="text-muted" style="font-size:0.65rem;">{{ p.label }}</div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class LineChartComponent {
  readonly data = input<LineChartPoint[]>([]);
  readonly title = input<string>('');
  readonly color = input<string>('#0d6efd');
}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\shared\components\charts\pie-chart\pie-chart.component
================================================================================

### TypeScript

```typescript
import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PieChartSlice { label: string; value: number; color: string; }

@Component({
  selector: 'hms-pie-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pie-chart">
      @if (title()) { <h6 class="fw-bold mb-3 small">{{ title() }}</h6> }
      <div class="d-flex align-items-center gap-4 flex-wrap">
        <div class="text-center text-muted bg-light rounded d-flex align-items-center justify-content-center"
          style="width:120px;height:120px;">
          <i class="bi bi-pie-chart fs-1"></i>
        </div>
        <div class="d-flex flex-column gap-2">
          @for (slice of data(); track slice.label) {
            <div class="d-flex align-items-center gap-2 small">
              <div class="rounded-circle flex-shrink-0"
                [style.background]="slice.color"
                style="width:10px;height:10px;"></div>
              <span class="text-muted">{{ slice.label }}</span>
              <span class="fw-bold ms-1">{{ getPercent(slice.value) }}%</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class PieChartComponent {
  readonly data = input<PieChartSlice[]>([]);
  readonly title = input<string>('');

  private get total(): number { return this.data().reduce((s, d) => s + d.value, 0) || 1; }

  getPercent(value: number): number { return Math.round((value / this.total) * 100); }
}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\shared\components\data-display\data-table\data-table.component
================================================================================

### TypeScript

```typescript
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn<T = unknown> {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'start' | 'center' | 'end';
  render?: (row: T) => string;
}

@Component({
  selector: 'hms-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-responsive">
      <table class="table table-hover align-middle mb-0 small">
        <thead class="table-light">
          <tr>
            @for (col of columns(); track col.key) {
              <th [style.width]="col.width ?? 'auto'"
                [class]="'text-' + (col.align ?? 'start')"
                [class.cursor-pointer]="col.sortable"
                (click)="col.sortable && sortChanged.emit(col.key)">
                {{ col.label }}
                @if (col.sortable) {
                  <i class="bi bi-chevron-expand ms-1 text-muted" style="font-size:0.65rem;"></i>
                }
              </th>
            }
            @if (hasActions()) { <th class="text-end">إجراءات</th> }
          </tr>
        </thead>
        <tbody>
          @if (isLoading()) {
            @for (i of skeletonRows(); track i) {
              <tr>
                @for (col of columns(); track col.key) {
                  <td><span class="placeholder col-8 rounded placeholder-glow d-block"></span></td>
                }
                @if (hasActions()) { <td></td> }
              </tr>
            }
          } @else if (data().length === 0) {
            <tr>
              <td [attr.colspan]="columns().length + (hasActions() ? 1 : 0)" class="text-center py-5 text-muted">
                <i class="bi bi-inbox fs-2 d-block mb-2"></i>
                {{ emptyMessage() }}
              </td>
            </tr>
          } @else {
            @for (row of data(); track trackByFn()(row)) {
              <tr (click)="rowClicked.emit(row)" [class.cursor-pointer]="rowClickable()">
                @for (col of columns(); track col.key) {
                  <td [class]="'text-' + (col.align ?? 'start')">
                    {{ col.render ? col.render(row) : getCellValue(row, col.key) }}
                  </td>
                }
                @if (hasActions()) {
                  <td class="text-end">
                    <ng-content select="[tableActions]" />
                  </td>
                }
              </tr>
            }
          }
        </tbody>
      </table>
    </div>
  `,
})
export class DataTableComponent<T extends Record<string, unknown> = Record<string, unknown>> {
  readonly columns = input<TableColumn<T>[]>([]);
  readonly data = input<T[]>([]);
  readonly isLoading = input<boolean>(false);
  readonly hasActions = input<boolean>(false);
  readonly rowClickable = input<boolean>(false);
  readonly emptyMessage = input<string>('لا توجد بيانات');
  readonly trackByFn = input<(row: T) => unknown>((row) => (row as { id?: unknown }).id ?? row);
  readonly rowClicked = output<T>();
  readonly sortChanged = output<string>();

  skeletonRows(): number[] { return Array.from({ length: 5 }, (_, i) => i); }
  getCellValue(row: T, key: string): string {
    const val = (row as Record<string, unknown>)[key];
    return val != null ? String(val) : '—';
  }
}
```

### HTML

```html
<div class="hms-data-table border rounded bg-white">
  @if (searchable || pageSizeOptions.length > 1) {
    <div class="d-flex flex-column flex-md-row gap-2 justify-content-between align-items-md-center p-3 border-bottom">
      @if (searchable) {
        <div class="input-group input-group-sm hms-data-table__search">
          <span class="input-group-text">Search</span>
          <input
            type="search"
            class="form-control"
            [value]="search()"
            [attr.aria-label]="'Search ' + tableLabel"
            (input)="updateSearch($any($event.target).value)"
          />
        </div>
      }

      @if (pageSizeOptions.length > 1) {
        <div class="d-flex align-items-center gap-2 ms-md-auto">
          <label class="form-label small text-muted mb-0" for="data-table-page-size">Rows</label>
          <select
            id="data-table-page-size"
            class="form-select form-select-sm w-auto"
            [value]="pageSizeValue()"
            (change)="updatePageSize($any($event.target).value)"
          >
            @for (option of pageSizeOptions; track option) {
              <option [value]="option">{{ option }}</option>
            }
          </select>
        </div>
      }
    </div>
  }

  <div class="table-responsive position-relative">
    @if (loading) {
      <div class="hms-data-table__loading d-flex align-items-center justify-content-center">
        <div class="spinner-border text-primary" role="status" aria-label="Loading table data"></div>
      </div>
    }

    <table class="table table-hover align-middle mb-0" [attr.aria-label]="tableLabel">
      <thead class="table-light">
        <tr>
          @for (column of columnsState(); track column.key) {
            <th [style.width]="column.width || null" [class.text-center]="column.align === 'center'" [class.text-end]="column.align === 'end'">
              <button
                type="button"
                class="btn btn-link btn-sm p-0 text-decoration-none fw-semibold text-body"
                [class.pe-none]="!column.sortable"
                [attr.aria-sort]="sortColumn() === column.key ? sortDirection() || 'none' : 'none'"
                (click)="sort(column)"
              >
                {{ column.header }}
                @if (column.sortable) {
                  <span class="text-muted ms-1">
                    @if (sortColumn() === column.key && sortDirection() === 'asc') { ↑ }
                    @else if (sortColumn() === column.key && sortDirection() === 'desc') { ↓ }
                    @else { ↕ }
                  </span>
                }
              </button>
            </th>
          }
          @if (actions().length) {
            <th class="text-end">Actions</th>
          }
        </tr>
      </thead>
      <tbody>
        @if (!loading && pagedData().length === 0) {
          <tr>
            <td [attr.colspan]="columnsState().length + (actions().length ? 1 : 0)" class="text-center py-5">
              <div class="text-muted fw-semibold">{{ emptyTitle }}</div>
              <div class="small text-muted">{{ emptyDescription }}</div>
            </td>
          </tr>
        }

        @for (row of pagedData(); track trackByIndex($index)) {
          <tr>
            @for (column of columnsState(); track column.key) {
              <td [class.text-center]="column.align === 'center'" [class.text-end]="column.align === 'end'">
                {{ getCellValue(row, column) }}
              </td>
            }
            @if (actions().length) {
              <td class="text-end">
                <div class="btn-group btn-group-sm">
                  @for (action of actions(); track action.label) {
                    @if (isActionVisible(action, row)) {
                      <button
                        type="button"
                        class="btn"
                        [class]="'btn-outline-' + (action.variant || 'secondary')"
                        [disabled]="isActionDisabled(action, row)"
                        (click)="emitAction(action, row)"
                      >
                        @if (action.icon) {
                          <span class="me-1" aria-hidden="true">{{ action.icon }}</span>
                        }
                        {{ action.label }}
                      </button>
                    }
                  }
                </div>
              </td>
            }
          </tr>
        }
      </tbody>
    </table>
  </div>

  <div class="d-flex flex-column flex-md-row gap-2 justify-content-between align-items-md-center p-3 border-top">
    <div class="small text-muted">
      Showing {{ pagedData().length }} of {{ totalItems() }} records
    </div>
    <nav aria-label="Table pagination">
      <ul class="pagination pagination-sm mb-0">
        <li class="page-item" [class.disabled]="page() === 1">
          <button class="page-link" type="button" (click)="goToPage(page() - 1)">Previous</button>
        </li>
        @for (visiblePage of visiblePages(); track visiblePage) {
          <li class="page-item" [class.active]="visiblePage === page()">
            <button class="page-link" type="button" (click)="goToPage(visiblePage)">{{ visiblePage }}</button>
          </li>
        }
        <li class="page-item" [class.disabled]="page() === totalPages()">
          <button class="page-link" type="button" (click)="goToPage(page() + 1)">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</div>

```

### SCSS

```scss
.hms-data-table {
  overflow: hidden;
}

.hms-data-table__search {
  max-width: 24rem;
}

.hms-data-table__loading {
  position: absolute;
  inset: 0;
  z-index: 2;
  min-height: 12rem;
  background: rgba(255, 255, 255, 0.72);
}

```


================================================================================
## src\app\shared\components\data-display\detail-card\detail-card.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DetailItem { label: string; value: string | null | undefined; icon?: string; }

@Component({
  selector: 'hms-detail-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card border-0 shadow-sm h-100">
      <div class="card-header bg-white border-bottom py-3">
        <h6 class="mb-0 fw-bold">
          @if (icon()) { <i class="bi me-2" [ngClass]="icon()!"></i> }
          {{ title() }}
        </h6>
      </div>
      <div class="card-body">
        <dl class="row small mb-0">
          @for (item of items(); track item.label) {
            <dt class="col-5 text-muted fw-normal">{{ item.label }}</dt>
            <dd class="col-7 fw-semibold">{{ item.value ?? '—' }}</dd>
          }
        </dl>
        <ng-content />
      </div>
    </div>
  `,
})
export class DetailCardComponent {
  readonly title = input<string>('');
  readonly icon = input<string | null>(null);
  readonly items = input<DetailItem[]>([]);
}
```

### HTML

```html
<section class="card hms-detail-card">
  @if (title || subtitle) {
    <div class="card-header bg-white">
      @if (title) {
        <h2 class="h6 mb-0">{{ title }}</h2>
      }
      @if (subtitle) {
        <p class="small text-muted mb-0 mt-1">{{ subtitle }}</p>
      }
    </div>
  }
  <div class="card-body">
    <div class="row g-3">
      @for (item of items; track item.label) {
        <div class="col-12 col-md-6">
          <div class="small text-muted">{{ item.label }}</div>
          <div class="fw-semibold">{{ item.value || '-' }}</div>
          @if (item.helpText) {
            <div class="small text-muted">{{ item.helpText }}</div>
          }
        </div>
      }
    </div>
  </div>
</section>

```

### SCSS

```scss
.hms-detail-card {
  border-radius: 0.5rem;
}

```


================================================================================
## src\app\shared\components\data-display\empty-state\empty-state.component
================================================================================

### TypeScript

```typescript
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center py-5">
      <i class="bi fs-1 text-muted d-block mb-3" [ngClass]="icon()"></i>
      <h5 class="fw-bold text-muted mb-2">{{ title() }}</h5>
      @if (description()) {
        <p class="text-muted small mb-4">{{ description() }}</p>
      }
      @if (actionLabel()) {
        <button type="button" class="btn btn-primary btn-sm" (click)="actionClicked.emit()">
          @if (actionIcon()) { <i class="bi me-2" [ngClass]="actionIcon()!"></i> }
          {{ actionLabel() }}
        </button>
      }
    </div>
  `,
})
export class EmptyStateComponent {
  readonly icon = input<string>('bi-inbox');
  readonly title = input<string>('لا توجد بيانات');
  readonly description = input<string>('');
  readonly actionLabel = input<string>('');
  readonly actionIcon = input<string | null>(null);
  readonly actionClicked = output<void>();
}
```

### HTML

```html
<div class="hms-empty-state text-center py-5 px-3">
  <div class="hms-empty-state__icon mx-auto mb-3" aria-hidden="true">{{ icon }}</div>
  <h2 class="h5 mb-2">{{ title }}</h2>
  <p class="text-muted mb-3">{{ description }}</p>
  @if (actionLabel) {
    <button type="button" class="btn btn-primary btn-sm" (click)="action.emit()">
      {{ actionLabel }}
    </button>
  }
</div>

```

### SCSS

```scss
.hms-empty-state__icon {
  display: grid;
  width: 3rem;
  height: 3rem;
  place-items: center;
  border-radius: 50%;
  color: var(--bs-secondary-color);
  background: var(--bs-light);
  font-weight: 700;
}

```


================================================================================
## src\app\shared\components\data-display\metric-card\metric-card.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-metric-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card border-0 shadow-sm h-100">
      <div class="card-body p-3">
        <div class="d-flex align-items-start justify-content-between">
          <div>
            <p class="text-muted small mb-1">{{ label() }}</p>
            <h3 class="fw-bold mb-0">{{ value() }}</h3>
            @if (trend()) {
              <div class="small mt-1" [ngClass]="trendPositive() ? 'text-success' : 'text-danger'">
                <i class="bi me-1" [ngClass]="trendPositive() ? 'bi-arrow-up-right' : 'bi-arrow-down-right'"></i>
                {{ trend() }}
              </div>
            }
          </div>
          @if (icon()) {
            <div class="rounded-3 p-2 flex-shrink-0" [ngClass]="'bg-' + color() + '-subtle'">
              <i class="bi fs-4" [ngClass]="[icon()!, 'text-' + color()]"></i>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class MetricCardComponent {
  readonly label = input<string>('');
  readonly value = input<string | number>('');
  readonly icon = input<string | null>(null);
  readonly color = input<string>('primary');
  readonly trend = input<string>('');
  readonly trendPositive = input<boolean>(true);
}
```

### HTML

```html
<section class="card h-100 hms-metric-card">
  <div class="card-body">
    <div class="d-flex justify-content-between gap-3">
      <div>
        <p class="small text-muted mb-1">{{ title }}</p>
        <div class="h3 mb-1">{{ valueDisplay() }}</div>
        @if (subtitle) {
          <p class="small text-muted mb-0">{{ subtitle }}</p>
        }
      </div>
      @if (icon) {
        <div class="hms-metric-card__icon" [class]="'text-bg-' + variant" aria-hidden="true">{{ icon }}</div>
      }
    </div>
    @if (trend !== undefined) {
      <div class="small mt-3" [class]="trendClass()">
        {{ trend >= 0 ? '+' : '' }}{{ trend | number: '1.0-2' }}%
      </div>
    }
  </div>
</section>

```

### SCSS

```scss
.hms-metric-card {
  border-radius: 0.5rem;
}

.hms-metric-card__icon {
  display: grid;
  flex: 0 0 auto;
  width: 2.5rem;
  height: 2.5rem;
  place-items: center;
  border-radius: 0.5rem;
  font-weight: 700;
}

```


================================================================================
## src\app\shared\components\data-display\status-badge\status-badge.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge rounded-pill d-inline-flex align-items-center gap-1"
      [ngClass]="cssClass()">
      @if (icon()) { <i class="bi small" [ngClass]="icon()!"></i> }
      {{ label() }}
    </span>
  `,
})
export class StatusBadgeComponent {
  readonly label = input.required<string>();
  readonly icon = input<string | null>(null);
  readonly cssClass = input<string>('bg-secondary-subtle text-secondary');
}
```

### HTML

```html
<span [class]="badgeClass()">{{ label() || 'Unknown' }}</span>

```

### SCSS

```scss
:host {
  display: inline-block;
}

```


================================================================================
## src\app\shared\components\data-display\timeline\timeline.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date: string;
  icon?: string;
  color?: string;
}

@Component({
  selector: 'hms-timeline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="timeline">
      @for (item of items(); track item.id; let last = $last) {
        <div class="d-flex gap-3 pb-3"
          [class.border-start]="!last"
          style="margin-right: 8px; padding-right: 4px;">
          <div class="flex-shrink-0" style="margin-right: -10px; margin-top: 2px;">
            <div class="rounded-circle d-flex align-items-center justify-content-center"
              [ngClass]="'bg-' + (item.color ?? 'primary')"
              style="width: 16px; height: 16px;">
              @if (item.icon) {
                <i class="bi text-white" [ngClass]="item.icon" style="font-size: 0.5rem;"></i>
              }
            </div>
          </div>
          <div class="flex-grow-1 min-w-0 pb-2">
            <div class="d-flex align-items-center justify-content-between gap-2">
              <div class="fw-semibold small">{{ item.title }}</div>
              <div class="text-muted flex-shrink-0" style="font-size: 0.72rem;">{{ item.date }}</div>
            </div>
            @if (item.description) {
              <div class="text-muted small">{{ item.description }}</div>
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class TimelineComponent {
  readonly items = input<TimelineItem[]>([]);
}
```

### HTML

```html
<ol class="hms-timeline list-unstyled mb-0">
  @for (item of items; track item.title + $index) {
    <li class="hms-timeline__item">
      <span class="hms-timeline__marker" [class]="'bg-' + (item.variant || 'primary')" aria-hidden="true"></span>
      <div class="d-flex flex-column flex-md-row gap-1 justify-content-between">
        <h3 class="h6 mb-1">{{ item.title }}</h3>
        @if (item.timestamp) {
          <time class="small text-muted">{{ item.timestamp | date: dateFormat }}</time>
        }
      </div>
      @if (item.description) {
        <p class="text-muted mb-0">{{ item.description }}</p>
      }
    </li>
  }
</ol>

```

### SCSS

```scss
.hms-timeline {
  position: relative;
}

.hms-timeline__item {
  position: relative;
  padding: 0 0 1.25rem 1.75rem;
  border-left: 1px solid var(--bs-border-color);
}

.hms-timeline__item:last-child {
  padding-bottom: 0;
}

.hms-timeline__marker {
  position: absolute;
  top: 0.25rem;
  left: -0.45rem;
  width: 0.85rem;
  height: 0.85rem;
  border-radius: 50%;
}

```


================================================================================
## src\app\shared\components\feedback\alert\alert.component
================================================================================

### TypeScript

```typescript
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (visible()) {
      <div class="alert d-flex align-items-start gap-2 mb-0"
        [class.alert-dismissible]="dismissible()"
        [ngClass]="'alert-' + type()"
        role="alert">
        @if (icon()) { <i class="bi flex-shrink-0" [ngClass]="icon()!"></i> }
        <div class="flex-grow-1">
          @if (title()) { <div class="fw-semibold">{{ title() }}</div> }
          <ng-content />
          @if (message()) { <div [class.small]="title()">{{ message() }}</div> }
        </div>
        @if (dismissible()) {
          <button type="button" class="btn-close" (click)="dismissed.emit(); visible.set(false)"></button>
        }
      </div>
    }
  `,
})
export class AlertComponent {
  readonly type = input<'success' | 'danger' | 'warning' | 'info' | 'primary'>('info');
  readonly title = input<string>('');
  readonly message = input<string>('');
  readonly icon = input<string | null>(null);
  readonly dismissible = input<boolean>(false);
  readonly dismissed = output<void>();
  visible = { set: (_: boolean) => {}, value: true };

  constructor() {
    let _visible = true;
    this.visible = {
      set: (v: boolean) => { _visible = v; },
      get value() { return _visible; },
    };
  }
}
```

### HTML

```html
<div class="alert mb-0" [class]="'alert-' + type" role="alert">
  <div class="d-flex gap-3 align-items-start">
    <div class="flex-grow-1">
      @if (title) {
        <h2 class="h6 alert-heading mb-1">{{ title }}</h2>
      }
      <div>{{ message }}</div>
      <ng-content />
    </div>
    @if (dismissible) {
      <button type="button" class="btn-close" aria-label="Dismiss alert" (click)="dismissed.emit()"></button>
    }
  </div>
</div>

```

### SCSS

```scss
:host {
  display: block;
}

```


================================================================================
## src\app\shared\components\feedback\confirmation-dialog\confirmation-dialog.component
================================================================================

### TypeScript

```typescript
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (visible()) {
      <!-- Backdrop -->
      <div class="modal-backdrop fade show" style="z-index:1040;"></div>
      <!-- Dialog -->
      <div class="modal d-block" style="z-index:1050;" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-sm">
          <div class="modal-content border-0 shadow">
            <div class="modal-body p-4 text-center">
              <div class="mb-3">
                <i class="bi fs-1" [ngClass]="[icon(), 'text-' + color()]"></i>
              </div>
              <h5 class="fw-bold mb-2">{{ title() }}</h5>
              @if (message()) {
                <p class="text-muted small mb-0">{{ message() }}</p>
              }
            </div>
            <div class="modal-footer border-0 pt-0 justify-content-center gap-2">
              <button type="button" class="btn btn-outline-secondary btn-sm px-4"
                (click)="cancelled.emit()">
                {{ cancelLabel() }}
              </button>
              <button type="button" class="btn btn-sm px-4"
                [ngClass]="'btn-' + color()"
                (click)="confirmed.emit()">
                {{ confirmLabel() }}
              </button>
            </div>
          </div>
        </div>
      </div>
    }
  `,
})
export class ConfirmationDialogComponent {
  readonly visible = input<boolean>(false);
  readonly title = input<string>('هل أنت متأكد؟');
  readonly message = input<string>('');
  readonly confirmLabel = input<string>('تأكيد');
  readonly cancelLabel = input<string>('إلغاء');
  readonly icon = input<string>('bi-question-circle-fill');
  readonly color = input<string>('danger');
  readonly confirmed = output<void>();
  readonly cancelled = output<void>();
}
```

### HTML

```html
@if (state(); as dialog) {
  <div class="modal-backdrop fade show"></div>
  <div class="modal fade show d-block" tabindex="-1" role="dialog" aria-modal="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title h5">{{ dialog.title }}</h2>
          <button type="button" class="btn-close" aria-label="Close" (click)="close(false)"></button>
        </div>
        <div class="modal-body">
          <p class="mb-0">{{ dialog.message }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" (click)="close(false)">
            {{ dialog.cancelLabel }}
          </button>
          <button type="button" class="btn" [class]="'btn-' + dialog.variant" (click)="close(true)">
            {{ dialog.confirmLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
}

```

### SCSS

```scss
.modal {
  background: rgba(0, 0, 0, 0.08);
}

```


================================================================================
## src\app\shared\components\feedback\loading-spinner\loading-spinner.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (visible()) {
      <div class="d-flex align-items-center justify-content-center py-5 gap-3">
        <div class="spinner-border text-primary" [class.spinner-border-sm]="size() === 'sm'" role="status">
          <span class="visually-hidden">جاري التحميل...</span>
        </div>
        @if (label()) {
          <span class="text-muted small">{{ label() }}</span>
        }
      </div>
    }
  `,
})
export class LoadingSpinnerComponent {
  readonly visible = input<boolean>(true);
  readonly label = input<string>('جاري التحميل...');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
}
```

### HTML

```html
<div class="hms-loading-spinner" [class.text-center]="centered">
  <div
    class="spinner-border text-primary"
    [class.spinner-border-sm]="size === 'sm'"
    [class.hms-loading-spinner__lg]="size === 'lg'"
    role="status"
  >
    <span class="visually-hidden">{{ label }}</span>
  </div>
  @if (label) {
    <div class="small text-muted mt-2">{{ label }}</div>
  }
</div>

```

### SCSS

```scss
.hms-loading-spinner__lg {
  width: 3rem;
  height: 3rem;
}

```


================================================================================
## src\app\shared\components\feedback\skeleton-loader\skeleton-loader.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="placeholder-glow" [class]="containerClass()">
      @for (row of rows(); track $index) {
        <div class="d-flex gap-2 mb-3">
          @if (showAvatar()) {
            <span class="placeholder rounded-circle flex-shrink-0"
              style="width:40px;height:40px;"></span>
          }
          <div class="flex-grow-1">
            <span class="placeholder d-block mb-1 rounded"
              [style.width]="row.titleWidth ?? '60%'"
              style="height:14px;"></span>
            <span class="placeholder d-block rounded"
              [style.width]="row.subtitleWidth ?? '40%'"
              style="height:12px;"></span>
          </div>
        </div>
      }
    </div>
  `,
})
export class SkeletonLoaderComponent {
  readonly rowCount = input<number>(5);
  readonly showAvatar = input<boolean>(false);
  readonly containerClass = input<string>('');

  rows(): Array<{ titleWidth: string; subtitleWidth: string }> {
    return Array.from({ length: this.rowCount() }, (_, i) => ({
      titleWidth: `${50 + (i % 4) * 10}%`,
      subtitleWidth: `${30 + (i % 3) * 10}%`,
    }));
  }
}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\shared\components\feedback\toast\toast.component
================================================================================

### TypeScript

```typescript
import { Component, input, output, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (visible()) {
      <div class="toast show align-items-center border-0"
        [ngClass]="'text-bg-' + type()"
        role="alert" style="min-width:280px;">
        <div class="d-flex">
          <div class="toast-body d-flex align-items-center gap-2">
            <i class="bi" [ngClass]="iconClass()"></i>
            <span class="small">{{ message() }}</span>
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto"
            (click)="dismiss()"></button>
        </div>
      </div>
    }
  `,
})
export class ToastComponent implements OnInit, OnDestroy {
  readonly message = input.required<string>();
  readonly type = input<'success' | 'danger' | 'warning' | 'info'>('info');
  readonly duration = input<number>(4000);
  readonly dismissed = output<void>();

  readonly visible = signal(true);
  private timer?: ReturnType<typeof setTimeout>;

  readonly iconMap: Record<string, string> = {
    success: 'bi-check-circle-fill',
    danger:  'bi-exclamation-circle-fill',
    warning: 'bi-exclamation-triangle-fill',
    info:    'bi-info-circle-fill',
  };

  iconClass(): string { return this.iconMap[this.type()] ?? 'bi-info-circle-fill'; }

  ngOnInit(): void {
    if (this.duration() > 0) {
      this.timer = setTimeout(() => this.dismiss(), this.duration());
    }
  }

  ngOnDestroy(): void { if (this.timer) clearTimeout(this.timer); }

  dismiss(): void { this.visible.set(false); this.dismissed.emit(); }
}
```

### HTML

```html
<div class="toast-container position-fixed top-0 end-0 p-3">
  @for (toast of toasts(); track toast.id) {
    <div class="toast show border-0 shadow-sm mb-2" role="status" aria-live="polite">
      <div class="toast-header" [class]="'text-bg-' + toast.type">
        <strong class="me-auto">{{ toast.title || 'Notification' }}</strong>
        <button type="button" class="btn-close btn-close-white" aria-label="Close" (click)="dismiss(toast.id)"></button>
      </div>
      <div class="toast-body">{{ toast.message }}</div>
    </div>
  }
</div>

```

### SCSS

```scss
.toast-container {
  z-index: 1080;
}

```


================================================================================
## src\app\shared\components\forms\date-picker\date-picker.component
================================================================================

### TypeScript

```typescript
import { Component, input, output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'hms-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatePickerComponent), multi: true }],
  template: `
    <div class="input-group" [class.input-group-sm]="size() === 'sm'">
      <span class="input-group-text bg-light border-end-0">
        <i class="bi bi-calendar3 text-muted"></i>
      </span>
      <input
        type="date"
        class="form-control border-start-0"
        [class.is-invalid]="isInvalid()"
        [min]="minDate()"
        [max]="maxDate()"
        [disabled]="disabled"
        [(ngModel)]="value"
        (ngModelChange)="onChange($event); dateChanged.emit($event)"
      />
    </div>
  `,
})
export class DatePickerComponent implements ControlValueAccessor {
  readonly size = input<'sm' | 'md'>('md');
  readonly minDate = input<string>('');
  readonly maxDate = input<string>('');
  readonly isInvalid = input<boolean>(false);
  readonly dateChanged = output<string>();

  value = '';
  disabled = false;
  onChange: (v: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(v: string): void { this.value = v ?? ''; }
  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.disabled = d; }
}
```

### HTML

```html
@if (label) {
  <label class="form-label">
    {{ label }}
    @if (required) {
      <span class="text-danger">*</span>
    }
  </label>
}
<input
  type="date"
  class="form-control"
  [class.is-invalid]="!!error"
  [value]="value"
  [attr.min]="min || null"
  [attr.max]="max || null"
  [required]="required"
  [disabled]="disabled"
  (input)="update($any($event.target).value)"
  (blur)="touch()"
/>
@if (error) {
  <div class="invalid-feedback d-block">{{ error }}</div>
}

```

### SCSS

```scss
:host {
  display: block;
}

```


================================================================================
## src\app\shared\components\forms\file-upload\file-upload.component
================================================================================

### TypeScript

```typescript
import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="file-upload">
      <div
        class="border-2 rounded-3 p-4 text-center"
        [class.border-primary]="isDragging()"
        [class.bg-primary-subtle]="isDragging()"
        [class.border-dashed]="!selectedFile()"
        style="border-style: dashed; cursor: pointer;"
        (dragover)="onDragOver($event)"
        (dragleave)="isDragging.set(false)"
        (drop)="onDrop($event)">

        @if (selectedFile()) {
          <i class="bi bi-file-earmark-check text-success fs-2 d-block mb-2"></i>
          <div class="fw-semibold small">{{ selectedFile()!.name }}</div>
          <div class="text-muted" style="font-size:0.75rem;">
            {{ formatSize(selectedFile()!.size) }}
          </div>
          <label class="btn btn-sm btn-outline-secondary mt-2">
            تغيير الملف
            <input type="file" class="d-none" [accept]="accept()" (change)="onFileChange($event)" />
          </label>
        } @else {
          <i class="bi bi-cloud-upload text-muted fs-2 d-block mb-2"></i>
          <p class="text-muted small mb-2">اسحب وأفلت الملف هنا أو</p>
          <label class="btn btn-sm btn-outline-primary">
            اختيار ملف
            <input type="file" class="d-none" [accept]="accept()" (change)="onFileChange($event)" />
          </label>
          @if (hint()) {
            <p class="text-muted mt-2 mb-0" style="font-size:0.72rem;">{{ hint() }}</p>
          }
        }
      </div>
    </div>
  `,
})
export class FileUploadComponent {
  readonly accept = input<string>('*/*');
  readonly hint = input<string>('');
  readonly maxSizeMB = input<number>(10);
  readonly fileSelected = output<File>();

  readonly selectedFile = signal<File | null>(null);
  readonly isDragging = signal(false);

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.selectFile(file);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
    const file = event.dataTransfer?.files?.[0];
    if (file) this.selectFile(file);
  }

  private selectFile(file: File): void {
    this.selectedFile.set(file);
    this.fileSelected.emit(file);
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  clear(): void { this.selectedFile.set(null); }
}
```

### HTML

```html
<label class="form-label">{{ label }}</label>
<input
  #fileInput
  type="file"
  class="form-control"
  [class.is-invalid]="!!error"
  [attr.accept]="accept || null"
  [multiple]="multiple"
  [disabled]="disabled"
  (change)="updateFiles($any($event.target).files)"
  (blur)="touch()"
/>
@if (helperText && !error) {
  <div class="form-text">{{ helperText }}</div>
}
@if (files.length) {
  <ul class="list-group list-group-flush mt-2">
    @for (file of files; track file.name + file.size) {
      <li class="list-group-item px-0 py-1 small d-flex justify-content-between">
        <span>{{ file.name }}</span>
        <span class="text-muted">{{ file.size }} bytes</span>
      </li>
    }
  </ul>
  <button type="button" class="btn btn-outline-secondary btn-sm mt-2" [disabled]="disabled" (click)="clear(fileInput)">
    Remove files
  </button>
}
@if (error) {
  <div class="invalid-feedback d-block">{{ error }}</div>
}

```

### SCSS

```scss
:host {
  display: block;
}

```


================================================================================
## src\app\shared\components\forms\form-field\form-field.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-form-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-3">
      @if (label()) {
        <label class="form-label fw-semibold small">
          {{ label() }}
          @if (required()) { <span class="text-danger ms-1">*</span> }
        </label>
      }
      <ng-content />
      @if (hint()) {
        <div class="form-text text-muted">{{ hint() }}</div>
      }
      @if (error()) {
        <div class="invalid-feedback d-block small">{{ error() }}</div>
      }
    </div>
  `,
})
export class FormFieldComponent {
  readonly label = input<string>('');
  readonly hint = input<string>('');
  readonly error = input<string>('');
  readonly required = input<boolean>(false);
}
```

### HTML

```html
<label class="form-label">
  {{ label }}
  @if (required) {
    <span class="text-danger">*</span>
  }
</label>
<input
  class="form-control"
  [class.is-invalid]="!!error"
  [type]="type"
  [value]="value"
  [placeholder]="placeholder"
  [required]="required"
  [disabled]="disabled"
  [attr.autocomplete]="autocomplete"
  (input)="updateValue($any($event.target).value)"
  (blur)="markTouched()"
/>
@if (hint && !error) {
  <div class="form-text">{{ hint }}</div>
}
@if (error) {
  <div class="invalid-feedback d-block">{{ error }}</div>
}

```

### SCSS

```scss
:host {
  display: block;
}

```


================================================================================
## src\app\shared\components\forms\search-input\search-input.component
================================================================================

### TypeScript

```typescript
import { Component, input, output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'hms-search-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="input-group" [class.input-group-sm]="size() === 'sm'">
      <span class="input-group-text bg-light border-end-0">
        <i class="bi bi-search text-muted"></i>
      </span>
      <input
        type="search"
        class="form-control border-start-0"
        [placeholder]="placeholder()"
        [formControl]="control"
      />
      @if (control.value) {
        <button type="button" class="input-group-text bg-light border-start-0 cursor-pointer"
          (click)="control.reset()">
          <i class="bi bi-x text-muted"></i>
        </button>
      }
    </div>
  `,
})
export class SearchInputComponent implements OnInit {
  readonly placeholder = input<string>('بحث...');
  readonly debounce = input<number>(400);
  readonly size = input<'sm' | 'md'>('md');
  readonly searchChanged = output<string>();

  readonly control = new FormControl('');

  ngOnInit(): void {
    this.control.valueChanges.pipe(
      debounceTime(this.debounce()),
      distinctUntilChanged()
    ).subscribe((v) => this.searchChanged.emit(v ?? ''));
  }

  setValue(v: string): void { this.control.setValue(v, { emitEvent: false }); }
  reset(): void { this.control.reset(); }
}
```

### HTML

```html
<div class="input-group">
  <span class="input-group-text">{{ label }}</span>
  <input
    type="search"
    class="form-control"
    [value]="value()"
    [placeholder]="placeholder"
    [disabled]="disabled"
    [attr.aria-label]="label"
    (input)="update($any($event.target).value)"
    (blur)="touch()"
  />
  @if (value()) {
    <button type="button" class="btn btn-outline-secondary" [disabled]="disabled" (click)="clear()">Clear</button>
  }
</div>

```

### SCSS

```scss
:host {
  display: block;
}

```


================================================================================
## src\app\shared\components\forms\select-control\select-control.component
================================================================================

### TypeScript

```typescript
import { Component, input, output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption { value: string | number; label: string; disabled?: boolean; }

@Component({
  selector: 'hms-select-control',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectControlComponent), multi: true }],
  template: `
    <select
      class="form-select"
      [class.form-select-sm]="size() === 'sm'"
      [class.is-invalid]="isInvalid()"
      [disabled]="disabled"
      [(ngModel)]="value"
      (ngModelChange)="onChange($event)">
      @if (placeholder()) {
        <option value="">{{ placeholder() }}</option>
      }
      @for (opt of options(); track opt.value) {
        <option [value]="opt.value" [disabled]="opt.disabled ?? false">
          {{ opt.label }}
        </option>
      }
    </select>
  `,
})
export class SelectControlComponent implements ControlValueAccessor {
  readonly options = input<SelectOption[]>([]);
  readonly placeholder = input<string>('');
  readonly size = input<'sm' | 'md'>('md');
  readonly isInvalid = input<boolean>(false);

  value: string | number = '';
  disabled = false;
  onChange: (v: string | number) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(v: string | number): void { this.value = v; }
  registerOnChange(fn: (v: string | number) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.disabled = d; }
}
```

### HTML

```html
@if (label) {
  <label class="form-label">
    {{ label }}
    @if (required) {
      <span class="text-danger">*</span>
    }
  </label>
}
<select
  class="form-select"
  [class.is-invalid]="!!error"
  [disabled]="disabled"
  [required]="required"
  [value]="selectedIndex() ?? ''"
  (change)="update($any($event.target).value)"
  (blur)="touch()"
>
  <option value="" disabled>{{ placeholder }}</option>
  @for (option of options; track option.label + $index) {
    <option [value]="$index" [disabled]="option.disabled">{{ option.label }}</option>
  }
</select>
@if (error) {
  <div class="invalid-feedback d-block">{{ error }}</div>
}

```

### SCSS

```scss
:host {
  display: block;
}

```


================================================================================
## src\app\shared\components\forms\time-picker\time-picker.component
================================================================================

### TypeScript

```typescript
import { Component, input, output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'hms-time-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TimePickerComponent), multi: true }],
  template: `
    <div class="input-group" [class.input-group-sm]="size() === 'sm'">
      <span class="input-group-text bg-light border-end-0">
        <i class="bi bi-clock text-muted"></i>
      </span>
      <input
        type="time"
        class="form-control border-start-0"
        [class.is-invalid]="isInvalid()"
        [disabled]="disabled"
        [(ngModel)]="value"
        (ngModelChange)="onChange($event); timeChanged.emit($event)"
        dir="ltr"
      />
    </div>
  `,
})
export class TimePickerComponent implements ControlValueAccessor {
  readonly size = input<'sm' | 'md'>('md');
  readonly isInvalid = input<boolean>(false);
  readonly timeChanged = output<string>();

  value = '';
  disabled = false;
  onChange: (v: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(v: string): void { this.value = v ?? ''; }
  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.disabled = d; }
}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\shared\components\forms\validation-message\validation-message.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'hms-validation-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (control() && control()!.invalid && control()!.touched) {
      <div class="invalid-feedback d-block small">
        @if (control()!.errors?.['required']) { {{ requiredMsg() }} }
        @else if (control()!.errors?.['email']) { بريد إلكتروني غير صحيح }
        @else if (control()!.errors?.['minlength']) {
          الحد الأدنى {{ control()!.errors?.['minlength']?.requiredLength }} أحرف
        }
        @else if (control()!.errors?.['maxlength']) {
          الحد الأقصى {{ control()!.errors?.['maxlength']?.requiredLength }} أحرف
        }
        @else if (control()!.errors?.['min']) {
          القيمة الدنيا {{ control()!.errors?.['min']?.min }}
        }
        @else if (control()!.errors?.['max']) {
          القيمة القصوى {{ control()!.errors?.['max']?.max }}
        }
        @else if (control()!.errors?.['pattern']) { تنسيق غير صحيح }
        @else if (customMessage()) { {{ customMessage() }} }
      </div>
    }
  `,
})
export class ValidationMessageComponent {
  readonly control = input<AbstractControl | null>(null);
  readonly requiredMsg = input<string>('هذا الحقل مطلوب');
  readonly customMessage = input<string>('');
}
```

### HTML

```html
@if (shouldShow) {
  <div class="invalid-feedback d-block">{{ message }}</div>
}

```

### SCSS

```scss
:host {
  display: block;
}

```


================================================================================
## src\app\shared\components\layout\breadcrumb\breadcrumb.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Breadcrumb } from '../../../../core/domain/entities/breadcrumb.entity';

@Component({
  selector: 'hms-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb small mb-0">
        @for (item of items(); track item.label; let last = $last) {
          <li class="breadcrumb-item" [class.active]="last || item.isActive">
            @if (!last && item.path) {
              <a [routerLink]="item.path" class="text-decoration-none">
                @if (item.icon) { <i class="bi me-1" [ngClass]="item.icon"></i> }
                {{ item.label }}
              </a>
            } @else {
              @if (item.icon) { <i class="bi me-1" [ngClass]="item.icon"></i> }
              {{ item.label }}
            }
          </li>
        }
      </ol>
    </nav>
  `,
})
export class BreadcrumbComponent {
  readonly items = input<Breadcrumb[]>([]);
}
```

### HTML

```html
<nav [attr.aria-label]="label">
  <ol class="breadcrumb mb-0">
    @for (item of items; track item.label; let last = $last) {
      <li class="breadcrumb-item" [class.active]="last" [attr.aria-current]="last ? 'page' : null">
        @if (!last && item.url) {
          <a [routerLink]="item.url">{{ item.label }}</a>
        } @else {
          <span>{{ item.label }}</span>
        }
      </li>
    }
  </ol>
</nav>

```

### SCSS

```scss
:host {
  display: block;
}

```


================================================================================
## src\app\shared\components\layout\footer\footer.component
================================================================================

### TypeScript

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="border-top bg-white py-3 px-4">
      <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 small text-muted">
        <span>&copy; {{ year }} نظام إدارة المستشفى — جميع الحقوق محفوظة</span>
        <span dir="ltr">HMS v1.0.0</span>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\shared\components\layout\page-header\page-header.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Breadcrumb } from '../../../../core/domain/entities/breadcrumb.entity';

@Component({
  selector: 'hms-page-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="mb-4">
      @if (breadcrumbs().length > 0) {
        <nav aria-label="breadcrumb" class="mb-2">
          <ol class="breadcrumb small mb-0">
            @for (item of breadcrumbs(); track item.label; let last = $last) {
              <li class="breadcrumb-item" [class.active]="last">
                @if (!last && item.path) {
                  <a [routerLink]="item.path" class="text-decoration-none">{{ item.label }}</a>
                } @else {
                  {{ item.label }}
                }
              </li>
            }
          </ol>
        </nav>
      }
      <div class="d-flex align-items-start justify-content-between flex-wrap gap-2">
        <div>
          <h1 class="h4 fw-bold mb-0">
            @if (icon()) { <i class="bi me-2" [ngClass]="[icon()!, 'text-' + iconColor()]"></i> }
            {{ title() }}
          </h1>
          @if (subtitle()) {
            <p class="text-muted small mb-0 mt-1">{{ subtitle() }}</p>
          }
        </div>
        <ng-content select="[pageActions]" />
      </div>
    </div>
  `,
})
export class PageHeaderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
  readonly icon = input<string | null>(null);
  readonly iconColor = input<string>('primary');
  readonly breadcrumbs = input<Breadcrumb[]>([]);
}
```

### HTML

```html
<header class="d-flex flex-column flex-lg-row gap-3 justify-content-between align-items-lg-start mb-4">
  <div>
    <h1 class="h3 mb-1">{{ title }}</h1>
    @if (subtitle) {
      <p class="text-muted mb-0">{{ subtitle }}</p>
    }
  </div>
  @if (actions.length) {
    <div class="d-flex flex-wrap gap-2">
      @for (action of actions; track action.label) {
        <button
          type="button"
          class="btn"
          [class]="'btn-' + (action.variant || 'primary')"
          [disabled]="action.disabled"
          (click)="actionClick.emit(action)"
        >
          @if (action.icon) {
            <span aria-hidden="true" class="me-1">{{ action.icon }}</span>
          }
          {{ action.label }}
        </button>
      }
    </div>
  }
</header>

```

### SCSS

```scss
:host {
  display: block;
}

```


================================================================================
## src\app\shared\components\layout\page-toolbar\page-toolbar.component
================================================================================

### TypeScript

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-page-toolbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
      <div class="d-flex align-items-center gap-2 flex-wrap">
        <ng-content select="[toolbarStart]" />
      </div>
      <div class="d-flex align-items-center gap-2 flex-wrap">
        <ng-content select="[toolbarEnd]" />
      </div>
    </div>
  `,
})
export class PageToolbarComponent {}
```

### HTML

```html
<div class="d-flex flex-column flex-md-row gap-2 justify-content-between align-items-md-center border rounded p-2 bg-white">
  <div class="fw-semibold">{{ title }}</div>
  <div class="d-flex flex-wrap gap-2 align-items-center">
    <ng-content />
    @for (action of actions; track action.label) {
      <button
        type="button"
        class="btn btn-sm"
        [class]="'btn-outline-' + (action.variant || 'secondary')"
        [disabled]="action.disabled"
        (click)="actionClick.emit(action)"
      >
        {{ action.label }}
      </button>
    }
  </div>
</div>

```

### SCSS

```scss
:host {
  display: block;
}

```


================================================================================
## src\app\shared\components\layout\sidebar\sidebar.component
================================================================================

### TypeScript

```typescript
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../../../../core/domain/entities/menu-item.entity';

@Component({
  selector: 'hms-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="hms-sidebar d-flex flex-column"
      [class.collapsed]="collapsed()"
      [class.mobile-open]="mobileOpen()">

      <!-- Brand -->
      <div class="sidebar-brand d-flex align-items-center px-3 py-3 border-bottom">
        <i class="bi bi-hospital-fill text-primary fs-4 flex-shrink-0"></i>
        @if (!collapsed()) {
          <div class="ms-2 overflow-hidden">
            <div class="fw-bold text-dark lh-sm small">نظام إدارة</div>
            <div class="fw-bold text-primary lh-sm small">المستشفى</div>
          </div>
        }
      </div>

      <!-- Nav -->
      <nav class="sidebar-nav flex-grow-1 overflow-y-auto py-2">
        <ul class="list-unstyled mb-0">
          @for (item of menuItems(); track item.id) {
            <li>
              @if (item.children?.length) {
                <div class="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded mx-2 cursor-pointer"
                  (click)="toggleExpanded(item.id)">
                  <i class="bi flex-shrink-0" [ngClass]="item.icon"></i>
                  @if (!collapsed()) {
                    <span class="flex-grow-1">{{ item.labelAr }}</span>
                    <i class="bi bi-chevron-down small"
                      [class.rotate-180]="expandedItems.has(item.id)"></i>
                  }
                </div>
                @if (expandedItems.has(item.id) && !collapsed()) {
                  <ul class="list-unstyled ps-4 mb-0">
                    @for (child of item.children; track child.id) {
                      <li>
                        <a [routerLink]="child.path" routerLinkActive="active"
                          class="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded mx-2 small">
                          <i class="bi flex-shrink-0" [ngClass]="child.icon"></i>
                          <span>{{ child.labelAr }}</span>
                        </a>
                      </li>
                    }
                  </ul>
                }
              } @else {
                <a [routerLink]="item.path" routerLinkActive="active"
                  class="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded mx-2">
                  <i class="bi flex-shrink-0" [ngClass]="item.icon"></i>
                  @if (!collapsed()) { <span>{{ item.labelAr }}</span> }
                  @if (item.badge && !collapsed()) {
                    <span class="badge ms-auto rounded-pill"
                      [ngClass]="'bg-' + item.badge.color">
                      {{ item.badge.count }}
                    </span>
                  }
                </a>
              }
            </li>
          }
        </ul>
      </nav>

      <!-- Footer slot -->
      <div class="sidebar-footer border-top px-3 py-3">
        <ng-content />
      </div>
    </aside>
  `,
})
export class SidebarComponent {
  readonly menuItems = input<MenuItem[]>([]);
  readonly collapsed = input<boolean>(false);
  readonly mobileOpen = input<boolean>(false);

  expandedItems = new Set<string>();

  toggleExpanded(id: string): void {
    this.expandedItems.has(id) ? this.expandedItems.delete(id) : this.expandedItems.add(id);
  }
}
```

### HTML

```html

```

### SCSS

```scss

```


================================================================================
## src\app\shared\components\layout\topbar\topbar.component
================================================================================

### TypeScript

```typescript
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hms-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="hms-topbar d-flex align-items-center px-3 px-md-4 border-bottom bg-white">

      <!-- Sidebar Toggle -->
      <button class="btn btn-sm btn-light me-2 d-none d-md-flex" (click)="sidebarToggled.emit()">
        <i class="bi bi-layout-sidebar-reverse"></i>
      </button>
      <button class="btn btn-sm btn-light me-2 d-md-none" (click)="mobileSidebarToggled.emit()">
        <i class="bi bi-list fs-5"></i>
      </button>

      <!-- Title -->
      <h1 class="h6 fw-bold mb-0 flex-grow-1 text-truncate">{{ pageTitle() }}</h1>

      <!-- Actions -->
      <div class="d-flex align-items-center gap-2">
        <!-- Theme -->
        <button class="btn btn-sm btn-light" (click)="themeToggled.emit()" title="تبديل الثيم">
          <i class="bi" [class.bi-sun]="isDark()" [class.bi-moon]="!isDark()"></i>
        </button>

        <!-- Notifications -->
        <a routerLink="/notifications" class="btn btn-sm btn-light position-relative">
          <i class="bi bi-bell"></i>
          @if (notificationCount() > 0) {
            <span class="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger"
              style="font-size:0.6rem;">
              {{ notificationCount() > 99 ? '99+' : notificationCount() }}
            </span>
          }
        </a>

        <!-- User dropdown -->
        <div class="dropdown">
          <button class="btn btn-sm btn-light dropdown-toggle d-flex align-items-center gap-2"
            data-bs-toggle="dropdown">
            <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
              style="width:28px;height:28px;font-size:0.75rem;">
              {{ userInitials() }}
            </div>
            <span class="d-none d-md-inline small fw-semibold">{{ userName() }}</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-start">
            <li>
              <a class="dropdown-item small" routerLink="/auth/change-password">
                <i class="bi bi-shield-lock me-2"></i>تغيير كلمة المرور
              </a>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li>
              <button class="dropdown-item small text-danger" (click)="logoutClicked.emit()">
                <i class="bi bi-box-arrow-right me-2"></i>تسجيل الخروج
              </button>
            </li>
          </ul>
        </div>
      </div>

    </header>
  `,
})
export class TopbarComponent {
  readonly pageTitle = input<string>('');
  readonly userName = input<string>('');
  readonly userInitials = input<string>('');
  readonly isDark = input<boolean>(false);
  readonly notificationCount = input<number>(0);

  readonly sidebarToggled = output<void>();
  readonly mobileSidebarToggled = output<void>();
  readonly themeToggled = output<void>();
  readonly logoutClicked = output<void>();
}
```

### HTML

```html

```

### SCSS

```scss

```

