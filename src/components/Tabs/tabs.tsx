import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import { TabItemProps } from './tabItem'
import TabNav from './tabNav'

type SelectCallback = (selectedIndex: string) => void

export type TabsType = 'line' | 'card'

export interface TabsProps {
  defaultIndex?: string;
  onSelect?: SelectCallback;
  className?: string;
  type?: TabsType
}

export interface ITabsContext {
  index: string;
  onSelect?: SelectCallback
}

export const TabsContext = createContext<ITabsContext>({
  index: '0'
})

const Tabs: React.FC<TabsProps> = (props) => {
  const {
    defaultIndex,
    onSelect,
    className,
    children,
    type
  } = props

  const [currentActive, setActive] = useState(defaultIndex)

  const classes = classNames(`knight-tabs tabs-${type}`, className)

  const handleClick = (index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  const passedContext: ITabsContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick
  }

  const renderChildren = () => {
    const tabsNavItems: React.ReactNode[] = []
    const tabsContentItems = React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabItemProps>
      if (childElement.type.displayName === 'TabItem') {
        const indexStr = index.toString()

        tabsNavItems.push(
          <TabNav key={indexStr} index={indexStr} {...childElement.props}>
            {childElement.props.label}
          </TabNav>
        )

       return React.cloneElement(childElement, {
          index: indexStr
        })
      }
    })

    return (
      <>
        <div className="tabs-bar">
          <div className="tab-nav-container">
            {tabsNavItems}
          </div>
        </div>
        <div className="tabs-content">
          {tabsContentItems}
        </div>
      </>
    )
  }

  return (
    <div className={classes} data-testid="test-tabs">
      <TabsContext.Provider value={passedContext}>
        {renderChildren()}
      </TabsContext.Provider>
    </div>
  )
}

Tabs.defaultProps = {
  defaultIndex: '0',
  type: 'line'
}

export default Tabs
