import { TableColumnCell } from '@custom-types/data-table-types';

export const projectLogsTableColumnCells: TableColumnCell[] = [
  { id: 'unitCount', label: 'unitCount', minWidth: '100px', width: '5%' },
  { id: 'unitPrice', label: 'unitPrice', minWidth: '100px', width: '5%' },
  { id: 'auditUnit', label: 'auditUnit', minWidth: '100px', width: '5%' },
  { id: 'unitType', label: 'unitType', minWidth: '100px', width: '5%' },
  { id: 'action', label: 'action', minWidth: '70px', width: '5%' },
  { id: 'actionDescription', label: 'actionDescription', minWidth: '100px', width: '10%' },
  { id: 'createdAt', label: 'transactionExecutionDate', minWidth: '200px', width: '5%' },
];
