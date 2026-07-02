import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fullName', standalone: true })
export class FullNamePipe implements PipeTransform {
  transform(value: { firstName?: string; lastName?: string; fullName?: string } | null): string {
    if (!value) return '—';
    if (value.fullName) return value.fullName;
    return [value.firstName, value.lastName].filter(Boolean).join(' ') || '—';
  }
}
