import { Component, input, output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption { value: string | number; label: string; disabled?: boolean; }

@Component({
  selector: 'hms-select-control',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectControlComponent), multi: true }],
  template: `
    <select
      class="form-select"
      [class.form-select-sm]="size() === 'sm'"
      [class.is-invalid]="isInvalid()"
      [disabled]="disabled"
      [(ngModel)]="value"
      (ngModelChange)="onChange($event)">
      @if (placeholder()) {
        <option value="">{{ placeholder() }}</option>
      }
      @for (opt of options(); track opt.value) {
        <option [value]="opt.value" [disabled]="opt.disabled ?? false">
          {{ opt.label }}
        </option>
      }
    </select>
  `,
  styles: [`
    :host {
      display: block;
    }

    .form-select {
      border-radius: 10px;
      border: 1px solid #e5e7eb;
      transition: all 0.3s ease;
      padding: 8px 40px 8px 14px;
    }

    .form-select:focus {
      border-color: #22c55e;
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.12);
    }

    .form-select.is-invalid {
      border-color: #fca5a5;
    }

    .form-select.is-invalid:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
  `]
})
export class SelectControlComponent implements ControlValueAccessor {
  readonly options = input<SelectOption[]>([]);
  readonly placeholder = input<string>('');
  readonly size = input<'sm' | 'md'>('md');
  readonly isInvalid = input<boolean>(false);

  value: string | number = '';
  disabled = false;
  onChange: (v: string | number) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(v: string | number): void { this.value = v; }
  registerOnChange(fn: (v: string | number) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.disabled = d; }
}