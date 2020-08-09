import React, { createContext, useState, FC } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void

export interface MenuProps {
  /** 默认选中的菜单条目索引 */
  defaultIndex?: string;
  className?: string;
  /** 设置菜单的横纵模式 */
  mode?: MenuMode;
  style?: React.CSSProperties;
  /** 选中菜单条目的回调函数 */
  onSelect?: SelectCallback;
  /** 默认展开的下拉菜单索引，可添加多个，多用于纵向模式 */
  defaultOpenSubmenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubmenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({
  index: '0'
})

/**
 * 菜单组件，支持下拉菜单，并支持横纵两种模式
 * ## 引入方式
 * ~~~js
 * import { Menu } from 'knight'
 * ~~~
 */
export const Menu: FC<MenuProps> = (props) => {
  const {
    className,
    mode,
    style,
    onSelect,
    children,
    defaultIndex,
    defaultOpenSubmenus
  } = props

  const [currentActive, setActive] = useState(defaultIndex)

  const classes = classNames('knight-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })

  const handleClick = (index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubmenus
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'Submenu') {
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })

  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubmenus:[]
}

export default Menu
