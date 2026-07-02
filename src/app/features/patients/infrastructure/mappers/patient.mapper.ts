import { Injectable } from '@angular/core';
import { PatientDto, CreatePatientDto } from '../dto/patient.dto';
import { PatientModel } from '../../domain/models/patient.model';
import { CreatePatientRequest } from '../../domain/repositories/patient.repository';

@Injectable({ providedIn: 'root' })
export class PatientMapper {
  fromDto(dto: PatientDto): PatientModel {
    return {
      id: dto.id,
      patientNumber: dto.patient_number,
      firstName: dto.first_name,
      lastName: dto.last_name,
      fullName: dto.full_name,
      dateOfBirth: dto.date_of_birth,
      age: dto.age,
      gender: dto.gender as PatientModel['gender'],
      bloodType: dto.blood_type as PatientModel['bloodType'],
      nationalId: dto.national_id,
      insuranceNumber: dto.insurance_number,
      insuranceProvider: dto.insurance_provider,
      phone: dto.phone,
      email: dto.email,
      address: {
        street: dto.street,
        city: dto.city,
        governorate: dto.governorate,
        country: dto.country,
        postalCode: dto.postal_code,
      },
      emergencyContact: {
        name: dto.emergency_contact_name,
        relation: dto.emergency_contact_relation,
        phone: dto.emergency_contact_phone,
      },
      maritalStatus: dto.marital_status as PatientModel['maritalStatus'],
      status: dto.status as PatientModel['status'],
      allergies: dto.allergies ?? [],
      chronicDiseases: dto.chronic_diseases ?? [],
      notes: dto.notes,
      avatar: dto.avatar,
      registeredAt: dto.registered_at,
      lastVisitAt: dto.last_visit_at,
      hospitalId: dto.hospital_id,
    };
  }

  toCreateDto(request: CreatePatientRequest): CreatePatientDto {
    return {
      first_name: request.firstName,
      last_name: request.lastName,
      date_of_birth: request.dateOfBirth,
      gender: request.gender,
      blood_type: request.bloodType,
      national_id: request.nationalId,
      insurance_number: request.insuranceNumber,
      insurance_provider: request.insuranceProvider,
      phone: request.phone,
      email: request.email,
      street: request.address.street,
      city: request.address.city,
      governorate: request.address.governorate,
      country: request.address.country,
      postal_code: request.address.postalCode,
      emergency_contact_name: request.emergencyContact.name,
      emergency_contact_relation: request.emergencyContact.relation,
      emergency_contact_phone: request.emergencyContact.phone,
      marital_status: request.maritalStatus,
      allergies: request.allergies,
      chronic_diseases: request.chronicDiseases,
      notes: request.notes,
    };
  }
}