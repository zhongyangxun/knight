import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type ThemeProps =
  'primary' |
  'secondary' |
  'success' |
  'info' |
  'warning' |
  'danger' |
  'light'

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps
}

const Icon: React.FC<IconProps> = (props) => {
  // icon-primary
  const {
    className,
    theme,
    ...restProps
  } = props

  const classes = classNames('knight-icon', className, {
    [`icon-${theme}`]: theme
  })
  return (
    <FontAwesomeIcon className={classes} {...restProps} />
  )
}

Icon.defaultProps = {
  theme: 'primary'
}

export default Icon
