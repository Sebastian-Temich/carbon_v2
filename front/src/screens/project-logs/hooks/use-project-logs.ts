import { useTranslation } from 'react-i18next';
import { useOffsetLogs } from '@hooks/offset-logs';
import { TableProjectLog, OffsetLog, OffsetLogAction } from '@custom-types/offset-logs-types';

interface UseProjectLogsArgs {
  projectId: string | undefined;
  offsetLogsPage?: number;
  offsetLogsPerPage?: number;
}

interface UseParsedTableOffsetLogs {
  offsetLogs: OffsetLog[];
}

export const useProjectLogs = ({
  projectId,
  offsetLogsPage = 1,
  offsetLogsPerPage = 10,
}: UseProjectLogsArgs) => {
  const {
    offsetLogs,
    isRefetching: isRefetchingOffsetLogs,
    isLoading: isLoadingOffsetLogs,
    itemsCount: offsetLogsCount,
    projectGeneralInfo,
  } = useOffsetLogs({ projectId, page: offsetLogsPage, perPage: offsetLogsPerPage });
  const { parsedTableOffsetLogs } = useParsedTableOffsetLogs({ offsetLogs });

  return {
    parsedTableOffsetLogs,
    isRefetchingOffsetLogs,
    isLoadingOffsetLogs,
    offsetLogsCount,
    projectGeneralInfo,
  };
};

const useParsedTableOffsetLogs = ({ offsetLogs }: UseParsedTableOffsetLogs) => {
  const { t } = useTranslation();

  const getActionDescription = (offsetLog: OffsetLog) => {
    const { action, sourceOffset, targetOffset } = offsetLog;
    const sourceOffsetCompanyName = sourceOffset.company.name;
    const targetOffsetCompanyName = targetOffset.company.name;

    switch (action) {
      case OffsetLogAction.Buy:
        return `${t('boughtBy')} ${targetOffsetCompanyName}`;
      case OffsetLogAction.Sell:
        return `${t('soldBy')} ${sourceOffsetCompanyName}`;
      case OffsetLogAction.Retire:
        return `${t('retiredBy')} ${sourceOffsetCompanyName}`;
      default:
        return t('unknownAction');
    }
  };

  const parsedTableOffsetLogs: TableProjectLog[] = offsetLogs.map((offsetLog) => {
    return {
      ...offsetLog,
      action: t(`offsetLogs.actions.${offsetLog.action}`),
      createdAt: new Date(offsetLog.createdAt).toLocaleString(),
      actionDescription: getActionDescription(offsetLog),
      unitPrice: `${offsetLog.unitPrice} ${offsetLog.currency}`,
    } as TableProjectLog;
  });

  return { parsedTableOffsetLogs };
};
