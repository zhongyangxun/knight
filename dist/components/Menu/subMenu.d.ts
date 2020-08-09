import { FC } from 'react';
export interface SubmenuProps {
    /** 子菜单的索引 */
    index?: string;
    /** 子菜单的标题 */
    title: string;
    className?: string;
}
export declare const Submenu: FC<SubmenuProps>;
export default Submenu;
