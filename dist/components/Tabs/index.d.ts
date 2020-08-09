import { FC } from 'react';
import { TabsProps } from './tabs';
import { TabItemProps } from './tabItem';
export declare type ITabsComponent = FC<TabsProps> & {
    TabItem: FC<TabItemProps>;
};
declare const TransTabs: ITabsComponent;
export default TransTabs;
