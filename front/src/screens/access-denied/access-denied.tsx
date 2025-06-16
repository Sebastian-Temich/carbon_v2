import React from 'react';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';

import accessDeniedImg from '@assets/img/logo-black.png?as=webp';

export const AccessDenied = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="exception-body access-denied">
      <div className="exception-panel" />

      <div className="exception-content">
        <img src={accessDeniedImg} alt="babylon-layout" />
        <h1>
          <span className="exception-name">{t('access.title')}</span>
          {t('access.denied')}
        </h1>
        <p>{t('access.permissions')}</p>
        <button className="p-link" onClick={() => navigate(-1)}>
          {t('access.goBack')}
        </button>
      </div>
    </div>
  );
};
