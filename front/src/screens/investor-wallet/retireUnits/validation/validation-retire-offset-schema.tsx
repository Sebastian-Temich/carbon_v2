import * as Yup from 'yup';

export const ValidationRetireOffsetSchema = () => {
  return Yup.object().shape({
    unitCount: Yup.number().required('yup.edit.unitCountRequiredErrorMessage'),
  });
};
