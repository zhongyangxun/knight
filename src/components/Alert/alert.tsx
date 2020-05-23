import React, { useState } from 'react'
import classNames from 'classnames'

export enum AlertType {
  Success = 'success',
  Default = 'default',
  Danger = 'danger',
  Warning = 'warning'
}

interface BaseAlertProps {
  message: string;
  description?: string;
  className?: string;
  alertType?: AlertType;
  closable?: boolean;
}

type NativeBaseProps = React.HTMLAttributes<HTMLElement>;

export type AlertProps = BaseAlertProps & Partial<NativeBaseProps>

const Alert: React.FC<AlertProps> = (props) => {
  const {
    message,
    description,
    className,
    alertType,
    closable,
    ...restProps
  } = props

  const classes = classNames('alert', className, {
    [`alert-${alertType}`]: alertType,
    'alert-with-description': description,
    'alert-closable': closable
  })

  const [alertShow, setAlertShow] = useState(true);

  const handleClose = () => {
    setAlertShow(false);
  }

  if (!alertShow) {
    return null
  }

  return (
    <div
      className={classes}
      {...restProps}
    >
      <span className="alert-message">{message}</span>
      <span className="alert-description">{description}</span>
      {
        closable
          ? (
            <button className="alert-close-icon" onClick={() => handleClose()} >关闭</button>
          )
          : null
      }
    </div>
  )
}

Alert.defaultProps = {
  alertType: AlertType.Default,
  closable: false
}

export default Alert
