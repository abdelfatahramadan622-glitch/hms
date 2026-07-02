import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LayoutService } from '../application/services/layout.service';

export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const layoutService = inject(LayoutService);

  // Skip loading indicator for background requests
  const skipLoading = req.headers.has('X-Skip-Loading');
  if (skipLoading) return next(req);

  layoutService.setLoading(true);

  return next(req).pipe(finalize(() => layoutService.setLoading(false)));
};