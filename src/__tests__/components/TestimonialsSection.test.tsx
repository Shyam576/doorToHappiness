import React from 'react'
import { render, screen } from '@testing-library/react'
import TestimonialsSection from '../../components/TestimonialsSection'

jest.mock('../../data/testimonials.json', () => [], { virtual: true })

describe('TestimonialsSection', () => {
  it('renders nothing when there are no testimonials', () => {
    const { container } = render(<TestimonialsSection />)
    expect(container).toBeEmptyDOMElement()
  })
})

describe('TestimonialsSection with real reviews', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('../../data/testimonials.json', () => [
      {
        quote: 'An unforgettable trip through Bhutan.',
        author: 'Jane Doe',
        rating: 5,
        source: 'Google',
        link: 'https://www.google.com/maps/reviews/data=example',
      },
      {
        quote: 'Great service, no complaints.',
        author: 'No Link Reviewer',
        rating: 5,
        source: 'Google',
      },
    ], { virtual: true })
  })

  afterEach(() => jest.dontMock('../../data/testimonials.json'))

  it('renders the quote, author, and a working link to the full review when present', () => {
    const TestimonialsSectionWithData = require('../../components/TestimonialsSection').default
    render(<TestimonialsSectionWithData />)

    expect(screen.getByText('An unforgettable trip through Bhutan.', { exact: false })).toBeInTheDocument()
    expect(screen.getByText(/Jane Doe/)).toBeInTheDocument()

    const link = screen.getByRole('link', { name: /read full review/i })
    expect(link).toHaveAttribute('href', 'https://www.google.com/maps/reviews/data=example')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })

  it('does not render a review link when the testimonial has none', () => {
    const TestimonialsSectionWithData = require('../../components/TestimonialsSection').default
    render(<TestimonialsSectionWithData />)

    const noLinkCard = screen.getByText(/No Link Reviewer/).closest('div')
    expect(noLinkCard && noLinkCard.querySelector('a')).toBeNull()
  })
})
