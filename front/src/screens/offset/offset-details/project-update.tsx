import { Calendar } from '@components/form/calendar';
import { Dropdown } from '@components/form/dropdown';
import { useTranslation } from 'react-i18next';
import { InplaceWrapper } from '@components/form/inplace-wrapper';
import { Input } from '@components/form/input';
import { InputTextarea } from '@components/form/input-textarea';
import { OffsetFormikTypes } from '@custom-types/offset-types';
import { offsetDetailsStore } from '@store/offset-store';
import { rootStore } from '@store/root-store';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import { observer } from 'mobx-react';
import { ScrollPanel } from 'primereact/scrollpanel';
import { ScrollTop } from 'primereact/scrolltop';
import { FC } from 'react';

export const ProjectUpdate: FC<{
  edit: boolean;
  setEdit: (edit: boolean) => void;
}> = observer(({ edit, setEdit }) => {
  const { t } = useTranslation();
  const { values, errors, handleChange, handleBlur, touched } =
    useFormikContext<OffsetFormikTypes>();
  const { offsetDetails } = offsetDetailsStore;
  const { formData } = rootStore.dataFormStore;
  const formatDate = (formatingDate: string | undefined) =>
    dayjs(formatingDate).format('DD-MM-YYYY');
  const formatToYear = (formatingDate: string | undefined) => dayjs(formatingDate).format('YYYY');
  return (
    <ScrollPanel style={{ maxHeight: '1090px', height: '100%' }} className="offset-update">
      <h5>{t('project.details')}</h5>

      <InplaceWrapper
        title={t('offset.name')}
        edit={edit}
        setEdit={setEdit}
        message={offsetDetails?.project.name}
      >
        <Input
          mt
          id="name"
          values={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={t(errors.name ?? '')}
          touched={touched.name}
        />
      </InplaceWrapper>
      <InplaceWrapper
        title={t('offset.description')}
        edit={edit}
        setEdit={setEdit}
        message={offsetDetails?.project.description}
      >
        <InputTextarea
          mt
          id="description"
          values={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={t(errors.description ?? '')}
          touched={touched.description}
        />
      </InplaceWrapper>
      <InplaceWrapper
        title={t('offset.address')}
        edit={edit}
        setEdit={setEdit}
        message={offsetDetails?.project.address}
      >
        <Input
          mt
          id="address"
          values={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={t(errors.address ?? '')}
          touched={touched.address}
        />
      </InplaceWrapper>
      <InplaceWrapper
        title={t('offset.country')}
        edit={edit}
        setEdit={setEdit}
        message={offsetDetails?.project.country.alpha3Code}
      >
        <Dropdown
          mt
          id="countryId"
          options={formData.countries}
          values={values.countryId}
          onBlur={handleBlur}
          onChange={handleChange}
          errors={t(errors.countryId ?? '')}
          touched={touched.countryId}
        />
      </InplaceWrapper>
      <h5>{t('project.standard')}</h5>
      <InplaceWrapper
        title={t('project.standard')}
        edit={edit}
        setEdit={setEdit}
        message={offsetDetails?.project.projectStandard.name}
      >
        <Dropdown
          mt
          id="projectStandard"
          options={formData.standards}
          values={values.projectStandard}
          onBlur={handleBlur}
          onChange={handleChange}
          errors={t(errors.projectStandard ?? '')}
          touched={touched.projectStandard}
        />
      </InplaceWrapper>
      <InplaceWrapper
        title={t('project.circularity')}
        edit={edit}
        setEdit={setEdit}
        message={offsetDetails?.project.circularity}
      >
        <InputTextarea
          mt
          id="circularity"
          values={values.circularity}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={t(errors.circularity ?? '')}
          touched={touched.circularity}
        />
      </InplaceWrapper>
      <h5>{t('project.dates')}</h5>
      <InplaceWrapper
        title={t('project.startDate')}
        edit={edit}
        setEdit={setEdit}
        message={formatDate(offsetDetails?.project.startDate)}
      >
        <Calendar
          mt
          id="startDate"
          values={values.startDate}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={t(errors.startDate ?? '')}
          touched={touched.startDate}
        />
      </InplaceWrapper>
      <InplaceWrapper
        title={t('project.expectedEndDate')}
        edit={edit}
        setEdit={setEdit}
        message={formatDate(offsetDetails?.project.expectedEndDate)}
      >
        <Calendar
          mt
          id="expectedEndDate"
          values={values.expectedEndDate}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={t(errors.expectedEndDate ?? '')}
          touched={touched.expectedEndDate}
        />
      </InplaceWrapper>
      <InplaceWrapper
        title={t('project.unitGeneration')}
        edit={edit}
        setEdit={setEdit}
        message={`${formatToYear(offsetDetails?.project.unitGenerationStartDate)} -
          ${formatToYear(offsetDetails?.project.unitGenerationEndDate)}`}
      >
        <Calendar
          mt
          selectionMode="range"
          id="unitGenerationDate"
          values={values.unitGenerationDate}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={t(errors.unitGenerationDate ?? '')}
          touched={touched.unitGenerationDate}
          view="year"
          dateFormat="yy"
        />
      </InplaceWrapper>
      <ScrollTop
        target="parent"
        className="custom-scrolltop"
        threshold={100}
        icon="pi pi-arrow-up"
      />
    </ScrollPanel>
  );
});
