import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceItemModel, ITEM_TYPE_LABELS } from '../../../domain/models/invoice.model';
import { formatCurrency } from '../../../domain/entities/invoice.entity';

@Component({
  selector: 'hms-invoice-items-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-items-table.component.html',
  styleUrl: './invoice-items-table.component.scss',
})
export class InvoiceItemsTableComponent {
  readonly items = input<InvoiceItemModel[]>([]);
  readonly typeLabels = ITEM_TYPE_LABELS;
  readonly fmt = formatCurrency;
}