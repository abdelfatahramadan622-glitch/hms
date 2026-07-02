import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  // Sidebar
  readonly isSidebarCollapsed = signal(false);
  readonly isSidebarMobileOpen = signal(false);

  // Loading
  private readonly _loadingCount = signal(0);
  readonly isLoading = computed(() => this._loadingCount() > 0);

  // Page
  readonly pageTitle = signal('');
  readonly pageTitleAr = signal('');

  toggleSidebar(): void {
    this.isSidebarCollapsed.update((v) => !v);
  }

  openMobileSidebar(): void {
    this.isSidebarMobileOpen.set(true);
  }

  closeMobileSidebar(): void {
    this.isSidebarMobileOpen.set(false);
  }

  setLoading(loading: boolean): void {
    this._loadingCount.update((count) =>
      loading ? count + 1 : Math.max(0, count - 1)
    );
  }

  setPageTitle(en: string, ar: string): void {
    this.pageTitle.set(en);
    this.pageTitleAr.set(ar);
  }
}