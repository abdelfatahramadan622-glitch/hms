import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hms-server-error-page',
  standalone: true,
  imports: [RouterModule],
  styles: [`
    :host {
      --g-50: #f0fdf4; --g-100: #dcfce7; --g-500: #22c55e; --g-600: #16a34a; --g-700: #15803d; --g-800: #166534; --g-900: #14532d;
      display: block; min-height: 100vh;
      background: linear-gradient(175deg, var(--g-50) 0%, #edf7f0 50%, var(--g-50) 100%);
      position: relative; overflow: hidden;
      &::before {
        content: ''; position: absolute; inset: 0;
        background-image: radial-gradient(circle, rgba(22, 101, 52, 0.035) 1px, transparent 1px);
        background-size: 28px 28px; pointer-events: none;
      }
    }
    .error-wrapper {
      display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 2rem;
      position: relative; z-index: 1; animation: fadeUp 0.6s ease both;
    }
    .error-card {
      background: #fff; border-radius: 24px; padding: 3rem 2.5rem; text-align: center;
      box-shadow: 0 4px 24px rgba(22, 101, 52, 0.07); border: 1px solid #d1e7da;
      max-width: 440px; width: 100%;
    }
    .error-icon-wrap {
      width: 100px; height: 100px; border-radius: 50%; margin: 0 auto 1.5rem;
      background: linear-gradient(135deg, #fffbeb, #fef3c7); display: grid; place-items: center;
      animation: pulseRing 2s ease-in-out infinite;
    }
    .error-icon-wrap i { font-size: 2.5rem; color: #f59e0b; }
    .error-code { font-size: 4rem; font-weight: 800; color: var(--g-900); line-height: 1; margin-bottom: 0.5rem; }
    .error-title { font-size: 1.4rem; font-weight: 700; color: #1a2e23; margin-bottom: 0.5rem; }
    .error-desc { color: #6b9a7e; font-size: 0.95rem; margin-bottom: 2rem; line-height: 1.6; }
    .btn {
      padding: 0.7rem 1.5rem; border-radius: 12px; font-weight: 600; font-size: 0.9rem;
      transition: all 0.3s ease; border: none;
    }
    .btn-retry { background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb !important; }
    .btn-retry:hover { background: #e5e7eb; transform: translateY(-2px); }
    .btn-home {
      background: linear-gradient(135deg, var(--g-700), var(--g-600)); color: #fff;
      box-shadow: 0 4px 12px rgba(22, 101, 52, 0.2);
    }
    .btn-home:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(22, 101, 52, 0.3); }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulseRing { 0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.2); } 50% { box-shadow: 0 0 0 15px rgba(245, 158, 11, 0); } }
  `],
  template: `
    <div class="error-wrapper">
      <div class="error-card">
        <div class="error-icon-wrap">
          <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
        <div class="error-code">500</div>
        <h2 class="error-title">خطأ في الخادم</h2>
        <p class="error-desc">حدث خطأ غير متوقع أثناء معالجة طلبك. يرجى المحاولة مرة أخرى لاحقاً.</p>
        <div class="d-flex gap-3 justify-content-center">
          <button class="btn btn-retry" (click)="reload()">
            <i class="fa-solid fa-rotate-right me-2"></i>إعادة المحاولة
          </button>
          <a routerLink="/dashboard" class="btn btn-home">
            <i class="fa-solid fa-house me-2"></i>لوحة التحكم
          </a>
        </div>
      </div>
    </div>
  `,
})
export class ServerErrorPageComponent {
  reload(): void { window.location.reload(); }
}