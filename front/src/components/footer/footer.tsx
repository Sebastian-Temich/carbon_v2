import React, { FC } from 'react';

import LogoBlackPNG from '@assets/img/logo-black.png?as=webp';
import LanguageSwitch from '@i18n/language-switch';

export const Footer: FC = () => {
  return (
    <div className="layout-footer">
      <div className="grid">
        <div className="col-6">
          <button className="p-link logo-container">
            <img src={LogoBlackPNG} alt="babylon-layout" />
          </button>
        </div>
        <div className="col-6 footer-icons">
          <button className="p-link" aria-label="Home">
            <i className="pi pi-home" />
          </button>
          <button className="p-link" aria-label="Globe">
            <i className="pi pi-globe" />
          </button>
          <button className="p-link" aria-label="Contact">
            <i className="pi pi-envelope" />
          </button>
          <button className="p-link" aria-label="Language">
            <LanguageSwitch />
          </button>
        </div>
      </div>
    </div>
  );
};
