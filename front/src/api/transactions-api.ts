import { ApiResponse, PaginationQueryParams } from '@custom-types/api-types';
import { parsePaginationHeader } from '@services/pagination.service';
import { createUnsuccessfulApiResponse } from '@services/error-service';
import { Transaction, TransactionStatus } from '@custom-types/transactions-types';
import { axiosAuthorized } from './api';

interface UpdateTransactionArgs {
  transactionId: string;
  transactionStatusId?: string;
}

export const getTransactions = async ({
  page,
  perPage,
}: PaginationQueryParams): Promise<ApiResponse<Transaction[]>> => {
  try {
    const response = await axiosAuthorized.get('/transactions', {
      params: {
        page,
        perPage,
      },
    });
    const pagination = parsePaginationHeader(response?.headers?.['x-pagination']);

    return new ApiResponse<Transaction[]>({
      data: response.data,
      pagination,
    });
  } catch (error) {
    return createUnsuccessfulApiResponse(error);
  }
};

export const getTransactionStatuses = async (): Promise<ApiResponse<TransactionStatus[]>> => {
  try {
    const { data } = await axiosAuthorized.get('/transaction-statuses');

    return new ApiResponse<TransactionStatus[]>({ data });
  } catch (error) {
    return createUnsuccessfulApiResponse(error);
  }
};

export const updateTransaction = async ({
  transactionId,
  ...body
}: UpdateTransactionArgs): Promise<ApiResponse<Transaction>> => {
  try {
    const { data } = await axiosAuthorized.patch(`/transactions/${transactionId}`, body);

    return new ApiResponse<Transaction>({ data });
  } catch (error) {
    return createUnsuccessfulApiResponse(error);
  }
};
