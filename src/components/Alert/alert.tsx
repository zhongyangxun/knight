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
  style?: React.CSSProperties;
  closable?: boolean;
}

const Alert: React.FC<BaseAlertProps> = (props) => {
  const {
    message,
    description,
    className,
    alertType,
    style,
    closable
  } = props

  const classes = classNames('alert', className, {
    [`alert-${alertType}`]: alertType,
    'alert-with-description': description,
    'alert-closable': closable
  })

  const [show, setShow] = useState(true);

  const alertStyle: React.CSSProperties = {
    ...style,
    display: show ? 'block' : 'none'
  }

  const handleClose = () => {
    setShow(false);
  }

  return (
    <div
      className={classes}
      style={alertStyle}
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
