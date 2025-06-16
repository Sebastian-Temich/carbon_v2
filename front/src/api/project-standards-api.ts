import { ProjectStandardsResponse } from '@custom-types/project-standards-types';

import { axiosAuthorized } from './api';

export const getProjectStandards = async (): Promise<ProjectStandardsResponse[]> => {
  try {
    const response = await axiosAuthorized.get<ProjectStandardsResponse[]>('/project-standards');
    return response.data;
  } catch {
    return [];
  }
};
