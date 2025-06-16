import DataTableComponent from '@components/data-table/data-table';
import userStore from '@store/user-store';
import { OffsetStatus } from '@variables/offset-status-enum';
import { useTranslation } from 'react-i18next';
import { useInvestorWalletTableColumnCells } from '@hooks/translation-hook';
import { rootStore } from '@store/root-store';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

export const InvestorWallet = observer(() => {
  const { t } = useTranslation();
  const { user } = userStore;
  const [refresh, setRefresh] = useState({});
  const { investorWalletTableColumnCells } = useInvestorWalletTableColumnCells();
  const { resetAllFilter } = rootStore.filterStore;
  const { setStatus } = rootStore.dataFormStore;
  const { setFetchPayload } = rootStore.filterStore;
  const { fetchMarketplace } = rootStore.marketplaceStore;

  useEffect(() => {
    resetAllFilter();
    setStatus([
      OffsetStatus.Marketplace,
      OffsetStatus.SoldOut,
      OffsetStatus.NotListed,
      OffsetStatus.Retired,
    ]);
    setFetchPayload({ ownedByCompanyId: user?.customer.company.id });
    fetchMarketplace();
  }, [refresh]);
  return (
    <div className="grid">
      <div className="col-12 car-component">
        <div className="card car-container">
          <h5>{t('investorwallet.name')}</h5>
          <DataTableComponent
            tableColumnCells={investorWalletTableColumnCells}
            setRefresh={setRefresh}
          />
        </div>
      </div>
    </div>
  );
});
