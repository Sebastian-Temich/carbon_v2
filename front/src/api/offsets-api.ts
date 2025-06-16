import qs from 'query-string';

import {
  PatchResponseOffset,
  PostOffsetsProps,
  ResponseOffset,
  RetireOffsetUnitsProps,
} from '@custom-types/offsets-types';

import { ApiResponse } from '@custom-types/api-types';
import { createUnsuccessfulApiResponse } from '@services/error-service';
import { parsePaginationHeader } from '@services/pagination.service';
import { GetFilterArgs } from '@custom-types/filter-types';
import { axiosAuthorized } from './api';

export const postOffset = async (
  payload: PostOffsetsProps,
): Promise<ApiResponse<ResponseOffset>> => {
  try {
    const response = await axiosAuthorized.post('/offsets', payload);
    return new ApiResponse<ResponseOffset>({ data: response.data });
  } catch (error) {
    return createUnsuccessfulApiResponse(error);
  }
};

export const getOffsets = async (args: GetFilterArgs): Promise<ApiResponse<ResponseOffset[]>> => {
  try {
    const params = qs.stringify(args);
    const response = await axiosAuthorized.get<ResponseOffset[]>(`/offsets?${params}`);
    const pagination = parsePaginationHeader(response?.headers?.['x-pagination']);
    return new ApiResponse<ResponseOffset[]>({ data: response.data, pagination });
  } catch (error) {
    return createUnsuccessfulApiResponse(error);
  }
};

export const getOffset = async (
  offsetId: string | undefined,
): Promise<ResponseOffset | undefined> => {
  try {
    const response = await axiosAuthorized.get<ResponseOffset>(`/offsets/${offsetId}`);
    return response?.data;
  } catch {
    return undefined;
  }
};

export const UpdateOffsetList = async (
  payload: PatchResponseOffset,
  offsetId: string | undefined,
): Promise<ApiResponse<ResponseOffset>> => {
  try {
    const response = await axiosAuthorized.patch(`/offsets/${offsetId}`, payload);
    return new ApiResponse<ResponseOffset>({ data: response.data });
  } catch (error) {
    return createUnsuccessfulApiResponse(error);
  }
};

export const RetireOffsetUnits = async (
  payload: RetireOffsetUnitsProps,
  offsetId: string | undefined,
): Promise<ApiResponse<ResponseOffset>> => {
  try {
    const response = await axiosAuthorized.post(`/offsets/${offsetId}/units/retire`, payload);
    return new ApiResponse<ResponseOffset>({ data: response.data });
  } catch (error) {
    return createUnsuccessfulApiResponse(error);
  }
};

export const downloadUnitRetirementConfirmation = async (
  offsetId: string,
): Promise<string | undefined> => {
  try {
    const response = await axiosAuthorized.get(`/offsets/${offsetId}/summary-file`, {
      responseType: 'blob',
    });
    return response.data;
  } catch {
    return undefined;
  }
};
