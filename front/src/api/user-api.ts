import { IUser } from '@custom-types/user-types';

import { axiosAuthorized } from './api';

export const getUser = async (): Promise<IUser | false> => {
  try {
    const response = await axiosAuthorized.get<IUser>('/users/current');
    return response.data;
  } catch {
    return false;
  }
};
