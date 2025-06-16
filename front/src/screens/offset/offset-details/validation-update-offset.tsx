import { numberRegExp, numberWithComma } from '@variables/validation-regex';
import * as Yup from 'yup';

export const ValidationUpdateOffsetSchema = () => {
  return Yup.object().shape({
    unitCount: Yup.string()
      .matches(numberRegExp, 'yup.offset.validationUnitCountError')
      .required('yup.offset.validationUnitCountRequired'),
    unitCreationYear: Yup.date()
      .typeError('yup.offset.validationUnitCreationYearError')
      .required('yup.offset.validationUnitCreationYearRequired'),
    shortDescription: Yup.string().required('yup.offset.validationShortDescriptionRequired'),
    unitPrice: Yup.string()
      .matches(numberWithComma, 'yup.offset.validationUnitPriceError')
      .required('yup.offset.validationUnitPriceRequired'),
    currencyId: Yup.string().required('yup.offset.validationCurrencyRequired'),
    unitType: Yup.string().required('yup.offset.validationUnitTypeRequired'),
    auditUnit: Yup.string().required('yup.offset.validationAuditUnitRequired'),
    sustainableDevelopmentGoalIds: Yup.array()
      .typeError('yup.offset.validationSustainableDevelopmentGoalIdsError')
      .min(1, 'yup.offset.validationSustainableDevelopmentGoalIdsRequired'),
    name: Yup.string().required('yup.offset.validationProjectNameRequired'),
    description: Yup.string().required('yup.offset.validationDescriptionRequired'),
    address: Yup.string().required('yup.offset.validationAddressRequired'),
    countryId: Yup.string().required('yup.offset.validationCountryRequired'),
    projectStandard: Yup.string().required('yup.offset.validationProjectStandardRequired'),
    startDate: Yup.date()
      .typeError('yup.offset.validationStartDateError')
      .required('yup.offset.validationStartDateRequired'),
    expectedEndDate: Yup.date()
      .min(Yup.ref('startDate'), 'yup.offset.validationExpectedEndDateBeforeStartDateError')
      .typeError('yup.offset.validationExpectedEndDateError')
      .required('yup.offset.validationExpectedEndDateRequired'),
    unitGenerationDate: Yup.array()
      .of(
        Yup.date()
          .required('yup.offset.validationUnitGenerationDateRequired')
          .typeError('yup.offset.validationUnitGenerationDateError'),
      )
      .typeError('yup.offset.validationUnitGenerationDateError')
      .required('yup.offset.validationUnitGenerationTimeRequired'),
    circularity: Yup.string().required('yup.offset.validationCircularityRequired'),
  });
};
