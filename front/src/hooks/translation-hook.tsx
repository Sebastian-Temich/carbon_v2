import { TableColumnCell } from '@custom-types/data-table-types';
import { useTranslation } from 'react-i18next';

// This hook is to translate tables columns
export const useInvestorWalletTableColumnCells = () => {
  const { t } = useTranslation();
  const investorWalletTableColumnCells: TableColumnCell[] = [
    { id: 'project.name', label: t('investorwallet.name'), minWidth: '150px', width: '25%' },
    { id: 'unitCount', label: t('investorwallet.unitCount'), minWidth: '150px', width: '25%' },
    { id: 'unitPrice', label: t('investorwallet.unitPrice'), minWidth: '150px', width: '15%' },
    { id: 'offsetStatus.name', label: t('investorwallet.status'), minWidth: '150px', width: '15%' },
  ];

  const investorWalletGlobalFilterFields: string[] = [
    'project.name',
    'unitCount',
    'unitPrice',
    'offsetStatus.name',
  ];

  return { investorWalletTableColumnCells, investorWalletGlobalFilterFields };
};

interface UseTranslatedTableColumnCellsArgs {
  columnCells: TableColumnCell[];
}

export const useTranslatedTableColumnCells = ({
  columnCells,
}: UseTranslatedTableColumnCellsArgs) => {
  const { t } = useTranslation();
  const translatedColumnCells: TableColumnCell[] = columnCells.map((columnCell) => ({
    ...columnCell,
    label: t(columnCell.label),
  }));

  return { translatedColumnCells };
};
