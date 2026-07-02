import { LabResultModel, LabTestModel } from '../models/lab-result.model';

export interface LabResultEntity extends LabResultModel {
  readonly abnormalCount: number;
  readonly criticalCount: number;
  readonly testCount: number;
  readonly hasCritical: boolean;
}

export function toLabResultEntity(model: LabResultModel): LabResultEntity {
  return {
    ...model,
    get abnormalCount() { return model.tests.filter((t) => t.isAbnormal).length; },
    get criticalCount() { return model.tests.filter((t) => t.isCritical).length; },
    get testCount() { return model.tests.length; },
    get hasCritical() { return model.tests.some((t) => t.isCritical); },
  };
}

export interface LabTestEntity extends LabTestModel {
  readonly statusClass: string;
  readonly valueDisplay: string;
}

export function toLabTestEntity(model: LabTestModel): LabTestEntity {
  return {
    ...model,
    get statusClass() {
      if (model.isCritical) return 'table-danger';
      if (model.isAbnormal) return 'table-warning';
      return '';
    },
    get valueDisplay() {
      if (!model.value) return '—';
      return model.unit ? `${model.value} ${model.unit}` : model.value;
    },
  };
}