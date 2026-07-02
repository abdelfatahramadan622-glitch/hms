import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';

export interface HasUnsavedChanges {
  hasUnsavedChanges(): boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = (component) => {
  if (!component.hasUnsavedChanges()) return true;

  return window.confirm(
    'لديك تغييرات غير محفوظة. هل تريد المغادرة؟\nYou have unsaved changes. Do you want to leave?'
  );
};