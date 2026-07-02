import { MedicalRecordModel } from '../models/medical-record.model';

export interface MedicalRecordEntity extends MedicalRecordModel {
  readonly primaryDiagnosis: string;
  readonly diagnosisCount: number;
  readonly attachmentCount: number;
  readonly hasFollowUp: boolean;
}

export function toMedicalRecordEntity(model: MedicalRecordModel): MedicalRecordEntity {
  return {
    ...model,
    get primaryDiagnosis() {
      return model.diagnoses.find((d) => d.type === 'primary')?.name ?? '—';
    },
    get diagnosisCount() { return model.diagnoses.length; },
    get attachmentCount() { return model.attachments.length; },
    get hasFollowUp() { return !!model.followUpDate; },
  };
}