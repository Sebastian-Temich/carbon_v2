import { FC, useState } from 'react';

import { FormikValues } from 'formik';
import { MultiSelect as PrimeReactMultiselect } from 'primereact/multiselect';

import { FormErrors } from '@components/form-errors/form-errors';

interface MultiSelectProps extends FormikValues {
  id: string;
  label?: string;
  col?: string;
  required?: boolean;
}

export const MultiSelect: FC<MultiSelectProps> = ({
  label,
  col = 'col-12',
  mt = 'mt-2',
  id,
  required = true,
  errors,
  touched,
  options,
  optionLabel,
  values,
  onChange,
  onBlur,
  filterBy,
  itemTemplate,
}) => {
  const [classOnHide, setClassOnHide] = useState<boolean>(false);
  const errorVisible = classOnHide && touched && errors;
  return (
    <div className={`field ${col} ${mt}`}>
      <span className="p-float-label">
        <PrimeReactMultiselect
          name={id}
          options={options}
          value={values}
          onChange={onChange}
          onBlur={onBlur}
          optionLabel={optionLabel}
          filter
          onHide={() => setClassOnHide(true)}
          itemTemplate={itemTemplate}
          showClear
          className={errorVisible ? 'p-invalid mr-2 w-full' : 'w-full'}
          filterBy={filterBy}
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
