import { EnvironmentConfig } from './environment.model';
export const environment: EnvironmentConfig = {
  production: true,
  staging: false,
  apiBaseUrl: 'https://api.hms.hospital/api/v1',
  wsUrl: 'wss://api.hms.hospital',
  appName: 'HMS',
  version: '1.0.0',
  logLevel: 'error',
};