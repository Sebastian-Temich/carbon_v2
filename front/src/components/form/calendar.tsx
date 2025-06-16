import React, { FC, useState } from 'react';

import { FormikValues } from 'formik';
import { Calendar as PrimeReactCalendar } from 'primereact/calendar';

import { FormErrors } from '@components/form-errors/form-errors';

interface CalendarProps extends FormikValues {
  id: string;
  label?: string;
  col?: string;
}

export const Calendar: FC<CalendarProps> = ({
  label,
  col = 'col-12',
  mt = 'mt-2',
  id,
  errors,
  required = 'true',
  touched,
  values,
  onChange,
  dateFormat,
  onBlur,
  selectionMode,
  view,
}) => {
  const [classOnHide, setClassOnHide] = useState<boolean>(false);
  const errorVisible = classOnHide && touched && errors;
  return (
    <div className={`field ${col} ${mt}`}>
      <span className="p-float-label">
        <PrimeReactCalendar
          inputId={id}
          name={id}
          dateFormat={dateFormat}
          view={view}
          value={values}
          onHide={() => setClassOnHide(true)}
          onChange={onChange}
          onBlur={onBlur}
          selectionMode={selectionMode}
          className={errorVisible ? 'p-invalid mr-2' : undefined}
        />
        {label && (
          <label htmlFor={id} className={errorVisible ? 'p-error mr-2' : undefined}>
            {label}
            {required && '*'}
          </label>
        )}
      </span>
      {errorVisible && <FormErrors messages={[errors]} />}
    </div>
  );
};
