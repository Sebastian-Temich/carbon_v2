import { FC } from 'react';

import { FormikValues } from 'formik';
import { Dropdown as PrimeReactDropdown } from 'primereact/dropdown';

import { FormErrors } from '@components/form-errors/form-errors';

interface DropdownProps extends FormikValues {
  id: string;
  label?: string;
  col?: string;
  required?: boolean;
}

export const Dropdown: FC<DropdownProps> = ({
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
  showClear,
}) => {
  return (
    <div className={`field ${col} ${mt}`}>
      <span className="p-float-label">
        <PrimeReactDropdown
          id={id}
          options={options}
          value={values}
          onChange={onChange}
          onBlur={onBlur}
          optionLabel={optionLabel}
          filter
          itemTemplate={itemTemplate}
          showClear={showClear}
          className={touched && errors ? 'p-invalid mr-2' : undefined}
          filterBy={filterBy}
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
