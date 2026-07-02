export interface TableColumn<T = unknown> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  hidden?: boolean;
  width?: string;
  align?: 'start' | 'center' | 'end';
  type?: 'text' | 'date' | 'currency' | 'badge' | 'actions';
  render?: (row: T) => string;
}