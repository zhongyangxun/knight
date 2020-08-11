import React, { FC, ReactText } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'

export interface OptionProps {
  /** 选项值 */
  value: string;
  /** 选项的文字内容 */
  children: ReactText;
  /** 设置是否禁用选项 */
  disabled?: boolean;
  /** 暂不可用 */
  selected?: boolean;
  /** 暂不可用 */
  onSelect?: (value: string, optionText: string) => void;
}

export const Option: FC<OptionProps> = (props) => {
  const {
    children,
    onSelect,
    value,
    disabled,
    selected,
  } = props

  const handleClick = () => {
    if (onSelect) {
      const optionText= children as string
      const selectedValue = value || optionText
      onSelect(selectedValue, optionText)
    }
  }

  const classes = classNames('knight-option-item', {
    'is-disabled': disabled,
    'is-selected': selected,
  })

  return (
    <li
      className={classes}
      onClick={handleClick}
    >
      {children}
      {selected && <Icon icon="check" />}
    </li>
  )
}

Option.displayName = 'Option'

export default Option
