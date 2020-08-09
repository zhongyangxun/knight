import React, { FC } from 'react';
declare type SelectCallback = (selectedIndex: string) => void;
export declare type TabsType = 'line' | 'card';
export interface TabsProps {
    /** 默认选中的选项卡索引 */
    defaultIndex?: string;
    /** 选中选项卡的回调函数 */
    onSelect?: SelectCallback;
    className?: string;
    /** 选项卡的样式类型 */
    type?: TabsType;
}
export interface ITabsContext {
    index: string;
    onSelect?: SelectCallback;
}
export declare const TabsContext: React.Context<ITabsContext>;
/**
 * 选项卡组件
 * ## 引入方式
 * ~~~javascript
 * import { Tabs } from 'knight'
 *
 * const { TabItem } = Tabs
 * ~~~
 */
export declare const Tabs: FC<TabsProps>;
export default Tabs;
