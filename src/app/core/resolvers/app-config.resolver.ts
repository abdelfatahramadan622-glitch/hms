import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { AppConfig } from '../domain/models/app-config.model';
import { AppConfigRepository } from '../domain/repositories/app-config.repository';

export const appConfigResolver: ResolveFn<AppConfig | null> = (): Observable<AppConfig | null> => {
  return inject(AppConfigRepository)
    .getConfig()
    .pipe(
      catchError(() => of(null))
    );
};
