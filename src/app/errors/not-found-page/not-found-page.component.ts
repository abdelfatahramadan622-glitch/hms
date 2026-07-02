import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hms-not-found-page',
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
      background: linear-gradient(135deg, var(--g-50), var(--g-100)); display: grid; place-items: center;
      animation: pulseRing 2s ease-in-out infinite;
    }
    .error-icon-wrap i { font-size: 2.5rem; color: var(--g-600); }
    .error-code { font-size: 4rem; font-weight: 800; color: var(--g-900); line-height: 1; margin-bottom: 0.5rem; }
    .error-title { font-size: 1.4rem; font-weight: 700; color: #1a2e23; margin-bottom: 0.5rem; }
    .error-desc { color: #6b9a7e; font-size: 0.95rem; margin-bottom: 2rem; line-height: 1.6; }
    .btn-home {
      padding: 0.7rem 2rem; border-radius: 12px; font-weight: 600; font-size: 0.9rem;
      transition: all 0.3s ease; border: none;
      background: linear-gradient(135deg, var(--g-700), var(--g-600)); color: #fff;
      box-shadow: 0 4px 12px rgba(22, 101, 52, 0.2);
    }
    .btn-home:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(22, 101, 52, 0.3); }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulseRing { 0%, 100% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.2); } 50% { box-shadow: 0 0 0 15px rgba(22, 163, 74, 0); } }
  `],
  template: `
    <div class="error-wrapper">
      <div class="error-card">
        <div class="error-icon-wrap">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div class="error-code">404</div>
        <h2 class="error-title">الصفحة غير موجودة</h2>
        <p class="error-desc">الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها إلى عنوان آخر.</p>
        <a routerLink="/dashboard" class="btn btn-home">
          <i class="fa-solid fa-house me-2"></i>العودة للرئيسية
        </a>
      </div>
    </div>
  `,
})
export class NotFoundPageComponent {}