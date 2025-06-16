import { IFormikErrors } from '@custom-types/form-types';
import { AxiosError } from 'axios';
import { ApiResponse, IValidationError } from '@custom-types/api-types';
import i18n from '@i18n/i18';

export const createUnsuccessfulApiResponse = <T>(error: any): ApiResponse<T> => {
  const isValidationError = error instanceof AxiosError && error.response?.status === 422;

  if (isValidationError) {
    const validationErrors = error.response!.data;
    return new ApiResponse<T>({ validationErrors: toFormikErrors(validationErrors) });
  }
  return new ApiResponse<T>({ otherErrors: true });
};

const toFormikErrors = (errors: IValidationError[]): IFormikErrors => {
  return errors.reduce((acc: IFormikErrors, error) => {
    const { loc, msg, type } = error;
    const locWithoutRoot = loc.filter((l) => l !== '__root__');
    const field = locWithoutRoot.join('.');
    if (type.startsWith('value_error')) {
      acc[field] = translateError(msg);
    }

    return acc;
  }, {});
};

const translateError = (error: string) => {
  const translation = i18n.t(`apiErrors.${error}`);
  if (translation !== `apiErrors.${error}`) return translation;
  return error;
};
