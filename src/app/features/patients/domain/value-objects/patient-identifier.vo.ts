// Insurance Number Value Object
export interface InsuranceNumber {
  readonly value: string;
  readonly provider: string;
  readonly isValid: boolean;
}

export function createInsuranceNumber(value: string, provider: string): InsuranceNumber {
  return {
    value: value.trim(),
    provider,
    isValid: /^[A-Z0-9]{6,20}$/i.test(value.trim()),
  };
}

// Patient Identifier Value Object
export interface PatientIdentifier {
  readonly nationalId: string;
  readonly patientNumber: string;
  readonly isValidNationalId: boolean;
}

export function createPatientIdentifier(
  nationalId: string,
  patientNumber: string
): PatientIdentifier {
  return {
    nationalId,
    patientNumber,
    // Egyptian national ID: 14 digits
    isValidNationalId: /^\d{14}$/.test(nationalId),
  };
}