import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import dayjs from 'dayjs';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';

import { ResponseOffset } from '@custom-types/offsets-types';

export const ProjectView: FC<{
  project: ResponseOffset | undefined;
  onClose: () => void;
  openDialog: boolean;
}> = ({ project, onClose, openDialog }) => {
  const { t } = useTranslation();
  const formatDate = (date: string | undefined) => dayjs(date).format('YYYY-MM-DD');
  const [valueCart, setValueCart] = useState<number | null>(1);
  return (
    <Dialog
      style={{ width: '500px' }}
      header={project?.project.name}
      visible={openDialog}
      onHide={() => onClose()}
    >
      <div className="align-items-center p-3 img_viewList_wrapper">
        <img src={project?.project.imageUri} alt="offset" className="w-full shadow-2" />
      </div>

      <div className="grid p-fluid ml-2 mr-2 pb-3">
        <div className="col-12 md:col-6">
          <InputNumber
            inputId="stacked"
            value={valueCart}
            onValueChange={(e) => setValueCart(e.value)}
            showButtons
            mode="decimal"
            min={0}
            max={100}
          />
        </div>
        <div className="col-12 md:col-6">
          <Button label={t('button.add')} icon="pi pi-shopping-cart" />
        </div>
      </div>

      <ul className="mb-2 p-3">
        <h3>{t('offset.offsetDetails')}</h3>
        <li className="clearfix">
          {t('offset.shortDescription')} - {project?.shortDescription}
        </li>
        <li className="clearfix">
          {t('offset.auditUnit')} - {project?.auditUnit.name}
        </li>
        <li className="clearfix">
          {t('offset.unitType')} - {project?.unitType.name}
        </li>
        <li className="clearfix">
          {t('offset.unitCreationYear')} - {formatDate(project?.unitCreationYear)}
        </li>
      </ul>
      <ul className="mb-2 p-3">
        <h3>{t('offset.projectDetails')}</h3>
        <li className="clearfix">
          {t('offset.description')} - {project?.project.description}
        </li>
        <li className="clearfix">
          {t('offset.address')} - {project?.project.address}
        </li>
        <li className="clearfix">
          {t('offset.country')} - {project?.project.country.alpha3Code}
        </li>
      </ul>
      <ul className="mb-2 p-3">
        <h5>{t('offset.standards')}</h5>
        <li className="clearfix">
          {t('offset.projectStandards')} - {project?.project.projectStandard.name}
        </li>
        <li className="clearfix">
          {t('offset.sustainableDevelopmentGoals')} -{' '}
          {project?.project.sustainableDevelopmentGoals[0].name}
        </li>
        <li className="clearfix">
          {t('offset.circularity')} - {project?.project.circularity}
        </li>
      </ul>
      <ul className="mb-2 p-3">
        <h5>{t('offset.dates')}</h5>
        <li className="clearfix">
          {t('offset.projectStarts')} - {formatDate(project?.project.startDate)}
        </li>
        <li className="clearfix">
          {t('offset.expectedEndDate')} - {formatDate(project?.project.expectedEndDate)}
        </li>
        <li className="clearfix">
          {t('offset.unitGeneration')} - {formatDate(project?.project.unitGenerationStartDate)} -
          {formatDate(project?.project.unitGenerationEndDate)}
        </li>
      </ul>
    </Dialog>
  );
};
