import { useCallback, useRef } from 'react'

const useObserver = (callback, args) => {
  const intersectionObserver = useRef()
  const callbackRef = useRef()
  callbackRef.current = callback

  if (!Array.isArray(args)) {
    throw new Error('Pass in an array as the second argument')
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
        { root: null, threshold: 1.0 },
      )

      intersectionObserver.current.observe(node)
    }
  }, args)
}

export default useObserver
