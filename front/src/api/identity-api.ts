import { axiosAuthorized, axiosPublic } from './api';

export interface SignInRequest {
  email: string;
  password: string;
}

export const signIn = async ({ email, password }: SignInRequest): Promise<string | false> => {
  try {
    const signInResponse = await axiosPublic.post('/auth/sign-in', {
      email,
      password,
    });
    return signInResponse.data;
  } catch {
    return false;
  }
};

export const logout = async (): Promise<string | false> => {
  try {
    const logoutResponse = await axiosAuthorized.post('/auth/sign-out');
    return logoutResponse.data;
  } catch {
    return false;
  }
};
