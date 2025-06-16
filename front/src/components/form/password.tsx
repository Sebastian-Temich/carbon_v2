import { FC } from 'react';

import { FormikValues } from 'formik';
import { Password as PrimeReactPassword } from 'primereact/password';

import { FormErrors } from '@components/form-errors/form-errors';

interface InputProps extends FormikValues {
  id: string;
  label: string;
  col?: string;
  required?: boolean;
}

export const Password: FC<InputProps> = ({
  label,
  col = 'col-12',
  id,
  required = true,
  errors,
  touched,
  values,
  onChange,
  onBlur,
}) => {
  return (
    <div className={`field ${col} mt-2`}>
      <span className="p-float-label">
        <PrimeReactPassword
          id={id}
          name={id}
          feedback={false}
          value={values}
          onChange={onChange}
          onBlur={onBlur}
          className={touched && errors ? 'p-invalid mr-2' : undefined}
        />
        <label htmlFor={id}>
          {label}
          {required && '*'}
        </label>
      </span>
      {touched && errors && <FormErrors messages={[errors]} />}
    </div>
  );
};
