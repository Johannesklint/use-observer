import React from 'react'
import { render } from '@testing-library/react'
import useObserver from '../useObserver'

describe('useObserver', () => {
  const observeMock = {
    observe: jest.fn(),
    unobserve: jest.fn(),
  }

  beforeAll(() => {
    window.IntersectionObserver = jest.fn(() => observeMock)
  })
  afterAll(() => {
    jest.restoreAllMocks()
  })

  const callback = jest.fn()
  let dummyRef
  const Dummy = () => {
    const ref = useObserver(callback)
    return (
      <div
        ref={node => {
          ref(node)
          dummyRef = node
        }}
      />
    )
  }

  test('observer calls callback and internal functions', () => {
    const { unmount } = render(<Dummy />)

    expect(observeMock.observe).toHaveBeenCalledWith(dummyRef)
    expect(window.IntersectionObserver).toHaveBeenCalledWith(callback, {
      root: null,
      threshold: 1.0,
    })

    unmount()
    expect(observeMock.unobserve).toHaveBeenCalled()
  })
})
