import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SecureStorageService } from '../infrastructure/storage/secure-storage.service';
import { APP_CONSTANTS } from '../constants/app.constants';

export const authTokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const secureStorage = inject(SecureStorageService);
  const token = secureStorage.get<string>(APP_CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN);

  if (!token) return next(req);

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });

  return next(authReq);
};