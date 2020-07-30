import { RefObject, useEffect } from 'react'

const useClickOutside = (ref: RefObject<HTMLElement>, handler: Function) => {
  // 使用 useEffect, 每次都会清除上次的事件回调（见 return ），减少了内存消耗。
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      handler(event)
    }
    document.addEventListener('click', listener)

    return () => {
      document.removeEventListener('click', listener)
    }
  }, [ref, handler])
}

export default useClickOutside
