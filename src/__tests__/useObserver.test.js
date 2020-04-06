import React from 'react'
import { render } from '@testing-library/react'
import useObserver from '../observer'

describe('useObserver', () => {
  const observeMock = {
    observe: jest.fn(),
    disconnect: jest.fn(),
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

    unmount()
    expect(observeMock.disconnect).toHaveBeenCalled()
  })
})
