export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  statusCode: number;
  timestamp: string;
}

export interface ApiListResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationMeta;
}

export interface PaginationMeta {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}