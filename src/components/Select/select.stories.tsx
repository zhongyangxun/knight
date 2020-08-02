import React, { ReactElement } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Select from './select'
import Option from './option'

const defaultSelect = () => (
  <>
  <Select placeholder="请选择用户" onChange={action('selected')} >
    <Option value="jack" >Jack</Option>
    <Option value="tom" >Tom</Option>
    <Option value="franklin">Franklin</Option>
    <Option value="frank">Frank</Option>
    <Option disabled value="bob">Bob</Option>
  </Select>
  </>
)

const renderMultipleOptions = () => {
  let options: ReactElement[] = []

  for (let i = 10; i < 30; i++) {
    options.push(
      <Option key={i} value={i.toString()} >{i}</Option>
    )
  }

  return options
}

const multipleSelect = () => (
  <Select multiple onChange={action('selected')}>
    {renderMultipleOptions()}
  </Select>
)

const disabledSelect = () => (
  <Select placeholder="被禁用的 Select" disabled >
    <Option value="jack" >Jack</Option>
    <Option value="tom" >Tom</Option>
    <Option value="franklin">Franklin</Option>
    <Option value="frank">Frank</Option>
    <Option disabled value="bob">Bob</Option>
  </Select>
)

storiesOf('Select Component', module)
  .add('Select', defaultSelect)
  .add('支持多选的 Select', multipleSelect)
  .add('被禁用的 Select', disabledSelect)
