import { useEffect, useState } from 'react';
import { getOffsetLogs } from '@api/offset-logs-api';
import { OffsetLog, OffsetLogsProjectGeneralInfo } from '@custom-types/offset-logs-types';
import { PaginationQueryParams } from '@custom-types/api-types';

interface UseOffsetLogsArgs extends PaginationQueryParams {
  projectId: string;
}

export const useOffsetLogs = ({ projectId, page = 1, perPage = 10 }: UseOffsetLogsArgs) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [offsetLogs, setOffsetLogs] = useState<OffsetLog[]>([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [projectGeneralInfo, setProjectGeneralInfo] = useState<OffsetLogsProjectGeneralInfo | null>(
    null,
  );

  const buildGetOffsetLogsArgs = () => ({
    projectIds: [String(projectId)],
    page,
    perPage,
  });

  const fetchOffsetLogs = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const getOffsetLogsArgs = buildGetOffsetLogsArgs();
    const { data: offsetLogsData, pagination: offsetLogsPagination } = await getOffsetLogs(
      getOffsetLogsArgs,
    );

    if (offsetLogsData) {
      setOffsetLogs(offsetLogsData.offsetLogs);
      setProjectGeneralInfo(offsetLogsData);
    }

    if (offsetLogsPagination) {
      setItemsCount(offsetLogsPagination.totalCount);
    }

    setIsLoading(false);
  };

  const refetchOffsetLogs = async () => {
    if (isRefetching) return;

    setIsRefetching(true);

    const getOffsetLogsArgs = buildGetOffsetLogsArgs();
    const { data: offsetLogsData, pagination: offsetLogsPagination } = await getOffsetLogs(
      getOffsetLogsArgs,
    );

    if (offsetLogsData) {
      setOffsetLogs(offsetLogsData.offsetLogs);
    }

    if (offsetLogsPagination) {
      setItemsCount(offsetLogsPagination.totalCount);
    }

    setIsRefetching(false);
  };

  useEffect(() => {
    fetchOffsetLogs();
  }, []);

  useEffect(() => {
    refetchOffsetLogs();
  }, [page, perPage]);

  return { offsetLogs, isLoading, isRefetching, itemsCount, projectGeneralInfo };
};
