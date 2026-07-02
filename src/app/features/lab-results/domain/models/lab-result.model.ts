export type LabResultStatus = 'pending' | 'in-progress' | 'completed' | 'approved' | 'rejected';
export type LabTestCategory = 'hematology' | 'biochemistry' | 'microbiology' | 'immunology' | 'radiology' | 'pathology' | 'other';

export interface LabResultModel {
  id: string;
  resultNumber: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  orderedAt: string;
  completedAt?: string;
  approvedAt?: string;
  approvedBy?: string;
  status: LabResultStatus;
  tests: LabTestModel[];
  notes?: string;
  fileUrl?: string;
  hospitalId: string;
}

export interface LabTestModel {
  id: string;
  name: string;
  category: LabTestCategory;
  value?: string;
  unit?: string;
  referenceMin?: number;
  referenceMax?: number;
  referenceText?: string;
  isAbnormal: boolean;
  isCritical: boolean;
  notes?: string;
}

// Partial<Record<...>>: see doctor.model.ts for the rationale — keeps the
// `?.` / `??` fallbacks in lab-result-viewer / lab-result-detail-page /
// lab-result-list-page meaningful instead of TS treating access as
// always-defined.
export const LAB_STATUS_CONFIG: Partial<Record<LabResultStatus, { label: string; class: string; icon: string }>> = {
  pending:      { label: 'في الانتظار', class: 'bg-secondary-subtle text-secondary', icon: 'bi-hourglass' },
  'in-progress':{ label: 'جارٍ',        class: 'bg-warning-subtle text-warning',     icon: 'bi-arrow-repeat' },
  completed:    { label: 'مكتمل',       class: 'bg-info-subtle text-info',           icon: 'bi-check-circle' },
  approved:     { label: 'معتمد',       class: 'bg-success-subtle text-success',     icon: 'bi-patch-check' },
  rejected:     { label: 'مرفوض',       class: 'bg-danger-subtle text-danger',       icon: 'bi-x-circle' },
};

export const LAB_CATEGORY_LABELS: Record<LabTestCategory, string> = {
  hematology:   'دموية',
  biochemistry: 'كيمياء حيوية',
  microbiology: 'ميكروبيولوجيا',
  immunology:   'مناعة',
  radiology:    'أشعة',
  pathology:    'أنسجة',
  other:        'أخرى',
};
