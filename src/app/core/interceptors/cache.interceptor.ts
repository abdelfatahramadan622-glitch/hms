import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpResponse,
} from '@angular/common/http';
import { of, tap } from 'rxjs';

const cache = new Map<string, { response: HttpResponse<unknown>; expiry: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const CACHEABLE_PATTERNS = ['/config/', '/lookups/'];

function isCacheable(req: HttpRequest<unknown>): boolean {
  if (req.method !== 'GET') return false;
  return CACHEABLE_PATTERNS.some((pattern) => req.url.includes(pattern));
}

export const cacheInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  if (!isCacheable(req)) return next(req);

  const cached = cache.get(req.url);
  if (cached && cached.expiry > Date.now()) {
    return of(cached.response.clone());
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cache.set(req.url, {
          response: event.clone(),
          expiry: Date.now() + CACHE_TTL_MS,
        });
      }
    })
  );
};

export function clearCache(): void {
  cache.clear();
}

export function clearCacheByPattern(pattern: string): void {
  for (const key of cache.keys()) {
    if (key.includes(pattern)) cache.delete(key);
  }
}