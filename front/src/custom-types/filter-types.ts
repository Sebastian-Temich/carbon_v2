export interface GetFilterArgs
  extends GetFilterUsersArgs,
    GetFilterOffsetsArgs,
    GetFilterTransactionLogsArgs {
  page?: number;
  perPage?: number;
}

export interface GetFilterUsersArgs {
  role?: string;
}

export interface GetFilterTransactionLogsArgs {
  name?: string | undefined;
  countryIds?: string[];
  sdgIds?: string[];
  projectStandardIds?: string[];
  totalUnitCountFrom?: number;
  totalUnitCountTo?: number;
  creationDateFrom?: string;
  creationDateTo?: string;
}

export interface GetFilterOffsetsArgs {
  projectName?: string | undefined;
  projectLocationCountryId?: string;
  projectStandardId?: string;
  projectUnitGenerationStartDate?: string;
  projectUnitGenerationEndDate?: string;
  projectStartDate?: string;
  projectExpectedEndDate?: string;
  projectSustainableDevelopmentGoalIds?: string[];
  projectCircularity?: string;
  unitCountMin?: string;
  unitCountMax?: string;
  unitPriceMax?: string;
  unitPriceMin?: string;
  unitTypeId?: string;
  auditUnitId?: string;
  ownedByCompanyId?: string;
  statusIds?: string[];
  currencyIds?: string;
  unitCreationYear?: string;
  offsetId?: string | undefined;
  isOwnerOriginal?: boolean | undefined;
}
