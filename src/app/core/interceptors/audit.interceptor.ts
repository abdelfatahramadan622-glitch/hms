import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { SecureStorageService } from '../infrastructure/storage/secure-storage.service';
import { APP_CONSTANTS } from '../constants/app.constants';

const AUDITABLE_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];

export const auditInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  if (!AUDITABLE_METHODS.includes(req.method)) return next(req);

  const secureStorage = inject(SecureStorageService);
  const userId = secureStorage.get<{ userId: string }>(
    APP_CONSTANTS.STORAGE_KEYS.USER_CONTEXT
  )?.userId;

  const auditedReq = req.clone({
    setHeaders: {
      'X-Audit-User': userId ?? 'anonymous',
      'X-Audit-Time': new Date().toISOString(),
    },
  });

  return next(auditedReq).pipe(
    tap((event) => {
      if (event instanceof HttpResponse && event.ok) {
        // Audit logging can be extended here (e.g. write to a log service)
      }
    })
  );
};