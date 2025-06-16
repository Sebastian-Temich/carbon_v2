import { RegisterProps } from '@custom-types/register-types';

import { ApiResponse } from '@custom-types/api-types';
import { UserResponse } from '@custom-types/user-types';
import { createUnsuccessfulApiResponse } from '@services/error-service';
import { axiosPublic } from './api';

export const register = async (payload: RegisterProps): Promise<ApiResponse<UserResponse>> => {
  try {
    const signInResponse = await axiosPublic.post('/users/customers/sign-up', payload);
    return new ApiResponse<UserResponse>({ data: signInResponse.data });
  } catch (error) {
    return createUnsuccessfulApiResponse(error);
  }
};
