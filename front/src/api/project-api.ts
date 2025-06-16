import {
  PatchProjectPayload,
  PostProjectProps,
  ProjectQueryParams,
  ResponseProjectProps,
} from '@custom-types/projects-types';
import { createUnsuccessfulApiResponse } from '@services/error-service';
import { ApiResponse } from '@custom-types/api-types';
import { parsePaginationHeader } from '@services/pagination.service';
import { axiosAuthorized } from './api';

export const postProject = async (
  payload: PostProjectProps,
): Promise<ApiResponse<ResponseProjectProps>> => {
  try {
    const response = await axiosAuthorized.post('/projects', payload);
    return new ApiResponse<ResponseProjectProps>({ data: response.data });
  } catch (error) {
    return createUnsuccessfulApiResponse(error);
  }
};

export const getProjects = async (
  queryParams: ProjectQueryParams,
): Promise<ApiResponse<ResponseProjectProps[]>> => {
  try {
    const response = await axiosAuthorized.get('/projects', { params: queryParams });
    const pagination = parsePaginationHeader(response?.headers?.['x-pagination']);
    return new ApiResponse<ResponseProjectProps[]>({
      data: response.data,
      pagination,
    });
  } catch (error) {
    return createUnsuccessfulApiResponse(error);
  }
};

export const patchProject = async (
  payload: PatchProjectPayload,
  projectId: string | undefined,
): Promise<ApiResponse<ResponseProjectProps>> => {
  try {
    const response = await axiosAuthorized.patch(`/projects/${projectId}`, payload);
    return new ApiResponse<ResponseProjectProps>({ data: response.data });
  } catch (error) {
    return createUnsuccessfulApiResponse(error);
  }
};
