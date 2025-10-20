import React from 'react'
import { render, screen } from '@testing-library/react'
import { Container } from '../../components/Container'

describe('Container Component', () => {
  it('renders children correctly', () => {
    render(
      <Container>
        <div>Test Content</div>
      </Container>
    )
    
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <Container className="custom-class">
        <div>Test Content</div>
      </Container>
    )
    
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('applies default styling classes', () => {
    const { container } = render(
      <Container>
        <div>Test Content</div>
      </Container>
    )
    
    expect(container.firstChild).toHaveClass('w-full', 'px-4', 'sm:px-6', 'lg:px-8', 'xl:px-12', 'mx-auto')
  })
})
