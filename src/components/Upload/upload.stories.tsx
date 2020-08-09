import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Upload from './upload'
import Button from '../Button/button'

const defaultUpload = () => (
  <Upload
    action="https://run.mocky.io/v3/00f26794-5126-4545-840e-1ad035d2a227"
    name="file"
    onChange={action('change')}
    onProgress={action('uploading')}
    onSuccess={action('success')}
    onError={action('error')}
    onRemove={action('remove')}
  >
    <Button btnType="primary" >上传文件</Button>
  </Upload>
)

// Size limit Upload

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('File is too big!')
    return false
  }
  return true
}

const sizeLimitUpload = () => (
  <Upload
    action="https://run.mocky.io/v3/00f26794-5126-4545-840e-1ad035d2a227"
    beforeUpload={checkFileSize}
    name="file"
  >
    <Button btnType="primary" >上传文件</Button>
    <p>文件不能超过 50 KB</p>
  </Upload>
)

const sizeLimitText = `
  ~~~javascript
  const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
      alert('File is too big!')
      return false
    }
    return true
  }

  return (
    <Upload
      action="https://run.mocky.io/v3/00f26794-5126-4545-840e-1ad035d2a227"
      beforeUpload={checkFileSize}
      name="file"
    >
      <Button btnType="primary" >上传文件</Button>
      <p>文件不能超过 50 KB</p>
    </Upload>
  )
  ~~~
`

const dragUpload = () => (
  <Upload
    action="https://run.mocky.io/v3/00f26794-5126-4545-840e-1ad035d2a227"
    onChange={action('change')}
    onRemove={action('reomve')}
    drag
  >
    <br/>
    点击此区域，或者拖动文件到此来上传
  </Upload>
)


storiesOf('Upload Component', module)
  .add('Upload', defaultUpload)
  .add('限制文件大小的 Upload', sizeLimitUpload, {
    info: {
      source: false,
      text: sizeLimitText
    }
  })
  .add('拖动文件的 Upload', dragUpload)
