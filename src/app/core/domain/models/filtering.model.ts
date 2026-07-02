import { PaginationParams, createDefaultPagination } from './pagination.model';
import { SortParams } from './sorting.model';

export interface FilterParams extends PaginationParams {
  search?: string;
  sort?: SortParams;
  dateFrom?: string;
  dateTo?: string;
}

export type FilterValue = string | number | boolean | string[] | null | undefined;

export interface ActiveFilter {
  key: string;
  label: string;
  value: FilterValue;
  displayValue: string;
}

export function createDefaultFilter(overrides?: Partial<FilterParams>): FilterParams {
  return {
    ...createDefaultPagination(),
    search: '',
    ...overrides,
  };
}

export function hasActiveFilters(filter: FilterParams): boolean {
  const { page, pageSize, sort, ...rest } = filter;
  return Object.values(rest).some(
    (v) => v !== undefined && v !== null && v !== ''
  );
}