import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiUrlBuilderService, QueryParams } from './api-url-builder.service';
import { HttpResponseMapperService } from './http-response-mapper.service';
import { ApiResponse, ApiListResponse } from '../../domain/models/api-response.model';
import { PaginatedResult } from '../../domain/models/pagination.model';

@Injectable({ providedIn: 'root' })
export class ApiClientService {
  private readonly http = inject(HttpClient);
  private readonly urlBuilder = inject(ApiUrlBuilderService);
  private readonly mapper = inject(HttpResponseMapperService);

  get<T>(endpoint: string, params?: QueryParams): Observable<T> {
    const url = this.urlBuilder.build(endpoint, params);
    return this.http
      .get<ApiResponse<T>>(url)
      .pipe(
        map((res) => this.mapper.mapToData(res)),
        catchError((err) => this.mapper.mapHttpError(err))
      );
  }

  getList<T>(endpoint: string, params?: QueryParams): Observable<PaginatedResult<T>> {
    const url = this.urlBuilder.build(endpoint, params);
    return this.http
      .get<ApiListResponse<T>>(url)
      .pipe(
        map((res) => this.mapper.mapToPaginatedResult(res)),
        catchError((err) => this.mapper.mapHttpError(err))
      );
  }

  post<T>(endpoint: string, body: unknown): Observable<T> {
    const url = this.urlBuilder.build(endpoint);
    return this.http
      .post<ApiResponse<T>>(url, body)
      .pipe(
        map((res) => this.mapper.mapToData(res)),
        catchError((err) => this.mapper.mapHttpError(err))
      );
  }

  put<T>(endpoint: string, body: unknown): Observable<T> {
    const url = this.urlBuilder.build(endpoint);
    return this.http
      .put<ApiResponse<T>>(url, body)
      .pipe(
        map((res) => this.mapper.mapToData(res)),
        catchError((err) => this.mapper.mapHttpError(err))
      );
  }

  patch<T>(endpoint: string, body: unknown): Observable<T> {
    const url = this.urlBuilder.build(endpoint);
    return this.http
      .patch<ApiResponse<T>>(url, body)
      .pipe(
        map((res) => this.mapper.mapToData(res)),
        catchError((err) => this.mapper.mapHttpError(err))
      );
  }

  delete<T = void>(endpoint: string): Observable<T> {
    const url = this.urlBuilder.build(endpoint);
    return this.http
      .delete<ApiResponse<T>>(url)
      .pipe(
        map((res) => this.mapper.mapToData(res)),
        catchError((err) => this.mapper.mapHttpError(err))
      );
  }

  upload<T>(endpoint: string, file: File, extraData?: Record<string, string>): Observable<T> {
    const url = this.urlBuilder.build(endpoint);
    const formData = new FormData();
    formData.append('file', file, file.name);
    if (extraData) {
      Object.entries(extraData).forEach(([key, val]) =>
        formData.append(key, val)
      );
    }
    return this.http
      .post<ApiResponse<T>>(url, formData)
      .pipe(
        map((res) => this.mapper.mapToData(res)),
        catchError((err) => this.mapper.mapHttpError(err))
      );
  }

  download(endpoint: string, params?: QueryParams): Observable<Blob> {
    const url = this.urlBuilder.build(endpoint, params);
    return this.http
      .get(url, { responseType: 'blob' })
      .pipe(catchError((err) => this.mapper.mapHttpError(err)));
  }
}