import { FC } from 'react';

import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';

import { Input } from '@components/form/input';
import { modalStore } from '@store/modal-store';
import { ModalTypes } from '@variables/modal-variables';

import { observer } from 'mobx-react';
import { PostModeratorProps } from '@custom-types/moderator-types';
import { rootStore } from '@store/root-store';
import { ValidationAddEditSchema } from './validation-add-edit-user';

export const AddEditModerators: FC<{
  moderator: PostModeratorProps;
  setOpenAdminDialog: (value: boolean) => void;
  setRefresh: (data: {}) => void;
  onCloseDialog: () => void;
}> = observer(({ setRefresh, setOpenAdminDialog, onCloseDialog, moderator }) => {
  const { t } = useTranslation();
  const { updateModerator, addModerator, fetchModerators } = rootStore.moderatorsStore;
  const { errors, touched, resetForm, handleChange, handleSubmit, handleBlur, values, setErrors } =
    useFormik({
      initialValues: {
        firstName: moderator.firstName,
        lastName: moderator.lastName,
        email: moderator.email,
        phone: moderator.moderator?.phoneNumber,
      },
      enableReinitialize: true,
      validationSchema: ValidationAddEditSchema,
      onSubmit: async () => {
        const { firstName, lastName, email, phone } = values;
        const payload = {
          firstName: firstName === moderator.firstName ? undefined : firstName,
          lastName: lastName === moderator.lastName ? undefined : lastName,
          email: email === moderator.email ? undefined : email,
          phone: phone === moderator.moderator?.phoneNumber ? undefined : phone,
        };
        if (moderator.id) {
          const response = await updateModerator(moderator.id, payload);
          if (response.isSuccessful()) {
            setOpenAdminDialog(false);
            setRefresh({});
            fetchModerators();
            modalStore.push({
              title: t('moderator.updatedTitle'),
              content: t('moderator.updatedContent', { firstName, lastName }),
              type: ModalTypes.Info,
            });
          } else if (response.isValidationError()) {
            setErrors(response.validationErrors!);
          }
        } else {
          const response = await addModerator(payload);
          if (response.isSuccessful()) {
            setOpenAdminDialog(false);
            modalStore.push({
              title: t('moderator.createdTitle'),
              content: t('moderator.createdContent', { firstName, lastName }),
              type: ModalTypes.Info,
            });
          } else if (response.isValidationError()) {
            setErrors(response.validationErrors!);
          }
        }
      },
    });

  return (
    <form onSubmit={handleSubmit} className="p-fluid grid formgrid add-edit-user m-4">
      <Input
        id="firstName"
        label={t('register.firstNameLabel')}
        values={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={t(errors.firstName ?? '')}
        touched={touched.firstName}
      />
      <Input
        id="lastName"
        label={t('register.lastNameLabel')}
        values={values.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={t(errors.lastName ?? '')}
        touched={touched.lastName}
      />
      <Input
        id="email"
        label={t('register.emailLabel')}
        values={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={t(errors.email ?? '')}
        touched={touched.email}
      />
      <Input
        id="phone"
        label={t('register.phoneNumberLabel')}
        values={values.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={t(errors.phone ?? '')}
        touched={touched.phone}
      />
      <div className="button-wrapper-inline col-12">
        <div className="field">
          <Button
            type="submit"
            label={t('button.submit')}
            icon="pi pi-check"
            className="mr-2 mb-2"
          />
        </div>
        <div className="field">
          <Button
            type="button"
            label={t('button.dismiss')}
            onClick={() => {
              resetForm();
              onCloseDialog();
            }}
            icon="pi pi-check"
            className="p-button-secondary"
          />
        </div>
      </div>
    </form>
  );
});
