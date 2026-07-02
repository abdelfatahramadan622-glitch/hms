export interface EnvironmentConfig {
  production: boolean;
  staging: boolean;
  apiBaseUrl: string;
  wsUrl: string;
  appName: string;
  version: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}