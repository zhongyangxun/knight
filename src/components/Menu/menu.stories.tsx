import React from 'react'
import { storiesOf } from '@storybook/react'

import Menu from './index'

const defaultMenu = () => (
  <Menu defaultIndex="0">
    <Menu.Item>
      link
    </Menu.Item>
    <Menu.Item>
      link 2
    </Menu.Item>
    <Menu.Item disabled>
      disabled
    </Menu.Item>
    <Menu.Submenu title="下拉菜单">
      <Menu.Item>dropdown 1</Menu.Item>
      <Menu.Item>dropdown 2</Menu.Item>
    </Menu.Submenu>
  </Menu>
)

const defaultText = `
  ~~~jsx
  <Menu defaultIndex="0">
    <Menu.Item>
      link
    </Menu.Item>
    <Menu.Item>
      link 2
    </Menu.Item>
    <Menu.Item disabled>
      disabled
    </Menu.Item>
    <Menu.Submenu title="下拉菜单">
      <Menu.Item>dropdown 1</Menu.Item>
      <Menu.Item>dropdown 2</Menu.Item>
    </Menu.Submenu>
  </Menu>
  ~~~
`

const vertivalMenu = () => (
  <Menu defaultIndex="0" mode="vertical" >
    <Menu.Item>
      link 1
    </Menu.Item>
    <Menu.Item>
      link 2
    </Menu.Item>
    <Menu.Submenu title="点击展开下拉菜单" >
      <Menu.Item>dropdown 1</Menu.Item>
      <Menu.Item>dropdown 2</Menu.Item>
    </Menu.Submenu>
  </Menu>
)

const verticalText = `
  ~~~jsx
  <Menu defaultIndex="0" mode="vertical" >
    <Menu.Item>
      link 1
    </Menu.Item>
    <Menu.Item>
      link 2
    </Menu.Item>
    <Menu.Submenu title="点击展开下拉菜单" >
      <Menu.Item>dropdown 1</Menu.Item>
      <Menu.Item>dropdown 2</Menu.Item>
    </Menu.Submenu>
  </Menu>
  ~~~
`

const defualtOpenSubmenu = () => (
  <Menu mode="vertical" defaultOpenSubmenus={['2']} >
    <Menu.Item>
      link 1
    </Menu.Item>
    <Menu.Item>
      link 2
    </Menu.Item>
    <Menu.Submenu title="默认展开的下拉菜单">
      <Menu.Item>dropdown 1</Menu.Item>
      <Menu.Item>dropdown 2</Menu.Item>
    </Menu.Submenu>
  </Menu>
)

const defaultOpenText = `
  ~~~jsx
  <Menu mode="vertical" defaultOpenSubmenus={['2']} >
    <Menu.Item>
      link 1
    </Menu.Item>
    <Menu.Item>
      link 2
    </Menu.Item>
    <Menu.Submenu title="默认展开的下拉菜单">
      <Menu.Item>dropdown 1</Menu.Item>
      <Menu.Item>dropdown 2</Menu.Item>
    </Menu.Submenu>
  </Menu>
  ~~~
`

storiesOf('Menu Component', module)
  .add('Menu', defaultMenu, {
    info: {
      source: false,
      text: defaultText,
    }
  })
  .add('纵向的 Menu', vertivalMenu, {
    info: {
      source: false,
      text: verticalText,
    }
  })
  .add('默认展开的子菜单', defualtOpenSubmenu, {
    info: {
      source: false,
      text: defaultOpenText,
    }
  })
