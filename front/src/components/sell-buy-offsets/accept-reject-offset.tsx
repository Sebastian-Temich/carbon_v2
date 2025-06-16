import { ResponseOffset } from '@custom-types/offsets-types';
import { useTranslation } from 'react-i18next';
import { modalStore } from '@store/modal-store';
import { offsetDetailsStore } from '@store/offset-store';
import { rootStore } from '@store/root-store';
import { ModalTypes } from '@variables/modal-variables';
import { OffsetStatus } from '@variables/offset-status-enum';

export function useAcceptRejectOffsets() {
  const { fetchMarketplace } = rootStore.marketplaceStore;
  const { updateOffset } = offsetDetailsStore;
  const { formData } = rootStore.dataFormStore;
  const { t } = useTranslation();
  const getStatus = (message: string) => {
    const status = formData.status.find((elem) => elem.label === message);
    const offset = {
      statusId: status?.value,
    };
    return offset;
  };
  const acceptOffset = (rowData: ResponseOffset) => {
    modalStore.push({
      title: t('offset.acceptOffsetTitle'),
      content: t('offset.acceptOffsetConfirmationMessage'),
      type: ModalTypes.Confirmation,
      onAgree: async (currentModal) => {
        modalStore.update({ ...currentModal, isLoading: true });
        const response = await updateOffset(getStatus(OffsetStatus.Accepted), rowData.id);
        if (response) {
          fetchMarketplace();
          modalStore.push({
            title: t('offset.acceptOffsetTitle'),
            content: t('offset.acceptOffsetSuccessMessage', { projectName: rowData.project.name }),
            type: ModalTypes.Info,
          });
        }
      },
    });
  };
  const rejectOffset = (rowData: ResponseOffset) => {
    modalStore.push({
      title: t('offset.rejectOffsetTitle'),
      content: t('offset.rejectOffsetConfirmationMessage'),
      type: ModalTypes.Confirmation,
      onAgree: async (currentModal) => {
        modalStore.update({ ...currentModal, isLoading: true });
        const response = await updateOffset(getStatus(OffsetStatus.Rejected), rowData.id);
        if (response) {
          fetchMarketplace();
          modalStore.push({
            title: t('offset.rejectOffsetTitle'),
            content: t('offset.rejectOffsetSuccessMessage', { projectName: rowData.project.name }),
            type: ModalTypes.Info,
          });
        }
      },
    });
  };
  return { acceptOffset, rejectOffset };
}
