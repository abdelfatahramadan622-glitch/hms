export type Gender = 'male' | 'female';
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed';
export type PatientStatus = 'active' | 'inactive' | 'deceased';

export interface PatientModel {
  id: string;
  patientNumber: string;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  age: number;
  gender: Gender;
  bloodType?: BloodType;
  nationalId: string;
  insuranceNumber?: string;
  insuranceProvider?: string;
  phone: string;
  email?: string;
  address: PatientAddress;
  emergencyContact: EmergencyContact;
  maritalStatus: MaritalStatus;
  status: PatientStatus;
  allergies: string[];
  chronicDiseases: string[];
  notes?: string;
  avatar?: string;
  registeredAt: string;
  lastVisitAt?: string;
  hospitalId: string;
}

export interface PatientAddress {
  street: string;
  city: string;
  governorate: string;
  country: string;
  postalCode?: string;
}

export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

export const GENDER_LABELS: Record<Gender, string> = {
  male: 'ذكر',
  female: 'أنثى',
};

// Partial<Record<...>>: see doctor.model.ts for the rationale — keeps the
// `?.` / `??` fallbacks in patient-card / patient-summary meaningful.
export const STATUS_CONFIG: Partial<Record<PatientStatus, { label: string; class: string }>> = {
  active:   { label: 'نشط',     class: 'bg-success-subtle text-success' },
  inactive: { label: 'غير نشط', class: 'bg-secondary-subtle text-secondary' },
  deceased: { label: 'متوفى',   class: 'bg-dark-subtle text-dark' },
};

export const BLOOD_TYPES: BloodType[] = ['A+','A-','B+','B-','AB+','AB-','O+','O-'];