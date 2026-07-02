export interface AppConfig {
  apiBaseUrl: string;
  appName: string;
  appVersion: string;
  defaultLanguage: SupportedLanguage;
  defaultTheme: AppTheme;
  sessionTimeoutMinutes: number;
  maxUploadSizeMB: number;
  supportedFileTypes: string[];
  features: FeatureFlags;
  pagination: PaginationConfig;
}

export type SupportedLanguage = 'ar' | 'en';
export type AppTheme = 'light' | 'dark' | 'system';

export interface FeatureFlags {
  enableRealTimeUpdates: boolean;
  enableNotifications: boolean;
  enableAuditLogs: boolean;
  enableBilling: boolean;
  enableAnalytics: boolean;
}

export interface PaginationConfig {
  defaultPageSize: number;
  pageSizeOptions: number[];
}

export const DEFAULT_APP_CONFIG: Partial<AppConfig> = {
  defaultLanguage: 'ar',
  defaultTheme: 'light',
  sessionTimeoutMinutes: 30,
  maxUploadSizeMB: 10,
  supportedFileTypes: ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'],
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
  },
};