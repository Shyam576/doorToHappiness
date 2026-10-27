import React from 'react'
import { render } from '@testing-library/react'
import Hero3DOverlay from '../../../components/hero3d/Hero3DOverlay'
import { useHero3DSupport } from '../../../components/hero3d/useHero3DSupport'

jest.mock('../../../components/hero3d/useHero3DSupport')
jest.mock('../../../components/hero3d/HeroCanvas', () => {
  const { useEffect } = require('react')
  return {
    HeroCanvas: ({ onReady }: { onReady: () => void }) => {
      useEffect(() => {
        onReady()
      }, [onReady])
      return <div data-testid="mock-canvas" />
    },
  }
})

const mockedUseHero3DSupport = useHero3DSupport as jest.Mock

describe('Hero3DOverlay', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders nothing while support has not been checked yet', () => {
    mockedUseHero3DSupport.mockReturnValue({ supported: false, checked: false })
    const { container } = render(<Hero3DOverlay />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing when 3D is not supported', () => {
    mockedUseHero3DSupport.mockReturnValue({ supported: false, checked: true })
    const { container } = render(<Hero3DOverlay />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders the canvas, marked decorative, when supported', () => {
    mockedUseHero3DSupport.mockReturnValue({ supported: true, checked: true })
    const { getByTestId, container } = render(<Hero3DOverlay />)
    expect(getByTestId('mock-canvas')).toBeInTheDocument()
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })
})
