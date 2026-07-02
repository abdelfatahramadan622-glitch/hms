import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../application/services/session.service';
import { ROUTE_PATHS } from '../constants/route-paths.constants';

export const guestGuard: CanActivateFn = () => {
  const session = inject(SessionService);
  const router = inject(Router);

  if (!session.hasValidSession()) return true;

  return router.createUrlTree([`/${ROUTE_PATHS.DASHBOARD}`]);
};