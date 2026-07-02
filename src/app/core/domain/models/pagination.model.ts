export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE = 1;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export function createDefaultPagination(): PaginationParams {
  return { page: DEFAULT_PAGE, pageSize: DEFAULT_PAGE_SIZE };
}

export function createEmptyPaginatedResult<T>(): PaginatedResult<T> {
  return {
    items: [],
    totalCount: 0,
    currentPage: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  };
}