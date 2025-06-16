import { MultiSelect } from '@components/form/multiselect';
import { rootStore } from '@store/root-store';
import { observer } from 'mobx-react';
import { Button } from 'primereact/button';
import { DataViewLayoutOptions, DataViewLayoutType } from 'primereact/dataview';
import { DropdownChangeParams } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { MultiStateCheckbox } from 'primereact/multistatecheckbox';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdvanceFilterMarketPlace } from '../advance-filter/advance-filter';

interface TableHeaderProps {
  setLayout?: (layout: DataViewLayoutType) => void;
  layout?: DataViewLayoutType;
  filterTransation?: boolean;
  displayMarketplaceCheckbox?: boolean;
  moderatorFilter?: boolean;
  isVisible?: boolean;
  headerRef?: React.RefObject<HTMLInputElement>;
}

export const TableHeader: FC<TableHeaderProps> = observer(
  ({ setLayout, layout, displayMarketplaceCheckbox, filterTransation, moderatorFilter, isVisible, headerRef }) => {
    const [openDialogFilter, setOpenDialogFilter] = useState(false);
    const { formData } = rootStore.dataFormStore;
    const { t } = useTranslation();
    const { filter, setFilter, filterCount } = rootStore.filterStore;
    const { fetchProjects } = rootStore.projectStore;
    const { fetchMarketplace } = rootStore.marketplaceStore;
    const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
    const windowSizeMd = innerWidth > 768 && true;

    const checkboxMarketplaceOptions = [
      { label: t('checkbox.developerOffersLabel'), icon: 'pi pi-check', value: true },
      { label: t('checkbox.otherOffersLabel'), icon: 'pi pi-times', value: false },
      { label: t('checkbox.allLabel'), icon: 'pi pi-globe', value: undefined },
    ];

    const displayCheckbox = checkboxMarketplaceOptions.filter(
      (elem) => elem.value === filter.isOwnerOriginal,
    );

    useEffect(() => {
      const handleWindowResize = () => setInnerWidth(window.innerWidth);
      window.addEventListener('resize', handleWindowResize);
      return () => window.removeEventListener('resize', handleWindowResize);
    }, []);
    return (
      <>
        <div className="filter_header">
          <div className="filter_advance" style={{ textAlign: 'left' }}>
            <div className="search_field">
              <div className="p-inputgroup">
                <Button
                  style={{ minWidth: '65px' }}
                  icon="pi pi-filter-fill"
                  badge={filterCount as unknown as string}
                  onClick={() => setOpenDialogFilter(true)}
                />
                <InputText
                  value={filterTransation ? filter.name || '' : filter.projectName || ''}
                  type="text"
                  placeholder={t('common.search')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (filterTransation) {
                        fetchProjects();
                      } else {
                        fetchMarketplace();
                      }
                    }
                  }}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (filterTransation) {
                      setFilter(e.target.value, 'default', 'name');
                    } else {
                      setFilter(e.target.value, 'default', 'projectName');
                    }
                  }}
                />
                <Button
                  label={t('common.search')}
                  onClick={() => {
                    if (filterTransation) {
                      fetchProjects();
                    } else {
                      fetchMarketplace();
                    }
                  }}
                />
              </div>
            </div>
            {displayMarketplaceCheckbox ? (
              <div className="multi_checkbox">
                <div className="field-checkbox m-0">
                  <MultiStateCheckbox
                    value={filter.isOwnerOriginal}
                    options={checkboxMarketplaceOptions}
                    optionLabel="label"
                    optionValue="value"
                    onChange={(e) => {
                      setFilter(e.value, 'default', 'isOwnerOriginal');
                      fetchMarketplace();
                    }}
                  />
                  <label>{displayCheckbox[0].label}</label>
                </div>
              </div>
            ) : null}
            {moderatorFilter && (
              <div className="select">
                <MultiSelect
                  mt="mt-3"
                  id="statusIds"
                  maxSelectedLabels={7}
                  label={t('filter.status')}
                  values={filter.statusIds}
                  options={formData.status}
                  onChange={(e: DropdownChangeParams) => {
                    setFilter(e.target.value as string, 'default', 'statusIds');
                    fetchMarketplace();
                  }}
                  optionLabel="label"
                  required={false}
                  placeholder={t('filter.statusPlaceholder')}
                />
              </div>
            )}
          </div>
          {windowSizeMd && setLayout && (
            <div className="layout_option" style={{ textAlign: 'right' }}>
              <DataViewLayoutOptions
                layout={layout}
                onChange={(e) => {
                  setLayout(e.value);
                }}
              />
            </div>
          )}
        </div>
        <AdvanceFilterMarketPlace
          filterTransation={filterTransation}
          openDialog={openDialogFilter}
          onClose={() => setOpenDialogFilter(false)}
        />
      </>
    );
  },
);
