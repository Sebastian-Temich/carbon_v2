import { useFormik } from 'formik';
import { observer } from 'mobx-react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import { forgotPassword } from '@api/forgot-password-api';
import { FormErrors } from '@components/form-errors/form-errors';
import { ModalContentElementProps } from '@components/modal-provider/modal-provider';
import { modalStore } from '@store/modal-store';
import { ModalTypes } from '@variables/modal-variables';

export const ValidationForgetPasswordSchema = () => {
  return Yup.object().shape({
    email: Yup.string().email('yup.auth.invalidEmail').required('yup.auth.emailRequired'),
  });
};

const CreateResetPasswordForm = observer(({ closeModal = () => {} }: ModalContentElementProps) => {
  const { t } = useTranslation();
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ValidationForgetPasswordSchema,
    onSubmit: async () => {
      const payload = {
        email: values.email,
      };
      const response = await forgotPassword(payload);
      if (response) {
        modalStore.push({
          title: t('modal.passwordChangeModalTitle'),
          content: t('modal.passwordChangeModalContent'),
          type: ModalTypes.Info,
        });
      }

      closeModal();
    },
  });
  return (
    <form onSubmit={handleSubmit} className="col-12 mb-1 ml-1">
      <div className="col-12 input-wrapper">
        <InputText
          data-testid="email"
          id="email"
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          className={touched.email && errors.email ? 'p-invalid mr-2' : undefined}
          value={values.email}
        />
        {touched.email && errors.email && <FormErrors messages={[t(String(errors.email))]} />}
      </div>
      <div className="col-12 button-wrapper-inline">
        <Button type="submit" className="p-button-text mb-2">
          {t('button.reset')}
        </Button>
        <Button className="p-button-danger p-button-text mb-2" onClick={closeModal}>
          {t('button.cancel')}
        </Button>
      </div>
    </form>
  );
});
export const useForgetPasswordModal = () => {
  const { t } = useTranslation();
  const onResetPassword = () => {
    const mainTitle = t('resetPassword.mainTitle');

    modalStore.push({
      title: mainTitle,
      width: '300px',
      content: <CreateResetPasswordForm />,
      type: ModalTypes.CustomContent,
    });
  };

  return { onResetPassword };
};
