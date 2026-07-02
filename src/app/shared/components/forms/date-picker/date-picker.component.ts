import { Component, input, output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'hms-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatePickerComponent), multi: true }],
  styles: [`
    .input-group {
      border-radius: 10px;
      overflow: hidden;
      transition: box-shadow 0.3s ease;
    }
    .input-group:focus-within {
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.12);
    }
    .input-group-text {
      background-color: #f0fdf4 !important;
      border-color: #dcfce7;
      color: #15803d;
      border-right: none;
    }
    .form-control {
      border-left: none;
      border-color: #dcfce7;
      border-radius: 0 10px 10px 0;
      transition: border-color 0.3s ease;
    }
    .form-control:focus {
      border-color: #22c55e;
      box-shadow: none;
    }
    .form-control.is-invalid {
      border-color: #f87171;
    }
    .bi-calendar3 {
      color: #22c55e;
    }
    .text-muted {
      color: #9ca3af;
    }
  `],
  template: `
    <div class="input-group" [class.input-group-sm]="size() === 'sm'">
      <span class="input-group-text bg-light border-end-0">
        <i class="bi bi-calendar3 text-muted"></i>
      </span>
      <input
        type="date"
        class="form-control border-start-0"
        [class.is-invalid]="isInvalid()"
        [min]="minDate()"
        [max]="maxDate()"
        [disabled]="disabled"
        [(ngModel)]="value"
        (ngModelChange)="onChange($event); dateChanged.emit($event)"
      />
    </div>
  `,
})
export class DatePickerComponent implements ControlValueAccessor {
  readonly size = input<'sm' | 'md'>('md');
  readonly minDate = input<string>('');
  readonly maxDate = input<string>('');
  readonly isInvalid = input<boolean>(false);
  readonly dateChanged = output<string>();

  value = '';
  disabled = false;
  onChange: (v: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(v: string): void { this.value = v ?? ''; }
  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.disabled = d; }
}