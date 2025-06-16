export interface ISelectOption {
  name: string;
  id: string | number;
}

export interface IFormValues {
  [key: string]: string;
}

export interface IFormikErrors {
  [field: string]: string;
}
