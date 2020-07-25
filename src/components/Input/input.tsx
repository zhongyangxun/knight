import React, { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon';

type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /** 设置是否禁用 */
  disabled?: boolean;
  /** Input 的尺寸 */
  size?: InputSize;
  /** 输入框图标 */
  icon?: IconProp;
  /** 输入框前缀 */
  prepend?: string | ReactElement;
  /** 输入框后缀 */
  append?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * 输入框组件
 *
 * ## 引入方式
 * ~~~js
 * import { Input } from 'knight'
 * ~~~
 */
export const Input: FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    value,
    ...restProps
  } = props

  if (icon && append) {
    window.console.warn(`Input Component: "append" prop will erase "icon" prop, when they exist at the same time.`);
  }

  const wrapperClasses = classNames('knight-input-wrapper', {
    'has-icon': icon && !append,
    'has-prepend': !!prepend,
    'has-append': !!append,
    'is-disabled': disabled,
    [`input-size-${size}`]: size,
  })

  if (value) {
    delete restProps.defaultValue
  }

  return (
    <div className={wrapperClasses} data-testid="test-input-wrapper">
      {
        prepend
        && (
          <div className="prepend">
            {prepend}
          </div>
        )
      }
      <input
        {...restProps}
        type="text"
        className="knight-input"
        disabled={disabled}
        data-testid="test-input"
      />
      {
        icon && !prepend
          && (
            <div className="icon-wrapper">
              <Icon icon={icon} theme="dark" size={size} />
            </div>
          )
      }
      {
        append
        && (
          <div className="append">
            {append}
          </div>
        )
      }
    </div>
  )
}

export default Input
