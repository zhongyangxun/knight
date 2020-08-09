import { FC } from 'react'
import Menu, { MenuProps } from './menu'
import Submenu, { SubmenuProps } from './subMenu'
import MenuItem, { MenuItemProps } from './menuItem'

export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>,
  Submenu: FC<SubmenuProps>
}

const TransMenu = Menu as IMenuComponent

TransMenu.Item = MenuItem
TransMenu.Submenu = Submenu

export default TransMenu
