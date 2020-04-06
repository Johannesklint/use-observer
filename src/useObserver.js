import { useRef, useCallback } from 'react'

const useObserver = (callback, ref) => {
  const internalRef = useRef()
  const observer = new IntersectionObserver(callback, {
    root: null,
    threshold: 1.0,
  })

  const setRef = useCallback(
    node => {
      if (internalRef.current) {
        observer.unobserve(internalRef.current)
      }
      if (node) {
        observer.observe(node)
      }

      internalRef.current = node
    },
    [observer, ref],
  )

  return setRef
}

export default useObserver
