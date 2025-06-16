import { parsePaginationHeader } from '@services/pagination.service';
import { OffsetLogsResponse } from '@custom-types/offset-logs-types';
import { createUnsuccessfulApiResponse } from '@services/error-service';
import { ApiResponse, PaginationQueryParams } from '@custom-types/api-types';
import { axiosAuthorized } from './api';

interface GetOffsetLogsArgs extends PaginationQueryParams {
  projectIds?: string[];
}

export const getOffsetLogs = async ({
  projectIds = [],
  page = 1,
  perPage = 10,
}: GetOffsetLogsArgs): Promise<ApiResponse<OffsetLogsResponse>> => {
  try {
    const response = await axiosAuthorized.get('/offset-logs', {
      params: {
        projectIds,
        page,
        perPage,
      },
    });
    const pagination = parsePaginationHeader(response?.headers?.['x-pagination']);

    return new ApiResponse({
      data: response.data,
      pagination,
    });
  } catch (error) {
    return createUnsuccessfulApiResponse(error);
  }
};
