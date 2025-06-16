import { offsetDetailsStore } from '@store/offset-store';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import userStore from '@store/user-store';
import fallback from '@assets/img/fallback.png?as=webp';
import { InputNumber } from 'primereact/inputnumber';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Form, Formik } from 'formik';
import { ImgFileTypes } from '@custom-types/img-types';
import { useSellBuyOffsets } from '@components/sell-buy-offsets/sell-buy-offsets';
import { OffsetUpdate } from './offset-update';
import { offsetProjectPayload } from './offset-project-formik/offset-project-payload';
import { useInitialValue } from './offset-project-formik/offset-project-initial-value';
import { ProjectUpdate } from './project-update';
import { ProjectSDGsUpdate } from './project-sdgs-update';
import { ValidationUpdateOffsetSchema } from './validation-update-offset';

export const OffsetDetails = observer(() => {
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const [imageFile, setImageFile] = useState<ImgFileTypes | null>(null);
  const { t } = useTranslation();
  const { state } = useLocation();
  const { fromSpecificPage } = state || {};

  const navigate = useNavigate();
  const { user } = userStore;
  const {
    fetchOffset,
    offsetDetails,
    loaded: isLoadedOffsetDetails,
    projectDetails,
  } = offsetDetailsStore;
  const { initialValue } = useInitialValue(offsetDetails);
  const [refresh, setRefresh] = useState({});
  const { buyOffset } = useSellBuyOffsets();
  const [valueCart, setValueCart] = useState<number | null>(1);
  const editable = offsetDetails?.ownedByCompanyId === user?.customer.company.id;
  useEffect(() => {
    if (id) {
      fetchOffset(id);
    }
  }, [id, projectDetails?.imageUri, refresh]);

  const backButtonNavigation = () => {
    fromSpecificPage ? navigate(-1) : navigate('/customer/investorwallet');
  };

  return isLoadedOffsetDetails ? (
    <Formik
      initialValues={initialValue}
      enableReinitialize
      validationSchema={ValidationUpdateOffsetSchema}
      onSubmit={async (values, { setErrors }) => {
        const result = await offsetProjectPayload({
          offsetId: id,
          values,
          initialValue,
          setErrors,
          imageFile,
          t,
        });
        if (result) setEdit(false);
      }}
    >
      {({ submitForm }) => (
        <Form>
          <div className="car-card-wrapper">
            <div className="card car-card grid p-fluid col-12">
              <div className="car-card-column col-12 xl:col-6 mb-2">
                <button
                  type="button"
                  className="p-link"
                  onClick={() => backButtonNavigation()}
                  aria-label="Go back"
                >
                  <i className="pi pi-arrow-left" />
                </button>
                <div className="car-card-image img_viewList_wrapper ">
                  <img
                    className="my-4 md:my-0 shadow-2"
                    src={
                      offsetDetails?.project.imageUri ? offsetDetails?.project.imageUri : fallback
                    }
                    alt="offset"
                  />
                </div>
                <ProjectSDGsUpdate edit={edit} setEdit={setEdit} />
                <h5>{t('offsetInfo.name')}</h5>
                <OffsetUpdate edit={edit} setEdit={setEdit} setImageFile={setImageFile} />
              </div>
              <div className="car-card-column col-12 xl:col-6 justify-content-center mb-2">
                <ProjectUpdate edit={edit} setEdit={setEdit} />
              </div>
              <div className="flex justify-content-end col-12 md:col-12 border-top-1 border-gray-400">
                {editable ? (
                  <Button
                    type="button"
                    style={{ width: '150px', height: '50px' }}
                    label={edit ? t('button.save') : t('button.edit')}
                    onClick={() => {
                      if (edit) submitForm();
                      else setEdit(true);
                    }}
                    disabled={!offsetDetails?.isOwnerOriginal}
                    icon="pi pi-pencil"
                    className="p-button mt-3"
                  />
                ) : (
                  <div style={{ width: '250px', height: '50px' }} className="p-inputgroup mt-3">
                    <Button
                      label={t('button.add')}
                      icon="pi pi-shopping-cart"
                      onClick={() => {
                        if (valueCart && id) {
                          buyOffset(id, valueCart);
                        }
                      }}
                    />
                    <InputNumber
                      inputId="stacked"
                      type="button"
                      value={valueCart}
                      onChange={(e) => setValueCart(e.value)}
                      showButtons
                      mode="decimal"
                      min={1}
                      max={offsetDetails?.unitCount}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  ) : (
    <div className="text-center">
      <ProgressSpinner className="progress-spinner" />
    </div>
  );
});
