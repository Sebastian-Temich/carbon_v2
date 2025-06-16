import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';

import { observer } from 'mobx-react';

import { useFormik } from 'formik';
import { useSellBuyOffsets } from '@components/sell-buy-offsets/sell-buy-offsets';
import { InputNumber } from '@components/form/input-number';
import { Dispatch, FC, SetStateAction } from 'react';
import { ValidationSellOffsetSchema } from './validation/validation-sell-offset-schema';

const SellOffsets: FC<{
  onCloseDialog: () => void;
  setSellOpenDialog: (value: boolean) => void;
  rawData: {
    id: string;
    unitCount: Number;
    unitPrice: Number;
    currency: { id: Number; code: string };
  };
}> = ({ onCloseDialog, rawData, setSellOpenDialog }) => {
  const { t } = useTranslation();
  // This is taken from mobax store
  const { sellOffset } = useSellBuyOffsets();

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: {
      unitCount: rawData.unitCount,
      unitPrice: rawData.unitPrice,
    },
    enableReinitialize: true,
    validationSchema: ValidationSellOffsetSchema,
    onSubmit: async () => {
      if (values !== undefined) {
        const unitPrice = Number(values.unitPrice);
        const unitCount = Number(values.unitCount);
        const payloadSellOffset = {
          unitPrice,
          unitCount,
        };
        sellOffset(payloadSellOffset, rawData.id, setSellOpenDialog);
      }
    },
  });
  return (
    <>
      <div className="card border-none p-1">
        <h5 className="text-center">Sell Unit</h5>
      </div>
      <form onSubmit={handleSubmit} className="p-fluid grid formgrid form">
        <InputNumber
          id="unitCount"
          mt="mt-2"
          label={t('investorwallet.unitCount')}
          values={values.unitCount}
          onChange={handleChange}
          onBlur={handleBlur}
          min={1}
          max={rawData.unitCount}
          errors={
            t(String(errors.unitCount) ?? '') === 'undefined' ? '' : t(String(errors.unitCount))
          }
          touched={touched.unitCount}
        />
        <InputNumber
          id="unitPrice"
          mt="mt-2"
          label={`${t('investorwallet.unitPrice')} ${rawData.currency.code}`}
          values={values.unitPrice}
          onChange={handleChange}
          onBlur={handleBlur}
          min={1}
          max={10_000}
          errors={
            t(String(errors.unitPrice) ?? '') === 'undefined' ? '' : t(String(errors.unitPrice))
          }
          touched={touched.unitPrice}
        />
        <div className="grid p-fluid ml-2 mr-2 pb-3 button-offset-inline">
          <div className="field mr-2">
            <Button type="submit" label={t('button.sellButtonLabel')} />
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
export default observer(SellOffsets);
