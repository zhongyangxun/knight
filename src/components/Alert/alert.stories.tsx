import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Alert from './alert'

const defaultAlert = () => (
  <>
    <Alert message="this is alert!" closable onClose={action('closed')} />
  </>
)

const alertWithStyle = () => (
  <>
    <Alert alertType="success" message="this is Success" closable />
    <Alert alertType="warning" message="this is Warning" />
    <Alert alertType="danger" message="this is Danger" closable />
  </>
)

const alertWithDescription = () => (
  <Alert message="this is title" description="this is description" closable />
)

storiesOf('Alert Component', module)
  .add('Alert', defaultAlert)
  .add('不同样式的 Alert', alertWithStyle)
  .add('添加描述的 Alert', alertWithDescription)

