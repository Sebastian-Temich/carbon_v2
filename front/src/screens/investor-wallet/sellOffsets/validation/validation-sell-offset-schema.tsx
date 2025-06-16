import * as Yup from 'yup';

export const ValidationSellOffsetSchema = Yup.object().shape({
  unitCount: Yup.string().required('yup.edit.unitCountRequiredErrorMessage'),
  unitPrice: Yup.string().required('yup.edit.unitPriceRequiredErrorMessage'),
});
