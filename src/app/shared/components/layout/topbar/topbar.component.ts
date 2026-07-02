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
            <div class="rounded-circle d-flex align-items-center justify-content-center user-avatar"
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
  styles: [`
    :host {
      display: block;
    }

    .hms-topbar {
      border-bottom-color: #f0fdf4 !important;
      min-height: 56px;
    }

    .hms-topbar .btn-light {
      border-radius: 8px;
      border: 1px solid #f3f4f6;
      transition: all 0.2s ease;
    }

    .hms-topbar .btn-light:hover {
      background-color: #f0fdf4;
      border-color: #dcfce7;
      color: #15803d;
    }

    .user-avatar {
      background: linear-gradient(135deg, #15803d, #22c55e) !important;
      color: #fff !important;
    }

    .h6 {
      color: #1f2937;
    }

    .dropdown-menu {
      border-radius: 10px;
      border: 1px solid #f0fdf4;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      padding: 6px;
    }

    .dropdown-item {
      border-radius: 8px;
      padding: 8px 14px;
      transition: all 0.2s ease;
    }

    .dropdown-item:hover {
      background-color: #f0fdf4;
      color: #15803d;
    }

    .dropdown-item.text-danger:hover {
      background-color: #fef2f2;
      color: #dc2626;
    }

    .dropdown-divider {
      border-color: #f0fdf4;
      margin: 4px 8px;
    }

    .badge.bg-danger {
      background-color: #ef4444 !important;
    }
  `]
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