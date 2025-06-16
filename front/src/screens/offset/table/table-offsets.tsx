import { Table } from '@components/table/table';
import { rootStore } from '@store/root-store';
import userStore from '@store/user-store';
import { OffsetStatus } from '@variables/offset-status-enum';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const TableOffsets = observer(() => {
  const { t } = useTranslation();
  const { user } = userStore;
  const { resetAllFilter } = rootStore.filterStore;
  const { setFetchPayload } = rootStore.filterStore;
  const { setStatus } = rootStore.dataFormStore;
  const { fetchMarketplace } = rootStore.marketplaceStore;

  useEffect(() => {
    resetAllFilter();
    setStatus([OffsetStatus.Accepted, OffsetStatus.Rejected, OffsetStatus.Pending]);
    setFetchPayload({ ownedByCompanyId: user?.customer?.company.id, isOwnerOriginal: true });
    fetchMarketplace();
  }, []);
  return (
    <div className="grid">
      <div className="col-12 car-component">
        <div className="card car-container">
          <h5>{t('offset.list')}</h5>
          <Table />
        </div>
      </div>
    </div>
  );
});
