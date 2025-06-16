export interface PostOffsetsProps {
  projectId: string;
  unitCount: string | undefined;
  shortDescription: string;
  unitType: {
    existingOffsetUnitTypeId: string | undefined;
    newOffsetUnitTypeName?: string;
  };
  currencyId: string | undefined;
  unitCreationYear: string;
  unitPrice: string | undefined;
  auditUnit: {
    existingOffsetAuditUnitId: string | undefined;
    newOffsetAuditUnitName?: string;
  };
}

export interface ResponseOffset {
  id: string;
  shortDescription: string;
  ownedByCompanyId: string;
  isOwnerOriginal: boolean;
  unitCount: number;
  unitCreationYear: string;
  unitPrice: number;
  offsetStatus: {
    id: string;
    name: string;
  };
  currency: {
    id: string;
    code: string;
  };
  unitType: {
    id: string;
    name: string;
  };
  auditUnit: {
    id: string;
    name: string;
  };
  project: {
    id: string;
    name: string;
    description: string;
    address: string;
    country: {
      id: string;
      alpha3Code: string;
    };
    projectStandard: {
      id: string;
      name: string;
    };
    startDate: string;
    expectedEndDate: string;
    unitGenerationStartDate: string;
    unitGenerationEndDate: string;
    sustainableDevelopmentGoals: [
      {
        id: string;
        name: string;
        imageUri: string;
      },
    ];
    circularity: string;
    imageBlurhash: string;
    imageUri: string;
    imageAspectRatio: number;
  };
}

export interface PatchResponseOffset {
  projectId?: string;
  shortDescription?: string;
  unitCount?: number;
  unitCreationYear?: string | Date;
  unitPrice?: number;
  currencyId?: string;
  unitType?: {
    existingOffsetUnitTypeId?: string;
  };
  auditUnit?: {
    existingOffsetAuditUnitId?: string;
  };
  statusId?: string;
}

export interface InitalValuePatchOffset {
  projectId?: string;
  shortDescription?: string;
  unitCount?: number;
  unitCreationYear?: string | Date;
  unitPrice?: number;
  currencyId?: string;
  unitType?: string;
  auditUnit?: string;
  statusId?: string;
}

export interface SellOffsetsProps {
  unitPrice: number;
  unitCount: number;
}

export interface RetireOffsetUnitsProps {
  unitCount: number;
}
