import React, { FC, MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Ripple } from 'primereact/ripple';
import { Tooltip } from 'primereact/tooltip';
import { classNames } from 'primereact/utils';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Logo from '@assets/img/logo-white.png?as=webp';
import AppMenu from '@components/app-menu/app-menu';
import { Breadcrumb } from '@components/breadcrumb/breadcrumb';
import { Footer } from '@components/footer/footer';
import { TopBar } from '@components/top-bar/topBar';
import { ROUTES } from '@utils/routes';

type SideMenuType = {
  admin: never[];
  moderator: {
    label: string;
    icon: string;
    items: {
      label: string;
      icon: string;
      to: string;
    }[];
  }[];
  customer: {
    label: string;
    icon: string;
    items: {
      label: string;
      icon: string;
      to: string;
    }[];
  }[];
};

interface IProps {
  menuType: string;
  children?: ReactNode;
}

export const Dashboard: FC<IProps> = ({ menuType, children }) => {
  const { t } = useTranslation();
  const layoutContentRef = useRef<HTMLDivElement>(null);
  const [menuActive, setMenuActive] = useState(false);
  const [menuMode, setMenuMode] = useState('static');
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [topbarMenuActive, setTopbarMenuActive] = useState(false);
  const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
  const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
  const [activeTopbarItem, setActiveTopbarItem] = useState<any | null>(null);
  const [inlineMenuActive, setInlineMenuActive] = useState(false);
  const [profileMode, setProfileMode] = useState('popup');
  const [configActive, setConfigActive] = useState(false);
  const copyTooltipRef = useRef<any>();
  const location = useLocation();
  const navigate = useNavigate();

  let menuClick = false;
  let configClick = false;
  let topbarItemClick = false;
  let inlineMenuClick = false;

  const breadcrumb = [{ path: '/', parent: 'Home', label: 'Home' }]; //  TODO -  create breadcrumbs

  const sideMenu: SideMenuType = {
    admin: [],
    moderator: [
      {
        label: t('sideMenu.homeLabel'),
        icon: 'pi pi-fw pi-home',
        items: [{ label: t('sideMenu.homeLabel'), icon: 'pi pi-fw pi-home', to: '/moderator' }],
      },
      {
        label: t('sideMenu.transactionsLogsLabel'),
        icon: 'pi pi-fw pi-hashtag',
        items: [
          {
            label: t('sideMenu.transactionsLogsLabel'),
            icon: 'pi pi-fw pi-list',
            to: ROUTES.ModeratorProjects.path,
          },
        ],
      },
      {
        label: t('sideMenu.transactions'),
        icon: 'pi pi-fw pi-money-bill',
        items: [
          {
            label: t('sideMenu.transactions'),
            icon: 'pi pi-fw pi-list',
            to: ROUTES.Transactions.path,
          },
        ],
      },
      {
        label: t('sideMenu.offersLabel'),
        icon: 'pi pi-check-circle',
        items: [
          {
            label: t('sideMenu.manageOffersLabel'),
            icon: 'pi pi-fw pi-check-circle',
            to: '/moderator',
          },
        ],
      },
    ],
    customer: [
      {
        label: t('sideMenu.homeLabel'),
        icon: 'pi pi-fw pi-home',
        items: [
          { label: t('sideMenu.homeLabel'), icon: 'pi pi-fw pi-home', to: ROUTES.Marketplace.path },
        ],
      },
      {
        label: t('sideMenu.myOffersLabel'),
        icon: 'pi pi-fw pi-th-large',
        items: [
          {
            label: t('sideMenu.createOfferLabel'),
            icon: 'pi pi-fw pi-plus-circle',
            to: ROUTES.AddOffset.path,
          },
          {
            label: t('sideMenu.myOffersLabel'),
            icon: 'pi pi-fw pi-list',
            to: ROUTES.OffsetsList.path,
          },
        ],
      },
      {
        label: t('sideMenu.investorWalletLabel'),
        icon: 'pi pi-wallet',
        items: [
          {
            label: t('sideMenu.investorWalletLabel'),
            icon: 'pi pi-fw pi-wallet',
            to: ROUTES.InvestorWallet.path,
          },
        ],
      },
    ],
  };

  const menu = sideMenu[menuType as keyof SideMenuType];

  useEffect(() => {
    copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
  }, [location]);

  useEffect(() => {
    const setClasses = (el: Event) => {
      const target = el.target as HTMLDivElement;
      const isScrollable = target.scrollHeight >= target.clientHeight;

      if (!isScrollable) {
        target.classList.remove('is-bottom-overflowing', 'is-top-overflowing');
        return;
      }

      const isScrolledToBottom = target.scrollHeight <= target.clientHeight + target.scrollTop;
      const isScroledlToTop = target.scrollTop === 0;

      target.classList.toggle('is-bottom-overflowing', !isScrolledToBottom);
      target.classList.toggle('is-top-overflowing', !isScroledlToTop);
    };

    if (layoutContentRef && layoutContentRef.current) {
      layoutContentRef.current.addEventListener('scroll', (el: Event) => setClasses(el), false);
      return () => {
        layoutContentRef.current?.removeEventListener(
          'scroll',
          (el: Event) => setClasses(el),
          false,
        );
      };
    }
  }, []);

  const meta = breadcrumb.find((obj): boolean => {
    return obj.path === location.pathname;
  });

  const onDocumentClick = (): void => {
    if (!topbarItemClick) {
      setActiveTopbarItem(null);
      setTopbarMenuActive(false);
    }

    if (!menuClick) {
      if (isHorizontal() || isSlim()) {
        setMenuActive(false);
      }
      hideOverlayMenu();
    }

    if (!inlineMenuClick && profileMode === 'inline' && isSlim() && !isMobile()) {
      setInlineMenuActive(false);
    }

    if (configActive && !configClick) {
      setConfigActive(false);
    }

    inlineMenuClick = false;
    configClick = false;
    topbarItemClick = false;
    menuClick = false;
  };

  const onMenuitemClick = (event: any) => {
    if (!event.item.items) {
      hideOverlayMenu();

      if (isSlim() || isHorizontal()) {
        setMenuActive(false);
      }
    }
  };

  const onRootMenuitemClick = () => {
    setMenuActive((prevMenuActive) => !prevMenuActive);
  };

  const onMenuClick = (): void => {
    menuClick = true;

    if (inlineMenuActive && !inlineMenuClick) {
      setInlineMenuActive(false);
    }
  };

  const onMenuButtonClick = (event: MouseEvent<HTMLElement>): void => {
    menuClick = true;
    setTopbarMenuActive(false);

    if (isDesktop()) {
      setStaticMenuDesktopInactive(
        (prevStaticMenuDesktopInactive) => !prevStaticMenuDesktopInactive,
      );
    } else {
      setStaticMenuMobileActive((prevStaticMenuMobileActive) => !prevStaticMenuMobileActive);
    }

    event.preventDefault();
  };

  const onTopbarMenuButtonClick = (event: MouseEvent<HTMLElement>): void => {
    topbarItemClick = true;
    setTopbarMenuActive((prevTopbarMenuActive) => !prevTopbarMenuActive);

    hideOverlayMenu();

    event.preventDefault();
  };

  const onTopbarItemClick = (event: MouseEvent<HTMLElement>, item: string): void => {
    topbarItemClick = true;

    if (activeTopbarItem === item) {
      setActiveTopbarItem(null);
    } else {
      setActiveTopbarItem(item);
    }

    event.preventDefault();
  };

  const hideOverlayMenu = (): void => {
    setOverlayMenuActive(false);
    setStaticMenuMobileActive(false);
  };

  const isDesktop = (): boolean => {
    return window.innerWidth > 896;
  };

  const isMobile = (): boolean => {
    return window.innerWidth <= 896;
  };

  const isHorizontal = (): boolean => {
    return menuMode === 'horizontal';
  };

  const isSlim = (): boolean => {
    return menuMode === 'slim';
  };

  const containerClassName = classNames('layout-wrapper', {
    'layout-slim': true,
    'layout-mobile-active': staticMenuMobileActive,
    'layout-menu-dark': true,
    'p-ripple-disabled': true,
  });

  return (
    <div className={containerClassName} onClick={onDocumentClick}>
      <Tooltip
        ref={copyTooltipRef}
        target=".block-action-copy"
        position="bottom"
        content={t('tooltip.clipboardCopied')}
        event="focus"
      />

      <TopBar
        menuType={menuType}
        topbarMenuActive={topbarMenuActive}
        activeTopbarItem={activeTopbarItem}
        onMenuButtonClick={onMenuButtonClick}
        onTopbarMenuButtonClick={onTopbarMenuButtonClick}
        onTopbarItemClick={onTopbarItemClick}
        isHorizontal={isHorizontal()}
        profileMode={profileMode}
        isMobile={isMobile}
      />

      <div className="layout-menu-container" onClick={onMenuClick}>
        <div className="layout-menu-logo">
          <button className="p-link" onClick={() => navigate(`/${menuType}`)}>
            <img
              id="layout-menu-logo"
              src={Logo}
              data-library="babylon-layout"
              alt="babylon-logo"
            />
          </button>
        </div>
        <div className="layout-menu-wrapper">
          <div className="menu-scroll-content">
            <AppMenu
              model={menu}
              menuMode="slim"
              active={menuActive}
              onMenuitemClick={onMenuitemClick}
              onRootMenuitemClick={onRootMenuitemClick}
            />
          </div>
        </div>
      </div>

      <div className="layout-main">
        <Breadcrumb meta={meta} />

        <div className="layout-content" ref={layoutContentRef}>
          {children || <Outlet />}
        </div>

        <Footer />
      </div>

      {staticMenuMobileActive && <div className="layout-mask" />}
    </div>
  );
};
