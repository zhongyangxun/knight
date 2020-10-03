import React, { FC, ReactElement } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'
export type MessageType = 'info' | 'success' | 'danger' | 'warning'

export interface MessageProps {
  text: string;
  type: MessageType
}

const Message: FC<MessageProps> = (props: MessageProps) => {
  const { text, type } = props

  const renderIcon = (messageType: MessageType): ReactElement => {
    let messageIcon: IconProp

    switch (messageType) {
      case 'success':
        messageIcon = 'check-circle'
        break
      case 'danger':
        messageIcon = 'times-circle'
        break
      case 'warning':
        messageIcon = 'exclamation-circle'
        break
      case 'info':
      default:
        messageIcon = 'info-circle'
        break
    }

    return <Icon icon={messageIcon} theme={messageType} />
  }

  return (
    <div className="message" data-testid="test-message">
      <div className="message-content">
        <div className="icon">
          {renderIcon(type)}
        </div>
        <div className="text">
          {text}
        </div>
      </div>
    </div>
  )
}

export default Message
