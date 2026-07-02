import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LabResultRepository, CreateLabResultRequest, UpdateLabResultRequest } from '../../domain/repositories/lab-result.repository';
import { LabResultApiService } from '../api/lab-result-api.service';
import { LabResultModel } from '../../domain/models/lab-result.model';
import { LabResultFilter } from '../../domain/models/lab-result-filter.model';
import { PaginatedResult } from '../../../../core/domain/models/pagination.model';

@Injectable({ providedIn: 'root' })
export class LabResultApiRepository extends LabResultRepository {
  private readonly api = inject(LabResultApiService);

  getAll(filter: LabResultFilter): Observable<PaginatedResult<LabResultModel>> { return this.api.getAll(filter); }
  getById(id: string): Observable<LabResultModel> { return this.api.getById(id); }
  create(req: CreateLabResultRequest): Observable<LabResultModel> { return this.api.create(req); }
  update(id: string, req: UpdateLabResultRequest): Observable<LabResultModel> { return this.api.update(id, req); }
  approve(id: string): Observable<LabResultModel> { return this.api.approve(id); }
  reject(id: string, reason: string): Observable<LabResultModel> { return this.api.reject(id, reason); }
  upload(id: string, file: File): Observable<LabResultModel> { return this.api.upload(id, file); }
  delete(id: string): Observable<void> { return this.api.delete(id); }
}