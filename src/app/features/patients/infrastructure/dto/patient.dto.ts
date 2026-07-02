export interface PatientDto {
  id: string;
  patient_number: string;
  first_name: string;
  last_name: string;
  full_name: string;
  date_of_birth: string;
  age: number;
  gender: string;
  blood_type?: string;
  national_id: string;
  insurance_number?: string;
  insurance_provider?: string;
  phone: string;
  email?: string;
  street: string;
  city: string;
  governorate: string;
  country: string;
  postal_code?: string;
  emergency_contact_name: string;
  emergency_contact_relation: string;
  emergency_contact_phone: string;
  marital_status: string;
  status: string;
  allergies: string[];
  chronic_diseases: string[];
  notes?: string;
  avatar?: string;
  registered_at: string;
  last_visit_at?: string;
  hospital_id: string;
}

export interface CreatePatientDto {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  blood_type?: string;
  national_id: string;
  insurance_number?: string;
  insurance_provider?: string;
  phone: string;
  email?: string;
  street: string;
  city: string;
  governorate: string;
  country: string;
  postal_code?: string;
  emergency_contact_name: string;
  emergency_contact_relation: string;
  emergency_contact_phone: string;
  marital_status: string;
  allergies?: string[];
  chronic_diseases?: string[];
  notes?: string;
}