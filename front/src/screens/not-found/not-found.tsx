import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="exception-body notfound">
      <div className="exception-panel" />

      <div className="exception-content">
        <img src="assets/layout/images/logo-black.png" alt="babylon-layout" />
        <h1>
          <span className="exception-name">{t('notFound.pageNotFound')}</span>
        </h1>
        <p>{t('notFound.resourceNotAvailable')}</p>
        <button className="p-link" onClick={() => navigate(-1)}>
          {t('notFound.goBack')}
        </button>
      </div>
    </div>
  );
};
