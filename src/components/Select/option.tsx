import React, { FC, ReactText } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'

export interface OptionProps {
  value: string;
  children: ReactText;
  disabled?: boolean;
  onSelect?: (value: string, optionText: string) => void;
  selected?: boolean;
}

const Option: FC<OptionProps> = (props) => {
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
