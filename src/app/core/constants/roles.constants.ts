export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  HOSPITAL_ADMIN: 'hospital_admin',
  DOCTOR: 'doctor',
  NURSE: 'nurse',
  RECEPTIONIST: 'receptionist',
  LAB_TECHNICIAN: 'lab_technician',
  PHARMACIST: 'pharmacist',
  ACCOUNTANT: 'accountant',
  HR_MANAGER: 'hr_manager',
  VIEWER: 'viewer',
} as const;

export type AppRole = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_LABELS: Record<AppRole, { en: string; ar: string }> = {
  [ROLES.SUPER_ADMIN]: { en: 'Super Admin', ar: 'مدير النظام' },
  [ROLES.HOSPITAL_ADMIN]: { en: 'Hospital Admin', ar: 'مدير المستشفى' },
  [ROLES.DOCTOR]: { en: 'Doctor', ar: 'طبيب' },
  [ROLES.NURSE]: { en: 'Nurse', ar: 'ممرض/ة' },
  [ROLES.RECEPTIONIST]: { en: 'Receptionist', ar: 'موظف استقبال' },
  [ROLES.LAB_TECHNICIAN]: { en: 'Lab Technician', ar: 'فني مختبر' },
  [ROLES.PHARMACIST]: { en: 'Pharmacist', ar: 'صيدلاني' },
  [ROLES.ACCOUNTANT]: { en: 'Accountant', ar: 'محاسب' },
  [ROLES.HR_MANAGER]: { en: 'HR Manager', ar: 'مدير الموارد البشرية' },
  [ROLES.VIEWER]: { en: 'Viewer', ar: 'مشاهد' },
};

export const ADMIN_ROLES: AppRole[] = [
  ROLES.SUPER_ADMIN,
  ROLES.HOSPITAL_ADMIN,
];

export function isAdminRole(role: string): boolean {
  return ADMIN_ROLES.includes(role as AppRole);
}