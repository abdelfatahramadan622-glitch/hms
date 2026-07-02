export type RealtimeEventType =
  | 'appointment.created' | 'appointment.updated' | 'appointment.cancelled'
  | 'emergency.created' | 'emergency.updated' | 'emergency.closed'
  | 'lab.completed' | 'lab.approved' | 'lab.critical'
  | 'payment.received' | 'invoice.overdue'
  | 'notification.new' | 'system.maintenance';

export interface RealtimeEvent<T = unknown> {
  id: string;
  type: RealtimeEventType;
  payload: T;
  timestamp: string;
  userId?: string;
  hospitalId: string;
}
