import React, { FC } from 'react';

import { FormikValues } from 'formik';
import { Checkbox as PrimeReactCheckbox } from 'primereact/checkbox';

interface ChceckboxProps extends FormikValues {
  id: string;
  label: string;
  col?: string;
}

export const Checkbox: FC<ChceckboxProps> = ({
  label,
  col = 'col-12',
  id,
  errors,
  touched,
  values,
  onChange,
}) => {
  return (
    <div className={`field-checkbox m-0 ${col}`}>
      <PrimeReactCheckbox
        inputId={id}
        name={id}
        checked={values}
        onChange={onChange}
        className={touched && errors ? 'p-invalid mr-2' : undefined}
      />
      <label htmlFor={id} className={touched && errors ? 'p-error mr-2' : undefined}>
        {label}*
      </label>
    </div>
  );
};
