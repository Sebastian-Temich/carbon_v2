import { FC, useEffect, useRef, useState } from 'react';
import { ImageBlurhash } from '@components/image-blurhash/image-blurhash';
import { observer } from 'mobx-react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutType } from 'primereact/dataview';
import { InputNumber } from 'primereact/inputnumber';

import { Tooltip } from 'primereact/tooltip';
import { useTranslation } from 'react-i18next';

import { ProgressSpinner } from 'primereact/progressspinner';
import fallback from '@assets/img/fallback.png?as=webp';
import { ResponseOffset } from '@custom-types/offsets-types';
import userStore from '@store/user-store';
import { useNavigate } from 'react-router-dom';
import { Tag } from 'primereact/tag';
import { useSellBuyOffsets } from '@components/sell-buy-offsets/sell-buy-offsets';
import { rootStore } from '@store/root-store';
import { OffSetListStatus } from './table-status';
import { TableHeader } from './table-header';

interface IProps {
  displayMarketplaceCheckbox?: boolean;
  showCartButton?: boolean;
}

const DataviewListItem: FC<{ data: ResponseOffset; showCartButton: boolean; user: any; buyOffset: any; navigate: any; t: any; isOwnerOriginal: boolean; }> = ({ data, showCartButton, user, buyOffset, navigate, t, isOwnerOriginal }) => {
  const [valueCart, setValueCart] = useState<number | null>(1);
  const isOwner = data?.ownedByCompanyId === user?.customer.company.id;
  return (
    <div className="col-12">
      <div className="flex flex-column md:flex-row md:justify-content-center align-items-center p-3 w-full">
        <div
          className="img-wrapper-dataview text-center"
          onClick={() => {
            navigate(`/customer/marketplace/${data.id}`, { state: { fromSpecificPage: true } });
          }}
        >
          <div className="img-wrapper">
            {data.project.imageBlurhash ? (
              <ImageBlurhash
                imageBlurhash={data.project.imageBlurhash}
                imageUri={data.project.imageUri}
                imageAspectRatio={data.project.imageAspectRatio}
                className="my-4 md:my-0 shadow-2 opacity-transition"
                blurhashHeight={300}
              />
            ) : (
              <img src={fallback} alt="offset" className="my-4 md:my-0 shadow-2" />
            )}

            <div className="content fade">
              <p>
                {t('text.showMore')} <i className="pi pi-chevron-right" />
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 text-center md:text-left ml-2 mr-2">
          <div className="font-bold text-2xl">{data.project.name}</div>
          <div className="mb-3">{data.project.description}</div>
          {!showCartButton && <OffSetListStatus status={data?.offsetStatus.name} />}
        </div>
        {showCartButton && !isOwner ? (
          <div className="flex flex-column p-3 md:p-0 md:flex-column w-full md:w-auto md:align-items-end mb-2 md:m-0">
            <InputNumber
              size={6}
              inputId="stacked"
              value={valueCart}
              onValueChange={(e) => setValueCart(e.value)}
              showButtons
              mode="decimal"
              min={1}
              max={data.unitCount}
              className="mb-3"
            />
            <Button
              icon="pi pi-shopping-cart"
              label={t('button.addToCart')}
              onClick={async () => {
                if (valueCart) {
                  await buyOffset(data.id, valueCart);
                }
              }}
              className="mb-3"
            />
            <span className="product-badge">
              {isOwnerOriginal && t('offset.developerOffer')}
            </span>
          </div>
        ) : (
          showCartButton && <Tag value={t('offset.myOffer')} severity="success" />
        )}
      </div>
    </div>
  );
};

