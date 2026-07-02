export const ROUTE_PATHS = {
  // Auth
  AUTH: {
    ROOT: 'auth',
    LOGIN: 'auth/login',
    FORGOT_PASSWORD: 'auth/forgot-password',
    RESET_PASSWORD: 'auth/reset-password',
    CHANGE_PASSWORD: 'auth/change-password',
  },

  // Dashboard
  DASHBOARD: 'dashboard',

  // Patients
  PATIENTS: {
    ROOT: 'patients',
    LIST: 'patients',
    DETAIL: 'patients/:id',
    CREATE: 'patients/new',
    EDIT: 'patients/:id/edit',
  },

  // Doctors
  DOCTORS: {
    ROOT: 'doctors',
    LIST: 'doctors',
    DETAIL: 'doctors/:id',
    CREATE: 'doctors/new',
    EDIT: 'doctors/:id/edit',
    SCHEDULE: 'doctors/:id/schedule',
  },

  // Appointments
  APPOINTMENTS: {
    ROOT: 'appointments',
    LIST: 'appointments',
    DETAIL: 'appointments/:id',
    CREATE: 'appointments/new',
    EDIT: 'appointments/:id/edit',
    CALENDAR: 'appointments/calendar',
  },

  // Emergency
  EMERGENCY: {
    ROOT: 'emergency-cases',
    LIST: 'emergency-cases',
    DETAIL: 'emergency-cases/:id',
    CREATE: 'emergency-cases/new',
    EDIT: 'emergency-cases/:id/edit',
  },

  // Medical Records
  MEDICAL_RECORDS: {
    ROOT: 'medical-records',
    LIST: 'medical-records',
    DETAIL: 'medical-records/:id',
    CREATE: 'medical-records/new',
    EDIT: 'medical-records/:id/edit',
  },

  // Lab Results
  LAB_RESULTS: {
    ROOT: 'lab-results',
    LIST: 'lab-results',
    DETAIL: 'lab-results/:id',
    UPLOAD: 'lab-results/upload',
  },

  // Prescriptions
  PRESCRIPTIONS: {
    ROOT: 'prescriptions',
    LIST: 'prescriptions',
    DETAIL: 'prescriptions/:id',
    CREATE: 'prescriptions/new',
    EDIT: 'prescriptions/:id/edit',
  },

  // Billing
  BILLING: {
    ROOT: 'billing',
    INVOICES: 'billing/invoices',
    INVOICE_DETAIL: 'billing/invoices/:id',
    INVOICE_CREATE: 'billing/invoices/new',
    PAYMENT: 'billing/payment',
  },

  // Staff
  STAFF: {
    ROOT: 'staff-management',
    LIST: 'staff-management',
    DETAIL: 'staff-management/:id',
    CREATE: 'staff-management/new',
    EDIT: 'staff-management/:id/edit',
  },

  // Analytics
  ANALYTICS: {
    ROOT: 'charts-analytics',
    DASHBOARD: 'charts-analytics/dashboard',
  },

  // Calendar
  CALENDAR: {
    ROOT: 'calendar-scheduling',
  },

  // Admin
  ROLES: {
    ROOT: 'role-management',
    LIST: 'role-management',
    DETAIL: 'role-management/:id',
    CREATE: 'role-management/new',
  },
  PERMISSIONS: {
    ROOT: 'authorization',
  },
  AUDIT_LOGS: {
    ROOT: 'audit-logs',
  },
  NOTIFICATIONS: {
    ROOT: 'notifications',
  },
  REALTIME: {
    ROOT: 'real-time-updates',
  },

  // Errors
  ERRORS: {
    NOT_FOUND: '404',
    FORBIDDEN: '403',
    SERVER_ERROR: '500',
  },
} as const;