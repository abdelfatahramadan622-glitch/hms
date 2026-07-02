export type SortDirection = 'asc' | 'desc';

export interface SortParams {
  sortBy: string;
  sortDirection: SortDirection;
}

export interface SortOption {
  label: string;
  field: string;
}

export function toggleSortDirection(current: SortDirection): SortDirection {
  return current === 'asc' ? 'desc' : 'asc';
}

export function createDefaultSort(field: string): SortParams {
  return { sortBy: field, sortDirection: 'asc' };
}