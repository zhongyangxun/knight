import React, { useContext, FC } from 'react'
import classNames from 'classnames'
import { TabsContext } from './tabs'

export interface TabItemProps {
  /** 选项卡的 label */
  label: string | React.ReactNode;
  index?: string;
  className?: string;
  /** 设置是否禁用该项 */
  disabled?: boolean;
  children?: React.ReactNode
}

export const TabItem: FC<TabItemProps> = (props) => {
  const {
    index,
    className,
    children
  } = props

  const context = useContext(TabsContext)

  const classes = classNames('tab-item', className, {
    'is-active': context.index === index
  })

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

TabItem.displayName = 'TabItem'

export default TabItem
