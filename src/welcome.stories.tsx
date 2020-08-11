import React from 'react'
import { storiesOf } from '@storybook/react'

const markDownText = `

基于 TypeScript 打造的 React 组件库。

### 安装

~~~shell
npm install @zhongyangxun/knight
~~~

or

~~~shell
yarn add @zhongyangxun/knight
~~~

### 使用方式

~~~react
// 加载样式
import '@zhongyangxun/knight/dist/index.css'
// 引入组件
import { Button } from '@zhongyangxun/knight'

const App = () => (
  <Button>
    Hello
  </Button>
)
~~~

### 本地开发

~~~shell
$ git clone https://github.com/zhongyangxun/knight.git
$ cd knight
$ npm install
$ npm run storybook
~~~

浏览器访问 http://localhost:9009/.
`

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <h3>@zhongyangxun/knight</h3>
    )
  }, {
    info: {
      text: markDownText,
      source: false,
    }
  })
