import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Alert, { AlertType, AlertProps } from './alert'

const testProps: AlertProps = {
  message: 'Nice',
  description: 'desc',
  alertType: AlertType.Success,
  className: 'klass'
}

const closableProps: AlertProps = {
  message:'Nice',
  closable: true
}

describe('test alert component', () => {
  it('should render the correct button', () => {
    const wrapper = render(<Alert message="Nice" />)
    const element = wrapper.container.firstChild as HTMLElement;
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('DIV')
    expect(element).toHaveClass('alert alert-default')

    const messageElement = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element).toContainElement(messageElement)
    expect(messageElement).toHaveClass('alert-message')
  })

  it('should render the correct component based on different', () => {
    const wrapper = render(<Alert  {...testProps} />)
    const element = wrapper.container.firstChild as HTMLElement
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('alert alert-success klass')

    const descElement = wrapper.getByText('desc')
    expect(descElement).toBeInTheDocument()
    expect(descElement).toHaveClass('alert-description');
  })

  it('should render the closable Alert when closable set to true', () => {
    const wrapper = render(<Alert {...closableProps} />)
    const element = wrapper.container.firstChild as HTMLElement
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('alert-closable')

    const closeIconElement = wrapper.getByText('关闭')
    expect(closeIconElement).toBeInTheDocument()
    expect(closeIconElement).toHaveClass('alert-close-icon')
    fireEvent.click(closeIconElement)
    expect(element).not.toBeInTheDocument()
  })
})
