import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AppConfigRepository } from '../domain/repositories/app-config.repository';
import { map, catchError, of } from 'rxjs';
import { ROUTE_PATHS } from '../constants/route-paths.constants';

export const featureAccessGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const configRepo = inject(AppConfigRepository);
  const router = inject(Router);
  const featureKey: string = route.data['feature'];

  if (!featureKey) return true;

  return configRepo.getConfig().pipe(
    map((config) => {
      const enabled = (config.features as Record<string, boolean>)[featureKey];
      if (enabled) return true;
      return router.createUrlTree([`/${ROUTE_PATHS.ERRORS.NOT_FOUND}`]);
    }),
    catchError(() => of(true))
  );
};