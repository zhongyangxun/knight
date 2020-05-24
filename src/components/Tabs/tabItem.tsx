import React, { useContext } from 'react'
import classNames from 'classnames'
import { TabsContext } from './tabs'

export interface TabItemProps {
  label: string | React.ReactNode;
  index?: string;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode
}

const TabItem: React.FC<TabItemProps> = (props) => {
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
