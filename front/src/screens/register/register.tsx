import { FieldArray, Form, Formik, getIn } from 'formik';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { register } from '@api/register-api';
import { Checkbox } from '@components/form/checkbox';
import { Input } from '@components/form/input';
import { InputMask } from '@components/form/input-mask';
import { modalStore } from '@store/modal-store';
import { ModalTypes } from '@variables/modal-variables';

import { ValidationRegisterSchema } from './validation-register-schema';

export const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const initialValues = {
    company: {
      representatives: [''],
      address: {
        street: '',
        city: '',
        postalCode: '',
      },
      NIP: '',
      REGON: '',
      KRS: '',
      name: '',
    },
    firstName: '',
    lastName: '',
    email: '',
    identityCardNumber: '',
    phoneNumber: '',
    accept: false,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationRegisterSchema}
      onSubmit={async (values, { setErrors }) => {
        const { company, email, identityCardNumber, phoneNumber, firstName, lastName } = values;
        const { representatives, address, NIP, REGON, KRS, name } = company;
        const { street, city, postalCode } = address;

        const payload = {
          company: {
            representatives,
            address: {
              street,
              city,
              postalCode,
            },
            NIP,
            REGON,
            KRS,
            name,
          },
          email,
          firstName,
          lastName,
          identityCardNumber,
          phoneNumber,
        };

        const response = await register(payload);
        if (response.isSuccessful()) {
          navigate('/login');
          modalStore.push({
            title: 'User Created',
            content: `we sent an email to ${email}`,
            type: ModalTypes.Info,
          });
        } else if (response.isValidationError()) {
          setErrors(response.validationErrors!);
        }
      }}
    >
      {({ values, touched, errors, handleChange, handleBlur }) => (
        <div className="py-8">
          <div className="card sm:col-10 mx-auto">
            <h4 className="text-center">Register</h4>
            <Form>
              <div className="flex flex-column md:flex-row p-fluid justify-content-between align-items-center md:align-items-start">
                <div className="col-12 md:col-6 grid formgrid">
                  <h6 className="col-12 text-center">Company details</h6>

                  <Input
                    id="company.name"
                    label={t('register.companyNameLabel')}
                    values={values.company.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={t(errors.company?.name ?? '')}
                    touched={touched.company?.name}
                  />

                  <Input
                    id="company.NIP"
                    label={t('register.nipLabel')}
                    values={values.company.NIP}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={t(errors.company?.NIP ?? '')}
                    touched={touched.company?.NIP}
                  />

                  <Input
                    id="company.REGON"
                    label={t('register.regonLabel')}
                    values={values.company?.REGON}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={t(errors.company?.REGON ?? '')}
                    touched={touched.company?.REGON}
                  />

                  <Input
                    id="company.KRS"
                    label={t('register.krsLabel')}
                    values={values.company.KRS}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={t(errors.company?.KRS ?? '')}
                    touched={touched.company?.KRS}
                  />

                  <Input
                    id="company.address.street"
                    label={t('register.streetLabel')}
                    values={values.company.address.street}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={t(errors.company?.address?.street ?? '')}
                    touched={touched.company?.address?.street}
                    col="col-12"
                  />

                  <Input
                    id="company.address.city"
                    label={t('register.cityLabel')}
                    values={values.company.address.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={t(errors.company?.address?.city ?? '')}
                    touched={touched.company?.address?.city}
                    col="col-12 lg:col-6"
                  />

                  <InputMask
                    id="company.address.postalCode"
                    label={t('register.postalCodeLabel')}
                    place
                    values={values.company.address.postalCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={t(errors.company?.address?.postalCode ?? '')}
                    touched={touched.company?.address?.postalCode}
                    col="col-12 lg:col-6"
                  />
                  <div className="col-12 flex">
                    <FieldArray
                      name="company.representatives"
                      render={({ remove, push }) => (
                        <div className="w-full">
                          {values.company.representatives.length > 1 && (
                            <h5 className="text-center">Representatives</h5>
                          )}
                          {values.company.representatives.map((representative, index) => {
                            const name = `company.representatives[${index}]`;
                            return (
                              <div
                                key={name}
                                className="p-fluid grid formgrid justify-content-between"
                              >
                                <Input
                                  id={name}
                                  label="Representatives"
                                  values={representative}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  errors={t(getIn(errors, name) ?? '')}
                                  touched={getIn(touched, name)}
                                  col="col-8"
                                />

                                <div className="flex col-4 justify-content-end mt-2">
                                  <div className="field mr-1 lg:mr-2">
                                    <Button
                                      type="button"
                                      icon="pi pi-plus"
                                      onClick={() => {
                                        push('');
                                      }}
                                    />
                                  </div>

                                  <div className="field">
                                    <Button
                                      disabled={values.company.representatives.length <= 1}
                                      icon="pi pi-times"
                                      type="button"
                                      onClick={() => remove(index)}
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="col-12 md:col-6 p-fluid grid formgrid align-content-start">
                  <h6 className="col-12 text-center">Person details</h6>
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
                    id="identityCardNumber"
                    label={t('register.identityCardNumberLabel')}
                    values={values.identityCardNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={t(errors.identityCardNumber ?? '')}
                    touched={touched.identityCardNumber}
                  />
                  <Input
                    id="phoneNumber"
                    label={t('register.phoneNumberLabel')}
                    values={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={t(errors.phoneNumber ?? '')}
                    touched={touched.phoneNumber}
                  />
                </div>
              </div>
              <div
                className="col-12 px-3 md:px-2 flex flex-column sm:flex-row justify-content-between"
                style={{ alignItems: 'center' }}
              >
                <Checkbox
                  id="accept"
                  values={values.accept}
                  onChange={handleChange}
                  errors={t(errors.accept ?? '')}
                  touched={touched.accept}
                  label={t('register.acceptTermsLabel')}
                  col="col-auto"
                />
                <Button
                  type="submit"
                  label={t('register.registerButtonLabel')}
                  className="mt-4 sm:mt-0 w-full sm:w-auto"
                />
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};
