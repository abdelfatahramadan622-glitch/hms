import { EmergencyCaseModel, TriageLevel, TRIAGE_CONFIG } from '../models/emergency-case.model';

export interface EmergencyCaseEntity extends EmergencyCaseModel {
  readonly waitingMinutes: number;
  readonly isActive: boolean;
  readonly triageLabel: string;
  readonly triageColor: string;
}

export function toEmergencyCaseEntity(model: EmergencyCaseModel): EmergencyCaseEntity {
  const arrivedAt = new Date(model.arrivedAt);
  return {
    ...model,
    get waitingMinutes() {
      return Math.floor((Date.now() - arrivedAt.getTime()) / 60000);
    },
    get isActive() {
      return ['waiting', 'in-treatment', 'stable', 'critical'].includes(model.status);
    },
    get triageLabel() { return TRIAGE_CONFIG[model.triageLevel].label; },
    get triageColor() { return TRIAGE_CONFIG[model.triageLevel].color; },
  };
}

// Triage Level Value Object
export interface TriageLevelVO {
  level: TriageLevel;
  label: string;
  maxWaitMinutes: number;
  isImmediate: boolean;
}

export function createTriageLevelVO(level: TriageLevel): TriageLevelVO {
  const maxWait: Record<TriageLevel, number> = { 1: 0, 2: 15, 3: 30, 4: 60, 5: 120 };
  return {
    level,
    label: TRIAGE_CONFIG[level].label,
    maxWaitMinutes: maxWait[level],
    isImmediate: level === 1,
  };
}