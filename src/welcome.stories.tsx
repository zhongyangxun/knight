import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>Knight 组件库</h1>
        <h2>这是一个 React 组件库</h2>
        <h3>安装</h3>
        <code>
          npm install @zhongyangxun/knight
        </code>
      </>
    )
  }, {
    info: {
      disable: true,
    }
  })
