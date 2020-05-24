import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Tabs, { TabsProps } from './tabs'
import TabItem from './tabItem'

const testProps: TabsProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}

const testCardProps: TabsProps = {
  defaultIndex: '0',
  type: 'card'
}

const generateTabs = (props: TabsProps) => {
  return (
    <Tabs {...props} >
      <TabItem label="active-nav">active-content</TabItem>
      <TabItem label="b">content-b</TabItem>
      <TabItem disabled label="disabled-nav">disabled-content</TabItem>
      <TabItem label="d">content-d</TabItem>
    </Tabs>
  )
}

const createStyleFile = () => {
  const cssFile: string = `
    .tab-item {
      display: none;
    }

    .tab-item.is-active {
      display: block;
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

let wrapper: RenderResult,
    tabsElement: HTMLElement,
    activeTabNav: HTMLElement,
    disabledTabNav: HTMLElement,
    activeTabItemElement: HTMLElement

describe('test Tabs and TabItem component', () => {
  beforeEach(() => {
    wrapper = render(generateTabs(testProps))
    wrapper.container.append(createStyleFile())
    tabsElement = wrapper.getByTestId('test-tabs')
    activeTabNav = wrapper.getByText('active-nav')
    disabledTabNav = wrapper.getByText('disabled-nav')
    activeTabItemElement = wrapper.getByText('active-content')
  })

  it('should render correct Tabs on default Props', () => {
    expect(tabsElement).toBeInTheDocument()
    expect(tabsElement).toHaveClass('knight-tabs test')
    expect(tabsElement.querySelectorAll('.tab-nav').length).toBe(4)
    expect(tabsElement.querySelectorAll('.tab-item').length).toBe(4)
    expect(activeTabNav).toHaveClass('is-active')
    expect(disabledTabNav).toHaveClass('is-disabled')
    expect(activeTabItemElement).toHaveClass('is-active')
  })

  it('click TabItem should change active and call the right callback', () => {
    const navB = wrapper.getByText('b')
    fireEvent.click(navB)
    expect(navB).toHaveClass('is-active')
    expect(activeTabNav).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('1')
    fireEvent.click(disabledTabNav)
    expect(disabledTabNav).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('2')
  })

  it('should only show the active TabItem', () => {
    expect(tabsElement.querySelector('.is-active')).toBeVisible()
    const inactiveTabItems = tabsElement.querySelectorAll('.tab-item:not(.is-active)')
    Array.prototype.forEach.call(inactiveTabItems, (element) => {
      expect(element).not.toBeVisible()
    })
  })

  it('should render the card tab when type is set to card', () => {
    cleanup()
    const wrapper = render(generateTabs(testCardProps))
    const tabsElement = wrapper.getByTestId('test-tabs')
    expect(tabsElement).toHaveClass('tabs-card')
  })
})
