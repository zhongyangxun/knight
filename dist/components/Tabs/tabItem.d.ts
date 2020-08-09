import React, { FC } from 'react';
export interface TabItemProps {
    /** 选项卡的 label */
    label: string | React.ReactNode;
    index?: string;
    className?: string;
    /** 设置是否禁用该项 */
    disabled?: boolean;
    children?: React.ReactNode;
}
export declare const TabItem: FC<TabItemProps>;
export default TabItem;
