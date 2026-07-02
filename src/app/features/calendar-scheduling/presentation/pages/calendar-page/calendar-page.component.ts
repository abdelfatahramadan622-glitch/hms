import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutService } from '../../../../../core/application/services/layout.service';

@Component({
  selector: 'hms-calendar-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [`
    :host { display: block; animation: fadeUp 0.4s ease both; }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

    .h4 { color: #14532d; i { color: #16a34a; margin-left: 0.5rem; } }

    .header-actions { display: flex; gap: 0.6rem; }
    .btn {
      border-radius: 10px; font-weight: 600; font-size: 0.85rem;
      transition: all 0.2s; padding: 0.45rem 1rem;
    }
    .btn-outline-primary { border: 1.5px solid #e8f5ec; color: #166534; &:hover { background: #f0fdf4; border-color: #bbf7d0; } }
    .btn-primary {
      border: none; background: linear-gradient(135deg, #15803d, #16a34a); color: #fff;
      box-shadow: 0 2px 8px rgba(22, 101, 52, 0.2);
      i { margin-left: 0.35rem; }
      &:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(22, 101, 52, 0.3); color: #fff; }
    }

    .card {
      border-radius: 16px !important; border: 1px solid #e8f5ec !important;
      box-shadow: 0 2px 8px rgba(22, 101, 52, 0.05) !important;
    }
    .placeholder-icon {
      width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 1.5rem;
      background: #f0fdf4; color: #a3c4b0; display: grid; place-items: center; font-size: 2rem;
    }
    h5 { color: #14532d; }
    p { color: #6b9a7e; }
    .btn-outline-primary-view {
      border-radius: 12px; font-weight: 600; border: 1.5px solid #e8f5ec;
      color: #166534; transition: all 0.2s; padding: 0.6rem 1.5rem;
      i { margin-left: 0.5rem; }
      &:hover { background: #f0fdf4; border-color: #bbf7d0; transform: translateY(-2px); }
    }
  `],
  template: `
    <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
      <h1 class="h4 fw-bold mb-0">
        <i class="fa-regular fa-calendar-days"></i>التقويم والجدولة
      </h1>
      <div class="header-actions">
        <a routerLink="/appointments/calendar" class="btn btn-outline-primary">
          <i class="fa-regular fa-calendar-check"></i>تقويم المواعيد
        </a>
        <button class="btn btn-primary">
          <i class="fa-solid fa-plus"></i>حدث جديد
        </button>
      </div>
    </div>
    <div class="card border-0 shadow-sm">
      <div class="card-body text-center py-5">
        <div class="placeholder-icon">
          <i class="fa-regular fa-calendar-days"></i>
        </div>
        <h5 class="fw-bold mb-2">التقويم والجدولة</h5>
        <p class="small mb-4">سيتم عرض التقويم الكامل هنا مع أحداث المستشفى</p>
        <a routerLink="/appointments/calendar" class="btn btn-outline-primary-view">
          <i class="fa-regular fa-calendar-check"></i>عرض تقويم المواعيد
        </a>
      </div>
    </div>
  `,
})
export class CalendarPageComponent implements OnInit {
  private readonly layout = inject(LayoutService);
  ngOnInit(): void { this.layout.setPageTitle('Calendar', 'التقويم'); }
}