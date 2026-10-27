import React from 'react'
import { render, screen } from '@testing-library/react'
import { HeroErrorBoundary } from '../../../components/hero3d/HeroErrorBoundary'

function Bomb(): JSX.Element {
  throw new Error('boom')
}

describe('HeroErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <HeroErrorBoundary>
        <div>3D scene</div>
      </HeroErrorBoundary>
    )
    expect(screen.getByText('3D scene')).toBeInTheDocument()
  })

  it('renders nothing instead of crashing when a child throws', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})

    const { container } = render(
      <HeroErrorBoundary>
        <Bomb />
      </HeroErrorBoundary>
    )

    expect(container).toBeEmptyDOMElement()
    consoleError.mockRestore()
  })
})
