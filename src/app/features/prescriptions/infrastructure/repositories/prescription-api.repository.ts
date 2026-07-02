import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PrescriptionRepository, CreatePrescriptionRequest, UpdatePrescriptionRequest } from '../../domain/repositories/prescription.repository';
import { PrescriptionApiService } from '../api/prescription-api.service';
import { PrescriptionModel } from '../../domain/models/prescription.model';
import { PrescriptionFilter } from '../../domain/models/prescription-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';

@Injectable({ providedIn: 'root' })
export class PrescriptionApiRepository extends PrescriptionRepository {
  private readonly api = inject(PrescriptionApiService);

  getAll(f: PrescriptionFilter): Observable<PaginatedResult<PrescriptionModel>> { return this.api.getAll(f); }
  getById(id: string): Observable<PrescriptionModel> { return this.api.getById(id); }
  create(req: CreatePrescriptionRequest): Observable<PrescriptionModel> { return this.api.create(req); }
  update(id: string, req: UpdatePrescriptionRequest): Observable<PrescriptionModel> { return this.api.update(id, req); }
  dispense(id: string): Observable<PrescriptionModel> { return this.api.dispense(id); }
  cancel(id: string, reason: string): Observable<PrescriptionModel> { return this.api.cancel(id, reason); }
  delete(id: string): Observable<void> { return this.api.delete(id); }
}