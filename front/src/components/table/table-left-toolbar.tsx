import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'primereact/button';

export const leftToolbar: FC<{ addData: () => void }> = ({ addData }) => {
  const { t } = useTranslation();
  return (
    <div className="my-2">
      <Button
        label={t('button.new')}
        icon="pi pi-plus"
        className="p-button-success mr-2"
        onClick={() => addData()}
      />
    </div>
  );
};
