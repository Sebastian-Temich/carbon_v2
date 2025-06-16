import { ResponseOffset } from './offsets-types';

export enum TransactionStatusName {
  Pending = 'PENDING',
  Accepted = 'ACCEPTED',
  Rejected = 'REJECTED',
}

export interface Transaction {
  id: string;
  unitCount: number;
  unitPrice: number;
  transactionStatus: TransactionStatus;
  offset: ResponseOffset;
  company: {
    id: string;
    name: string;
  };
}

export interface TransactionsTableValue {
  id: string;
  status: TransactionStatusName;
  statusTranslated: string;
  unitCount: number;
  unitPrice: string;
  project: string;
  company: string;
}

export interface TransactionStatus {
  id: string;
  name: TransactionStatusName;
}
