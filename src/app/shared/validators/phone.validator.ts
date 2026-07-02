import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const PHONE_PATTERN = /^\+?[0-9\s()-]{7,20}$/;

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl<string | null>): ValidationErrors | null => {
    const value = control.value?.trim();

    if (!value) {
      return null;
    }

    return PHONE_PATTERN.test(value) ? null : { phone: true };
  };
}
