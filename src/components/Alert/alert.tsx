import React, { useState } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'

export type AlertType = 'success' | 'default' | 'danger' | 'warning'

interface BaseAlertProps {
  message: string;
  description?: string;
  className?: string;
  alertType?: AlertType;
  closable?: boolean;
  onClose?: () => void
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

  const AlertBody = () => {
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
