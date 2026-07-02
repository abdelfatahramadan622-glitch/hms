import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BillingFacade } from '../../../application/facades/billing.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';
import { ITEM_TYPE_LABELS, InvoiceItemType } from '../../../domain/models/invoice.model';
import { CreateInvoiceRequest } from '../../../domain/repositories/billing.repository';

@Component({
  selector: 'hms-invoice-form-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './invoice-form-page.component.html',
  styleUrl: './invoice-form-page.component.scss',
})
export class InvoiceFormPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly facade = inject(BillingFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  readonly typeLabels = ITEM_TYPE_LABELS;
  readonly types = Object.keys(ITEM_TYPE_LABELS) as InvoiceItemType[];
  invoiceId: string | null = null;

  form = this.fb.group({
    patientId:       ['', Validators.required],
    appointmentId:   [''],
    dueDate:         ['', Validators.required],
    discountPercent: [0, [Validators.min(0), Validators.max(100)]],
    taxPercent:      [0, [Validators.min(0), Validators.max(100)]],
    notes:           [''],
    items:           this.fb.array([]),
  });

  get itemsArray(): FormArray { return this.form.get('items') as FormArray; }
  get f() { return this.form.controls; }
  get isEdit(): boolean { return !!this.invoiceId; }

  get calculatedSubtotal(): number {
    return this.itemsArray.controls.reduce((sum, ctrl) => {
      const q = ctrl.get('quantity')?.value ?? 0;
      const p = ctrl.get('unitPrice')?.value ?? 0;
      const d = ctrl.get('discount')?.value ?? 0;
      return sum + (q * p * (1 - d / 100));
    }, 0);
  }

  get calculatedTotal(): number {
    const sub = this.calculatedSubtotal;
    const disc = this.form.value.discountPercent ?? 0;
    const tax = this.form.value.taxPercent ?? 0;
    return sub * (1 - disc / 100) * (1 + tax / 100);
  }

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.paramMap.get('id');
    const patientId = this.route.snapshot.queryParams['patientId'] ?? '';
    const appointmentId = this.route.snapshot.queryParams['appointmentId'] ?? '';
    if (patientId) this.form.patchValue({ patientId });
    if (appointmentId) this.form.patchValue({ appointmentId });

    const defaultDue = new Date();
    defaultDue.setDate(defaultDue.getDate() + 30);
    this.form.patchValue({ dueDate: defaultDue.toISOString().split('T')[0] });
    this.addItem();

    if (this.isEdit) {
      this.facade.loadById(this.invoiceId!);
      this.layout.setPageTitle('Edit Invoice', 'تعديل الفاتورة');
    } else {
      this.layout.setPageTitle('New Invoice', 'فاتورة جديدة');
    }
  }

  addItem(): void {
    this.itemsArray.push(this.fb.group({
      type:        ['consultation', Validators.required],
      description: ['',            [Validators.required, Validators.minLength(3)]],
      quantity:    [1,             [Validators.required, Validators.min(1)]],
      unitPrice:   [0,             [Validators.required, Validators.min(0)]],
      discount:    [0,             [Validators.min(0), Validators.max(100)]],
    }));
  }

  removeItem(i: number): void {
    if (this.itemsArray.length > 1) this.itemsArray.removeAt(i);
  }

  formatCurrency(v: number): string {
    return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 2 }).format(v);
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.getRawValue();
    const req: CreateInvoiceRequest = {
      patientId:       v.patientId!,
      appointmentId:   v.appointmentId || undefined,
      dueDate:         v.dueDate!,
      discountPercent: v.discountPercent ?? 0,
      taxPercent:      v.taxPercent ?? 0,
      notes:           v.notes || undefined,
      items:           (v.items as any[]).map((it) => ({
        type:        it.type,
        description: it.description,
        quantity:    it.quantity,
        unitPrice:   it.unitPrice,
        discount:    it.discount ?? 0,
      })),
    };
    const action$ = this.isEdit
      ? this.facade.update(this.invoiceId!, req)
      : this.facade.create(req);
    action$.subscribe({ next: (inv) => this.nav.goTo(`/billing/invoices/${inv.id}`) });
  }

  onCancel(): void {
    this.isEdit ? this.nav.goTo(`/billing/invoices/${this.invoiceId}`) : this.nav.goTo('/billing/invoices');
  }
}