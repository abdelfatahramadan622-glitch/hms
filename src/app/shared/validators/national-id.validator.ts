import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nationalIdValidator(length = 14): ValidatorFn {
  return (control: AbstractControl<string | null>): ValidationErrors | null => {
    const value = control.value?.trim();

    if (!value) {
      return null;
    }

    const isValid = new RegExp(`^\\d{${length}}$`).test(value);
    return isValid ? null : { nationalId: { requiredLength: length, actualLength: value.length } };
  };
}
