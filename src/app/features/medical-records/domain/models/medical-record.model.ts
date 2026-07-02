export type RecordType = 'visit' | 'surgery' | 'hospitalization' | 'follow-up' | 'consultation';

export interface MedicalRecordModel {
  id: string;
  recordNumber: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  departmentId: string;
  departmentName: string;
  type: RecordType;
  visitDate: string;
  chiefComplaint: string;
  presentIllness: string;
  physicalExamination?: string;
  diagnoses: DiagnosisModel[];
  treatmentPlan?: string;
  medications: string[];
  labOrderIds: string[];
  attachments: RecordAttachment[];
  followUpDate?: string;
  followUpNotes?: string;
  notes?: string;
  isClosed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DiagnosisModel {
  id: string;
  code: string;
  name: string;
  type: 'primary' | 'secondary' | 'differential';
  notes?: string;
}

export interface RecordAttachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  uploadedAt: string;
}

export const RECORD_TYPE_LABELS: Record<RecordType, string> = {
  visit:            'زيارة',
  surgery:          'عملية',
  hospitalization:  'تنويم',
  'follow-up':      'متابعة',
  consultation:     'استشارة',
};