import { Calendar } from '@components/form/calendar';
import { Dropdown } from '@components/form/dropdown';
import { InputNumber } from '@components/form/input-number';
import { MultiSelect } from '@components/form/multiselect';
import { SelectFilterOption } from '@custom-types/data-form-store';
import { rootStore } from '@store/root-store';
import { CalendarChangeParams } from 'primereact/calendar';
import { DropdownChangeParams } from 'primereact/dropdown';
import { InputNumberChangeParams } from 'primereact/inputnumber';
import { useTranslation } from 'react-i18next';

export const FilterTransactionLogs = () => {
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
        <MultiSelect
          id="sdgIds"
          label={t('filter.sustainableDevelopmentGoalsLabel')}
          values={filter.sdgIds}
          options={formData.devGoals}
          onChange={(e: DropdownChangeParams) =>
            setFilter(e.target.value as string, 'default', 'sdgIds')
          }
          optionLabel="label"
          required={false}
          itemTemplate={itemTemplate}
          placeholder={t('filter.sustainableDevelopmentGoalsPlaceholder')}
        />
        <Dropdown
          id="auditUnitIds"
          label={t('filter.auditUnitLabel')}
          placeholder={t('filter.auditUnitPlaceholder')}
          values={filter.auditUnitIds}
          options={formData.auditUnits}
          required={false}
          onChange={(e: DropdownChangeParams) =>
            setFilter(e.target.value as string, 'default', 'auditUnitIds')
          }
          optionLabel="label"
          showClear
        />
        <Dropdown
          id="unitTypeIds"
          label={t('filter.unitTypeLabel')}
          placeholder={t('filter.unitTypePlaceholder')}
          values={filter.unitTypeIds}
          options={formData.auditUnits}
          required={false}
          onChange={(e: DropdownChangeParams) =>
            setFilter(e.target.value as string, 'default', 'unitTypeIds')
          }
          optionLabel="label"
          showClear
        />
        <Dropdown
          id="projectStandardIds"
          label={t('filter.projectStandardLabel')}
          placeholder={t('filter.projectStandardPlaceholder')}
          values={filter.projectStandardIds}
          required={false}
          options={formData.standards}
          onChange={(e: DropdownChangeParams) =>
            setFilter(e.target.value as string, 'default', 'projectStandardIds')
          }
          optionLabel="label"
          showClear
        />
        <Dropdown
          id="countryIds"
          label={t('filter.countryLabel')}
          placeholder={t('filter.countryPlaceholder')}
          values={filter.countryIds}
          options={formData.countries}
          required={false}
          onChange={(e: DropdownChangeParams) =>
            setFilter(e.target.value as string, 'default', 'countryIds')
          }
          optionLabel="label"
          showClear
        />
        <Calendar
          label={t('filter.unitGenerationTime')}
          id="creationDateFrom"
          required={false}
          values={date.creationDateFrom}
          onChange={(e: CalendarChangeParams) =>
            setFilter(e.target.value as string, 'data', 'creationDateFrom', 'creationDateTo')
          }
          selectionMode="range"
        />
        <div className="flex">
          <InputNumber
            id="totalUnitCountFrom"
            label={t('input.unitCountMin')}
            col="col-6"
            required={false}
            values={filter.totalUnitCountFrom}
            onChange={(e: InputNumberChangeParams) =>
              setFilter(e.value as unknown as string, 'count', 'totalUnitCountFrom')
            }
          />
          <InputNumber
            id="totalUnitCountTo"
            label={t('input.unitCountMax')}
            col="col-6"
            required={false}
            values={filter.totalUnitCountTo}
            onChange={(e: InputNumberChangeParams) =>
              setFilter(e.value as unknown as string, 'count', 'totalUnitCountTo')
            }
          />
        </div>
      </div>
    </div>
  );
};
