import { CountriesResponse } from '@custom-types/countries-types';

import { axiosAuthorized } from './api';

export const getCountries = async (): Promise<CountriesResponse[]> => {
  try {
    const response = await axiosAuthorized.get<CountriesResponse[]>('/countries');
    return response.data;
  } catch {
    return [];
  }
};
