import React from 'react'
import { storiesOf } from '@storybook/react'

import Menu from './menu'
import MenuItem from './menuItem'
import Submenu from './subMenu'

const defaultMenu = () => (
  <Menu defaultIndex="0">
    <MenuItem>
      link
    </MenuItem>
    <MenuItem>
      link 2
    </MenuItem>
    <MenuItem disabled>
      disabled
    </MenuItem>
    <Submenu title="下拉菜单">
      <MenuItem>dropdown 1</MenuItem>
      <MenuItem>dropdown 2</MenuItem>
    </Submenu>
  </Menu>
)

const vertivalMenu = () => (
  <Menu defaultIndex="0" mode="vertical" >
    <MenuItem>
      link 1
    </MenuItem>
    <MenuItem>
      link 2
    </MenuItem>
    <Submenu title="点击展开下拉菜单" >
      <MenuItem>dropdown 1</MenuItem>
      <MenuItem>dropdown 2</MenuItem>
    </Submenu>
  </Menu>
)

const defualtOpenSubmenu = () => (
  <Menu mode="vertical" defaultOpenSubmenus={['2']} >
    <MenuItem>
      link 1
    </MenuItem>
    <MenuItem>
      link 2
    </MenuItem>
    <Submenu title="默认展开的下拉菜单">
      <MenuItem>dropdown 1</MenuItem>
      <MenuItem>dropdown 2</MenuItem>
    </Submenu>
  </Menu>
)

storiesOf('Menu Component', module)
  .add('Menu', defaultMenu)
  .add('纵向的 Menu', vertivalMenu)
  .add('默认展开的子菜单', defualtOpenSubmenu)
