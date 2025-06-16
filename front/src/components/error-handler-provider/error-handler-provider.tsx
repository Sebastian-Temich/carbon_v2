import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { AxiosError } from 'axios';
import { axiosAuthorized, axiosPublic } from '@api/api';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface ErrorHandlerProviderProps {
  children: JSX.Element;
}

interface AxiosErrorBody {
  description?: string;
}

export const ErrorHandlerProvider = observer(({ children }: ErrorHandlerProviderProps) => {
  const errorHandlerResponseInterceptorAuthorized = useRef(0);
  const errorHandlerResponseInterceptorPublic = useRef(0);

  const { t } = useTranslation();

  const errorHandlerInterceptor = async (error: AxiosError<AxiosErrorBody>) => {
    const statusCode = error?.response?.status;

    if (!statusCode) throw error;

    if (statusCode === 422) {
      toast.error(t('toast.formDataInvalidMessage'));
    } else if (statusCode >= 400 && statusCode < 500) {
      const errorDescription = error?.response?.data?.description;
      showToastForGeneralApiError(errorDescription);
    } else if (statusCode >= 500 && statusCode < 600) {
      toast.error(t('toast.internalServerError'));
    } else {
      toast.error(t('toast.unknownErrorMessage'));
    }

    throw error;
  };

  const createErrorHandlerInterceptors = () => {
    errorHandlerResponseInterceptorAuthorized.current = axiosAuthorized.interceptors.response.use(
      (response) => response,
      errorHandlerInterceptor,
    );
    errorHandlerResponseInterceptorPublic.current = axiosPublic.interceptors.response.use(
      (response) => response,
      errorHandlerInterceptor,
    );
  };

  const showToastForGeneralApiError = (errorDescription: string | undefined) => {
    if (!errorDescription) {
      toast.error(t('toast.unknownErrorMessage'));
    } else {
      toast.error(t(`apiErrors.${errorDescription}`));
    }
  };

  useEffect(() => {
    createErrorHandlerInterceptors();

    return () => {
      axiosAuthorized.interceptors.response.eject(
        errorHandlerResponseInterceptorAuthorized.current,
      );
      axiosPublic.interceptors.response.eject(errorHandlerResponseInterceptorPublic.current);
    };
  }, []);

  return children;
});
