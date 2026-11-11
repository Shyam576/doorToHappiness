import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Hero3DOverlay from '../../../components/hero3d/Hero3DOverlay'
import { useHero3DSupport } from '../../../components/hero3d/useHero3DSupport'

jest.mock('../../../components/hero3d/useHero3DSupport')
jest.mock('../../../components/hero3d/HeroCanvas', () => {
  const { useEffect } = require('react')
  return {
    HeroCanvas: ({ onReady, revealTrigger }: { onReady: () => void; revealTrigger?: number }) => {
      useEffect(() => {
        onReady()
      }, [onReady])
      return <div data-testid="mock-canvas" data-reveal-trigger={revealTrigger} />
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

  it('shows an accessible "Discover Taktshang" button once the canvas is ready, outside the decorative wrapper', () => {
    mockedUseHero3DSupport.mockReturnValue({ supported: true, checked: true })
    render(<Hero3DOverlay />)
    const button = screen.getByRole('button', { name: /discover taktshang/i });
    expect(button).toBeInTheDocument()
    expect(button).not.toHaveAttribute('aria-hidden')
  })

  it('increments the reveal trigger passed to HeroCanvas each time the button is clicked', async () => {
    mockedUseHero3DSupport.mockReturnValue({ supported: true, checked: true })
    const user = userEvent.setup()
    render(<Hero3DOverlay />)

    const canvas = screen.getByTestId('mock-canvas')
    expect(canvas).toHaveAttribute('data-reveal-trigger', '0')

    await user.click(screen.getByRole('button', { name: /discover taktshang/i }))
    expect(canvas).toHaveAttribute('data-reveal-trigger', '1')

    await user.click(screen.getByRole('button', { name: /discover taktshang/i }))
    expect(canvas).toHaveAttribute('data-reveal-trigger', '2')
  })
})
