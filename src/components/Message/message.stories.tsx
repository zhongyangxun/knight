import React from 'react'
import { storiesOf } from '@storybook/react'
import Button from '../Button'
import message from './index'

const messageStory = () => (
  <div>
    <Button
      btnType="default"
      onClick={() => { message.info('提示信息') }}
    >
      默认提示
    </Button>
    <Button
      btnType="default"
      onClick={() => { message.success('提示信息') }}
    >
      成功提示
    </Button>
    <Button
      btnType="default"
      onClick={() => { message.warning('提示信息') }}
    >
      警告提示
    </Button>
    <Button
      btnType="default"
      onClick={() => { message.error('提示信息') }}
    >
      错误提示
    </Button>
  </div>
)

const messageStoryText = `
  ~~~javascript
  import { message } from '@zhongyangxun/knight'

  const App = () => (
    <div>
      <Button
        btnType="default"
        onClick={() => { message.info('提示信息') }}
      >
        默认提示
      </Button>
      <Button
        btnType="default"
        onClick={() => { message.success('提示信息') }}
      >
        成功提示
      </Button>
      <Button
        btnType="default"
        onClick={() => { message.warning('提示信息') }}
      >
        警告提示
      </Button>
      <Button
        btnType="default"
        onClick={() => { message.error('提示信息') }}
      >
        错误提示
      </Button>
    </div>
  )
  ~~~
`

storiesOf('Message API', module)
  .add('Message', messageStory, {
    info: {
      source: false,
      text: messageStoryText
    }
  })
