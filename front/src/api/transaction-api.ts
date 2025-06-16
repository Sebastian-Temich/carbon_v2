import { SellOffsetsProps } from '@custom-types/offsets-types';
import { AxiosResponse } from 'axios';
import { ApiResponse } from '@custom-types/api-types';
import { createUnsuccessfulApiResponse } from '@services/error-service';
import { axiosAuthorized } from './api';

export const buyOffsets = async (
  unitCount: number,
  offsetId: string,
): Promise<ApiResponse<AxiosResponse>> => {
  try {
    const response = await axiosAuthorized.post(`/offsets/${offsetId}/buy`, { unitCount });
    return new ApiResponse<AxiosResponse>({ data: response.data });
  } catch (error) {
    return createUnsuccessfulApiResponse(error);
  }
};

export const sellOffsets = async (
  payload: SellOffsetsProps,
  offsetId: string,
): Promise<ApiResponse<AxiosResponse>> => {
  try {
    const response = await axiosAuthorized.post(`/offsets/${offsetId}/sell`, payload);
    return new ApiResponse<AxiosResponse>({ data: response.data });
  } catch (error) {
    return createUnsuccessfulApiResponse(error);
  }
};
