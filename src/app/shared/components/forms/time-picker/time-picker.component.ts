import { Component, input, output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'hms-time-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TimePickerComponent), multi: true }],
  template: `
    <div class="input-group" [class.input-group-sm]="size() === 'sm'">
      <span class="input-group-text bg-light border-end-0">
        <i class="bi bi-clock text-muted"></i>
      </span>
      <input
        type="time"
        class="form-control border-start-0"
        [class.is-invalid]="isInvalid()"
        [disabled]="disabled"
        [(ngModel)]="value"
        (ngModelChange)="onChange($event); timeChanged.emit($event)"
        dir="ltr"
      />
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .input-group {
      border-radius: 10px;
      overflow: hidden;
      transition: all 0.3s ease;
      border: 1px solid #e5e7eb;
    }

    .input-group:focus-within {
      border-color: #22c55e;
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.12);
    }

    .input-group .input-group-text {
      border: none;
      transition: color 0.3s ease;
    }

    .input-group:focus-within .input-group-text {
      color: #15803d;
    }

    .input-group .form-control {
      border: none;
      box-shadow: none !important;
    }

    .input-group .form-control:focus {
      box-shadow: none !important;
    }
  `]
})
export class TimePickerComponent implements ControlValueAccessor {
  readonly size = input<'sm' | 'md'>('md');
  readonly isInvalid = input<boolean>(false);
  readonly timeChanged = output<string>();

  value = '';
  disabled = false;
  onChange: (v: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(v: string): void { this.value = v ?? ''; }
  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.disabled = d; }
}