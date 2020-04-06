import { useCallback, useRef } from 'react'

const useObserver = (callback, args) => {
  const intersectionObserver = React.useRef()

  if (args && args.length) {
    throw new Error('Pass in an array as the second argument')
  }

  return React.useCallback(node => {
    if (intersectionObserver.current) {
      intersectionObserver.current.disconnect()
    }

    if (node) {
      intersectionObserver.current = new IntersectionObserver(
        ([entry]) => {
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
