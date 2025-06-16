import { SustainableDevelopmentGoalsResponse } from '@custom-types/sustainable-development-goals-types';

import { axiosAuthorized } from './api';

export const getSustainableDevelopmentGoals = async (): Promise<
  SustainableDevelopmentGoalsResponse[]
> => {
  try {
    const response = await axiosAuthorized.get<SustainableDevelopmentGoalsResponse[]>(
      '/sustainable-development-goals',
    );
    return response.data;
  } catch {
    return [];
  }
};
