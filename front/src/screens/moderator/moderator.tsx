import DataTableComponent from '@components/data-table/data-table';
import { rootStore } from '@store/root-store';
import { useTranslation } from 'react-i18next';
import { OffsetStatus } from '@variables/offset-status-enum';
import { useEffect, useState } from 'react';
import { moderatorTableColumnCells } from './table/moderator-table-column-cells';

export const ModeratorList = () => {
  const { resetAllFilter } = rootStore.filterStore;
  const { fetchMarketplace } = rootStore.marketplaceStore;
  const { t } = useTranslation();
  const [refresh, setRefresh] = useState({});

  useEffect(() => {
    resetAllFilter();
    fetchMarketplace();
  }, [refresh]);
  return (
    <div className="grid">
      <div className="col-12 car-component">
        <div className="card car-container">
          <h5>{t('moderator.moderatorList')}</h5>
          <DataTableComponent
            tableColumnCells={moderatorTableColumnCells}
            setRefresh={setRefresh}
            moderatorFilter
          />
        </div>
      </div>
    </div>
  );
};
