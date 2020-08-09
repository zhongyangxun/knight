import { FC } from 'react'
import Tabs, { TabsProps } from './tabs'
import TabItem, { TabItemProps } from './tabItem'

export type ITabsComponent = FC<TabsProps> & {
  TabItem: FC<TabItemProps>
}

const TransTabs = Tabs as ITabsComponent

TransTabs.TabItem = TabItem

export default TransTabs
