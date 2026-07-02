import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PAYMENT_METHOD_LABELS, PaymentMethod } from '../../../domain/models/invoice.model';
import { CreatePaymentRequest } from '../../../domain/models/billing-filter.model';
import { formatCurrency } from '../../../domain/entities/invoice.entity';

@Component({
  selector: 'hms-payment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss',
})
export class PaymentFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly invoiceId = input.required<string>();
  readonly remainingAmount = input<number>(0);
  readonly isProcessing = input<boolean>(false);
  readonly submitted = output<CreatePaymentRequest>();
  readonly cancelled = output<void>();

  readonly methodLabels = PAYMENT_METHOD_LABELS;
  readonly methods = Object.keys(PAYMENT_METHOD_LABELS) as PaymentMethod[];
  readonly fmt = formatCurrency;

  form = this.fb.group({
    amount:    [0, [Validators.required, Validators.min(0.01)]],
    method:    ['cash' as PaymentMethod, Validators.required],
    reference: [''],
    notes:     [''],
  });

  get f() { return this.form.controls; }

  setFullAmount(): void { this.form.patchValue({ amount: this.remainingAmount() }); }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.getRawValue();
    this.submitted.emit({
      invoiceId:  this.invoiceId(),
      amount:     v.amount!,
      method:     v.method!,
      reference:  v.reference || undefined,
      notes:      v.notes || undefined,
    });
  }
}