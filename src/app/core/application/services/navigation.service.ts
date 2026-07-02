import { Injectable, inject } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
import { ROUTE_PATHS } from '../../constants/route-paths.constants';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  goTo(path: string, extras?: NavigationExtras): Promise<boolean> {
    return this.router.navigate([path], extras);
  }

  goToLogin(): Promise<boolean> {
    return this.goTo(`/${ROUTE_PATHS.AUTH.LOGIN}`);
  }

  goToDashboard(): Promise<boolean> {
    return this.goTo(`/${ROUTE_PATHS.DASHBOARD}`);
  }

  goToNotFound(): Promise<boolean> {
    return this.goTo(`/${ROUTE_PATHS.ERRORS.NOT_FOUND}`);
  }

  goToForbidden(): Promise<boolean> {
    return this.goTo(`/${ROUTE_PATHS.ERRORS.FORBIDDEN}`);
  }

  back(): void {
    this.location.back();
  }

  getCurrentUrl(): string {
    return this.router.url;
  }

  getReturnUrl(): string {
    const currentUrl = this.getCurrentUrl();
    return currentUrl !== `/${ROUTE_PATHS.AUTH.LOGIN}` ? currentUrl : `/${ROUTE_PATHS.DASHBOARD}`;
  }
}