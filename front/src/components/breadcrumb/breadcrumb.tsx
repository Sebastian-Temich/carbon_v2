import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useLocation, useNavigate } from 'react-router-dom';

interface IProps {
  meta?: {
    label: string;
  };
}

export const Breadcrumb: FC<IProps> = ({ meta }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const label = meta?.label || '';

  return (
    <div className="route-bar">
      <div className="route-bar-breadcrumb">
        <ul>
          <li>
            <button className="p-link" onClick={() => navigate('/')} aria-label="Home">
              <i className="pi pi-home" />
            </button>
          </li>
          <li>/</li>
          {location.pathname === '/' ? (
            <li>{t('dashboard.name')}</li>
          ) : (
            <li>
              <button className="p-link">{label}</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
