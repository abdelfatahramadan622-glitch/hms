import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn<T = unknown> {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'start' | 'center' | 'end';
  render?: (row: T) => string;
}

@Component({
  selector: 'hms-data-table',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    :host {
      display: block;
      animation: fadeUp 0.4s ease-out;
    }
    .table {
      border-collapse: separate;
      border-spacing: 0;
      border-radius: 12px;
      overflow: hidden;
    }
    .table thead {
      background-color: #f0fdf4;
    }
    .table thead th {
      border-bottom: 2px solid #dcfce7;
      color: #15803d;
      font-weight: 600;
      font-size: 0.82rem;
      padding: 12px 16px;
      white-space: nowrap;
    }
    .table td, .table th {
      border-color: #f0fdf4;
      vertical-align: middle;
    }
    .table tbody tr {
      transition: background-color 0.25s ease;
    }
    .table tbody tr:hover {
      background-color: #f0fdf4;
    }
    .table tbody td {
      padding: 10px 16px;
      font-size: 0.88rem;
      color: #374151;
    }
    .cursor-pointer {
      cursor: pointer;
    }
    .placeholder-glow .placeholder {
      animation: shimmer 1.5s infinite;
      background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
      background-size: 200% 100%;
      border-radius: 6px;
    }
    .bi-chevron-expand {
      font-size: 0.6rem;
      color: #86efac;
    }
    .bi-inbox {
      color: #86efac;
    }
    .text-center.py-5 {
      color: #6b7280;
    }
  `],
  template: `
    <div class="table-responsive">
      <table class="table table-hover align-middle mb-0 small">
        <thead class="table-light">
          <tr>
            @for (col of columns(); track col.key) {
              <th [style.width]="col.width ?? 'auto'"
                [class]="'text-' + (col.align ?? 'start')"
                [class.cursor-pointer]="col.sortable"
                (click)="col.sortable && sortChanged.emit(col.key)">
                {{ col.label }}
                @if (col.sortable) {
                  <i class="bi bi-chevron-expand ms-1 text-muted" style="font-size:0.65rem;"></i>
                }
              </th>
            }
            @if (hasActions()) { <th class="text-end">إجراءات</th> }
          </tr>
        </thead>
        <tbody>
          @if (isLoading()) {
            @for (i of skeletonRows(); track i) {
              <tr>
                @for (col of columns(); track col.key) {
                  <td><span class="placeholder col-8 rounded placeholder-glow d-block"></span></td>
                }
                @if (hasActions()) { <td></td> }
              </tr>
            }
          } @else if (data().length === 0) {
            <tr>
              <td [attr.colspan]="columns().length + (hasActions() ? 1 : 0)" class="text-center py-5 text-muted">
                <i class="bi bi-inbox fs-2 d-block mb-2"></i>
                {{ emptyMessage() }}
              </td>
            </tr>
          } @else {
            @for (row of data(); track trackByFn()(row)) {
              <tr (click)="rowClicked.emit(row)" [class.cursor-pointer]="rowClickable()">
                @for (col of columns(); track col.key) {
                  <td [class]="'text-' + (col.align ?? 'start')">
                    {{ col.render ? col.render(row) : getCellValue(row, col.key) }}
                  </td>
                }
                @if (hasActions()) {
                  <td class="text-end">
                    <ng-content select="[tableActions]" />
                  </td>
                }
              </tr>
            }
          }
        </tbody>
      </table>
    </div>
  `,
})
export class DataTableComponent<T extends Record<string, unknown> = Record<string, unknown>> {
  readonly columns = input<TableColumn<T>[]>([]);
  readonly data = input<T[]>([]);
  readonly isLoading = input<boolean>(false);
  readonly hasActions = input<boolean>(false);
  readonly rowClickable = input<boolean>(false);
  readonly emptyMessage = input<string>('لا توجد بيانات');
  readonly trackByFn = input<(row: T) => unknown>((row) => (row as { id?: unknown }).id ?? row);
  readonly rowClicked = output<T>();
  readonly sortChanged = output<string>();

  skeletonRows(): number[] { return Array.from({ length: 5 }, (_, i) => i); }
  getCellValue(row: T, key: string): string {
    const val = (row as Record<string, unknown>)[key];
    return val != null ? String(val) : '—';
  }
}