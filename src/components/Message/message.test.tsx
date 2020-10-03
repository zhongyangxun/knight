import React from 'react'
import { config } from 'react-transition-group'
import { render, fireEvent, wait } from '@testing-library/react'
import message from './index'
import Button from '../Button'

config.disabled = true

jest.useFakeTimers()

describe('test message API', () => {
  it('should popup and close the message correctly', async () => {
    const wrapper = render(
      <Button onClick={() => { message.info('test message') }} >click</Button>
    )

    expect(document.querySelector('.message')).not.toBeInTheDocument()
    expect(document.querySelector('.knight-icon')).not.toBeInTheDocument()
    fireEvent.click(wrapper.queryByText('click') as HTMLElement)
    await wait(() => {
      expect(document.querySelector('.message')).toBeInTheDocument()
      expect(document.querySelector('.message .text')?.textContent).toBe('test message')
      expect(document.querySelector('.knight-icon')).toBeInTheDocument()
      expect(document.querySelector('.knight-icon')).toHaveClass('icon-info')
      jest.runAllTimers()
      expect(document.querySelector('.message')).not.toBeInTheDocument()
      expect(document.querySelector('.knight-icon')).not.toBeInTheDocument()
    })
  })

  it('should popup different type of message correctly', async () => {
    const wrapper = render(
      <>
        <Button onClick={() => { message.success('success message') }} >success</Button>
        <Button onClick={() => { message.warning('warning message') }} >warning</Button>
        <Button onClick={() => { message.error('error message') }} >error</Button>
      </>
    )

    fireEvent.click(wrapper.queryByText('success') as HTMLElement)
    await wait(() => {
      expect(document.querySelector('.message')).toBeInTheDocument()
      expect(document.querySelector('.message .text')?.textContent).toBe('success message')
      expect(document.querySelector('.knight-icon')).toBeInTheDocument()
      expect(document.querySelector('.knight-icon')).toHaveClass('icon-success')

      jest.runAllTimers()
      expect(document.querySelector('.message')).not.toBeInTheDocument()
      expect(document.querySelector('.knight-icon')).not.toBeInTheDocument()
    })

    fireEvent.click(wrapper.queryByText('warning') as HTMLElement)
    await wait(() => {
      expect(document.querySelector('.message')).toBeInTheDocument()
      expect(document.querySelector('.message .text')?.textContent).toBe('warning message')
      expect(document.querySelector('.knight-icon')).toBeInTheDocument()
      expect(document.querySelector('.knight-icon')).toHaveClass('icon-warning')
      jest.runAllTimers()
      expect(document.querySelector('.message')).not.toBeInTheDocument()
      expect(document.querySelector('.knight-icon')).not.toBeInTheDocument()
    })

    fireEvent.click(wrapper.queryByText('error') as HTMLElement)
    await wait(() => {
      expect(document.querySelector('.message')).toBeInTheDocument()
      expect(document.querySelector('.message .text')?.textContent).toBe('error message')
      expect(document.querySelector('.knight-icon')).toBeInTheDocument()
      expect(document.querySelector('.knight-icon')).toHaveClass('icon-danger')
      jest.runAllTimers()
      expect(document.querySelector('.message')).not.toBeInTheDocument()
      expect(document.querySelector('.knight-icon')).not.toBeInTheDocument()
    })
  })
})
