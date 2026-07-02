import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { SupportedLanguage, AppTheme } from '../../domain/models/app-config.model';

export interface AppState {
  language: SupportedLanguage;
  theme: AppTheme;
  isInitialized: boolean;
  isMaintenanceMode: boolean;
}

const initialState: AppState = {
  language: 'ar',
  theme: 'light',
  isInitialized: false,
  isMaintenanceMode: false,
};

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setLanguage(language: SupportedLanguage): void { patchState(store, { language }); },
    setTheme(theme: AppTheme): void { patchState(store, { theme }); },
    setInitialized(isInitialized: boolean): void { patchState(store, { isInitialized }); },
    setMaintenanceMode(isMaintenanceMode: boolean): void { patchState(store, { isMaintenanceMode }); },
  }))
);
