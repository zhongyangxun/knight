import { FC } from 'react';
import { MenuProps } from './menu';
import { SubmenuProps } from './subMenu';
import { MenuItemProps } from './menuItem';
export declare type IMenuComponent = FC<MenuProps> & {
    Item: FC<MenuItemProps>;
    Submenu: FC<SubmenuProps>;
};
declare const TransMenu: IMenuComponent;
export default TransMenu;
