import { DataTable } from 'primereact/datatable';
import { ResponseProjectProps } from '@custom-types/projects-types';
import { useEffect, useState } from 'react';
import { Column } from 'primereact/column';
import { Image } from 'primereact/image';
import { Tooltip } from 'primereact/tooltip';
import dayjs from 'dayjs';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react';
import { rootStore } from '@store/root-store';
import { useTranslation } from 'react-i18next';
import { TableHeader } from '@components/table/table-header';

export const ModeratorProjectList = observer(() => {
  const { resetAllFilter } = rootStore.filterStore;
  const { paginationStore } = rootStore;
  const { projects, loaded, fetchProjects } = rootStore.projectStore;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [first, setFirst] = useState(0);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const sdgBodyTemplate = (rowData: ResponseProjectProps) => {
    return (
      <div className="flex car-sdg-container">
        {rowData.sustainableDevelopmentGoals.map((elem) => {
          const tooltipClass = `sdg-${elem.id}`;
          return (
            <div key={elem.id}>
              <Tooltip target={`.${tooltipClass}`} />
              <Image
                src={elem.imageUri}
                alt="Logo"
                height="30px"
                className={`mr-2 ${tooltipClass}`}
                data-pr-tooltip={elem.name}
                data-pr-position="right"
                data-pr-at="right+5 top"
                data-pr-my="left center-2"
              />
            </div>
          );
        })}
      </div>
    );
  };

  const controlsTemplate = (rowData: ResponseProjectProps) => {
    return (
      <div className="flex flex-column">
        <Button
          type="button"
          icon="pi pi-eye"
          label={t('button.logs')}
          className="p-button mx-auto"
          onClick={() => navigate(`/moderator/projects/${rowData.id}/logs`)}
        />
      </div>
    );
  };

  useEffect(() => {
    resetAllFilter();
    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects.pagination) {
      setTotalRecords(projects.pagination.totalCount);
    }
  }, [projects.pagination]);

  return (
    <div className="grid">
      <div className="col-12 car-component">
        <div className="card car-container">
          <h5>{t('offset.projectList')}</h5>
          <DataTable
            value={projects.data}
            lazy
            paginator={projects.pagination ? projects.pagination?.totalPages > 1 : false}
            first={first}
            className="p-datatable-customers"
            totalRecords={totalRecords}
            rows={8}
            dataKey="id"
            header={<TableHeader filterTransation />}
            loading={!loaded}
            responsiveLayout="stack"
            emptyMessage={t('carContent.noProductsFoundMessage')}
            onPage={(e) => {
              setFirst(e.first);
              if (e.page) {
                paginationStore.setPagination((e.page + 1) as unknown as number);
                fetchProjects();
              } else {
                paginationStore.setPagination(1);
                fetchProjects();
              }
            }}
          >
            <Column
              field="name"
              header={t('header.name')}
              className="max-w-10rem"
              style={{ wordWrap: 'break-word' }}
            />
            <Column
              field="country"
              header={t('header.countries')}
              body={(rowData: ResponseProjectProps) => rowData.country.name}
              className="max-w-10rem"
              style={{ wordWrap: 'break-word' }}
            />
            <Column
              field="sustainableDevelopmentGoals"
              header={t('header.sdgs')}
              body={sdgBodyTemplate}
              className="max-w-10rem"
            />
            <Column
              field="projectStandard"
              header={t('header.projectStandards')}
              body={(rowData: ResponseProjectProps) => rowData.projectStandard.name}
              className="max-w-10rem"
            />
            <Column
              field="creationDate"
              header={t('header.creationDate')}
              body={(rowData: ResponseProjectProps) =>
                dayjs(rowData.createdAt).format('DD/MM/YYYY')
              }
              className="max-w-10rem"
            />
            <Column
              field="totalUnitCount"
              header={t('header.totalUnitCount')}
              className="max-w-10rem"
            />
            <Column header={t('header.actions')} body={controlsTemplate} />
          </DataTable>
        </div>
      </div>
    </div>
  );
});
