import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

export interface LayoutState {
  isSidebarCollapsed: boolean;
  isSidebarMobileOpen: boolean;
  pageTitle: string;
  pageTitleAr: string;
  loadingCount: number;
}

const initialState: LayoutState = {
  isSidebarCollapsed: false,
  isSidebarMobileOpen: false,
  pageTitle: '',
  pageTitleAr: '',
  loadingCount: 0,
};

export const LayoutStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    toggleSidebar(): void { patchState(store, { isSidebarCollapsed: !store.isSidebarCollapsed() }); },
    openMobileSidebar(): void { patchState(store, { isSidebarMobileOpen: true }); },
    closeMobileSidebar(): void { patchState(store, { isSidebarMobileOpen: false }); },
    setPageTitle(pageTitle: string, pageTitleAr: string): void { patchState(store, { pageTitle, pageTitleAr }); },
    incrementLoading(): void { patchState(store, { loadingCount: store.loadingCount() + 1 }); },
    decrementLoading(): void { patchState(store, { loadingCount: Math.max(0, store.loadingCount() - 1) }); },
  }))
);
