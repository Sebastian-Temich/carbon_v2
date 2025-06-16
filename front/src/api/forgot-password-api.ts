import { axiosAuthorized } from './api';

interface PostForgotPassword {
  email: string;
}

interface ResponseForgotPassword {
  newPassword: string;
}

export const forgotPassword = async (
  payload: PostForgotPassword,
): Promise<ResponseForgotPassword | false> => {
  try {
    const response = await axiosAuthorized.post('/users/password-reset', payload);
    return response.data;
  } catch {
    return false;
  }
};
