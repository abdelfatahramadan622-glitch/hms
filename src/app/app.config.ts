import {
  ApplicationConfig,
  provideZoneChangeDetection,
  ErrorHandler,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import {
  provideHttpClient,
  withInterceptors,
  withFetch,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';

// Interceptors
import { authTokenInterceptor } from './core/interceptors/auth-token.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { correlationIdInterceptor } from './core/interceptors/correlation-id.interceptor';
import { retryInterceptor } from './core/interceptors/retry.interceptor';
import { cacheInterceptor } from './core/interceptors/cache.interceptor';
import { auditInterceptor } from './core/interceptors/audit.interceptor';

// Error Handler
import { ErrorLoggerService } from './core/infrastructure/logging/error-logger.service';

// Repository implementations
import { AppConfigRepository } from './core/domain/repositories/app-config.repository';
import { AppConfigApiRepository } from './core/infrastructure/repositories/app-config-api.repository';
import { LookupRepository } from './core/domain/repositories/lookup.repository';
import { LookupApiRepository } from './core/infrastructure/repositories/lookup-api.repository';
import { AuthenticationRepository } from './features/authentication/domain/repositories/authentication.repository';
import { AuthenticationApiRepository } from './features/authentication/infrastructure/repositories/authentication-api.repository';
import { PatientRepository } from './features/patients/domain/repositories/patient.repository';
import { PatientApiRepository } from './features/patients/infrastructure/repositories/patient-api.repository';
import { DoctorRepository } from './features/doctors/domain/repositories/doctor.repository';
import { DoctorApiRepository } from './features/doctors/infrastructure/repositories/doctor-api.repository';
import { AppointmentRepository } from './features/appointments/domain/repositories/appointment.repository';
import { AppointmentApiRepository } from './features/appointments/infrastructure/repositories/appointment-api.repository';
import { EmergencyCaseRepository } from './features/emergency-cases/domain/repositories/emergency-case.repository';
import { EmergencyCaseApiRepository } from './features/emergency-cases/infrastructure/repositories/emergency-case-api.repository';
import { MedicalRecordRepository } from './features/medical-records/domain/repositories/medical-record.repository';
import { MedicalRecordApiRepository } from './features/medical-records/infrastructure/repositories/medical-record-api.repository';
import { LabResultRepository } from './features/lab-results/domain/repositories/lab-result.repository';
import { LabResultApiRepository } from './features/lab-results/infrastructure/repositories/lab-result-api.repository';
import { PrescriptionRepository } from './features/prescriptions/domain/repositories/prescription.repository';
import { PrescriptionApiRepository } from './features/prescriptions/infrastructure/repositories/prescription-api.repository';
import { BillingRepository } from './features/billing/domain/repositories/billing.repository';
import { BillingApiRepository } from './features/billing/infrastructure/repositories/billing-api.repository';
import { DashboardRepository } from './features/dashboard/domain/repositories/dashboard.repository';
import { DashboardApiRepository } from './features/dashboard/infrastructure/repositories/dashboard-api.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions()
    ),

    provideHttpClient(
      withFetch(),
      withInterceptors([
        correlationIdInterceptor,
        authTokenInterceptor,
        auditInterceptor,
        loadingInterceptor,
        cacheInterceptor,
        retryInterceptor,
        errorInterceptor,
      ])
    ),

    provideAnimationsAsync(),

    // Error handling
    { provide: ErrorHandler, useClass: ErrorLoggerService },

    // Repository bindings (DI)
    { provide: AppConfigRepository, useClass: AppConfigApiRepository },
    { provide: LookupRepository, useClass: LookupApiRepository },
    { provide: AuthenticationRepository, useClass: AuthenticationApiRepository },
    { provide: PatientRepository, useClass: PatientApiRepository },
    { provide: DoctorRepository, useClass: DoctorApiRepository },
    { provide: AppointmentRepository, useClass: AppointmentApiRepository },
    { provide: EmergencyCaseRepository, useClass: EmergencyCaseApiRepository },
    { provide: MedicalRecordRepository, useClass: MedicalRecordApiRepository },
    { provide: LabResultRepository, useClass: LabResultApiRepository },
    { provide: PrescriptionRepository, useClass: PrescriptionApiRepository },
    { provide: BillingRepository, useClass: BillingApiRepository },
    { provide: DashboardRepository, useClass: DashboardApiRepository },
  ],
};