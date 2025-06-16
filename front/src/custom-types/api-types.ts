import { IFormikErrors } from '@custom-types/form-types';
import { PaginationHeader } from '@services/pagination.service';

export interface IValidationError {
  loc: string[];
  msg: string;
  type: string;
}

export interface PaginationQueryParams {
  page?: number;
  perPage?: number;
}

export interface ApiResponseArgs<T> {
  data?: T;
  pagination?: PaginationHeader;
  validationErrors?: IFormikErrors;
  otherErrors?: boolean;
}

export class ApiResponse<T> {
  data?: T;

  pagination?: PaginationHeader;

  validationErrors?: IFormikErrors;

  otherErrors: boolean;

  constructor({ data, pagination, validationErrors, otherErrors }: ApiResponseArgs<T> = {}) {
    this.data = data;
    this.pagination = pagination;
    this.validationErrors = validationErrors;
    this.otherErrors = otherErrors || false;
  }

  isSuccessful(): boolean {
    return this.data !== undefined && this.validationErrors === undefined && !this.otherErrors;
  }

  isValidationError(): boolean {
    return this.data === undefined && this.validationErrors !== undefined && !this.otherErrors;
  }

  isOtherError(): boolean {
    return this.data === undefined && this.validationErrors === undefined && this.otherErrors;
  }

  isUnsuccessful(): boolean {
    return this.data === undefined && (this.validationErrors !== undefined || this.otherErrors);
  }
}
