import * as Yup from 'yup';

import {
  identityCardNumberRegExp,
  krsRegExp,
  nipRegExp,
  phoneRegExp,
  regonRegExp,
} from '@variables/validation-regex';

export const ValidationRegisterSchema = () => {
  return Yup.object().shape({
    company: Yup.object().shape({
      address: Yup.object({
        street: Yup.string().required('yup.register.company.address.streetRequiredErrorMessage'),
        city: Yup.string().required('yup.register.company.address.cityRequiredErrorMessage'),
        postalCode: Yup.string().required(
          'yup.register.company.address.postalCodeRequiredErrorMessage',
        ),
      }),
      NIP: Yup.string()
        .matches(nipRegExp, 'yup.register.company.nipInvalidErrorMessage')
        .required('yup.register.company.nipRequiredErrorMessage'),
      KRS: Yup.string()
        .matches(krsRegExp, 'yup.register.company.krsInvalidErrorMessage')
        .required('yup.register.company.krsRequiredErrorMessage'),
      REGON: Yup.string()
        .matches(regonRegExp, 'yup.register.company.regonInvalidErrorMessage')
        .required('yup.register.company.regonRequiredErrorMessage'),
      representatives: Yup.array()
        .of(Yup.string().required('yup.register.company.representativeRequiredErrorMessage'))
        .required('yup.register.company.representativesRequiredErrorMessage'),
      name: Yup.string().required('yup.register.company.nameRequiredErrorMessage'),
    }),
    email: Yup.string()
      .email('yup.register.emailInvalidErrorMessage')
      .required('yup.register.emailRequiredErrorMessage'),
    firstName: Yup.string().required('yup.register.firstNameRequiredErrorMessage'),
    lastName: Yup.string().required('yup.register.lastNameRequiredErrorMessage'),
    accept: Yup.boolean()
      .oneOf([true], 'yup.register.acceptInvalidErrorMessage')
      .required('yup.register.acceptRequiredErrorMessage'),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, 'yup.register.phoneNumberInvalidErrorMessage')
      .required('yup.register.phoneNumberRequiredErrorMessage'),
    identityCardNumber: Yup.string()
      .matches(identityCardNumberRegExp, 'yup.register.identityCardNumberInvalidErrorMessage')
      .required('yup.register.identityCardNumberRequiredErrorMessage'),
  });
};
