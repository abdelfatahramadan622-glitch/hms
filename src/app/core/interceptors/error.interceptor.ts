import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ROUTE_PATHS } from '../constants/route-paths.constants';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 401:
          router.navigate([`/${ROUTE_PATHS.AUTH.LOGIN}`]);
          break;
        case 403:
          router.navigate([`/${ROUTE_PATHS.ERRORS.FORBIDDEN}`]);
          break;
        case 500:
        case 503:
          router.navigate([`/${ROUTE_PATHS.ERRORS.SERVER_ERROR}`]);
          break;
      }
      return throwError(() => error);
    })
  );
};