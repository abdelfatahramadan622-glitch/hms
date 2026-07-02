import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  private readonly platformId = inject(PLATFORM_ID);

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  get<T>(key: string): T | null {
    if (!this.isBrowser) return null;
    try {
      const item = sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    if (!this.isBrowser) return;
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`SessionStorageService: Failed to set key "${key}"`, error);
    }
  }

  remove(key: string): void {
    if (!this.isBrowser) return;
    sessionStorage.removeItem(key);
  }

  clear(): void {
    if (!this.isBrowser) return;
    sessionStorage.clear();
  }

  has(key: string): boolean {
    if (!this.isBrowser) return false;
    return sessionStorage.getItem(key) !== null;
  }
}