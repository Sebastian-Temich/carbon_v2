import * as Yup from 'yup';
import { numberRegExp, numberWithComma } from '@variables/validation-regex';

export const ValidationAddOffsetSchema = () => {
  return Yup.object().shape({
    description: Yup.string().required('yup.offset.validationDescriptionRequired'),
    name: Yup.string().required('yup.offset.validationProjectNameRequired'),
    address: Yup.string().required('yup.offset.validationAddressRequired'),
    countryId: Yup.string().required('yup.offset.validationCountryRequired'),
    projectStandard: Yup.object().shape({
      existingProjectStandardId: Yup.string().required(
        'yup.offset.validationProjectStandardRequired',
      ),
    }),
    unitGenerationTime: Yup.array()
      .of(
        Yup.date()
          .required('yup.offset.validationUnitGenerationDateRequired')
          .typeError('yup.offset.validationUnitGenerationDateError'),
      )
      .required('yup.offset.validationUnitGenerationTimeRequired'),
    startDate: Yup.date()
      .typeError('yup.offset.validationStartDateError')
      .required('yup.offset.validationStartDateRequired'),
    expectedEndDate: Yup.date()
      .min(Yup.ref('startDate'), 'yup.offset.validationExpectedEndDateBeforeStartDateError')
      .typeError('yup.offset.validationExpectedEndDateError')
      .required('yup.offset.validationExpectedEndDateRequired'),
    sustainableDevelopmentGoalIds: Yup.array()
      .typeError('yup.offset.validationSustainableDevelopmentGoalIdsError')
      .min(1, 'yup.offset.validationSustainableDevelopmentGoalIdsRequired'),
    circularity: Yup.string().required('yup.offset.validationCircularityRequired'),
    offsets: Yup.array().of(
      Yup.object().shape({
        shortDescription: Yup.string().required('yup.offset.validationShortDescriptionRequired'),
        unitCount: Yup.string()
          .matches(numberRegExp, 'yup.offset.validationUnitCountError')
          .required('yup.offset.validationUnitCountRequired'),
        unitPrice: Yup.string()
          .matches(numberWithComma, 'yup.offset.validationUnitPriceError')
          .required('yup.offset.validationUnitPriceRequired'),
        currencyId: Yup.string().required('yup.offset.validationCurrencyRequired'),
        unitType: Yup.object().shape({
          existingOffsetUnitTypeId: Yup.string().required('yup.offset.validationUnitTypeRequired'),
        }),
        unitCreationYear: Yup.date()
          .typeError('yup.offset.validationUnitCreationYearError')
          .required('yup.offset.validationUnitCreationYearRequired'),
        auditUnit: Yup.object().shape({
          existingOffsetAuditUnitId: Yup.string().required(
            'yup.offset.validationAuditUnitRequired',
          ),
        }),
      }),
    ),
  });
};
