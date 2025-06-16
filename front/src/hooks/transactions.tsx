import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getTransactions, updateTransaction } from '@api/transactions-api';
import {
  Transaction,
  TransactionsTableValue,
  TransactionStatusName,
} from '@custom-types/transactions-types';
import { RootStore } from '@store/root-store';
import { ModalStore } from '@store/modal-store';
import { PaginationQueryParams } from '@custom-types/api-types';
import { ModalTypes } from '@variables/modal-variables';
import DataTableMenu from '@components/data-table/data-table-menu';

interface UseTransactionsArgs extends PaginationQueryParams {}

interface UseTransactionsTableRowMenuBodyArgs {
  rootStore: RootStore;
  modalStore: ModalStore;
  fetchTransactions: () => Promise<void>;
}

export const useTransactions = ({ page = 1, perPage = 10 }: UseTransactionsArgs) => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactionsCount, setTransactionsCount] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const { data: transactionsData, pagination: transactionsPagination } = await getTransactions({
      page,
      perPage,
    });

    if (transactionsData) {
      setTransactions(transactionsData);
    }

    if (transactionsPagination?.totalCount) {
      setTransactionsCount(transactionsPagination.totalCount);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, [page, perPage]);

  return { transactions, transactionsCount, fetchTransactions, isLoading };
};

export const useTransactionsTableRowMenuBody = ({
  rootStore,
  modalStore,
  fetchTransactions,
}: UseTransactionsTableRowMenuBodyArgs) => {
  const { t } = useTranslation();
  const { transactionsStore } = rootStore;
  const isDisabledMenu = transactionsStore.isLoadingTransactionStatuses;

  const acceptTransactionCommand = async ({ id }: TransactionsTableValue) => {
    modalStore.push({
      title: t('acceptTransaction'),
      content: t('acceptTransactionConfirmation'),
      type: ModalTypes.Confirmation,
      onAgree: async (currentModal) => {
        modalStore.update({ ...currentModal, isLoading: true });

        const acceptedTransactionStatus = transactionsStore.findTransactionStatusByName(
          TransactionStatusName.Accepted,
        );
        const updateResult = await updateTransaction({
          transactionId: id,
          transactionStatusId: acceptedTransactionStatus?.id,
        });

        if (updateResult) {
          await fetchTransactions();
          modalStore.push({
            title: t('acceptTransaction'),
            content: t('acceptTransactionSuccessMessage'),
            type: ModalTypes.Info,
          });
        }
      },
    });
  };

  const rejectTransactionCommand = async ({ id }: TransactionsTableValue) => {
    modalStore.push({
      title: t('rejectTransaction'),
      content: t('rejectTransactionConfirmation'),
      type: ModalTypes.Confirmation,
      onAgree: async (currentModal) => {
        modalStore.update({ ...currentModal, isLoading: true });

        const rejectedTransactionStatus = transactionsStore.findTransactionStatusByName(
          TransactionStatusName.Rejected,
        );
        const updateResult = await updateTransaction({
          transactionId: id,
          transactionStatusId: rejectedTransactionStatus?.id,
        });

        if (updateResult) {
          await fetchTransactions();
          modalStore.push({
            title: t('rejectTransaction'),
            content: t('rejectTransactionSuccessMessage'),
            type: ModalTypes.Info,
          });
        }
      },
    });
  };

  const menuBodyTemplate = (row: TransactionsTableValue) => {
    const menuItems = [];

    if (row.status === TransactionStatusName.Pending) {
      menuItems.push({
        label: t('button.acceptButtonLabel'),
        command: () => acceptTransactionCommand(row),
      });
      menuItems.push({
        label: t('button.rejectButtonLabel'),
        command: () => rejectTransactionCommand(row),
      });
    }

    const isEmptyMenu = menuItems.length === 0;

    return DataTableMenu(menuItems, isDisabledMenu || isEmptyMenu);
  };

  return { menuBodyTemplate };
};
