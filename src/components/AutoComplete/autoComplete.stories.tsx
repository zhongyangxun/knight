import React, { ReactElement } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import AutoComplete, { DataSourceType } from './autoComplete'

const defaultSearch = (query: string) => {
  const result = new Array<DataSourceType>(3);
  for (let i = 0; i < result.length; i++) {
    result[i] = {
      value: query.repeat(i + 1)
    }
  }

  return result
}

const defaultAutoComplete = () => (
  <AutoComplete
    fetchSuggestions={defaultSearch}
    placeholder="输入点什么试试"
    onSelect={action('selected')}
  />
)

const defaultText = `
  ~~~javascript
  const defaultSearch = (query: string) => {
    const result = new Array<DataSourceType>(3);
    for (let i = 0; i < result.length; i++) {
      result[i] = {
        value: query.repeat(i + 1)
      }
    }

    return result
  }

  const defaultAutoComplete = () => (
    <AutoComplete
      fetchSuggestions={defaultSearch}
      placeholder="输入点什么试试"
      onSelect={action('selected')}
    />
  )
  ~~~
`
const handleSearch = (query: string) => {
  return fetch(`https://api.github.com/search/users?q=${query}`)
    .then(res => res.json())
    .then(({items}) => {
      const formateItems = items.slice(0, 5).map((item: any) => ({ value: item.login, ...item }))
      return formateItems
    })
}

const githubUsernameAutoComplete = () => (
  <AutoComplete
    fetchSuggestions={handleSearch}
    placeholder="输入你的 GitHub 用户名，或者随便什么字母"
    onSelect={action('selected')}
  />
)

const githubAutoCompleteText = `
  ~~~javascript
  const handleSearch = (query: string) => {
    return fetch('https://api.github.com/search/users?q=' + query)
      .then(res => res.json())
      .then(({items}) => {
        const formateItems = items.slice(0, 5).map((item: any) => ({ value: item.login, ...item }))
        return formateItems
      })
  }

  const githubUsernameAutoComplete = () => (
    <AutoComplete
      fetchSuggestions={handleSearch}
      placeholder="输入你的 GitHub 用户名，或者随便什么字母"
      onSelect={action('selected')}
    />
  )
  ~~~
`

interface GithubUser {
  avatar_url: string
}

const renderOption = (item: DataSourceType): ReactElement => {
  const githubItem = item as DataSourceType<GithubUser>

  return (
    <div style={{display: 'flex'}}>
      <img
        src={githubItem.avatar_url}
        alt={`${githubItem.value}'s avatar`}
        style={{
          width: '30px',
          height: '30px',
          marginRight: '10px',
          backgroundColor: '#eee'
        }}
      />
      <span>{item.value}</span>
    </div>
  )
}

const renderOptionAutoComplete = () => (
  <AutoComplete
    fetchSuggestions={handleSearch}
    placeholder="输入你的 GitHub 用户名，或者随便什么字母"
    renderOption={renderOption}
    onSelect={action('selected')}
  />
)

const renderOptionText = `
  ~~~javascript

    interface GithubUser {
      avatar_url: string
  }

  const renderOption = (item: DataSourceType): ReactElement => {
    const githubItem = item as DataSourceType<GithubUser>

    return (
      <div style={{display: 'flex'}}>
        <img
          src={githubItem.avatar_url}
          alt={githubItem.value + ''s avatar'}
          style={{
            width: '30px',
            height: '30px',
            marginRight: '10px',
            backgroundColor: '#eee'
          }}
        />
        <span>{item.value}</span>
      </div>
    )
  }

  const renderOptionAutoComplete = () => (
    <AutoComplete
      fetchSuggestions={handleSearch}
      placeholder="输入你的 GitHub 用户名，或者随便什么字母"
      renderOption={renderOption}
      onSelect={action('selected')}
    />
  )
  ~~~
`

storiesOf('AutComplete Component', module)
  .add('AutoComplete', defaultAutoComplete, {
    info: {
      source: false,
      text: defaultText
    }
  })
  .add('异步请求 Github 用户名', githubUsernameAutoComplete, {
    info: {
      source: false,
      text: githubAutoCompleteText
    }
  })
  .add('自定义下拉框模板', renderOptionAutoComplete, {
    info: {
      source: false,
      text: renderOptionText
    }
  })

