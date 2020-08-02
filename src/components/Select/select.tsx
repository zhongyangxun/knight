import React, {
  FC,
  useState,
  ChangeEvent,
  MouseEvent,
  useEffect,
  useRef,
  KeyboardEvent,
  FunctionComponentElement
} from 'react'
import classNames from 'classnames'
import { OptionProps } from './option'
import Input from '../Input/input'
import Transition from '../Transition/transition'
import Tag from'../Tag/tag'

export interface SelectProps {
  isOpen?: boolean;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string | string[]) => void;
  disabled?: boolean;
  multiple?: boolean;
}

interface SelectedData {
  value: string;
  optionText: string;
}

export const Select: FC<SelectProps> = (props) => {
  const {
    children,
    placeholder,
    isOpen,
    defaultValue,
    onChange,
    disabled,
    multiple,
  } =  props

  const [isOptionOpen, setOptionOpen] = useState(isOpen)
  const [selectedData, setSelectedData] = useState<SelectedData>({value: '', optionText: '',})
  const [multipleSelectedList, setMultipleSelectedList] = useState<SelectedData[]>([])
  const multipleSearchRef = useRef<HTMLInputElement>(null)
  const [multipleSearchValue, setMultipleSearchValue] = useState('')

  const toggleOptionOpen = () => {
    setOptionOpen(!isOptionOpen)
  }

  useEffect(() => {
    if (multiple && isOptionOpen && multipleSearchRef.current) {
      multipleSearchRef.current.focus()
    }
  }, [isOptionOpen, multiple])

  useEffect(() => {
    React.Children.forEach(children, (child) => {
      const childElement = child as FunctionComponentElement<OptionProps>
      const { displayName } = childElement.type
      const { value, children } = childElement.props
      if (displayName === 'Option' && value === defaultValue) {
        const optionText = children as string
        setSelectedData({
          value,
          optionText,
        })
      } else {
        return
      }
    })
  }, [children, defaultValue])


  const handleSelect = (value: string, optionText: string) => {
    const selected: SelectedData = {
      value,
      optionText,
    }
    if (multiple) {
      let newSelectedList = multipleSelectedList
      if (!!multipleSelectedList.find(item => item.value === value)) {
        newSelectedList = multipleSelectedList.filter(item => item.value !== value)
      } else {
        newSelectedList = [...multipleSelectedList, selected]
      }
      setMultipleSelectedList(newSelectedList)
      if (isOptionOpen && multipleSearchRef.current) {
        multipleSearchRef.current.focus()
      }
      setMultipleSearchValue('')
      onChange && onChange(newSelectedList.map(item => item.value))
    } else if (value !== selectedData.value) {
      setSelectedData(selected)
      onChange && onChange(value)
      setOptionOpen(false)
    }
  }

  const renderDropdown = () => {
    const optionList = React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<OptionProps>
      const { displayName } = childElement.type
      if (displayName === 'Option') {
        const childText = childElement.props.children.toString()
        if (multiple && !childText.includes(multipleSearchValue)) {
          return null
        }

        const selected = multiple && !!multipleSelectedList.find(item => item.value === childElement.props.value)

        return React.cloneElement(childElement, {
          onSelect: handleSelect,
          selected,
        })
      } else {
        console.error('Warning: Select has a child which is not a Option component')
        return null
      }
    })

    return optionList
  }

  const handleMultipleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMultipleSearchValue(value)
  }

  const handleMultipleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !multipleSearchValue && multipleSelectedList.length > 0 ) {
      const lastSelected = multipleSelectedList[multipleSelectedList.length - 1]
      const { optionText, value } = lastSelected
      handleSelect(value, optionText)
    }
  }

  const handleTagClose = (e: MouseEvent<SVGSVGElement, MouseEvent>, value: string, optionText: string) => {
    e.stopPropagation()
    handleSelect(value, optionText)
  }

  const classes = classNames('knight-select', {
    'is-option-open': isOptionOpen,
    'is-disabled': disabled,
  })

  return (
    <div className={classes}>
      <div className="knight-select-input" onClick={toggleOptionOpen} >
        {
          multiple
            ? (
              <div className="knight-multiple-selector">
                {
                  multipleSelectedList.map(({value, optionText}) => (
                    <Tag
                      key={value}
                      closable
                      onClose={(e) => { handleTagClose(e, value, optionText) }}
                    >
                      {optionText}
                    </Tag>
                  ))
                }
                <div
                  className="knight-multiple-search"
                  style={{
                    width: multipleSearchValue ? `${multipleSearchValue.length * 1.5}rem` : `5px`
                  }}
                >
                  <input
                    onChange={(e) => { handleMultipleInputChange(e) }} type="text"
                    ref={multipleSearchRef}
                    value={multipleSearchValue}
                    onKeyDown={handleMultipleSearchKeyDown}
                    />
                </div>
              </div>
            )
            : (
              <Input
                placeholder={placeholder}
                icon="angle-down"
                onClick={toggleOptionOpen}
                value={selectedData.optionText}
                disabled={disabled}
                readOnly
              />
            )
        }
      </div>
      <Transition
        in={isOptionOpen}
        animation="zoom-in-top"
        timeout={300}
      >
        <ul className="knight-option-list">
          {renderDropdown()}
        </ul>
      </Transition>
    </div>
  )
}

Select.defaultProps = {
  isOpen: false
}

export default Select
