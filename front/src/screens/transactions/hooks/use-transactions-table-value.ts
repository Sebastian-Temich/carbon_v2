import { useTranslation } from 'react-i18next';
import { Transaction, TransactionsTableValue } from '@custom-types/transactions-types';

interface UseTransactionsTableValueArgs {
  transactions: Transaction[];
}

export const useTransactionsTableValue = ({ transactions }: UseTransactionsTableValueArgs) => {
  const { t } = useTranslation();
  const parsedTransactions: TransactionsTableValue[] = transactions.map((transaction) => ({
    id: transaction.id,
    status: transaction.transactionStatus.name,
    statusTranslated: t(transaction.transactionStatus.name),
    unitCount: transaction.unitCount,
    unitPrice: `${transaction.unitPrice} ${transaction.offset.currency.code}`,
    project: transaction.offset.project.name,
    company: transaction.company.name,
  }));

  return { transactionsTableValue: parsedTransactions };
};
