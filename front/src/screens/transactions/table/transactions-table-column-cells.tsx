import { TableColumnCell } from '@custom-types/data-table-types';

export const transactionsTableColumnCells: TableColumnCell[] = [
  { id: 'project', label: 'offset.name', minWidth: '100px', width: '5%' },
  { id: 'company', label: 'register.companyNameLabel', minWidth: '100px', width: '5%' },
  { id: 'unitCount', label: 'unitCount', minWidth: '100px', width: '5%' },
  { id: 'unitPrice', label: 'unitPrice', minWidth: '100px', width: '5%' },
  { id: 'statusTranslated', label: 'status', minWidth: '100px', width: '5%' },
];
