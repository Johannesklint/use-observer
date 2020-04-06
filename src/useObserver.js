import { useCallback, useRef } from 'react'

const useObserver = callback => {
  const intersectionObserver = useRef()

  return useCallback(node => {
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
  }, [])
}

export default useObserver
