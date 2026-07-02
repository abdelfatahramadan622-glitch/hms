import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { ApiResponse, ApiListResponse } from '../../domain/models/api-response.model';
import { ApiError } from '../../domain/models/api-error.model';
import {
  PaginatedResult,
  createEmptyPaginatedResult,
} from '../../domain/models/pagination.model';

@Injectable({ providedIn: 'root' })
export class HttpResponseMapperService {
  mapToData<T>(response: ApiResponse<T>): T {
    return response.data;
  }

  mapToPaginatedResult<T>(response: ApiListResponse<T>): PaginatedResult<T> {
    if (!response?.data) return createEmptyPaginatedResult<T>();

    return {
      items: response.data,
      totalCount: response.pagination.totalCount,
      currentPage: response.pagination.currentPage,
      pageSize: response.pagination.pageSize,
      totalPages: response.pagination.totalPages,
      hasNextPage: response.pagination.hasNextPage,
      hasPreviousPage: response.pagination.hasPreviousPage,
    };
  }

  mapHttpError(error: HttpErrorResponse): Observable<never> {
    const apiError: ApiError = {
      statusCode: error.status,
      message: this.extractMessage(error),
      errors: error.error?.errors,
      traceId: error.error?.traceId,
      timestamp: new Date().toISOString(),
    };
    return throwError(() => apiError);
  }

  private extractMessage(error: HttpErrorResponse): string {
    if (error.error?.message) return error.error.message;
    if (typeof error.error === 'string') return error.error;

    const statusMessages: Record<number, string> = {
      400: 'طلب غير صالح',
      401: 'غير مصرح بالوصول، يرجى تسجيل الدخول',
      403: 'ليس لديك صلاحية للوصول',
      404: 'البيانات المطلوبة غير موجودة',
      409: 'تعارض في البيانات',
      422: 'بيانات غير صالحة',
      429: 'طلبات كثيرة جداً، يرجى المحاولة لاحقاً',
      500: 'خطأ في الخادم، يرجى المحاولة لاحقاً',
      503: 'الخدمة غير متاحة مؤقتاً',
    };

    return statusMessages[error.status] ?? 'حدث خطأ غير متوقع';
  }
}