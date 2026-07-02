import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { LookupRepository, LookupItem, LookupType } from '../../domain/repositories/lookup.repository';
import { ApiClientService } from '../api/api-client.service';
import { API_ENDPOINTS } from '../api/api-endpoints';

@Injectable({ providedIn: 'root' })
export class LookupApiRepository extends LookupRepository {
  private readonly api = inject(ApiClientService);

  getLookup(type: LookupType): Observable<LookupItem[]> {
    return this.api.get<LookupItem[]>(API_ENDPOINTS.CONFIG.LOOKUP(type));
  }

  getLookups(types: LookupType[]): Observable<Record<LookupType, LookupItem[]>> {
    const requests = types.reduce(
      (acc, type) => ({ ...acc, [type]: this.getLookup(type) }),
      {} as Record<LookupType, Observable<LookupItem[]>>
    );

    return forkJoin(requests) as Observable<Record<LookupType, LookupItem[]>>;
  }
}