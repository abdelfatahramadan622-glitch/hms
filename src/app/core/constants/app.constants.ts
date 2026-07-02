export const APP_CONSTANTS = {
  APP_NAME: 'HMS - Hospital Management System',
  APP_NAME_AR: 'نظام إدارة المستشفى',
  APP_VERSION: '1.0.0',
  DEFAULT_LANGUAGE: 'ar' as const,
  DEFAULT_THEME: 'light' as const,

  // Storage Keys
  STORAGE_KEYS: {
    ACCESS_TOKEN: 'hms_access_token',
    REFRESH_TOKEN: 'hms_refresh_token',
    USER_CONTEXT: 'hms_user_context',
    APP_CONFIG: 'hms_app_config',
    LANGUAGE: 'hms_language',
    THEME: 'hms_theme',
  },

  // Session
  SESSION: {
    TIMEOUT_MINUTES: 30,
    REFRESH_THRESHOLD_MINUTES: 5,
    INACTIVITY_WARNING_MINUTES: 25,
  },

  // Upload
  UPLOAD: {
    MAX_SIZE_MB: 10,
    MAX_SIZE_BYTES: 10 * 1024 * 1024,
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    ALLOWED_DOC_TYPES: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },

  // UI
  UI: {
    TOAST_DURATION_MS: 4000,
    DEBOUNCE_TIME_MS: 400,
    ANIMATION_DURATION_MS: 300,
    SKELETON_ROWS: 5,
  },

  // Date formats
  DATE_FORMATS: {
    DISPLAY: 'dd/MM/yyyy',
    DISPLAY_WITH_TIME: 'dd/MM/yyyy HH:mm',
    API: 'yyyy-MM-dd',
    API_WITH_TIME: "yyyy-MM-dd'T'HH:mm:ss",
  },
} as const;