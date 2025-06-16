import { CurrenciesResponse } from '@custom-types/currencies-types';

import { axiosAuthorized } from './api';

export const getCurrencies = async (): Promise<CurrenciesResponse[]> => {
  try {
    const response = await axiosAuthorized.get<CurrenciesResponse[]>('/currencies');
    return response.data;
  } catch {
    return [];
  }
};
