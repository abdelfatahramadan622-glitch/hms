import { EnvironmentConfig } from './environment.model';
export const environment: EnvironmentConfig = {
  production: false,
  staging: true,
  apiBaseUrl: 'https://staging-api.hms.hospital/api/v1',
  wsUrl: 'wss://staging-api.hms.hospital',
  appName: 'HMS - Staging',
  version: '1.0.0-staging',
  logLevel: 'warn',
};