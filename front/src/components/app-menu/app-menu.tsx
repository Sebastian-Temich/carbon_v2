import React, {
  createRef,
  FC,
  forwardRef,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Badge } from 'primereact/badge';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

const AppSubmenu = forwardRef((props: any, ref: any) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { root, menuMode, menuActive, onMenuitemClick, onRootMenuitemClick, className, items } =
    props;

  const isMobile = useCallback(() => {
    return window.innerWidth <= 896;
  }, []);

  const handleClickOutside = (): void => {
    setActiveIndex(null);
  };

  const onMenuItemClick = (event: MouseEvent<HTMLElement>, item: any, index: any) => {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (item.command) {
      item.command({ originalEvent: event, item });
      event.preventDefault();
    }
    if (item.items) {
      setActiveIndex(activeIndex === index ? null : index);
      event.preventDefault();
    }
    if (root) {
      onRootMenuitemClick({
        originalEvent: event,
      });
    }

    if (menuMode !== 'static') {
      const ink = getInk(event.currentTarget);
      if (ink) {
        removeClass(ink, 'p-ink-active');
      }
    }

    onMenuitemClick({
      originalEvent: event,
      item,
    });
  };

  const onMenuItemMouseEnter = (index: number) => {
    if (root && menuActive && (menuMode === 'horizontal' || menuMode === 'slim') && !isMobile()) {
      setActiveIndex(index);
    }
  };

  const getInk = (el: any) => {
    for (let i = 0; i < el.children.length; i += 1) {
      if (
        typeof el.children[i].className === 'string' &&
        el.children[i].className.indexOf('p-ink') !== -1
      ) {
        return el.children[i];
      }
    }
    return null;
  };

  const removeClass = (element: any, elClass: string) => {
    if (element.classList) element.classList.remove(elClass);
    else
      element.className = element.className.replace(
        new RegExp(`(^|\\b)${elClass.split(' ').join('|')}(\\b|$)`, 'gi'),
        ' ',
      );
  };

  const visible = (item: any) => {
    return typeof item.visible === 'function' ? item.visible() : item.visible !== false;
  };

  const getLink = (item: any, index: number) => {
    const menuitemIconClassName = classNames('layout-menuitem-icon', item.icon);
    const content = (
      <>
        <i className={menuitemIconClassName} />
        <span className="layout-menuitem-text">{item.label}</span>
        {item.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler" />}
        {item.badge && <Badge value={item.badge} className="menuitem-badge" />}
        <Ripple />
      </>
    );
    const commonLinkProps = {
      style: item.style,
      className: classNames(item.class, 'p-ripple', {
        'p-disabled': item.disabled,
        'p-link': !item.to,
      }),
      target: item.target,
      onClick: (e: MouseEvent<HTMLElement>) => onMenuItemClick(e, item, index),
      onMouseEnter: () => onMenuItemMouseEnter(index),
    };

    if (item.url) {
      return (
        <a href={item.url} rel="noopener noreferrer" {...commonLinkProps}>
          {content}
        </a>
      );
    }

    if (!item.to) {
      return (
        <button type="button" {...commonLinkProps}>
          {content}
        </button>
      );
    }

    return (
      <NavLink
        to={item.to}
        {...commonLinkProps}
        end
        className={({ isActive }) =>
          classNames(commonLinkProps.className, isActive ? 'active-route' : undefined)
        }
      >
        {content}
      </NavLink>
    );
  };

  const isMenuActive = (index: number): boolean => {
    return root ? true : activeIndex === index;
  };

  const getItems = (): any => {
    const transitionTimeout = root ? 0 : { enter: 1000, exit: 450 };
    return items.map((item: any, i: number) => {
      if (visible(item)) {
        const submenuRef = createRef<any>();
        const active = isMenuActive(i);
        const menuitemClassName = classNames({
          'layout-root-menuitem': root,
          'active-menuitem': activeIndex === i && !item.disabled,
        });
        const link = getLink(item, i);
        const rootMenuItem = root && (
          <div>
            <span className="layout-menuitem-text">{item.label}</span>
          </div>
        );
        const tooltip = (
          <div className="layout-menu-tooltip">
            <div className="layout-menu-tooltip-arrow" />
            <div className="layout-menu-tooltip-text">{item.label}</div>
          </div>
        );

        return (
          <li key={item.label || i} className={menuitemClassName} role="menuitem">
            {rootMenuItem}
            {link}
            {tooltip}
            <CSSTransition
              nodeRef={submenuRef}
              classNames="layout-submenu-container"
              timeout={transitionTimeout}
              in={active}
              unmountOnExit
            >
              <AppSubmenu
                ref={submenuRef}
                items={visible(item) && item.items}
                menuActive={menuActive}
                menuMode={menuMode}
                onMenuitemClick={onMenuitemClick}
              />
            </CSSTransition>
          </li>
        );
      }

      return null;
    });
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, []);

  useEffect(() => {
    if (!menuActive && (menuMode === 'horizontal' || menuMode === 'slim') && !isMobile()) {
      setActiveIndex(null);
    }
  }, [props, isMobile]);

  if (!items) {
    return null;
  }

  const elems = getItems();

  return (
    <ul ref={ref} className={className}>
      {elems}
    </ul>
  );
});

interface IProps {
  model: { label: string; icon: string; items: { label: string; icon: string; to: string }[] }[];
  menuMode: string;
  active: boolean;
  onMenuitemClick: (event: any) => void;
  onRootMenuitemClick: () => void;
}

const AppMenu: FC<IProps> = ({ menuMode, model, active, onMenuitemClick, onRootMenuitemClick }) => {
  return (
    <AppSubmenu
      className="layout-menu"
      items={model}
      root
      menuMode={menuMode}
      menuActive={active}
      onMenuitemClick={onMenuitemClick}
      onRootMenuitemClick={onRootMenuitemClick}
    />
  );
};

export default AppMenu;
