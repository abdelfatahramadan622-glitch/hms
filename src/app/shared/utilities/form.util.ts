import { AbstractControl, FormGroup } from '@angular/forms';

export function markAllAsTouched(form: FormGroup): void {
  Object.values(form.controls).forEach((control) => {
    control.markAsTouched();
    if (control instanceof FormGroup) markAllAsTouched(control);
  });
}

export function getFirstError(control: AbstractControl | null): string | null {
  if (!control || !control.errors) return null;
  const errorKey = Object.keys(control.errors)[0];
  return errorKey ?? null;
}

export function resetForm(form: FormGroup, defaultValues: Record<string, unknown> = {}): void {
  form.reset(defaultValues);
}

export function hasError(control: AbstractControl | null, errorName: string): boolean {
  return !!(control && control.touched && control.hasError(errorName));
}

export function isFieldInvalid(control: AbstractControl | null): boolean {
  return !!(control && control.invalid && (control.touched || control.dirty));
}

export function getDirtyValues(form: FormGroup): Record<string, unknown> {
  const dirtyValues: Record<string, unknown> = {};
  Object.keys(form.controls).forEach((key) => {
    const control = form.get(key);
    if (control?.dirty) dirtyValues[key] = control.value;
  });
  return dirtyValues;
}