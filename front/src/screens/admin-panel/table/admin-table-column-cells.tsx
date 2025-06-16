import { TableColumnCell } from '@custom-types/data-table-types';

export const adminTableColumnCells: TableColumnCell[] = [
  { id: 'firstName', label: 'register.firstNameLabel', minWidth: '150px', width: '25%' },
  { id: 'lastName', label: 'register.lastNameLabel', minWidth: '150px', width: '25%' },
  { id: 'email', label: 'register.emailLabel', minWidth: '150px', width: '15%' },
  { id: 'isActive', label: 'access.isActive', minWidth: '100px', width: '15%' },
];
