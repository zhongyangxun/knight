import { useEffect, EffectCallback, DependencyList, useRef } from 'react'

// 不在初次渲染后执行 effect 回调函数的 effect hook.
const useDidUpdateEffect = (effect: EffectCallback, deps: DependencyList) => {
  const didMounted = useRef(false)

  useEffect(() => {
    if (didMounted.current) {
      effect()
    } else {
      didMounted.current = true
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useDidUpdateEffect
