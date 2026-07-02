import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { SessionService } from '../application/services/session.service';
import { ROUTE_PATHS } from '../constants/route-paths.constants';

export const permissionGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const session = inject(SessionService);
  const router = inject(Router);

  const requiredPermissions: string[] = route.data['permissions'] ?? [];
  if (!requiredPermissions.length) return true;

  const user = session.getUserContext();
  if (!user) return router.createUrlTree([`/${ROUTE_PATHS.AUTH.LOGIN}`]);

  const hasAll = requiredPermissions.every((p) => user.permissions.includes(p));
  if (hasAll) return true;

  return router.createUrlTree([`/${ROUTE_PATHS.ERRORS.FORBIDDEN}`]);
};