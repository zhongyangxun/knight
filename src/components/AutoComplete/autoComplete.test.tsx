import React from 'react'
import { config } from 'react-transition-group'
import { RenderResult, render, fireEvent, wait, cleanup } from '@testing-library/react'
import AutoComplete, { AutoCompleteProps, DataSourceType } from './autoComplete'

config.disabled = true

interface TestData {
  number: number
}

const testArray = [
  {
    value: 'ab',
    number: 2
  },
  {
    value: 'abc',
    number: 99
  },
  {
    value: 'c',
    number: 22,
  },
  {
    value: 'ddd',
    number: 199,
  },
]

const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {
    return testArray.filter((item) => (item.value.includes(query)))
  },
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}

const renderOptionProps: AutoCompleteProps = {
  placeholder: 'auto-complete',
  onSelect: jest.fn(),
  renderOption: (item: DataSourceType) => {
    const {value, number} = item as DataSourceType<TestData>
    return (
      <>
        <b>{value}</b>
        <span>{number}</span>
      </>
    )
  },
  fetchSuggestions: (query: string) => {
    return testArray.filter(item => (item.value.includes(query)))
  }
}

const asyncProps: AutoCompleteProps = {
  placeholder: 'auto-complete',
  fetchSuggestions: (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({items}) => {
        const formateItems = items.slice(0, 5).map((item: any) => ({ value: item.login, ...item }))
        return formateItems
      })
    }
}

let wrapper: RenderResult
let inputNode: HTMLInputElement

describe('test AutoComplete component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })

  it('test basic AutoComplete behavior', async () => {
    // input change
    fireEvent.change(inputNode, {target: {value: 'a'}})
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toBe(2)

    fireEvent.click(wrapper.getByText('ab'))
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 2})
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    expect(inputNode.value).toBe('ab')
  })

  it('should provide keyboard support', async () => {
    fireEvent.change(inputNode, {target: {value: 'a'}})
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    const firstOption = wrapper.queryByText('ab')
    const secondOption = wrapper.queryByText('abc')

    fireEvent.keyDown(inputNode, {key: 'ArrowDown'})
    expect(firstOption).toHaveClass('is-active')

    fireEvent.keyDown(inputNode, {key: 'ArrowDown'})
    expect(secondOption).toHaveClass('is-active')

    fireEvent.keyDown(inputNode, {key: 'ArrowUp'})
    expect(firstOption).toHaveClass('is-active')

    fireEvent.keyDown(inputNode, {key: 'Enter'})
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 2})
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })

  it('click outside should hide the dropdown', async () => {
    fireEvent.change(inputNode, {target: {value: 'a'}})
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    fireEvent.click(document)
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })

  it('renderOption should generate right template', async () => {
    cleanup()
    wrapper = render(<AutoComplete {...renderOptionProps} />)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
    fireEvent.change(inputNode, {target: {value: 'a'}})
    await wait(() => {
      const firstOptionElement = wrapper.container.querySelector('.suggestion-item') as HTMLElement
      const firstOptionValueNode = wrapper.queryByText('ab') as HTMLElement
      const firstOptionNumberNode = wrapper.queryByText('2') as HTMLElement
      expect(firstOptionValueNode).toBeInTheDocument()
      expect(firstOptionValueNode.tagName).toBe('B')

      expect(firstOptionNumberNode).toBeInTheDocument()
      expect(firstOptionNumberNode.tagName).toBe('SPAN')

      fireEvent.click(firstOptionElement)
      expect(renderOptionProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 2})
    })
  })

  it('async fetchSuggestions should work', async () => {
    cleanup()
    wrapper = render(<AutoComplete {...asyncProps} />)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
    fireEvent.change(inputNode, {target: {value: 'z'}})
    await wait(() => {
      expect(wrapper.container.querySelectorAll('.suggestion-item').length).toBe(5)
    })
  })
})
