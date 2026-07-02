import { Injectable, inject, signal, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AppTheme } from '../../domain/models/app-config.model';
import { LocalStorageService } from '../../infrastructure/storage/local-storage.service';
import { APP_CONSTANTS } from '../../constants/app.constants';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly localStorage = inject(LocalStorageService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly currentTheme = signal<AppTheme>(this.loadSavedTheme());

  constructor() {
    effect(() => {
      this.applyTheme(this.currentTheme());
    });
  }

  setTheme(theme: AppTheme): void {
    this.currentTheme.set(theme);
    this.localStorage.set(APP_CONSTANTS.STORAGE_KEYS.THEME, theme);
  }

  toggleTheme(): void {
    const next = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(next);
  }

  isDark(): boolean {
    const theme = this.currentTheme();
    if (theme === 'system') return this.isSystemDark();
    return theme === 'dark';
  }

  private loadSavedTheme(): AppTheme {
    return (
      this.localStorage.get<AppTheme>(APP_CONSTANTS.STORAGE_KEYS.THEME) ??
      APP_CONSTANTS.DEFAULT_THEME
    );
  }

  private applyTheme(theme: AppTheme): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const resolved = theme === 'system'
      ? (this.isSystemDark() ? 'dark' : 'light')
      : theme;

    document.documentElement.setAttribute('data-bs-theme', resolved);
    document.body.classList.toggle('dark-theme', resolved === 'dark');
  }

  private isSystemDark(): boolean {
    return (
      isPlatformBrowser(this.platformId) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }
}