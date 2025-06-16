import { useState } from 'react';

import dayjs from 'dayjs';
import { FieldArray, Form, Formik, getIn } from 'formik';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

import { postOffset } from '@api/offsets-api';
import { postProject } from '@api/project-api';

import { Calendar } from '@components/form/calendar';
import { Dropdown } from '@components/form/dropdown';
import { Input } from '@components/form/input';
import { InputTextarea } from '@components/form/input-textarea';
import { MultiSelect } from '@components/form/multiselect';

import { ImgFileTypes } from '@custom-types/img-types';
import { PostOffsetsProps } from '@custom-types/offsets-types';
import { SelectFilterOption } from '@custom-types/data-form-store';
import { InitialValuesProps, PostProjectProps } from '@custom-types/projects-types';

import { modalStore } from '@store/modal-store';

import { ModalTypes } from '@variables/modal-variables';

import { rootStore } from '@store/root-store';
import ImgUpload from '../img-upload/img-upload';

import { ValidationAddOffsetSchema } from './validation-add-offset-schema';

const initialValues: InitialValuesProps = {
  description: '',
  name: '',
  address: '',
  countryId: '',
  projectStandard: {
    existingProjectStandardId: '',
  },
  unitGenerationTime: '',
  startDate: '',
  expectedEndDate: '',
  sustainableDevelopmentGoalIds: [],
  circularity: '',
  image: {
    contentAsBase64: '',
    contentType: '',
  },
  offsets: [
    {
      id: Math.random(),
      shortDescription: '',
      unitCount: '',
      unitPrice: '',
      currencyId: undefined,
      unitType: {
        existingOffsetUnitTypeId: '',
      },
      unitCreationYear: '',
      auditUnit: {
        existingOffsetAuditUnitId: '',
      },
    },
  ],
};

