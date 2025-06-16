import { Table } from '@components/table/table';
import { rootStore } from '@store/root-store';
import { OffsetStatus } from '@variables/offset-status-enum';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const TableMarketplace = observer(() => {
  const { resetAllFilter } = rootStore.filterStore;
  const { setStatus } = rootStore.dataFormStore;
  const { setFetchPayload } = rootStore.filterStore;
  const { fetchMarketplace } = rootStore.marketplaceStore;
  const { t } = useTranslation();

  useEffect(() => {
    if (!rootStore.dataFormStore.isDataFetched) return;

    resetAllFilter();
    setStatus([OffsetStatus.Accepted, OffsetStatus.Marketplace]);
    setFetchPayload({ ownedByCompanyId: undefined, isOwnerOriginal: undefined });
    fetchMarketplace();
  }, [rootStore.dataFormStore.isDataFetched]);

  return (
    <div className="grid">
      <div className="col-12 car-component">
        <div className="card car-container">
          <h5>{t('marketplace')}</h5>
          <Table showCartButton displayMarketplaceCheckbox />
        </div>
      </div>
    </div>
  );
});
