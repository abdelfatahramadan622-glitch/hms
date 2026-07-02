import { Pipe, PipeTransform } from '@angular/core';

const STATUS_MAP: Record<string, string> = {
  active: 'نشط',
  inactive: 'غير نشط',
  pending: 'في الانتظار',
  completed: 'مكتمل',
  cancelled: 'ملغى',
  draft: 'مسودة',
  approved: 'معتمد',
  rejected: 'مرفوض',
  scheduled: 'مجدول',
  confirmed: 'مؤكد',
  dispensed: 'صرف',
  expired: 'منتهي',
  'in-progress': 'جار',
  paid: 'مدفوع',
  'partially-paid': 'مدفوع جزئيا',
  overdue: 'متأخر',
  refunded: 'مسترد',
  issued: 'صادر'
};

@Pipe({ name: 'medicalStatus', standalone: true })
export class MedicalStatusPipe implements PipeTransform {
  transform(status: string | null): string {
    if (!status) return '—';
    return STATUS_MAP[status] ?? status;
  }
}
