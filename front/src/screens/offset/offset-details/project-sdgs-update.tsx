import { OffsetFormikTypes } from '@custom-types/offset-types';
import { useTranslation } from 'react-i18next';
import { offsetDetailsStore } from '@store/offset-store';
import { useFormikContext } from 'formik';
import { observer } from 'mobx-react';
import { Inplace, InplaceContent, InplaceDisplay } from 'primereact/inplace';
import { FC } from 'react';
import { Image } from 'primereact/image';
import { SelectFilterOption } from '@custom-types/data-form-store';
import { MultiSelect } from '@components/form/multiselect';
import { rootStore } from '@store/root-store';

export const ProjectSDGsUpdate: FC<{ edit: boolean; setEdit: (edit: boolean) => void }> = observer(
  ({ edit, setEdit }) => {
    const { t } = useTranslation();
    const { values, errors, handleChange, handleBlur, touched } =
      useFormikContext<OffsetFormikTypes>();
    const DisplaySDGs = () => {
      return (
        <div className="flex car-sdg-container">
          {offsetDetails?.project.sustainableDevelopmentGoals.map((elem) => (
            <Image
              key={Math.random()}
              src={elem.imageUri}
              alt="Logo"
              height="50px"
              className=" mr-2"
            />
          ))}
        </div>
      );
    };
    const itemTemplate = (option: SelectFilterOption) => {
      return (
        <div className="flex align-items-center">
          <img src={option.imageUrl} alt="Logo" style={{ width: '30px', height: '30px' }} />
          <span className="ml-2">{option.label}</span>
        </div>
      );
    };
    const { offsetDetails } = offsetDetailsStore;
    const { formData } = rootStore.dataFormStore;
    return (
      <div className="sdg_goals p-scrollpanel p-component">
        <h5>{t('project.sdgGoals')}</h5>
        <Inplace active={edit} onToggle={(e) => setEdit(e.value)} disabled={!edit}>
          <InplaceDisplay>
            <DisplaySDGs />
          </InplaceDisplay>
          <InplaceContent>
            <li className="flex align-items-center flex-wrap inplace-wrapper">
              <div className="text-500 w-6 md:w-3 md:mb-2 font-medium">SDG goals</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                <MultiSelect
                  id="sustainableDevelopmentGoalIds"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  itemTemplate={itemTemplate}
                  errors={t(errors.sustainableDevelopmentGoalIds ?? '')}
                  touched={touched.sustainableDevelopmentGoalIds}
                  filter
                  values={values.sustainableDevelopmentGoalIds}
                  options={formData.devGoals}
                />
              </div>
            </li>
          </InplaceContent>
        </Inplace>
      </div>
    );
  },
);
