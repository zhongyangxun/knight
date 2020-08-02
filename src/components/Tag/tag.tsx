import React, { ReactText, FC, useState, MouseEvent } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'

export interface TagProps {
  closable?: boolean;
  onClose?: (e: MouseEvent<SVGSVGElement, MouseEvent>) => void;
  children: ReactText;
}

export const Tag: FC<TagProps> = (props) => {
  const {
    closable,
    onClose,
    children,
  } = props

  const [tagShow, setTagShow] = useState(true)

  const handleClose = (e: MouseEvent<SVGSVGElement, MouseEvent>) => {
    setTagShow(false)
    onClose && onClose(e)
  }

  const classes = classNames('knight-tag', 'default', {
    'is-closable': closable
  })

  return (
      tagShow
        ? (
          <span className={classes}>
              {children}
            {
              closable && (
                <div className="icon-wrapper">
                  <Icon icon="times" onClick={handleClose} size="sm" theme="dark" />
                </div>
              )
            }
          </span>
        )
        : null
  )
}

export default Tag
