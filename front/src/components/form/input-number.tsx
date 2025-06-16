import { FC } from 'react';

import { FormikValues } from 'formik';
import { InputNumber as PrimeReactInputNumber } from 'primereact/inputnumber';

import { FormErrors } from '@components/form-errors/form-errors';

interface InputNumberProps extends FormikValues {
  id: string;
  label?: string;
  col?: string;
  mt?: string;
  required?: boolean;
}

export const InputNumber: FC<InputNumberProps> = ({
  label,
  col = 'col-12',
  mt,
  id,
  required = true,
  errors,
  touched,
  values,
  onChange,
  onBlur,
  min,
  max,
}) => {
  return (
    <div className={`field ${col} ${mt}`}>
      <span className="p-float-label">
        <PrimeReactInputNumber
          id={id}
          name={id}
          value={values}
          onValueChange={onChange}
          onBlur={onBlur}
          className={touched && errors ? 'p-invalid mr-2' : undefined}
          showButtons
          min={min ?? 0}
          max={max}
        />
        {label && (
          <label htmlFor={id}>
            {label}
            {required && '*'}
          </label>
        )}
      </span>
      {touched && errors && <FormErrors messages={[errors]} />}
    </div>
  );
};
