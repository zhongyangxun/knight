import React, { useContext } from 'react'
import classNames from 'classnames'
import { TabsContext } from './tabs'

interface TabNavProps {
  index?: string;
  disabled?: boolean;
}

const TabNav: React.FC<TabNavProps> = (props) => {
  const {
    index,
    children,
    disabled
  } = props

  const context = useContext(TabsContext)

  const classes = classNames('tab-nav', {
    'is-active': index === context.index,
    'is-disabled': disabled
  })

  const handleClick = () => {
    if (context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index)
    }
  }

  return (
    <div className={classes} onClick={handleClick}>
      {children}
    </div>
  )
}

TabNav.defaultProps = {
  disabled: false
}

export default TabNav
