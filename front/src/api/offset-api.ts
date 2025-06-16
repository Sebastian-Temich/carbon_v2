import { OffsetAuditUnits, OffsetUnitTypes } from '@custom-types/offset-types';

import { axiosAuthorized } from './api';

interface StatusResponse {
  id: string;
  name: string;
}

export const getOffsetAuditUnits = async (): Promise<OffsetAuditUnits[]> => {
  try {
    const response = await axiosAuthorized.get<OffsetAuditUnits[]>('/offset-audit-units');
    return response.data;
  } catch {
    return [];
  }
};

export const getOffsetUnitTypes = async (): Promise<OffsetUnitTypes[]> => {
  try {
    const response = await axiosAuthorized.get<OffsetUnitTypes[]>('/offset-unit-types');
    return response.data;
  } catch {
    return [];
  }
};

export const getOffsetStatus = async (): Promise<StatusResponse[]> => {
  try {
    const response = await axiosAuthorized.get<StatusResponse[]>('/offset-statuses');
    return response.data;
  } catch {
    return [];
  }
};
