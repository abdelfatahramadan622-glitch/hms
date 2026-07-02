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
        <i class="fa-solid fa-hospital text-white fs-4 flex-shrink-0"></i>
        @if (!collapsed()) {
          <div class="ms-2 overflow-hidden">
            <div class="fw-bold text-white lh-sm small">نظام إدارة</div>
            <div class="fw-bold lh-sm small" style="color: #bbf7d0;">المستشفى</div>
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
                    <i class="bi bi-chevron-down small transition-transform"
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
  styles: [`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .hms-sidebar {
      width: 260px;
      background: #fff;
      border-inline-end: 1px solid #e5e7eb;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
      animation: fadeUp 0.4s ease-out;
    }

    .hms-sidebar.collapsed {
      width: 68px;
    }

    /* Brand */
    .sidebar-brand {
      background: linear-gradient(135deg, #15803d 0%, #22c55e 100%);
      border-bottom: none !important;
      min-height: 60px;
    }

    /* Nav */
    .sidebar-nav {
      scrollbar-width: thin;
      scrollbar-color: #dcfce7 transparent;
    }

    .sidebar-nav::-webkit-scrollbar {
      width: 4px;
    }

    .sidebar-nav::-webkit-scrollbar-thumb {
      background: #dcfce7;
      border-radius: 4px;
    }

    .nav-link {
      color: #4b5563;
      transition: all 0.2s ease;
      margin: 2px 10px;
      border-radius: 8px;
      position: relative;
      font-size: 0.875rem;
    }

    .nav-link:hover {
      background: #f0fdf4;
      color: #15803d;
    }

    .nav-link.active {
      background: linear-gradient(135deg, #f0fdf4, #dcfce7);
      color: #15803d;
      font-weight: 600;
    }

    .nav-link.active::after {
      content: '';
      position: absolute;
      inset-inline-end: -10px;
      top: 15%;
      height: 70%;
      width: 3px;
      background: #15803d;
      border-radius: 3px;
    }

    .nav-link i {
      font-size: 1rem;
      width: 20px;
      text-align: center;
    }

    /* Chevron rotation */
    .bi-chevron-down {
      transition: transform 0.3s ease;
      font-size: 0.7rem;
    }

    .rotate-180 {
      transform: rotate(180deg);
    }

    /* Submenu */
    .ps-4 {
      padding-inline-start: 1.5rem !important;
    }

    .ps-4 .nav-link {
      margin-inline-start: 16px;
      font-size: 0.8rem;
    }

    /* Badge override */
    .badge.bg-danger {
      background-color: #ef4444 !important;
      font-size: 0.65rem;
      min-width: 18px;
      text-align: center;
    }

    .badge.bg-warning {
      background-color: #f59e0b !important;
      font-size: 0.65rem;
      min-width: 18px;
      text-align: center;
    }

    .badge.bg-success {
      background-color: #22c55e !important;
      font-size: 0.65rem;
      min-width: 18px;
      text-align: center;
    }

    /* Footer */
    .sidebar-footer {
      border-top-color: #f0fdf4 !important;
    }

    /* Collapsed state */
    .collapsed .nav-link {
      justify-content: center;
      padding-inline-start: 0 !important;
      padding-inline-end: 0 !important;
      margin-inline-start: 6px;
      margin-inline-end: 6px;
    }

    .collapsed .nav-link i {
      margin: 0;
    }

    .collapsed .sidebar-brand {
      justify-content: center;
    }

    .collapsed .sidebar-brand > div {
      display: none;
    }

    .collapsed .sidebar-footer {
      display: none;
    }
  `]
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