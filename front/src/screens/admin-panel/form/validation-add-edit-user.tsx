import * as Yup from 'yup';

export const ValidationAddEditSchema = () => {
  return Yup.object().shape({
    firstName: Yup.string().required('yup.register.firstNameRequiredErrorMessage'),
    lastName: Yup.string().required('yup.register.lastNameRequiredErrorMessage'),
    email: Yup.string().email('yup.auth.invalidEmail').required('yup.auth.emailRequired'),
    phone: Yup.string().required('yup.register.phoneNumberRequiredErrorMessage'),
  });
};
