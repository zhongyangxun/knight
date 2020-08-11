import { FC } from 'react'
import Select, { SelectProps } from './select'
import Option, { OptionProps } from './option'

export type ISelectComponent = FC<SelectProps> & {
  Option: FC<OptionProps>
}

const TransSelect = Select as ISelectComponent

TransSelect.Option = Option

export default TransSelect
