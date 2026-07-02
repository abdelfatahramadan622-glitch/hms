import { EnvironmentConfig } from './environment.model';

export const environment: EnvironmentConfig = {
  production: false,
  staging: false,
  apiBaseUrl: 'http://localhost:3000/api/v1',
  wsUrl: 'ws://localhost:3000',
  appName: 'HMS - Dev',
  version: '1.0.0-dev',
  logLevel: 'debug',
};