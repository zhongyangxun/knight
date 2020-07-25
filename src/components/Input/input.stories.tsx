import React  from 'react'
import { storiesOf } from '@storybook/react'

import Input from './input'

const defualtInput = () => (
  <Input placeholder="Enter here" value="123" defaultValue="1222" />
)

const disabledInput = () => (
  <Input disabled />
)

const inputWithIcon = () => (
  <Input placeholder="Search here" icon="search" />
)

const differenetSizeInput = () => (
  <>
    <Input placeholder="Small Input" size="sm" />
    <Input placeholder="Middle Input" />
    <Input placeholder="Large Input" size="lg" />
  </>
)

const inputWithPrependAndAppend = () => (
  <>
    <Input prepend="https" />
    <Input append=".com" />
  </>
)

storiesOf('Input Component', module)
  .add('Input', defualtInput)
  .add('禁用的 Input', disabledInput)
  .add('带图标的 Input', inputWithIcon)
  .add('不同尺寸的 Input', differenetSizeInput)
  .add('带前后缀的 Input', inputWithPrependAndAppend)
