import * as Yup from 'yup';

export const ValidationLoginSchema = () => {
  return Yup.object().shape({
    email: Yup.string().required('yup.auth.emailRequired'),
    password: Yup.string().required('yup.auth.passwordRequired'),
  });
};
