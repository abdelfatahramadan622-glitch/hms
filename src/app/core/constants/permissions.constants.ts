export const PERMISSIONS = {
  // Patients
  PATIENTS: {
    VIEW: 'patients.view',
    CREATE: 'patients.create',
    EDIT: 'patients.edit',
    DELETE: 'patients.delete',
    EXPORT: 'patients.export',
  },

  // Doctors
  DOCTORS: {
    VIEW: 'doctors.view',
    CREATE: 'doctors.create',
    EDIT: 'doctors.edit',
    DELETE: 'doctors.delete',
    MANAGE_SCHEDULE: 'doctors.manage_schedule',
  },

  // Appointments
  APPOINTMENTS: {
    VIEW: 'appointments.view',
    CREATE: 'appointments.create',
    EDIT: 'appointments.edit',
    CANCEL: 'appointments.cancel',
    DELETE: 'appointments.delete',
  },

  // Emergency
  EMERGENCY: {
    VIEW: 'emergency.view',
    CREATE: 'emergency.create',
    EDIT: 'emergency.edit',
    TRIAGE: 'emergency.triage',
    CLOSE: 'emergency.close',
  },

  // Medical Records
  MEDICAL_RECORDS: {
    VIEW: 'medical-records.view',
    CREATE: 'medical-records.create',
    EDIT: 'medical-records.edit',
    DELETE: 'medical-records.delete',
    EXPORT: 'medical-records.export',
  },

  // Lab
  LAB: {
    VIEW: 'lab.view',
    CREATE: 'lab.create',
    EDIT: 'lab.edit',
    UPLOAD: 'lab.upload',
    APPROVE: 'lab.approve',
  },

  // Prescriptions
  PRESCRIPTIONS: {
    VIEW: 'prescriptions.view',
    CREATE: 'prescriptions.create',
    EDIT: 'prescriptions.edit',
    DISPENSE: 'prescriptions.dispense',
  },

  // Billing
  BILLING: {
    VIEW: 'billing.view',
    CREATE_INVOICE: 'billing.create_invoice',
    EDIT_INVOICE: 'billing.edit_invoice',
    PROCESS_PAYMENT: 'billing.process_payment',
    REFUND: 'billing.refund',
    EXPORT: 'billing.export',
  },

  // Staff
  STAFF: {
    VIEW: 'staff.view',
    CREATE: 'staff.create',
    EDIT: 'staff.edit',
    DELETE: 'staff.delete',
    MANAGE_ROLES: 'staff.manage_roles',
  },

  // Analytics
  ANALYTICS: {
    VIEW: 'analytics.view',
    EXPORT: 'analytics.export',
  },

  // Calendar
  CALENDAR: {
    VIEW: 'calendar.view',
    CREATE: 'calendar.create',
    EDIT: 'calendar.edit',
    DELETE: 'calendar.delete',
  },

  // Admin
  ROLES: {
    VIEW: 'roles.view',
    CREATE: 'roles.create',
    EDIT: 'roles.edit',
    DELETE: 'roles.delete',
    ASSIGN: 'roles.assign',
  },

  PERMISSIONS: {
    VIEW: 'permissions.view',
    MANAGE: 'permissions.manage',
  },

  AUDIT: {
    VIEW: 'audit.view',
    EXPORT: 'audit.export',
  },

  NOTIFICATIONS: {
    VIEW: 'notifications.view',
    MANAGE: 'notifications.manage',
  },
} as const;