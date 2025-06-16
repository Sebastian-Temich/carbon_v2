import React, { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { observer } from 'mobx-react';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom';
import logo from '@assets/img/logo-white.png';

import { useAuthContext } from '@context/auth-context';

interface IProps {
  menuType: string;
  topbarMenuActive: boolean;
  activeTopbarItem: string | null;
  profileMode: string;
  isHorizontal: boolean;
  onMenuButtonClick: (e: MouseEvent<HTMLElement>) => void;
  onTopbarMenuButtonClick: (e: MouseEvent<HTMLElement>) => void;
  onTopbarItemClick: (e: MouseEvent<HTMLElement>, strArg: string) => void;
  isMobile: () => boolean;
}

export const TopBar: FC<IProps> = ({
  menuType,
  topbarMenuActive,
  activeTopbarItem,
  profileMode,
  isHorizontal,
  onMenuButtonClick,
  onTopbarMenuButtonClick,
  onTopbarItemClick,
  isMobile,
}) => {
  const { t } = useTranslation();
  const { logOut } = useAuthContext();
  const navigate = useNavigate();
  const topbarMenuClassName = classNames('topbar-menu fadeInDown', {
    'topbar-menu-visible': topbarMenuActive,
  });
  const profileItemClassName = classNames('user-profile', {
    'active-topmenuitem': activeTopbarItem === 'profile',
  });
  const activeTopbarItemClassName = (name: string) => {
    return name === activeTopbarItem ? 'active-topmenuitem' : undefined;
  };

  return (
    <div className="layout-topbar">
      <button className="layout-topbar-logo p-link" onClick={() => navigate(`/${menuType}`)}>
        <img id="layout-topbar-logo" src={logo} alt="babylon-layout" />
      </button>

      <button
        className="layout-menu-button p-link"
        onClick={(e) => onMenuButtonClick(e)}
        aria-label="Toggle menu"
      >
        <i className="pi pi-bars" />
      </button>

      <button
        id="topbar-menu-button"
        className="p-link"
        onClick={(e) => onTopbarMenuButtonClick(e)}
        aria-label="Toggle topbar menu"
      >
        <i className="pi pi-ellipsis-v" />
      </button>

      <ul className={topbarMenuClassName}>
        <li className={activeTopbarItemClassName('settings')}>
          <button className="p-link" onClick={(e) => onTopbarItemClick(e, 'settings')}>
            <i className="topbar-icon pi pi-cog" />
            <span className="topbar-item-name">{t('settings')}</span>
          </button>
          <ul className={classNames({ fadeInDown: !isMobile() })}>
            <li role="menuitem">
              <button
                className="p-link"
                onClick={() => {
                  logOut();
                  navigate('/');
                }}
              >
                <i className="pi pi-image" />
                <span>{t('common.logout')}</span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default observer(TopBar);
