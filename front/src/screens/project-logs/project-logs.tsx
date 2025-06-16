import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DataTable, DataTablePFSEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useTranslatedTableColumnCells } from '@hooks/translation-hook';
import { useTableColumns } from '@hooks/use-table-columns';
import { projectLogsTableColumnCells } from './table/project-logs-table-column-cells';
import { useProjectLogs } from './hooks/use-project-logs';
import { ProjectBasicLogs } from './components/project-basic-logs';

const rowsPerPageOptions = [10, 25, 50, 100];

export const ProjectLogs = () => {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const [paginatiorFirst, setPaginatorFirst] = useState(1);
  const [paginatorPage, setPaginatorPage] = useState(0);
  const [paginatorPerPage, setPaginatorPerPage] = useState(10);
  const { translatedColumnCells } = useTranslatedTableColumnCells({
    columnCells: projectLogsTableColumnCells,
  });
  const {
    parsedTableOffsetLogs,
    isRefetchingOffsetLogs,
    isLoadingOffsetLogs,
    offsetLogsCount,
    projectGeneralInfo,
  } = useProjectLogs({
    projectId,
    offsetLogsPage: paginatorPage + 1,
    offsetLogsPerPage: paginatorPerPage,
  });
  const { tableColumns } = useTableColumns({ tableColumnsCells: translatedColumnCells });
  const isAnyLoadingOffsetLogs = isRefetchingOffsetLogs || isLoadingOffsetLogs;

  const onPageChange = (e: DataTablePFSEvent) => {
    if (isAnyLoadingOffsetLogs) return;

    setPaginatorPerPage(e.rows);
    setPaginatorFirst(e.first);
    setPaginatorPage(e.page || 0);
  };

  return (
    <div className="grid">
      <div className="col-12 car-component">
        <div className="card car-container">
          <ProjectBasicLogs
            projectGeneralInfo={projectGeneralInfo}
            isLoading={isLoadingOffsetLogs}
          />
          <DataTable
            header={t('transactions')}
            loading={isAnyLoadingOffsetLogs}
            value={parsedTableOffsetLogs}
            responsiveLayout="stack"
            showGridlines
            paginator
            lazy
            rows={paginatorPerPage}
            totalRecords={offsetLogsCount}
            onPage={onPageChange}
            first={paginatiorFirst}
            rowsPerPageOptions={rowsPerPageOptions}
          >
            {tableColumns}
          </DataTable>
        </div>
      </div>
    </div>
  );
};
