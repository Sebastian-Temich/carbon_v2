import { FC } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useTranslation } from 'react-i18next';
import { rootStore } from '@store/root-store';
import { FilterTransactionLogs } from './filter-transaction-logs/filter-transaction-logs';
import { FilterOffsets } from './filter-offsets/filter-offsets';

export const AdvanceFilterMarketPlace: FC<{
  onClose: () => void;
  openDialog: boolean;
  filterTransation?: boolean;
}> = observer(({ onClose, openDialog, filterTransation }) => {
  const { resetFilter } = rootStore.filterStore;
  const { t } = useTranslation();

  const onSaveFilter = async () => {
    if (filterTransation) {
      rootStore.projectStore.fetchProjects();
    } else {
      rootStore.marketplaceStore.fetchMarketplace();
    }
    onClose();
  };
  const renderFooter = () => {
    return (
      <div>
        <Button label={t('filter.save')} onClick={() => onSaveFilter()} />

        <Button
          label={t('filter.reset')}
          onClick={() => {
            resetFilter();
            if (filterTransation) {
              rootStore.projectStore.fetchProjects();
            } else {
              rootStore.marketplaceStore.fetchMarketplace();
            }
            onClose();
          }}
        />
      </div>
    );
  };

  return (
    <Dialog
      style={{ width: '600px' }}
      header="Advanced filter"
      visible={openDialog}
      onHide={() => onClose()}
      footer={renderFooter}
    >
      {filterTransation ? <FilterTransactionLogs /> : <FilterOffsets />}
    </Dialog>
  );
});
