import { DoctorModel } from '../models/doctor.model';

export interface DoctorEntity extends DoctorModel {
  readonly displayId: string;
  readonly initials: string;
  readonly isLicenseExpired: boolean;
  readonly isAvailableToday: boolean;
}

export function toDoctorEntity(model: DoctorModel): DoctorEntity {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as any;
  return {
    ...model,
    get displayId() { return `DR-${model.employeeNumber}`; },
    get initials() {
      return `${model.firstName.charAt(0)}${model.lastName.charAt(0)}`.toUpperCase();
    },
    get isLicenseExpired() {
      return new Date(model.licenseExpiryDate) < new Date();
    },
    get isAvailableToday() {
      return model.availableDays.includes(today);
    },
  };
}

// Value Objects
export interface MedicalLicense {
  number: string;
  expiryDate: string;
  isValid: boolean;
  daysUntilExpiry: number;
}

export function createMedicalLicense(number: string, expiryDate: string): MedicalLicense {
  const expiry = new Date(expiryDate);
  const now = new Date();
  const diff = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return { number, expiryDate, isValid: diff > 0, daysUntilExpiry: diff };
}

export interface Specialization {
  name: string;
  subSpecialization?: string;
  displayName: string;
}

export function createSpecialization(name: string, sub?: string): Specialization {
  return { name, subSpecialization: sub, displayName: sub ? `${name} — ${sub}` : name };
}