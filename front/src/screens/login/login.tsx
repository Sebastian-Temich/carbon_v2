import { useFormik } from 'formik';
import { observer } from 'mobx-react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Input } from '@components/form/input';
import { useAuthContext } from '@context/auth-context';
import { useForgetPasswordModal } from '@hooks/forget-passoword-hook';
import LanguageSwitch from '@i18n/language-switch';

import { ValidationLoginSchema } from './validation-login-schema';

export const Login = () => {
  const { t } = useTranslation();
  const { onResetPassword } = useForgetPasswordModal();
  const navigate = useNavigate();
  const { logIn } = useAuthContext();
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: ValidationLoginSchema,
    onSubmit: async () => {
      await logIn(values);
    },
  });
  return (
    <div className="login-body">
      <div className="login-panel" />
      <div className="login-content">
        <div>
          <h1>
            <span>{t('register.signIn')}</span> {t('register.toCarbon')}
          </h1>
          <p>{t('register.welcome')}</p>
          <form onSubmit={handleSubmit} className="p-fluid grid formgrid login-input-wrapper">
            <Input
              id="email"
              label={t('register.emailLabel')}
              values={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={t(errors.email ?? '')}
              touched={touched.email}
              required={false}
            />
            <Input
              id="password"
              type="password"
              label={t('register.passwordLabel')}
              values={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={t(errors.password ?? '')}
              touched={touched.password}
              required={false}
            />
            <div className="ml-auto forget-password">
              <span className="cursor-pointer" onClick={onResetPassword}>
                <p>{t('register.forgotPassword')}</p>
              </span>
            </div>
            <div className="button-wrapper col-12">
              <Button type="submit" label={t('register.signIn')} />
              <p>{t('register.or')}</p>
              <Button
                className="p-button-secondary"
                label={t('register.registerButtonLabel')}
                onClick={() => {
                  navigate('/register');
                }}
              />
            </div>
          </form>
        </div>
        <LanguageSwitch />
      </div>
    </div>
  );
};

export default observer(Login);
