import { buyOffsets, sellOffsets } from '@api/transaction-api';
import { useTranslation } from 'react-i18next';
import { SellOffsetsProps } from '@custom-types/offsets-types';
import { modalStore } from '@store/modal-store';
import { ModalTypes } from '@variables/modal-variables';
import { rootStore } from '@store/root-store';

export function useSellBuyOffsets() {
  const { fetchMarketplace } = rootStore.marketplaceStore;
  const { t } = useTranslation();
  const buyOffset = async (offsetsId: string, valueCart: number) => {
    modalStore.push({
      title: t('offset.buyOffsetModalTitle'),
      content: t('offset.buyOffsetModalContent'),
      type: ModalTypes.Confirmation,
      onAgree: async (currentModal) => {
        modalStore.update({ ...currentModal, isLoading: true });
        const response = await buyOffsets(valueCart, offsetsId);
        if (response.isSuccessful()) {
          modalStore.push({
            title: t('offset.buyingOffsetsModalTitle'),
            content: t('offset.buyingOffsetsModalContent'),
            type: ModalTypes.Info,
          });
          fetchMarketplace();
        }
      },
    });
  };

  const sellOffset = async (
    payload: SellOffsetsProps,
    offsetsId: string,
    setSellOpenDialog?: (value: boolean) => void,
  ) => {
    if (setSellOpenDialog) {
      modalStore.push({
        title: t('offset.sellOffsetModalTitle'),
        content: t('offset.sellOffsetModalContent'),
        type: ModalTypes.Confirmation,
        onAgree: async (currentModal) => {
          modalStore.update({ ...currentModal, isLoading: true });
          const response = await sellOffsets(payload, offsetsId);
          if (response.isSuccessful()) {
            modalStore.push({
              title: t('offset.sellingOffsetsModalTitle'),
              content: t('offset.sellingOffsetsModalContent'),
              type: ModalTypes.Info,
            });
            setSellOpenDialog(false);
            fetchMarketplace();
          }
        },
      });
    }
  };

  return { buyOffset, sellOffset };
}
