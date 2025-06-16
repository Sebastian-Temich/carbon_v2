import { useState, useEffect } from 'react';
import { DataTable, DataTablePFSEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { useTransactions, useTransactionsTableRowMenuBody } from '@hooks/transactions';
import { useTranslatedTableColumnCells } from '@hooks/translation-hook';
import { useTableColumns } from '@hooks/use-table-columns';
import { rootStore } from '@store/root-store';
import { modalStore } from '@store/modal-store';
import { useTransactionsTableValue } from './hooks/use-transactions-table-value';
import { transactionsTableColumnCells } from './table/transactions-table-column-cells';

const rowsPerPageOptions = [10, 25, 50];

export const Transactions = observer(() => {
  const [paginatiorFirst, setPaginatorFirst] = useState(1);
  const [paginatorPage, setPaginatorPage] = useState(0);
  const [paginatorPerPage, setPaginatorPerPage] = useState(10);
  const { t } = useTranslation();
  const { transactions, transactionsCount, fetchTransactions, isLoading } = useTransactions({
    page: paginatorPage + 1,
    perPage: paginatorPerPage,
  });
  const { translatedColumnCells } = useTranslatedTableColumnCells({
    columnCells: transactionsTableColumnCells,
  });
  const { transactionsTableValue } = useTransactionsTableValue({ transactions });
  const { tableColumns } = useTableColumns({ tableColumnsCells: translatedColumnCells });
  const { menuBodyTemplate } = useTransactionsTableRowMenuBody({
    rootStore,
    modalStore,
    fetchTransactions,
  });

  const onPageChange = (e: DataTablePFSEvent) => {
    if (isLoading) return;

    setPaginatorPerPage(e.rows);
    setPaginatorFirst(e.first);
    setPaginatorPage(e.page || 0);
  };

  useEffect(() => {
    rootStore.transactionsStore.fetchTransactionStatuses();
  }, []);

  return (
    <div className="grid">
      <div className="col-12 car-component">
        <div className="card car-container">
          <DataTable
            header={t('transactions')}
            loading={isLoading}
            value={transactionsTableValue}
            responsiveLayout="stack"
            showGridlines
            paginator
            lazy
            rows={paginatorPerPage}
            first={paginatiorFirst}
            rowsPerPageOptions={rowsPerPageOptions}
            totalRecords={transactionsCount}
            onPage={onPageChange}
          >
            {tableColumns}
            <Column headerStyle={{ width: '1%', minWidth: '100px' }} body={menuBodyTemplate} />
          </DataTable>
        </div>
      </div>
    </div>
  );
});
