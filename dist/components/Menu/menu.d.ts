import React, { FC } from 'react';
declare type MenuMode = 'horizontal' | 'vertical';
declare type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
    /** 默认选中的菜单条目索引 */
    defaultIndex?: string;
    className?: string;
    /** 设置菜单的横纵模式 */
    mode?: MenuMode;
    style?: React.CSSProperties;
    /** 选中菜单条目的回调函数 */
    onSelect?: SelectCallback;
    /** 默认展开的下拉菜单索引，可添加多个，多用于纵向模式 */
    defaultOpenSubmenus?: string[];
}
interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubmenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
/**
 * 菜单组件，支持下拉菜单，并支持横纵两种模式
 * ## 引入方式
 * ~~~js
 * import { Menu } from 'knight'
 * ~~~
 */
export declare const Menu: FC<MenuProps>;
export default Menu;
