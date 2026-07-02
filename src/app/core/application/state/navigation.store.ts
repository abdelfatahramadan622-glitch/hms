import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { Breadcrumb } from '../../domain/entities/breadcrumb.entity';

export interface NavigationState {
  currentUrl: string;
  previousUrl: string | null;
  breadcrumbs: Breadcrumb[];
}

const initialState: NavigationState = {
  currentUrl: '/',
  previousUrl: null,
  breadcrumbs: [],
};

export const NavigationStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setCurrentUrl(url: string): void {
      patchState(store, {
        previousUrl: store.currentUrl(),
        currentUrl: url
      });
    },

    setBreadcrumbs(breadcrumbs: Breadcrumb[]): void {
      patchState(store, { breadcrumbs });
    },
  }))
);
