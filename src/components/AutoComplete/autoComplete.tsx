import React, {
  FC,
  useState,
  ChangeEvent,
  ReactElement,
  useEffect,
  KeyboardEvent,
  useRef,
} from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'
import Transition from '../Transition/transition'

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /** 获取下拉列表数据，支持自定义同步和异步。返回值必须是带有 value 属性的对象数组或者满足该条件的 Promise 对象 */
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  /** 选中选项的回调函数 */
  onSelect?: (item: DataSourceType) => void;
  /** 自定义下拉选项模板，参数数据结构和 fetchSuggestions 返回的数组成员相同 */
  renderOption?: (item: DataSourceType) => ReactElement;
}

/**
 * 输入自动完成组件，支持自定义下拉选项，以及异步请求下拉选项，切支持键盘操作
 *
 * ## 引入方式
 * ~~~javascript
 * import { AutoComplete } from 'knight'
 * ~~~
 */
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props

  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const triggerSearch = useRef(false);
  const deboucedValue = useDebounce(inputValue)
  const componentRef = useRef<HTMLDivElement>(null)
  useClickOutside(componentRef, () => {
    setShowDropdown(false)
    setLoading(false)
  })

  useEffect(() => {
    if (deboucedValue && triggerSearch.current) {
      const results = fetchSuggestions(deboucedValue)
      if (results instanceof Promise) {
        setLoading(true)
        setSuggestions([])
        results.then(data => {
          setLoading(false)
          setSuggestions(data)
          if (data.length > 0) {
            setShowDropdown(true)
          }
        })
      } else {
        setSuggestions(results)
        if (results.length > 0) {
          setShowDropdown(true)
        }
      }
    } else {
      setShowDropdown(false)
    }
    setHighlightIndex(-1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deboucedValue])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    triggerSearch.current = false
    onSelect && onSelect(item)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const highlight = (index: number) => {
      if (index < 0) {
        index = 0
      } else if (index >= suggestions.length) {
        index = suggestions.length - 1
      }
      setHighlightIndex(index)
    }

    switch (e.key) {
      case 'ArrowDown':
        highlight(highlightIndex + 1)
        break
        case 'ArrowUp':
        highlight(highlightIndex - 1)
        break
      case 'Escape':
        setShowDropdown(false)
        break
      case 'Enter':
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      default:
        break
    }
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        timeout={300}
        animation="zoom-in-top"
        onExited={() => { setSuggestions([]) }}
      >
        <ul className="knight-suggestion-list" >
          {
            loading && <Icon icon="spinner" spin className="knight-suggestion-loading" />
          }
          {
            suggestions.map((item, index) => {
              const itemClasses = classNames('suggestion-item', {
                'is-active': index === highlightIndex
              })

              return (
              <li
                key={index}
                  onClick={() => { handleSelect(item) }}
                  className={itemClasses}
                >
                  {renderTemplate(item)}
                </li>
              )
            })
          }
        </ul>
      </Transition>
    )
  }

  return (
    <div className="knight-auto-complete" ref={componentRef} >
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {generateDropdown()}
    </div>
  )
}

export default AutoComplete
