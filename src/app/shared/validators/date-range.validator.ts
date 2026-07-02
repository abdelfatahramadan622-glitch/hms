import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface DateRangeValidatorOptions {
  readonly startKey: string;
  readonly endKey: string;
}

export function dateRangeValidator(options: DateRangeValidatorOptions): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startValue = control.get(options.startKey)?.value as string | Date | null | undefined;
    const endValue = control.get(options.endKey)?.value as string | Date | null | undefined;

    if (!startValue || !endValue) {
      return null;
    }

    const start = startValue instanceof Date ? startValue : new Date(startValue);
    const end = endValue instanceof Date ? endValue : new Date(endValue);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return null;
    }

    return start <= end ? null : { dateRange: { startKey: options.startKey, endKey: options.endKey } };
  };
}
