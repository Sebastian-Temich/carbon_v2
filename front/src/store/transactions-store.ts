import { makeAutoObservable } from 'mobx';
import { TransactionStatus, TransactionStatusName } from '@custom-types/transactions-types';
import { getTransactionStatuses } from '@api/transactions-api';
import { RootStore } from './root-store';

export class TransactionsStore {
  rootStore: RootStore;

  transactionStatuses: TransactionStatus[] = [];

  isLoadingTransactionStatuses = true;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  fetchTransactionStatuses = async () => {
    if (this.transactionStatuses.length) {
      this.isLoadingTransactionStatuses = false;
      return;
    }

    this.isLoadingTransactionStatuses = true;

    const transactionStatuses = await getTransactionStatuses();

    if (Array.isArray(transactionStatuses.data)) {
      this.transactionStatuses = transactionStatuses.data;
    }

    this.isLoadingTransactionStatuses = false;
  };

  findTransactionStatusByName = (name: TransactionStatusName) =>
    this.transactionStatuses.find((transactionStatus) => transactionStatus.name === name);
}
