import React, { useState, HTMLAttributes, FC } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'

export type AlertType = 'success' | 'default' | 'danger' | 'warning'

interface BaseAlertProps {
  /** 提示框信息 */
  message: string;
  /** 提示框详细信息 */
  description?: string;
  className?: string;
  alertType?: AlertType;
  /** 设置提示框可关闭 */
  closable?: boolean;
  /** 提示框关闭的回调函数 */
  onClose?: () => void
}

type NativeBaseProps = HTMLAttributes<HTMLElement>;

export type AlertProps = BaseAlertProps & Partial<NativeBaseProps>

/**
 * 一个提示框组件
 * ## 引入方式
 * ~~~js
 *  import { Alert } from 'knight'
 * ~~~
 */
export const Alert: FC<AlertProps> = (props) => {
  const {
    message,
    description,
    className,
    alertType,
    closable,
    onClose,
    ...restProps
  } = props

  const classes = classNames('alert', className, {
    [`alert-${alertType}`]: alertType,
    'alert-with-description': description,
    'alert-closable': closable
  })

  const messageClasses = classNames('alert-message', {
    'bold-title': description
  })

  const [alertShow, setAlertShow] = useState(true);

  const handleClose = () => {
    onClose && onClose()
    setAlertShow(false);
  }

  const AlertBody = () => {
    return (
      <div
        className={classes}
        {...restProps}
      >
        <span className={messageClasses}>{message}</span>
        <span className="alert-description">{description}</span>
        {
          closable
            ? (
              <button className="alert-close-icon" onClick={() => handleClose()} >
                <Icon icon="times" theme="light" size="lg" />
              </button>
            )
            : null
        }
      </div>
    )
  }

  return (
   <Transition
      timeout={300}
      animation="zoom-in-top"
      in={alertShow}
      wrapper
   >
     <AlertBody />
   </Transition>
  )
}

Alert.defaultProps = {
  alertType: 'default',
  closable: false
}


export default Alert
