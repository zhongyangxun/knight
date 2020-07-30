import { useState, useEffect } from 'react'

const useDebounce = (value: any, delay = 300) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      window.clearTimeout(handler)
    }
  }, [value, delay])

  return debounceValue
}

export default useDebounce
