import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'
import UploadList from './uploadList'
import Dragger from './dragger'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  /** 文件上传 URL */
  action: string;
  /** 默认文件列表 */
  defaultFileList?: UploadFile[];
  /** 自定义请求头 */
  headers?: {[key: string]: any};
  /** 文件上传的字段名称 */
  name?: string;
  /** 需要与文件一起传到后台的其他数据 */
  data?: {[key: string]: any};
  /** 设置上传是否携带验证信息 */
  withCredentials?: boolean;
  /** 可上传的文件类型 */
  accept?: string;
  /** 是否一次选择多个文件上传 */
  multiple?: boolean;
  /** 是否启用拖动上传文件 */
  drag?: boolean;
  /** 上传前的回调函数 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /** 上传过程中的回调函数 */
  onProgress?: (percentage: number, file: File) => void;
  /** 上传成功的回调函数 */
  onSuccess?: (data: any, file: UploadFile) => void;
  /** 上传出错的回调函数 */
  onError?: (err: any, file: UploadFile) => void;
  /** 文件状态改变时的回调函数，上传成功或者失败时都会被调用 */
  onChange?: (file: UploadFile) => void;
  /** 从文件列表移除文件的回调函数 */
  onRemove?: (file: UploadFile) => void;
}

/**
 * 文件上传组件，支持拖拽上传文件
 *
 * ### 引入方式
 * ~~~javascript
 * import { Upload } from '@zhongyangxun/knight'
 * ~~~
 */

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    name,
    data,
    headers,
    defaultFileList,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
  } = props

  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])

  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    uploadFiles(files)

    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }

    setFileList(prevList => (
      [_file, ...prevList]
    ))

    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress: (e: ProgressEvent) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0
        if (percentage < 100) {
          updateFileList(_file, {
            percent: percentage,
            status: 'uploading',
          })
          _file.percent = percentage
          _file.status = 'uploading'
          onProgress && onProgress(percentage, file)
        }
      }
    }).then(res => {
      updateFileList(_file, {
        status: 'success',
        response: res.data,
      })
      _file.status = 'success'
      _file.response = res.data
      onSuccess && onSuccess(res.data, _file)
    }).catch(err => {
      updateFileList(_file, {
        status: 'error',
        response: err,
      })
      _file.status = 'error'
      _file.response = err
      onError && onError(err, _file)
    }).finally(() => {
      onChange && onChange(_file)
    })
  }

  const handleRemove = (file: UploadFile) => {
    setFileList(prevList =>
      prevList.filter(item => item.uid !== file.uid)
    )
    onRemove && onRemove(file)
  }

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
    })
  }

  return (
    <div className="knight-upload" >
      <div className="knight-upload-input" onClick={handleClick} >
        {
          drag
            ? (
              <Dragger  onFile={(files) => { uploadFiles(files) }}>
                {children}
              </Dragger>
            )
            : children
        }
        <input
          type="file"
          className="knight-file-input"
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
        />
      </div>
      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}

export default Upload
