import { Button } from 'primereact/button';

import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';
import { modalStore } from '@store/modal-store';

import { ModalTypes } from '@variables/modal-variables';

import { FC } from 'react';
import { InputNumber } from '@components/form/input-number';
import { RetireOffsetUnits } from '@api/offsets-api';
import { rootStore } from '@store/root-store';
import { ValidationRetireOffsetSchema } from './validation/validation-retire-offset-schema';

const RetireUnit: FC<{
  onCloseDialog: () => void;
  setOpenRetireDialog: (value: boolean) => void;
  rawData: { unitCount: Number };
}> = ({ onCloseDialog, rawData, setOpenRetireDialog }) => {
  const { t } = useTranslation();
  const { values, errors, touched, handleChange, handleSubmit, handleBlur, setErrors } = useFormik({
    initialValues: {
      unitCount: rawData.unitCount,
    },
    validationSchema: ValidationRetireOffsetSchema,
    onSubmit: async () => {
      if (typeof values !== 'undefined') {
        const unitCount = Number(values.unitCount);
        const payloadRetireUnit = {
          unitCount,
        };
        modalStore.push({
          title: '',
          content: t('offset.retireUnitContent', {
            count: Number(values?.unitCount),
          }) as unknown as string,
          type: ModalTypes.Confirmation,
          onAgree: async (currentModal) => {
            modalStore.update({ ...currentModal, isLoading: true });
            const response = await RetireOffsetUnits(
              payloadRetireUnit,
              rootStore.marketplaceStore.retireOffset.id,
            );
            if (response.isSuccessful()) {
              setOpenRetireDialog(false);
              modalStore.push({
                title: t('offset.retireModalTitle'),
                content: t('offset.retireModalContent'),
                type: ModalTypes.Info,
              });
              rootStore.marketplaceStore.fetchMarketplace();
            } else if (response.isValidationError()) {
              setErrors(response.validationErrors!);
            }
          },
        });
      }
    },
  });

  return (
    <>
      <div className="card border-none p-1">
        <h5 className="text-center">{t('offset.retireUnit')}</h5>
      </div>
      <form onSubmit={handleSubmit} className="p-fluid grid formgrid form">
        <InputNumber
          id="unitCount"
          label={t('investorwallet.unitCount')}
          values={values?.unitCount}
          min={1}
          max={rawData.unitCount}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={
            t(String(errors.unitCount) ?? '') === 'undefined' ? '' : t(String(errors.unitCount))
          }
          touched={touched.unitCount}
        />

        <div className="grid p-fluid ml-2 mr-2 pb-3 button-offset-inline">
          <div className="field mr-2 ">
            <Button
              className="p-button-warning"
              type="submit"
              label={t('button.retireButtonLabel')}
            />
          </div>
          <div className="field">
            <Button
              type="button"
              label={t('button.cancel')}
              onClick={() => {
                onCloseDialog();
              }}
              className="p-button-secondary"
            />
          </div>
        </div>
      </form>
    </>
  );
};
export default observer(RetireUnit);
