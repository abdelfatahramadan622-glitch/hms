import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AppConfigRepository } from '../../domain/repositories/app-config.repository';
import { AppConfig } from '../../domain/models/app-config.model';
import { ApiClientService } from '../api/api-client.service';
import { LocalStorageService } from '../storage/local-storage.service';
import { API_ENDPOINTS } from '../api/api-endpoints';
import { APP_CONSTANTS } from '../../constants/app.constants';

@Injectable({ providedIn: 'root' })
export class AppConfigApiRepository extends AppConfigRepository {
  private readonly api = inject(ApiClientService);
  private readonly localStorage = inject(LocalStorageService);

  getConfig(): Observable<AppConfig> {
    const cached = this.localStorage.get<AppConfig>(APP_CONSTANTS.STORAGE_KEYS.APP_CONFIG);
    if (cached) return new Observable((obs) => { obs.next(cached); obs.complete(); });
    return this.fetchAndCache();
  }

  refreshConfig(): Observable<AppConfig> {
    return this.fetchAndCache();
  }

  private fetchAndCache(): Observable<AppConfig> {
    return this.api.get<AppConfig>(API_ENDPOINTS.CONFIG.APP).pipe(
      tap((config) =>
        this.localStorage.set(APP_CONSTANTS.STORAGE_KEYS.APP_CONFIG, config)
      )
    );
  }
}