import { PatientModel } from '../models/patient.model';

export interface PatientEntity extends PatientModel {
  readonly displayId: string;
  readonly initials: string;
  readonly isInsured: boolean;
}

export function toPatientEntity(model: PatientModel): PatientEntity {
  return {
    ...model,
    get displayId() { return `P-${model.patientNumber}`; },
    get initials() {
      return `${model.firstName.charAt(0)}${model.lastName.charAt(0)}`.toUpperCase();
    },
    get isInsured() { return !!model.insuranceNumber; },
  };
}

export function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const dob = new Date(dateOfBirth);
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}