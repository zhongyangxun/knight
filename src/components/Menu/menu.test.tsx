import React from 'react'
import { render, RenderResult, fireEvent, cleanup, wait } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import Submenu from './subMenu'

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}

const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubmenus: ['3']
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        xyz
      </MenuItem>
      <Submenu title="dropdown">
        <MenuItem>
          drop1
        </MenuItem>
      </Submenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile: string = `
    .knight-submenu {
      display: none;
    }

    .knight-submenu.menu-opened {
      display: block;
    }
  `

  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}
let wrapper: RenderResult,
    menuElement: HTMLElement,
    activeElement: HTMLElement,
    disabledElement: HTMLElement

describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })

  it('should render correct Menu and MenuItem Based on default Props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('knight-menu test')
    expect(menuElement.querySelectorAll(':scope > li').length).toBe(4)
    expect(activeElement).toHaveClass('is-active')
    expect(disabledElement).toHaveClass('is-disabled')
  })

  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })

  it('should render vertical mode when mode is set to vertical', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerticalProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })

  it('should show dropdown items when hover on subMenu', async () => {
    expect(wrapper.queryByText('drop1')).not.toBeInTheDocument()
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    await wait(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible()
    })
    fireEvent.click(wrapper.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await wait(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible()
    })
  })

  it('vertical menu should show subMenus specificed in defaultOpenSubmenus', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerticalProps))
    expect(wrapper.queryByText('drop1')).toBeVisible()
  })

  it('vertical menu should toggle dropdown items when click the subMenu', async () => {
    cleanup()
    const wrapper = render(generateMenu(testVerticalProps))
    wrapper.container.append(createStyleFile())
    const dropdownElement = wrapper.getByText('dropdown')
    expect(wrapper.queryByText('drop1')).toBeVisible()
    fireEvent.click(dropdownElement)
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
    fireEvent.click(dropdownElement)
    expect(wrapper.queryByText('drop1')).toBeVisible()
  })
})
