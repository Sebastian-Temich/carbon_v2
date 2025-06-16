/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { Dropdown } from 'primereact/dropdown';

import Poland from '@assets/img/poland.png?as=webp';
import UK from '@assets/img/uk.png?as=webp';

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const langOptions = [
    // { value: 'pl', label: 'PL', icon: Poland },
    { value: 'en', label: 'EN', icon: UK },
  ];

  const langItemTemplate = (langOptions: { icon: string; label: string; value: string }) => {
    return (
      <div className="country-flag">
        <img alt={langOptions.value} src={langOptions.icon} />
        <span className="ml-2">{langOptions.label}</span>
      </div>
    );
  };

  const selectedLangTemplate = (langOptions: { label: string }) => {
    if (langOptions) {
      return (
        <div className="country-flag">
          <img alt={langOptions.label} src={Poland} />
          <div>{langOptions.label}</div>
        </div>
      );
    }
  };

  const handleLanguageChange = useCallback(() => {
    i18n.changeLanguage(i18n.language === 'pl' ? 'en' : 'pl');
  }, [i18n, langOptions]);

  return (
    <div className="lang-switch">
      <Dropdown
        id="language"
        options={langOptions}
        value={i18n.language}
        itemTemplate={langItemTemplate}
        valueTemplate={langItemTemplate || selectedLangTemplate}
        onChange={handleLanguageChange}
        showClear
        disabled
      />
    </div>
  );
};

export default LanguageSwitch;
