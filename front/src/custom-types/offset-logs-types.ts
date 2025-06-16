import { CurrencyCode } from '@variables/currency';

export enum OffsetLogAction {
  Buy = 'BUY',
  Sell = 'SELL',
  Retire = 'RETIRE',
}

export interface OffsetLogsResponse {
  totalUnitCount: number;
  soldUnitCount: number;
  notSoldUnitCount: number;
  retiredUnitCount: number;
  soldAndNotRetiredUnitCount: number;
  offsetLogs: OffsetLog[];
}

export interface OffsetLog {
  id: string;
  sourceOffset: OffsetLogOffset;
  targetOffset: OffsetLogOffset;
  unitPrice: number;
  unitCount: number;
  unitType: string;
  auditUnit: string;
  currency: CurrencyCode;
  createdAt: string;
  action: OffsetLogAction;
  company: OffsetLogCompany;
}

interface OffsetLogCompany {
  id: string;
  name: string;
}

interface OffsetLogOffset {
  id: string;
  company: OffsetLogCompany;
}

export interface TableProjectLog {
  unitPrice: string;
  unitCount: number;
  unitType: string;
  auditUnit: string;
  action: string;
  actionDescription: string;
  createdAt: string;
}

export interface OffsetLogsProjectGeneralInfo {
  notSoldUnitCount: number;
  retiredUnitCount: number;
  soldAndNotRetiredUnitCount: number;
  soldUnitCount: number;
  totalUnitCount: number;
}
