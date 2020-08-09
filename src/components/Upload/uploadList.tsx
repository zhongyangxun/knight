import React, { FC } from 'react'
import { UploadFile } from './upload'
import Icon from '../Icon/icon'
import Progress from '../Progess/progress'

interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void;
}

export const UploadList: FC<UploadListProps> = (props) => {
  const {
    fileList,
    onRemove,
  } = props

  return (
    <ul className="knight-upload-list">
      {
        fileList.map((item) => {
          const { status, name, uid, percent } = item;
          return (
            <li className="knight-upload-list-item" key={uid} >
              <span className={`file-name file-name-${status}`}>
                <Icon icon="file-alt" theme={status === 'error' ? 'danger' : 'secondary'} />
                {name}
              </span>
              <span className="file-status">
                {(status === 'uploading' || status === 'ready') && <Icon icon="spinner" spin theme="primary" /> }
                {status === 'success' && <Icon icon="check-circle" theme="success" />}
                {status === 'error' && <Icon icon="times-circle" theme="danger" />}
              </span>
              <span className="file-actions">
                <Icon icon="times" onClick={() => { onRemove(item) }} />
              </span>
              {
                status === 'uploading' && <div className="file-progress"><Progress percent={percent || 0} /></div>
              }
            </li>
          )
        })
      }
    </ul>
  )
}

export default UploadList
