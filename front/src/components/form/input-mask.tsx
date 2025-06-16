import { FC } from 'react';

import { FormikValues } from 'formik';
import { InputMask as PrimeReactInputMask } from 'primereact/inputmask';

import { FormErrors } from '@components/form-errors/form-errors';

interface InputProps extends FormikValues {
  id: string;
  label: string;
  col?: string;
  required?: boolean;
}

export const InputMask: FC<InputProps> = ({
  label,
  col = 'col-12',
  id,
  required = true,
  errors,
  touched,
  values,
  onChange,
  onBlur,
  mask = '99-999',
  placeholder,
}) => {
  return (
    <div className={`field ${col} mt-2`}>
      <span className="p-float-label">
        <PrimeReactInputMask
          id={id}
          name={id}
          value={values}
          onChange={onChange}
          mask={mask}
          placeholder={placeholder}
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
