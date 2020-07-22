import React from 'react'
import { storiesOf } from '@storybook/react'

import Tabs from './tabs'
import TabItem from './tabItem'
import Icon from '../Icon/icon'

const defaultTabs = () => (
  <Tabs>
    <TabItem label="选项卡一">选项卡一的内容</TabItem>
    <TabItem label="选项卡二">选项卡二的内容</TabItem>
    <TabItem label="选项卡三">选项卡三的内容</TabItem>
  </Tabs>
)

const cardTabs = () => (
  <Tabs type="card">
    <TabItem label="选项卡一">选项卡一的内容</TabItem>
    <TabItem label="选项卡二">选项卡二的内容</TabItem>
    <TabItem label="选项卡三">选项卡三的内容</TabItem>
  </Tabs>
)

const customLabel = () => (
  <>
    <Icon icon="check-circle" />
    自定义图标
  </>
)
const customTabs = () => (
  <Tabs type="card">
    <TabItem label={customLabel()}>选项卡一的内容</TabItem>
    <TabItem label="选项卡二">选项卡二的内容</TabItem>
    <TabItem label="选项卡三">选项卡三的内容</TabItem>
  </Tabs>
)

storiesOf('Tabs Component', module)
  .add('Tabs', defaultTabs)
  .add('卡片样式的 Tabs', cardTabs)
  .add('自定义 Tabs', customTabs)
