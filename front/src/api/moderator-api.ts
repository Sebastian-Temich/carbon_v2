import { GetModeratorsResponse, ModeratorResponse, UserProps } from '@custom-types/user-types';
import qs from 'query-string';
import { createUnsuccessfulApiResponse } from '@services/error-service';
import { ApiResponse } from '@custom-types/api-types';
import { GetFilterArgs } from '@custom-types/filter-types';
import { parsePaginationHeader } from '@services/pagination.service';
import { AxiosResponse } from 'axios';
import { axiosAuthorized } from './api';

export const getModerators = async (
  args: GetFilterArgs,
): Promise<ApiResponse<GetModeratorsResponse>> => {
  try {
    const params = qs.stringify(args);
    const response = await axiosAuthorized.get<GetModeratorsResponse>(`/users?${params}`);
    const pagination = parsePaginationHeader(response?.headers?.['x-pagination']);
    return new ApiResponse<GetModeratorsResponse>({ data: response.data, pagination });
  } catch (error) {
    return createUnsuccessfulApiResponse(error);
  }
};

export const postModerator = async (
  payload: UserProps,
): Promise<ApiResponse<{ password: string }>> => {
  try {
    const response = await axiosAuthorized.post<{ password: string }>('/users/moderators', payload);
    return new ApiResponse<{ password: string }>({ data: response.data });
  } catch (error) {
    return createUnsuccessfulApiResponse(error);
  }
};

export const patchModerator = async (
  moderatorId: string,
  payload: UserProps,
): Promise<ApiResponse<ModeratorResponse>> => {
  try {
    const response = await axiosAuthorized.patch(`/users/${moderatorId}`, payload);
    return new ApiResponse<ModeratorResponse>({ data: response.data });
  } catch (error) {
    return createUnsuccessfulApiResponse(error);
  }
};

export const deleteModerator = async (moderatorId: string): Promise<AxiosResponse | false> => {
  try {
    const response = await axiosAuthorized.delete(`/users/${moderatorId}`);
    return response.data;
  } catch {
    return false;
  }
};
