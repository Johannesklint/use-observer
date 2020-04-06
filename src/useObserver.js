import { useCallback, useRef } from 'react'

const useObserver = (callback, args) => {
  const intersectionObserver = useRef()

  if (args && args.length) {
    throw new Error('Pass in an array as the second argument')
  }

  return useCallback(node => {
    if (intersectionObserver.current) {
      intersectionObserver.current.disconnect()
    }

    if (node) {
      intersectionObserver.current = new IntersectionObserver(
        ([entry]) => {
          console.log('entry', entry)
          if (entry.isIntersecting) {
            callback()
          }
        },
        { root: null, threshold: 1.0 },
      )

      intersectionObserver.current.observe(node)
    }
  }, args)
}

export default useObserver
