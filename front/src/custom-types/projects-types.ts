import { PaginationQueryParams } from '@custom-types/api-types';

export interface PostProjectProps {
  name: string;
  description: string;
  address: string;
  countryId: string | undefined;
  projectStandard: {
    existingProjectStandardId: string | undefined;
    newProjectStandardName?: string;
  };
  startDate: string;
  expectedEndDate: string;
  unitGenerationStartDate: string;
  unitGenerationEndDate: string;
  sustainableDevelopmentGoalIds: string[] | undefined;
  circularity: string;
  image?: {
    contentAsBase64?: string;
    contentType?: string;
  };
}

export interface ResponseProjectProps {
  address: string;
  circularity: string;
  country: {
    id: string;
    name: string;
  };
  description: string;
  expectedEndDate: string;
  id: string;
  name: string;
  projectStandard: {
    id: string;
    name: string;
  };
  startDate: string;
  sustainableDevelopmentGoals: [
    {
      id: string;
      name: string;
      imageUri: string;
    },
  ];
  unitGenerationEndDate: string;
  unitGenerationStartDate: string;
  imageUri: string;
  createdAt: Date;
}

export interface ProjectQueryParams extends PaginationQueryParams {
  name?: string;
  countryIds?: string[];
  sdgIds?: string[];
  projectStandardIds?: string[];
  totalUnitCountFrom?: number;
  totalUnitCountTo?: number;
  creationDateFrom?: string;
  creationDateTo?: string;
}

export interface InitialValuesProps {
  description: string;
  name: string;
  address: string;
  countryId?: string;
  projectStandard: {
    existingProjectStandardId?: string;
  };
  unitGenerationTime: string;
  startDate: string;
  expectedEndDate: string;
  sustainableDevelopmentGoalIds: string[];
  circularity: string;
  image: {
    contentAsBase64: string;
    contentType: string;
  };
  offsets: [
    {
      id: number;
      shortDescription: string;
      unitCount: string;
      unitPrice: string;
      currencyId?: string;
      unitType: {
        existingOffsetUnitTypeId?: string;
      };
      unitCreationYear: string;
      auditUnit: {
        existingOffsetAuditUnitId?: string;
      };
    },
  ];
}

export interface PatchProjectPayload {
  description?: string;
  name?: string;
  address?: string;
  countryId?: string | undefined;
  projectStandard?: {
    existingProjectStandardId?: string;
  };
  sustainableDevelopmentGoalIds?: string[];
  unitGenerationStartDate?: string;
  unitGenerationEndDate?: string;
  startDate?: string;
  expectedEndDate?: string;
  circularity?: string;
  image?: {
    contentAsBase64?: string;
    contentType?: string;
  };
}
