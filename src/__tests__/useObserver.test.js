import React from 'react'
import { render } from '@testing-library/react'
import useObserver from '../useObserver'

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

  test('observer calls internal functions', () => {
    const { container, unmount } = render(
      <div style={{ height: '2000px' }}>
        <Dummy />
      </div>,
    )
    expect(observeMock.observe).toHaveBeenCalledWith(dummyRef)
    unmount()
    expect(observeMock.disconnect).toHaveBeenCalled()
  })
})