export const fileToBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const AddOffset = observer(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // This is to handle the image upload
  const [imageFile, setImageFile] = useState<ImgFileTypes | null>(null);

  // Dropdown data is coming from the store
  const { formData } = rootStore.dataFormStore;

  const itemTemplate = (option: SelectFilterOption) => {
    return (
      <div className="flex align-items-center">
        <img src={option.imageUrl} alt="Logo" style={{ width: '30px', height: '30px' }} />
        <span className="ml-2">{option.label}</span>
      </div>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationAddOffsetSchema}
      onSubmit={async (values, { setErrors, setFieldError }) => {
        const {
          name,
          description,
          address,
          countryId,
          projectStandard,
          startDate,
          expectedEndDate,
          unitGenerationTime,
          sustainableDevelopmentGoalIds,
          circularity,
          offsets,
        } = values;

        const payloadProject: PostProjectProps = {
          name,
          description,
          address,
          countryId,
          projectStandard: {
            existingProjectStandardId: projectStandard.existingProjectStandardId,
          },
          startDate: dayjs(startDate).format(),
          expectedEndDate: dayjs(expectedEndDate).format(),
          unitGenerationStartDate: dayjs(unitGenerationTime[0]).format(),
          unitGenerationEndDate: dayjs(unitGenerationTime[1]).format(),
          sustainableDevelopmentGoalIds,
          circularity,
          image: imageFile
            ? {
                contentAsBase64: imageFile?.contentAsBase64,
                contentType: imageFile?.contentType,
              }
            : undefined,
        };
        const response = await postProject(payloadProject);

        if (response.isSuccessful()) {
          offsets.map(async (offset) => {
            const {
              unitCount,
              unitType,
              unitCreationYear,
              auditUnit,
              shortDescription,
              unitPrice,
              currencyId,
            } = offset;
            const payloadOffsets: PostOffsetsProps = {
              shortDescription,
              currencyId: currencyId || undefined,
              unitPrice: unitPrice || undefined,
              projectId: response.data!.id,
              unitCount: unitCount || undefined,
              unitType: {
                existingOffsetUnitTypeId: unitType.existingOffsetUnitTypeId,
              },
              unitCreationYear: dayjs(unitCreationYear).format('YYYY-MM-DD'),
              auditUnit: {
                existingOffsetAuditUnitId: auditUnit.existingOffsetAuditUnitId,
              },
            };
            await postOffset(payloadOffsets);
          });
          navigate('/customer');
          modalStore.push({
            title: t('offer.offerAddedModalTitle'),
            content: t('offer.offerAddedModalContent'),
            type: ModalTypes.Info,
          });
        } else if (response.isValidationError()) {
          setErrors(response.validationErrors!);

          if (response.validationErrors!.unitGenerationStartDate)
            setFieldError('unitGenerationTime', response.validationErrors!.unitGenerationStartDate);
          else if (response.validationErrors!.unitGenerationEndDate)
            setFieldError('unitGenerationTime', response.validationErrors!.unitGenerationEndDate);
        }
      }}
    >
      {({ values, touched, errors, handleChange, handleBlur }) => (
        <Form className="add-offset-form">
          <h5 className="text-center p-2 m-0">{t('offset.title')}</h5>
          <div className="car-card-wrapper">
            <div className="card car-card grid p-fluid col-12 xl:m-0">
              <div className="car-card-column col-12 xl:col-6">
                <div className="form-Scrollbar">
                  <InputTextarea
                    id="description"
                    label={t('offset.description')}
                    values={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={t(errors.description ?? '')}
                    touched={touched.description}
                  />
                  <Input
                    id="name"
                    label={t('offset.name')}
                    values={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={t(errors.name ?? '')}
                    touched={touched.name}
                  />
                  <Input
                    id="address"
                    label={t('offset.address')}
                    values={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={t(errors.address ?? '')}
                    touched={touched.address}
                  />
                  <Dropdown
                    id="countryId"
                    label={t('filter.countryPlaceholder')}
                    options={formData.countries}
                    values={values.countryId}
                    onChange={handleChange}
                    errors={t(errors.countryId ?? '')}
                    touched={touched.countryId}
                    filter
                  />
                  <Dropdown
                    id="projectStandard.existingProjectStandardId"
                    label={t('filter.projectStandardLabel')}
                    options={formData.standards}
                    values={values.projectStandard.existingProjectStandardId}
                    onChange={handleChange}
                    errors={t(errors.projectStandard?.existingProjectStandardId ?? '')}
                    touched={touched.projectStandard?.existingProjectStandardId}
                    filter
                  />
                  <Calendar
                    id="unitGenerationTime"
                    label={t('filter.unitGenerationTime')}
                    values={values.unitGenerationTime}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={t(errors.unitGenerationTime ?? '')}
                    touched={touched.unitGenerationTime}
                    selectionMode="range"
                    view="year"
                    dateFormat="yy"
                  />
                  <Calendar
                    id="startDate"
                    label={t('filter.projectStart')}
                    errors={t(errors.startDate ?? '')}
                    touched={touched.startDate}
                    values={values.startDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Calendar
                    id="expectedEndDate"
                    label={t('filter.projectEnd')}
                    errors={t(errors.expectedEndDate ?? '')}
                    touched={touched.expectedEndDate}
                    values={values.expectedEndDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <MultiSelect
                    id="sustainableDevelopmentGoalIds"
                    label={t('filter.sustainableDevelopmentGoals')}
                    options={formData.devGoals}
                    values={values.sustainableDevelopmentGoalIds}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    itemTemplate={itemTemplate}
                    errors={t(errors.sustainableDevelopmentGoalIds ?? '')}
                    touched={touched.sustainableDevelopmentGoalIds}
                    filter
                    showClear
                  />
                  <InputTextarea
                    id="circularity"
                    label={t('filter.circularity')}
                    values={values.circularity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={t(errors.circularity ?? '')}
                    touched={touched.circularity}
                  />
                  <ImgUpload setImageFile={setImageFile} />
                </div>
              </div>
              <div className="car-card-column col-12 xl:col-6 justify-content-center xl:m-0">
                <div className="form-Scrollbar">
                  <div className="field col-12 mt-2">
                    <FieldArray
                      name="offsets"
                      render={({ remove, push }) => (
                        <>
                          <h5 className="text-center">Offset</h5>
                          {values.offsets.map((offset, index) => {
                            const shortDescription = `offsets[${index}].shortDescription`;
                            const currencyId = `offsets[${index}].currencyId`;
                            const unitPrice = `offsets[${index}].unitPrice`;
                            const unitCount = `offsets[${index}].unitCount`;
                            const unitType = `offsets[${index}].unitType.existingOffsetUnitTypeId`;
                            const unitCreationYear = `offsets[${index}].unitCreationYear`;
                            const auditUnit = `offsets[${index}].auditUnit.existingOffsetAuditUnitId`;
                            return (
                              <div key={offset.id}>
                                <div className="flex justify-content-center">
                                  <Button
                                    label={t('button.delete')}
                                    style={{ width: '120px' }}
                                    type="button"
                                    onClick={() => remove(index)}
                                  />
                                </div>
                                <InputTextarea
                                  id={shortDescription}
                                  label={t('offset.shortDescription')}
                                  values={offset.shortDescription}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  errors={t(getIn(errors, shortDescription))}
                                  touched={getIn(touched, shortDescription)}
                                />
                                <Dropdown
                                  id={unitType}
                                  label={t('offset.unitType')}
                                  options={formData.unitTypes}
                                  values={offset.unitType.existingOffsetUnitTypeId}
                                  onChange={handleChange}
                                  errors={t(getIn(errors, unitType))}
                                  touched={getIn(touched, unitType)}
                                  filter
                                />
                                <Input
                                  id={unitCount}
                                  label={t('investorwallet.unitCount')}
                                  values={offset.unitCount}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  errors={t(getIn(errors, unitCount))}
                                  touched={getIn(touched, unitCount)}
                                  keyfilter="num"
                                />
                                <div className="flex">
                                  <Input
                                    id={unitPrice}
                                    label={t('investorwallet.unitPrice')}
                                    values={offset.unitPrice}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    col="col-6 pl-0 pr-1"
                                    errors={t(getIn(errors, unitPrice))}
                                    touched={getIn(touched, unitPrice)}
                                    keyfilter="num"
                                  />

                                  <Dropdown
                                    id={currencyId}
                                    label={t('filter.currency')}
                                    options={formData.currencies}
                                    values={offset.currencyId}
                                    onChange={handleChange}
                                    errors={t(getIn(errors, currencyId))}
                                    touched={getIn(touched, currencyId)}
                                    filter
                                    col="col-6 pl-1 pr-0"
                                  />
                                </div>
                                <Calendar
                                  id={unitCreationYear}
                                  label={t('calendar.unitCreationYearLabel')}
                                  values={offset.unitCreationYear}
                                  errors={t(getIn(errors, unitCreationYear))}
                                  touched={getIn(touched, unitCreationYear)}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  mt="mt-0"
                                  view="year"
                                  dateFormat="yy"
                                />

                                <Dropdown
                                  id={auditUnit}
                                  label={t('offset.auditUnit')}
                                  options={formData.auditUnits}
                                  values={offset.auditUnit.existingOffsetAuditUnitId}
                                  errors={t(getIn(errors, auditUnit))}
                                  touched={getIn(touched, auditUnit)}
                                  onChange={handleChange}
                                  filter
                                />
                              </div>
                            );
                          })}
                          <div className="col-12 flex justify-content-center">
                            <Button
                              type="button"
                              label={t('offset.titleOneOffset')}
                              className="add-offset-button"
                              onClick={() => {
                                push({
                                  id: Math.random(),
                                  shortDescription: '',
                                  unitCount: '',
                                  unitPrice: '',
                                  currencyId: undefined,
                                  unitType: {
                                    existingOffsetUnitTypeId: '',
                                  },
                                  unitCreationYear: '',
                                  auditUnit: {
                                    existingOffsetAuditUnitId: '',
                                  },
                                });
                              }}
                            />
                          </div>
                        </>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-content-center col-12 border-top-1 border-gray-400">
                <Button className="form-register" type="submit" label={t('button.submit')} />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
});
