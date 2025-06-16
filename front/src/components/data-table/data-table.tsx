import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { TableColumnCell } from '@custom-types/data-table-types';
import { ResponseOffset } from '@custom-types/offsets-types';
import RetireUnit from '@screens/investor-wallet/retireUnits/retire-unit';
import { modalStore } from '@store/modal-store';
import userStore from '@store/user-store';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ModalTypes } from '@variables/modal-variables';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { AddEditModerators } from '@screens/admin-panel/form/add-edit-moderators';
import { Toolbar } from 'primereact/toolbar';
import SellOffsets from '@screens/investor-wallet/sellOffsets/sellOffsets';
import { useAcceptRejectOffsets } from '@components/sell-buy-offsets/accept-reject-offset';
import { OffsetStatus } from '@variables/offset-status-enum';
import { FileTypes } from '@variables/file-types-enum';
import { downloadUnitRetirementConfirmation } from '@api/offsets-api';
import { ModeratorResponse } from '@custom-types/user-types';
import { saveFile } from '@services/file-service';
import { TableHeader } from '@components/table/table-header';
import { rootStore } from '@store/root-store';
import { useNavigate } from 'react-router';
import { leftToolbar } from './data-table-left-toolbar';
import DataTableMenu from './data-table-menu';

const DataTableComponent: FC<{
  setRefresh: (data: {}) => void;
  displayMarketplaceCheckbox?: boolean;
  tableColumnCells: TableColumnCell[];
  moderatorFilter?: boolean;
}> = ({ setRefresh, tableColumnCells, displayMarketplaceCheckbox, moderatorFilter }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { customer, moderator, admin } = userStore.rolesInfo;
  const [openSellDialog, setSellOpenDialog] = useState(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [openRetireDialog, setOpenRetireDialog] = useState(false);
  const [openAdminDialog, setOpenAdminDialog] = useState(false);
  const { setPagination } = rootStore.paginationStore;
  const { marketplace, fetchMarketplace, sellOffsetsList, retireOffsetsList, loaded } =
    rootStore.marketplaceStore;
  const {
    removeModerator,
    moderator: moderatorData,
    moderators,
    loaded: isLoadedModerators,
    setModerator,
    fetchModerators,
  } = rootStore.moderatorsStore;
  const [firstPaginator, setFirstPaginator] = useState(0);
  const { acceptOffset, rejectOffset } = useAcceptRejectOffsets();

  const { pagination } = admin ? moderators : marketplace;
  const totalPages = pagination?.totalPages ?? 0;
  const paginatorVisible = totalPages > 1;

  const onAddUser = () => {
    setModerator(true);
    setOpenAdminDialog(true);
  };

  const editData = (rowData: ModeratorResponse) => {
    setModerator(false, rowData);
    setOpenAdminDialog(true);
  };

  const deleteData = (rowData: ModeratorResponse) => {
    modalStore.push({
      title: t('deleteData.title'),
      content: t('deleteData.content'),
      type: ModalTypes.Confirmation,
      onAgree: async (currentModal) => {
        modalStore.update({ ...currentModal, isLoading: true });
        if (rowData.id) {
          const response = await removeModerator(rowData.id);
          if (response) {
            modalStore.push({
              title: t('deleteData.responseTitle'),
              content: `${t('deleteData.responseContentStart')} ${rowData.firstName} ${
                rowData.lastName
              } ${t('deleteData.responseContentEnd')}`,
              type: ModalTypes.Info,
            });
            fetchModerators();
          }
        }
      },
    });
  };

  const actionAdminButtons = (rowData: ModeratorResponse) => {
    if (admin) {
      const adminItems = [
        {
          label: t('button.edit'),
          icon: 'pi pi-pencil',
          command: () => {
            editData(rowData);
          },
        },
        {
          label: t('button.delete'),
          icon: 'pi pi-trash',
          command: () => {
            deleteData(rowData);
          },
        },
      ];
      return DataTableMenu(adminItems);
    }
    return null;
  };

  const actionOffsetButtons = (rowData: ResponseOffset) => {
    const moderatorButtonsVisible = rowData.offsetStatus.name === OffsetStatus.Pending;
    if (moderator && moderatorButtonsVisible) {
      const moderatorItems = [
        {
          label: t('button.acceptButtonLabel'),
          command: () => {
            acceptOffset(rowData);
          },
        },
        {
          label: t('button.rejectButtonLabel'),
          command: () => {
            rejectOffset(rowData);
          },
        },
      ];
      return DataTableMenu(moderatorItems);
    }
    if (customer) {
      const sellButton = rowData.offsetStatus.name === OffsetStatus.NotListed;
      const isRetireButtonEnabled = rowData.offsetStatus.name === OffsetStatus.NotListed;
      const isRetirementConfirmationDownloadButtonEnabled =
        rowData.offsetStatus.name === OffsetStatus.Retired;
      const investorWalletItems = [
        {
          label: 'Information',
          icon: 'pi pi-info',
          command: () => {
            navigate(`/customer/marketplace/${rowData.id}`);
          },
        },
        {
          label: t('button.sellButtonLabel'),
          icon: 'pi pi-dollar',
          disabled: !sellButton,
          command: () => {
            setSellOpenDialog(true);
            sellOffsetsList(rowData);
          },
        },
        {
          label: t('button.retireButtonLabel'),
          icon: 'pi pi-send',
          disabled: !isRetireButtonEnabled,
          command: () => {
            setOpenRetireDialog(true);
            retireOffsetsList(rowData);
          },
        },
        {
          label: t('button.retirementConfirmationButtonTooltip'),
          icon: 'pi pi-file-pdf',
          disabled: !isRetirementConfirmationDownloadButtonEnabled,
          command: async () => {
            const fileContent = await downloadUnitRetirementConfirmation(rowData.id);
            saveFile({
              content: fileContent!,
              name: t('button.retiredUnitsFileName'),
              type: FileTypes.PDF,
            });
          },
        },
      ];
      return DataTableMenu(investorWalletItems);
    }
    return null;
  };

  const onCloseDialog = useCallback(() => {
    modalStore.push({
      title: '',
      content: t('button.cancelConfirmationMessage'),
      type: ModalTypes.Confirmation,
      onAgree: async (currentModal) => {
        modalStore.update({ ...currentModal, isLoading: true });
        setOpenRetireDialog(false);
        setSellOpenDialog(false);
        setOpenAdminDialog(false);
      },
    });
  }, []);
  useEffect(() => {
    if (admin) {
      if (moderators.pagination) {
        setTotalRecords(moderators.pagination.totalCount);
      }
    } else {
      if (marketplace.pagination) {
        setTotalRecords(marketplace.pagination.totalCount);
      }
    }
  }, [marketplace.pagination, moderators.pagination]);
  return (
    <>
      {((moderator && !loaded) || (admin && !isLoadedModerators)) && (
        <ProgressSpinner className="progress-spinner" />
      )}
      {(loaded || isLoadedModerators) && (
        <div className="car-content">
          {admin && (
            <Toolbar
              className="mb-4"
              left={leftToolbar({
                onAddUser,
                newButtonLabel: t('button.new'),
              })}
            />
          )}
          <DataTable
            value={admin ? moderators.data : marketplace.data}
            dataKey="id"
            paginator={paginatorVisible}
            responsiveLayout="stack"
            first={firstPaginator}
            onPage={({ first, page }) => {
              setFirstPaginator(first);
              if (admin) {
                setPagination(page ? page + 1 : 1);
                fetchModerators();
              } else {
                setPagination(page ? page + 1 : 1);
                fetchMarketplace();
              }
            }}
            lazy
            rows={8}
            totalRecords={totalRecords}
            className="datatable-responsive"
            emptyMessage={t('carContent.noProductsFoundMessage')}
            header={
              !admin && (
                <TableHeader
                  displayMarketplaceCheckbox={displayMarketplaceCheckbox}
                  moderatorFilter={moderatorFilter}
                />
              )
            }
          >
            {tableColumnCells.map((tableColumnCell) => (
              <Column
                key={Math.random()}
                field={tableColumnCell.id}
                header={t(tableColumnCell.label)}
                headerStyle={{ width: tableColumnCell.width, minWidth: tableColumnCell.minWidth }}
              />
            ))}
            {(moderator || customer) && <Column body={actionOffsetButtons} />}
            {admin && <Column body={actionAdminButtons} />}
          </DataTable>
          <Dialog style={{ maxWidth: '500px' }} visible={openSellDialog} onHide={onCloseDialog}>
            <div>
              <SellOffsets
                onCloseDialog={onCloseDialog}
                setSellOpenDialog={setSellOpenDialog}
                rawData={rootStore.marketplaceStore.sellOffset}
              />
            </div>
          </Dialog>
          <Dialog style={{ maxWidth: '500px' }} visible={openRetireDialog} onHide={onCloseDialog}>
            <div>
              <RetireUnit
                onCloseDialog={onCloseDialog}
                setOpenRetireDialog={setOpenRetireDialog}
                rawData={rootStore.marketplaceStore.retireOffset}
              />
            </div>
          </Dialog>
          <Dialog style={{ maxWidth: '500px' }} visible={openAdminDialog} onHide={onCloseDialog}>
            <div>
              <AddEditModerators
                moderator={moderatorData}
                setOpenAdminDialog={setOpenAdminDialog}
                setRefresh={setRefresh}
                onCloseDialog={onCloseDialog}
              />
            </div>
          </Dialog>
        </div>
      )}
    </>
  );
};
export default observer(DataTableComponent);