const DataviewGridItem: FC<{ data: ResponseOffset; showCartButton: boolean; user: any; buyOffset: any; navigate: any; t: any; isOwnerOriginal: boolean; }> = ({ data, showCartButton, user, buyOffset, navigate, t, isOwnerOriginal }) => {
  const [valueCart, setValueCart] = useState<number | null>(1);
  const isOwner = data?.ownedByCompanyId === user?.customer.company.id;

  return (
    <div className="col-12 xl:col-3 lg:col-4 md:col-6">
      <div className="card-box m-3 border-1 surface-border">
        <div className="card-header flex ">
          <div className="card-header-content">
            <div>
              <div className="flex align-items-center">
                <i className="pi pi-tag mr-2" />
                <span className="font-semibold">{data.project.country.alpha3Code}</span>
              </div>
              <div className="product-badge">
                {isOwnerOriginal && t('offset.developerOffer')}
              </div>
            </div>
            <div>
              <strong>
                {data.unitPrice} {data.currency.code}
              </strong>
            </div>
          </div>
          <div
            className="text-center"
            onClick={() => {
              navigate(`/customer/marketplace/${data.id}`, {
                state: { fromSpecificPage: true },
              });
            }}
          >
            <div className="img-wrapper">
              {data.project.imageBlurhash ? (
                <ImageBlurhash
                  imageBlurhash={data.project.imageBlurhash}
                  imageUri={data.project.imageUri}
                  imageAspectRatio={data.project.imageAspectRatio}
                  className="my-4 md:my-0 shadow-2 opacity-transition"
                  blurhashHeight={300}
                />
              ) : (
                <img src={fallback} alt="offset" className="my-4 md:my-0 shadow-2" />
              )}
              <div className="content fade">
                <p>
                  {t('text.showMore')} <i className="pi pi-chevron-right" />
                </p>
              </div>
            </div>
            <div
              className={`text-2xl font-bold header`}
              data-pr-tooltip={data.project.name}
            >
              <span>{data.project.name}</span>
            </div>
            <div className="mb-3 description-text-ellipsis">{data.project.description}</div>
            {!showCartButton && <OffSetListStatus status={data.offsetStatus.name} />}
          </div>
        </div>
        {showCartButton && !isOwner ? (
          <div className="grid p-fluid pb-3">
            <div className="col-12 md:col-6">
              <InputNumber
                inputId="stacked"
                value={valueCart}
                onValueChange={(e) => setValueCart(e.value)}
                showButtons
                mode="decimal"
                min={1}
                max={data.unitCount}
              />
            </div>
            <div className="col-12 md:col-6">
              <Button
                label={t('button.add')}
                onClick={async () => {
                  if (valueCart) {
                    await buyOffset(data.id, valueCart);
                  }
                }}
                icon="pi pi-shopping-cart"
              />
            </div>
          </div>
        ) : (
          showCartButton && (
            <div className="flex justify-content-center m-0 pb-3" style={{ height: '67.5px' }}>
              <OffSetListStatus status="MY OFFER" />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export const Table: FC<IProps> = observer(
  ({ displayMarketplaceCheckbox, showCartButton = false }) => {
    const { t } = useTranslation();
    const { user } = userStore;
    const navigate = useNavigate();
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [first, setFirst] = useState(0);
    const [layout, setLayout] = useState<DataViewLayoutType>('grid');
    const { marketplaceStore, paginationStore } = rootStore;
    const { marketplace, fetchMarketplace, loaded } = marketplaceStore;
    const { buyOffset } = useSellBuyOffsets();

    const headerRef = useRef<HTMLInputElement>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const handleWindowResize = () => {
      if (headerRef.current && headerRef.current.parentElement) {
        if (headerRef.current.offsetWidth >= headerRef.current.parentElement.offsetWidth)
          if (!isVisible) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
      }
    };

    useEffect(() => {
      window.addEventListener('resize', handleWindowResize);
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }, [headerRef, isVisible]);

    const itemTemplate = (data: ResponseOffset) => {
      const commonProps = { data, showCartButton, user, buyOffset, navigate, t, isOwnerOriginal: data.isOwnerOriginal ?? false };
      if (layout === 'grid') {
        return <DataviewGridItem {...commonProps} />;
      }
      return <DataviewListItem {...commonProps} />;
    };

    useEffect(() => {
      if (marketplace.pagination) {
        setTotalRecords(marketplace.pagination.totalCount);
      }
    }, [marketplace.pagination]);

    return (
      <div className="car-content">
        {!loaded && <ProgressSpinner className="progress-spinner" />}
        {loaded && (
          <DataView
            value={marketplace.data}
            layout={layout}
            paginator={marketplace.pagination ? marketplace.pagination?.totalPages > 1 : false}
            first={first}
            onPage={(e) => {
              setFirst(e.first);
              paginationStore.setPagination(e.first / (marketplace.pagination?.perPage ?? 1) + 1);
            }}
            itemTemplate={itemTemplate}
            header={<TableHeader setLayout={setLayout} layout={layout} isVisible={isVisible} headerRef={headerRef} />}
            emptyMessage={t('table.emptyMessage')}
          />
        )}
      </div>
    );
  },
);
