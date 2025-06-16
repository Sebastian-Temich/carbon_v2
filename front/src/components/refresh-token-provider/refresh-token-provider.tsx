import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@utils/routes';
import { axiosAuthorized } from '@api/api';
import userStore from '@store/user-store';

interface RefreshTokenProviderProps {
  children: JSX.Element;
}

export const RefreshTokenProvider = observer(({ children }: RefreshTokenProviderProps) => {
  const refreshTokenResponseInterceptor = useRef(0);
  const navigate = useNavigate();

  const createRefreshTokenInterceptors = () => {
    refreshTokenResponseInterceptor.current = axiosAuthorized.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401) {
          error.response.config._retry = true;
          axiosAuthorized.interceptors.response.eject(refreshTokenResponseInterceptor.current);

          try {
            await axiosAuthorized.post('/auth/refresh-token');
          } catch (refreshTokenError) {
            userStore.setUser(undefined);
            navigate(ROUTES.Login.path);

            throw refreshTokenError;
          } finally {
            createRefreshTokenInterceptors();
          }

          return axiosAuthorized(error.response.config);
        }

        throw error;
      },
    );
  };

  useEffect(() => {
    createRefreshTokenInterceptors();

    return () => {
      axiosAuthorized.interceptors.response.eject(refreshTokenResponseInterceptor.current);
    };
  }, []);

  return children;
});
