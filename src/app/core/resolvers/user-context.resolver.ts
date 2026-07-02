import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AppUserContext } from '../domain/entities/app-user-context.entity';
import { SessionService } from '../application/services/session.service';

export const userContextResolver: ResolveFn<AppUserContext | null> = (): AppUserContext | null => {
  return inject(SessionService).getUserContext();
};
