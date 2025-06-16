import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';

export default function DataTableMenu(items?: MenuItem[] | null, isDisabled = false) {
  const menu = useRef<Menu>(null);
  if (items) {
    return (
      <div className="flex justify-content-center">
        <Menu model={items} popup ref={menu} />
        <Button
          icon="pi pi-bars"
          className="p-button-secondary p-button-text"
          onClick={(e) => menu.current && menu.current.toggle(e)}
          disabled={isDisabled}
        />
      </div>
    );
  }
  return null;
}
