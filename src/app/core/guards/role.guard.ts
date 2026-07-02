import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { SessionService } from '../application/services/session.service';
import { ROUTE_PATHS } from '../constants/route-paths.constants';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const session = inject(SessionService);
  const router = inject(Router);

  const requiredRoles: string[] = route.data['roles'] ?? [];
  if (!requiredRoles.length) return true;

  const user = session.getUserContext();
  if (!user) return router.createUrlTree([`/${ROUTE_PATHS.AUTH.LOGIN}`]);

  const hasRole = requiredRoles.some((r) => user.roles.includes(r));
  if (hasRole) return true;

  return router.createUrlTree([`/${ROUTE_PATHS.ERRORS.FORBIDDEN}`]);
};