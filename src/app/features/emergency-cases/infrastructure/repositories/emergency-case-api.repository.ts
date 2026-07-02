import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EmergencyCaseRepository, CreateEmergencyCaseRequest, UpdateEmergencyCaseRequest } from '../../domain/repositories/emergency-case.repository';
import { EmergencyCaseApiService } from '../api/emergency-case-api.service';
import { EmergencyCaseModel, TriageLevel } from '../../domain/models/emergency-case.model';
import { EmergencyFilter } from '../../domain/models/emergency-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';

@Injectable({ providedIn: 'root' })
export class EmergencyCaseApiRepository extends EmergencyCaseRepository {
  private readonly api = inject(EmergencyCaseApiService);

  getAll(filter: EmergencyFilter): Observable<PaginatedResult<EmergencyCaseModel>> { return this.api.getAll(filter); }
  getById(id: string): Observable<EmergencyCaseModel> { return this.api.getById(id); }
  create(req: CreateEmergencyCaseRequest): Observable<EmergencyCaseModel> { return this.api.create(req); }
  update(id: string, req: UpdateEmergencyCaseRequest): Observable<EmergencyCaseModel> { return this.api.update(id, req); }
  triage(id: string, level: TriageLevel, notes?: string): Observable<EmergencyCaseModel> { return this.api.triage(id, level, notes); }
  assignDoctor(id: string, doctorId: string): Observable<EmergencyCaseModel> { return this.api.assignDoctor(id, doctorId); }
  close(id: string, outcome: string): Observable<EmergencyCaseModel> { return this.api.close(id, outcome); }
  delete(id: string): Observable<void> { return this.api.delete(id); }
}