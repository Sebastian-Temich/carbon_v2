import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar } from '@components/form/calendar';
import { Dropdown } from '@components/form/dropdown';
import { InplaceWrapper } from '@components/form/inplace-wrapper';
import { Inplace, InplaceContent } from 'primereact/inplace';
import { Input } from '@components/form/input';
import { InputTextarea } from '@components/form/input-textarea';
import { OffsetFormikTypes } from '@custom-types/offset-types';
import { ImgFileTypes } from '@custom-types/img-types';
import { offsetDetailsStore } from '@store/offset-store';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import { observer } from 'mobx-react';
import { ScrollPanel } from 'primereact/scrollpanel';
import { ScrollTop } from 'primereact/scrolltop';
import { rootStore } from '@store/root-store';
import ImgUpload from '../img-upload/img-upload';

export const OffsetUpdate: FC<{
  edit: boolean;
  setEdit: (edit: boolean) => void;
  setImageFile: (imageFile: ImgFileTypes | null) => void;
}> = observer(({ edit, setEdit, setImageFile }) => {
  const { t } = useTranslation();
  const { values, errors, handleChange, handleBlur, touched } =
    useFormikContext<OffsetFormikTypes>();
  const { offsetDetails } = offsetDetailsStore;
  const { formData } = rootStore.dataFormStore;
  const formatDate = (formatingDate: string | undefined) =>
    dayjs(formatingDate).format('DD-MM-YYYY');
  const formatToYear = (formatingDate: string | undefined) => dayjs(formatingDate).format('YYYY');

  return (
    <ScrollPanel style={{ height: '420px' }} className="offset-update">
      <Inplace active={edit} onToggle={(e) => setEdit(e.value)} disabled={!edit}>
        <InplaceContent>
          <ImgUpload setImageFile={setImageFile} />
        </InplaceContent>
      </Inplace>
      <InplaceWrapper
        title={t('offset.description')}
        edit={edit}
        setEdit={setEdit}
        message={offsetDetails?.shortDescription}
      >
        <InputTextarea
          mt
          id="shortDescription"
          values={values.shortDescription}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={t(errors.shortDescription ?? '')}
          touched={touched.shortDescription}
        />
      </InplaceWrapper>
      <InplaceWrapper
        title={t('offset.auditUnit')}
        edit={edit}
        setEdit={setEdit}
        message={offsetDetails?.auditUnit.name}
      >
        <Dropdown
          mt
          id="auditUnit"
          onBlur={handleBlur}
          options={formData.auditUnits}
          values={values.auditUnit}
          onChange={handleChange}
          errors={t(errors.auditUnit ?? '')}
          touched={touched.auditUnit}
        />
      </InplaceWrapper>
      <InplaceWrapper
        title={t('offset.unitType')}
        edit={edit}
        setEdit={setEdit}
        message={offsetDetails?.unitType.name}
      >
        <Dropdown
          mt
          id="unitType"
          options={formData.unitTypes}
          values={values.unitType}
          onBlur={handleBlur}
          onChange={handleChange}
          errors={t(errors.unitType ?? '')}
          touched={touched.unitType}
        />
      </InplaceWrapper>
      <InplaceWrapper
        title={t('offset.unitCreationYear')}
        edit={edit}
        setEdit={setEdit}
        message={formatToYear(offsetDetails?.unitCreationYear)}
      >
        <Calendar
          mt
          id="unitCreationYear"
          values={values.unitCreationYear}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={t(errors.unitCreationYear ?? '')}
          touched={touched.unitCreationYear}
          view="year"
          dateFormat="yy"
        />
      </InplaceWrapper>
      <InplaceWrapper
        title={t('investorwallet.unitPrice')}
        edit={edit}
        setEdit={setEdit}
        message={offsetDetails?.unitCount}
      >
        <div className="flex">
          <Input
            type="number"
            values={values.unitPrice as number}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={t(errors.unitPrice ?? '')}
            touched={touched.unitPrice}
            col="col-6"
            mt
            id="unitPrice"
          />
          <Dropdown
            options={formData.currencies}
            values={values.currencyId}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={t(errors.currencyId ?? '')}
            touched={touched.currencyId}
            mt
            col="col-6"
            id="currencyId"
          />
        </div>
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
