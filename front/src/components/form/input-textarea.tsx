import { FC } from 'react';

import { FormikValues } from 'formik';
import { InputTextarea as PrimeReactInputTextarea } from 'primereact/inputtextarea';

import { FormErrors } from '@components/form-errors/form-errors';

interface InputTextareaProps extends FormikValues {
  id: string;
  label?: string;
  col?: string;
  required?: boolean;
}

export const InputTextarea: FC<InputTextareaProps> = ({
  label,
  col = 'col-12',
  id,
  required = true,
  errors,
  touched,
  values,
  onChange,
  onBlur,
  rows = '2',
  cols = '30',
  mt = 'mt-2',
}) => {
  return (
    <div className={`field ${col} ${mt}`}>
      <span className="p-float-label">
        <PrimeReactInputTextarea
          id={id}
          name={id}
          value={values}
          onChange={onChange}
          onBlur={onBlur}
          className={touched && errors ? 'p-invalid mr-2' : undefined}
          rows={rows}
          cols={cols}
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
