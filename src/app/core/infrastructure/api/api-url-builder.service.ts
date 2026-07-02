import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';

export interface QueryParams {
  [key: string]: string | number | boolean | string[] | null | undefined;
}

@Injectable({ providedIn: 'root' })
export class ApiUrlBuilderService {
  private readonly baseUrl = environment.apiBaseUrl;

  build(endpoint: string, params?: QueryParams): string {
    const url = `${this.baseUrl}${endpoint}`;
    if (!params) return url;
    const queryString = this.buildQueryString(params);
    return queryString ? `${url}?${queryString}` : url;
  }

  private buildQueryString(params: QueryParams): string {
    const parts: string[] = [];

    for (const [key, value] of Object.entries(params)) {
      if (value === null || value === undefined || value === '') continue;

      if (Array.isArray(value)) {
        value.forEach((v) =>
          parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`)
        );
      } else {
        parts.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
        );
      }
    }

    return parts.join('&');
  }

  buildPaginatedUrl(
    endpoint: string,
    page: number,
    pageSize: number,
    params?: QueryParams
  ): string {
    return this.build(endpoint, { page, pageSize, ...params });
  }
}