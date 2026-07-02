import { Injectable, inject } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

/**
 * Secure storage wraps localStorage with base64 obfuscation.
 * For production, replace encode/decode with a proper AES encryption library.
 */
@Injectable({ providedIn: 'root' })
export class SecureStorageService {
  private readonly localStorage = inject(LocalStorageService);
  private readonly PREFIX = '__hms_sec__';

  private encode(value: string): string {
    try {
      return btoa(encodeURIComponent(value));
    } catch {
      return value;
    }
  }

  private decode(value: string): string {
    try {
      return decodeURIComponent(atob(value));
    } catch {
      return value;
    }
  }

  private buildKey(key: string): string {
    return `${this.PREFIX}${key}`;
  }

  get<T>(key: string): T | null {
    const raw = this.localStorage.get<string>(this.buildKey(key));
    if (!raw) return null;
    try {
      return JSON.parse(this.decode(raw)) as T;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    const encoded = this.encode(JSON.stringify(value));
    this.localStorage.set(this.buildKey(key), encoded);
  }

  remove(key: string): void {
    this.localStorage.remove(this.buildKey(key));
  }

  clear(): void {
    this.localStorage.clearByPrefix(this.PREFIX);
  }

  has(key: string): boolean {
    return this.localStorage.has(this.buildKey(key));
  }
}