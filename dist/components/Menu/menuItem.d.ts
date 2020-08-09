import React, { FC } from 'react';
export interface MenuItemProps {
    /** 菜单条目索引 */
    index?: string;
    /** 是否禁用该菜单条目 */
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const MenuItem: FC<MenuItemProps>;
export default MenuItem;
