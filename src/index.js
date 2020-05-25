import { useCallback, useRef } from 'react'

const useObserver = (callback, { root = null, threshold = 1.0 } = {}, arr) => {
  const intersectionObserver = useRef()
  const callbackRef = useRef()
  callbackRef.current = callback

  if (arr && !Array.isArray(arr)) {
    throw new Error('Pass in an array as the third argument')
  }

  const getDep = () => {
    if (arr) {
      return [callback, root, threshold, ...arr]
    }
    return [callback, root, threshold]
  }

  return useCallback(node => {
    if (intersectionObserver.current) {
      intersectionObserver.current.disconnect()
    }

    if (node) {
      intersectionObserver.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            callbackRef.current()
          }
        },
        { root, threshold },
      )

      intersectionObserver.current.observe(node)
    }
  }, getDep())
}

export default useObserver
