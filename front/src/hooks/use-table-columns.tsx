import { Column } from 'primereact/column';
import { TableColumnCell } from '@custom-types/data-table-types';

interface UseTableColumnsArgs {
  tableColumnsCells: TableColumnCell[];
}

export const useTableColumns = ({ tableColumnsCells }: UseTableColumnsArgs) => {
  const tableColumns = tableColumnsCells.map((column) => {
    return (
      <Column
        key={column.id}
        field={column.id}
        header={column.label}
        headerStyle={{ width: column.width, minWidth: column.minWidth }}
      />
    );
  });

  return { tableColumns };
};
