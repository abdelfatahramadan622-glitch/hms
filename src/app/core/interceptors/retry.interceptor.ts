import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { retry, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const RETRYABLE_STATUS_CODES = [503, 504];
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1000;

export const retryInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  // Only retry GET requests
  if (req.method !== 'GET') return next(req);

  return next(req).pipe(
    retry({
      count: MAX_RETRIES,
      delay: (error: HttpErrorResponse, retryCount: number) => {
        if (!RETRYABLE_STATUS_CODES.includes(error.status)) {
          throw error;
        }
        return timer(RETRY_DELAY_MS * retryCount);
      },
    })
  );
};