import { PaginationArgs } from '@custom-types/pagination-types';
import { makeAutoObservable } from 'mobx';
import { RootStore } from './root-store';

interface PaginationType extends PaginationArgs {
  [key: string]: string | string[] | boolean | number | undefined;
}

export default class PaginationStore {
  rootStore: RootStore;

  pagination: PaginationType = { page: 1, perPage: 8 };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setPagination = (value: number) => {
    this.pagination.page = value;
  };
}
