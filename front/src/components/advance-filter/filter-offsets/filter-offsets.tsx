import { Calendar } from '@components/form/calendar';
import { Dropdown } from '@components/form/dropdown';
import { Input } from '@components/form/input';
import { InputNumber } from '@components/form/input-number';
import { MultiSelect } from '@components/form/multiselect';
import { SelectFilterOption } from '@custom-types/data-form-store';
import { rootStore } from '@store/root-store';
import { observer } from 'mobx-react';
import { CalendarChangeParams } from 'primereact/calendar';
import { DropdownChangeParams } from 'primereact/dropdown';
import { InputNumberChangeParams } from 'primereact/inputnumber';
import { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';

export const FilterOffsets = observer(() => {
  const { filter, date, setFilter } = rootStore.filterStore;
  const { formData } = rootStore.dataFormStore;
  const { t } = useTranslation();
  const itemTemplate = (option: SelectFilterOption) => {
    return (
      <div className="flex align-items-center">
        <img src={option.imageUrl} alt="Logo" style={{ width: '30px', height: '30px' }} />
        <span className="ml-2">{option.label}</span>
      </div>
    );
  };
  return (
    <div className="p-fluid grid justify-content-center">
      <div className="field col-12 mt-1">
        <Dropdown
          id="projectStandardId"
          label={t('filter.projectStandardLabel')}
          placeholder={t('filter.projectStandardPlaceholder')}
          values={filter.projectStandardId}
          required={false}
          options={formData.standards}
          onChange={(e: DropdownChangeParams) =>
            setFilter(e.target.value as string, 'default', 'projectStandardId')
          }
          optionLabel="label"
          showClear
        />
        <Dropdown
          id="auditUnitId"
          label={t('filter.auditUnitLabel')}
          placeholder={t('filter.auditUnitPlaceholder')}
          values={filter.auditUnitId}
          options={formData.auditUnits}
          required={false}
          onChange={(e: DropdownChangeParams) =>
            setFilter(e.target.value as string, 'default', 'auditUnitId')
          }
          optionLabel="label"
          showClear
        />
        <Dropdown
          id="unitTypeId"
          label={t('filter.unitTypeLabel')}
          placeholder={t('filter.unitTypePlaceholder')}
          values={filter.unitTypeId}
          options={formData.auditUnits}
          required={false}
          onChange={(e: DropdownChangeParams) =>
            setFilter(e.target.value as string, 'default', 'unitTypeId')
          }
          optionLabel="label"
          showClear
        />
        <Dropdown
          id="projectLocationCountryId"
          label={t('filter.countryLabel')}
          placeholder={t('filter.countryPlaceholder')}
          values={filter.projectLocationCountryId}
          options={formData.countries}
          required={false}
          onChange={(e: DropdownChangeParams) =>
            setFilter(e.target.value as string, 'default', 'projectLocationCountryId')
          }
          optionLabel="label"
          showClear
        />
        <MultiSelect
          id="projectSustainableDevelopmentGoalIds"
          label={t('filter.sustainableDevelopmentGoalsLabel')}
          values={filter.projectSustainableDevelopmentGoalIds}
          options={formData.devGoals}
          onChange={(e: DropdownChangeParams) =>
            setFilter(e.target.value as string, 'default', 'projectSustainableDevelopmentGoalIds')
          }
          optionLabel="label"
          required={false}
          itemTemplate={itemTemplate}
          placeholder={t('filter.sustainableDevelopmentGoalsPlaceholder')}
        />
        <MultiSelect
          id="currencyIds"
          label={t('filter.currenciesLabel')}
          values={filter.currencyIds}
          options={formData.currencies}
          onChange={(e: DropdownChangeParams) =>
            setFilter(e.target.value as string, 'default', 'currencyIds')
          }
          optionLabel="label"
          required={false}
          placeholder={t('filter.currenciesPlaceholder')}
        />
        <Calendar
          label={t('filter.unitGenerationTime')}
          id="projectUnitGenerationStartDate"
          required={false}
          values={date.projectUnitGenerationStartDate}
          onChange={(e: CalendarChangeParams) =>
            setFilter(
              e.target.value as string,
              'data',
              'projectUnitGenerationStartDate',
              'projectUnitGenerationEndDate',
            )
          }
          selectionMode="range"
        />
        <Calendar
          label={t('calendar.projectDateLabel')}
          id="projectStartDate"
          values={date.projectStartDate}
          required={false}
          onChange={(e: CalendarChangeParams) =>
            setFilter(
              e.target.value as string,
              'data',
              'projectStartDate',
              'projectExpectedEndDate',
            )
          }
          selectionMode="range"
        />
        <Calendar
          label={t('calendar.unitCreationYearLabel')}
          id="unitCreationYear"
          values={date.unitCreationYear}
          required={false}
          onChange={(e: CalendarChangeParams) =>
            setFilter(e.target.value as string, 'simpleData', 'unitCreationYear')
          }
        />
        <Input
          id="projectCircularity"
          label={t('input.projectCircularity')}
          values={filter.projectCircularity || ''}
          required={false}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFilter(e.target.value as unknown as string, 'default', 'projectCircularity')
          }
        />
        <div className="flex">
          <InputNumber
            id="unitCountMin"
            label={t('input.unitCountMin')}
            col="col-6"
            required={false}
            values={filter.unitCountMin}
            onChange={(e: InputNumberChangeParams) =>
              setFilter(e.value as unknown as string, 'count', 'unitCountMin')
            }
          />
          <InputNumber
            id="unitCountMax"
            label={t('input.unitCountMax')}
            col="col-6"
            required={false}
            values={filter.unitCountMax}
            onChange={(e: InputNumberChangeParams) =>
              setFilter(e.value as unknown as string, 'count', 'unitCountMax')
            }
          />
        </div>
        <div className="flex">
          <InputNumber
            id="unitPriceMin"
            label={t('input.unitPriceMin')}
            col="col-6"
            required={false}
            values={filter.unitPriceMin}
            onChange={(e: InputNumberChangeParams) =>
              setFilter(e.value as unknown as string, 'count', 'unitPriceMin')
            }
          />
          <InputNumber
            id="unitPriceMax"
            label={t('input.unitPriceMax')}
            col="col-6"
            required={false}
            values={filter.unitPriceMax}
            onChange={(e: InputNumberChangeParams) =>
              setFilter(e.value as unknown as string, 'count', 'unitPriceMax')
            }
          />
        </div>
      </div>
    </div>
  );
});
