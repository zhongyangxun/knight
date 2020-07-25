import React from 'react'
import Input, { InputProps } from './input'
import { render, fireEvent } from '@testing-library/react'

const defaultProps: InputProps = {
  onChange: jest.fn()
}

const largeAndIconProps: InputProps = {
  size: 'lg',
  icon: 'search',
}

const prependAndAppendProps: InputProps = {
  prepend: 'prepend',
  append: 'append'
}

const disabledProps: InputProps = {
  disabled: true,
  onFocus: jest.fn()
}

describe('test input component', () => {
  it('should render the corret defualt input', () => {
    const wrapper = render(<Input {...defaultProps} />)
    const wrapperElement = wrapper.getByTestId('test-input-wrapper')
    const inputElement = wrapper.getByTestId('test-input') as HTMLInputElement
    expect(wrapperElement).toBeInTheDocument()
    expect(wrapperElement).toHaveClass('knight-input-wrapper')
    expect(inputElement).toHaveClass('knight-input')
    expect(inputElement.tagName).toBe('INPUT')
    fireEvent.change(inputElement, {
      target: {
        value: 'jack'
      }
    })
    expect(defaultProps.onChange).toBeCalled()
    expect(inputElement.value).toBe('jack')
  })

  it('should render correct component based on different props (size and icon)', () => {
    const wrapper = render(<Input {...largeAndIconProps} />)
    const wrapperElement = wrapper.getByTestId('test-input-wrapper')
    expect(wrapperElement).toBeInTheDocument()
    expect(wrapperElement).toHaveClass('knight-input-wrapper input-size-lg has-icon')
  })

  it('should render correct component based on different props (prepend and append)', () => {
    const wrapper = render(<Input {...prependAndAppendProps} />)
    const wrapperElement = wrapper.getByTestId('test-input-wrapper')
    const prependElement = wrapper.getByText('prepend')
    const appendElement = wrapper.getByText('append')
    expect(wrapperElement).toBeInTheDocument()
    expect(wrapperElement).toHaveClass('knight-input-wrapper has-prepend has-append')
    expect(prependElement).toBeInTheDocument()
    expect(prependElement).toHaveClass('prepend')
    expect(appendElement).toBeInTheDocument()
    expect(appendElement).toHaveClass('append')
  })

  it('should render the disabled input when the "diabled" prop set to true', () => {
    const wrapper = render(<Input {...disabledProps} />)
    const wrapperElement = wrapper.getByTestId('test-input-wrapper')
    const inputElement = wrapper.getByTestId('test-input') as HTMLInputElement
    expect(wrapperElement).toBeInTheDocument()
    expect(wrapperElement).toHaveClass('knight-input-wrapper is-disabled')
    expect(inputElement.disabled).toBeTruthy()
    fireEvent.input(inputElement)
    expect(disabledProps.onFocus).not.toBeCalled()
  })
})
