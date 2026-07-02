import { PatientModel } from '../../domain/models/patient.model';
import { PatientFilter } from '../../domain/models/patient-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';

const demoPatients: PatientModel[] = [
  {
    id: 'patient-1',
    firstName: 'أحمد',
    lastName: 'محمد',
    fullName: 'أحمد محمد',
    dateOfBirth: '1990-05-12',
    gender: 'male',
    bloodType: 'A+',
    nationalId: '12345678901234',
    phone: '+201001234567',
    email: 'ahmed@example.com',
    maritalStatus: 'married',
    status: 'active',
    address: {
      street: 'شارع الجمهورية',
      city: 'القاهرة',
      governorate: 'القاهرة',
      country: 'مصر',
      postalCode: '11511',
    },
    emergencyContact: {
      name: 'سارة محمد',
      relation: 'زوجة',
      phone: '+201112223344',
    },
    allergies: ['بنيسلين'],
    chronicDiseases: ['ضغط'],
    notes: 'مريض منتظم',
    hospitalId: 'demo-hospital',
    registeredAt: '2024-01-10T10:00:00.000Z',
    lastVisitAt: '2024-02-20T10:00:00.000Z',
    age: 36,
    patientNumber: 'P-1001',
  },
  {
    id: 'patient-2',
    firstName: 'سارة',
    lastName: 'علي',
    fullName: 'سارة علي',
    dateOfBirth: '1988-08-21',
    gender: 'female',
    bloodType: 'O+',
    nationalId: '12345678901235',
    phone: '+201002223333',
    email: 'sara@example.com',
    maritalStatus: 'single',
    status: 'active',
    address: {
      street: 'شارع التحرير',
      city: 'الإسكندرية',
      governorate: 'الإسكندرية',
      country: 'مصر',
      postalCode: '21511',
    },
    emergencyContact: {
      name: 'محمد علي',
      relation: 'أخ',
      phone: '+201113334455',
    },
    allergies: [],
    chronicDiseases: ['سكري'],
    notes: 'تحتاج متابعة',
    hospitalId: 'demo-hospital',
    registeredAt: '2024-01-15T09:30:00.000Z',
    lastVisitAt: '2024-02-18T09:30:00.000Z',
    age: 38,
    patientNumber: 'P-1002',
  },
];

export function getDemoPatientList(filter: PatientFilter): PaginatedResult<PatientModel> {
  const query = (filter.search ?? '').trim().toLowerCase();
  const filtered = demoPatients.filter((patient) => {
    if (!query) return true;
    return [patient.fullName, patient.phone, patient.nationalId].some((value) =>
      value?.toLowerCase().includes(query)
    );
  });

  const page = filter.page ?? 1;
  const pageSize = filter.pageSize ?? 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = filtered.slice(start, end);

  return {
    items: pageItems,
    totalCount: filtered.length,
    currentPage: page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(filtered.length / pageSize)),
    hasNextPage: page < Math.max(1, Math.ceil(filtered.length / pageSize)),
    hasPreviousPage: page > 1,
  };
}

export function getDemoPatientById(id: string): PatientModel | undefined {
  return demoPatients.find((patient) => patient.id === id);
}
