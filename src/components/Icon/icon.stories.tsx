import React from 'react'
import { storiesOf } from '@storybook/react'

import Icon from './icon'

const defaultIcons = () => (
  <div>
    <Icon icon="bolt" size="3x" />
    <Icon icon="ad" size="3x" />
    <Icon icon="code" size="3x" />
    <Icon icon="trash-alt" size="3x" />
  </div>
)

const iconsWithTheme = () => (
  <div>
    <Icon icon="bolt" size="3x" theme="secondary" />
    <Icon icon="ad" size="3x" theme="danger" />
    <Icon icon="code" size="3x" theme="info" />
    <Icon icon="trash-alt" size="3x" theme="success" />
    <Icon icon="skull-crossbones" size="3x" theme="warning" />
  </div>
)

const animateIcons = () => (
  <div>
    <Icon icon="peace" size="3x" spin />
    <Icon icon="peace" size="3x" pulse theme="success" />
  </div>
)

storiesOf('Icon Component', module)
  .add('Icon', defaultIcons)
  .add('不同主题的 Icon', iconsWithTheme)
  .add('更多行为的 Icon', animateIcons)
