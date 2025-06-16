export interface OffsetAuditUnits {
  id: string;
  name: string;
}

export interface OffsetUnitTypes {
  id: string;
  name: string;
}

export interface ProjectFormikTypes {
  name?: string;
  description?: string;
  address?: string;
  countryId?: string;
  projectStandard?: string;
  startDate?: string;
  expectedEndDate?: string;
  unitGenerationDate?: string[] | null;
  sustainableDevelopmentGoalIds?: string[];
  circularity?: string;
}

export interface OffsetFormikTypes extends ProjectFormikTypes {
  projectId?: string;
  shortDescription?: string;
  unitCreationYear?: string;
  unitCount?: number;
  unitPrice?: number;
  currencyId?: string;
  unitType?: string;
  auditUnit?: string;
  statusId?: string;
}
