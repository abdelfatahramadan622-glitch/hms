export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
    ME: '/auth/me',
  },

  // Config
  CONFIG: {
    APP: '/config/app',
    LOOKUPS: '/config/lookups',
    LOOKUP: (type: string) => `/config/lookups/${type}`,
  },

  // Patients
  PATIENTS: {
    BASE: '/patients',
    BY_ID: (id: string) => `/patients/${id}`,
    MEDICAL_RECORDS: (id: string) => `/patients/${id}/medical-records`,
    APPOINTMENTS: (id: string) => `/patients/${id}/appointments`,
    PRESCRIPTIONS: (id: string) => `/patients/${id}/prescriptions`,
    LAB_RESULTS: (id: string) => `/patients/${id}/lab-results`,
  },

  // Doctors
  DOCTORS: {
    BASE: '/doctors',
    BY_ID: (id: string) => `/doctors/${id}`,
    SCHEDULE: (id: string) => `/doctors/${id}/schedule`,
    APPOINTMENTS: (id: string) => `/doctors/${id}/appointments`,
    AVAILABILITY: (id: string) => `/doctors/${id}/availability`,
  },

  // Appointments
  APPOINTMENTS: {
    BASE: '/appointments',
    BY_ID: (id: string) => `/appointments/${id}`,
    CANCEL: (id: string) => `/appointments/${id}/cancel`,
    RESCHEDULE: (id: string) => `/appointments/${id}/reschedule`,
    CONFIRM: (id: string) => `/appointments/${id}/confirm`,
  },

  // Emergency
  EMERGENCY: {
    BASE: '/emergency-cases',
    BY_ID: (id: string) => `/emergency-cases/${id}`,
    TRIAGE: (id: string) => `/emergency-cases/${id}/triage`,
    CLOSE: (id: string) => `/emergency-cases/${id}/close`,
    ASSIGN_DOCTOR: (id: string) => `/emergency-cases/${id}/assign-doctor`,
  },

  // Medical Records
  MEDICAL_RECORDS: {
    BASE: '/medical-records',
    BY_ID: (id: string) => `/medical-records/${id}`,
    ATTACHMENTS: (id: string) => `/medical-records/${id}/attachments`,
    DIAGNOSES: (id: string) => `/medical-records/${id}/diagnoses`,
  },

  // Lab Results
  LAB_RESULTS: {
    BASE: '/lab-results',
    BY_ID: (id: string) => `/lab-results/${id}`,
    UPLOAD: '/lab-results/upload',
    APPROVE: (id: string) => `/lab-results/${id}/approve`,
  },

  // Prescriptions
  PRESCRIPTIONS: {
    BASE: '/prescriptions',
    BY_ID: (id: string) => `/prescriptions/${id}`,
    DISPENSE: (id: string) => `/prescriptions/${id}/dispense`,
    MEDICATIONS: '/prescriptions/medications',
  },

  // Billing
  BILLING: {
    INVOICES: '/billing/invoices',
    INVOICE_BY_ID: (id: string) => `/billing/invoices/${id}`,
    PAYMENTS: '/billing/payments',
    PAYMENT_BY_ID: (id: string) => `/billing/payments/${id}`,
    PROCESS_PAYMENT: (id: string) => `/billing/invoices/${id}/pay`,
    REFUND: (id: string) => `/billing/invoices/${id}/refund`,
  },

  // Staff
  STAFF: {
    BASE: '/staff',
    BY_ID: (id: string) => `/staff/${id}`,
    DEPARTMENTS: '/staff/departments',
  },

  // Analytics
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    PATIENT_FLOW: '/analytics/patient-flow',
    REVENUE: '/analytics/revenue',
    OCCUPANCY: '/analytics/occupancy',
    REPORTS: '/analytics/reports',
  },

  // Calendar
  CALENDAR: {
    EVENTS: '/calendar/events',
    EVENT_BY_ID: (id: string) => `/calendar/events/${id}`,
  },

  // Notifications
  NOTIFICATIONS: {
    BASE: '/notifications',
    BY_ID: (id: string) => `/notifications/${id}`,
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/mark-all-read',
    PREFERENCES: '/notifications/preferences',
    UNREAD_COUNT: '/notifications/unread-count',
  },

  // Roles & Permissions
  ROLES: {
    BASE: '/roles',
    BY_ID: (id: string) => `/roles/${id}`,
    PERMISSIONS: (id: string) => `/roles/${id}/permissions`,
  },
  PERMISSIONS: {
    BASE: '/permissions',
    MATRIX: '/permissions/matrix',
  },

  // Audit
  AUDIT_LOGS: {
    BASE: '/audit-logs',
  },

  // Realtime
  REALTIME: {
    EVENTS: '/realtime/events',
    SUBSCRIBE: '/realtime/subscribe',
  },

  // Dashboard
  DASHBOARD: {
    METRICS: '/dashboard/metrics',
    WIDGETS: '/dashboard/widgets',
  },
} as const;