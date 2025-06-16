import { useTranslation } from 'react-i18next';

const BuyerOrSeller = () => {
  const { t } = useTranslation();
  return <div>{t('page.buyerOrSeller')}</div>;
};

export default BuyerOrSeller;
