import { Panel } from 'primereact/panel';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useTranslation } from 'react-i18next';
import { OffsetLogsProjectGeneralInfo } from '@custom-types/offset-logs-types';

interface ProjectBasicLogsProps {
  projectGeneralInfo: OffsetLogsProjectGeneralInfo | null;
  isLoading: boolean;
}

export const ProjectBasicLogs = ({ projectGeneralInfo, isLoading }: ProjectBasicLogsProps) => {
  const { t } = useTranslation();

  const renderedGeneralInfo = (
    <>
      <p>
        {t('allUnits')}: {projectGeneralInfo?.totalUnitCount}
      </p>
      <p>
        {t('soldUnits')}: {projectGeneralInfo?.soldUnitCount}
      </p>
      <p>
        {t('soldAndNotRetiredUnits')}: {projectGeneralInfo?.soldAndNotRetiredUnitCount}
      </p>
      <p>
        {t('retiredUnits')}: {projectGeneralInfo?.retiredUnitCount}
      </p>
      <p>
        {t('notSoldUnits')}: {projectGeneralInfo?.notSoldUnitCount}
      </p>
    </>
  );

  return (
    <Panel header={t('generalInformation')} toggleable className="w-full mb-4">
      {isLoading ? <ProgressSpinner className="progress-spinner" /> : renderedGeneralInfo}
    </Panel>
  );
};
