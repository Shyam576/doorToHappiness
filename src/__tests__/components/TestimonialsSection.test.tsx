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

    expect(screen.getAllByText('An unforgettable trip through Bhutan.', { exact: false }).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Jane Doe/).length).toBeGreaterThan(0)

    const links = screen.getAllByRole('link', { name: /read full review/i })
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', 'https://www.google.com/maps/reviews/data=example')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
    })
  })

  it('does not render a review link when the testimonial has none', () => {
    const TestimonialsSectionWithData = require('../../components/TestimonialsSection').default
    render(<TestimonialsSectionWithData />)

    const noLinkCards = screen.getAllByText(/No Link Reviewer/)
    noLinkCards.forEach((reviewer) => {
      const card = reviewer.closest('div')
      expect(card && card.querySelector('a')).toBeNull()
    })
  })

  it('duplicates the review set once for a seamless scrolling loop', () => {
    const TestimonialsSectionWithData = require('../../components/TestimonialsSection').default
    render(<TestimonialsSectionWithData />)

    // 2 real reviews, duplicated once = 4 rendered cards total
    expect(screen.getAllByText(/Jane Doe/)).toHaveLength(2)
    expect(screen.getAllByText(/No Link Reviewer/)).toHaveLength(2)
  })

  it('hides the duplicated copy from assistive tech so reviews are not announced twice', () => {
    const TestimonialsSectionWithData = require('../../components/TestimonialsSection').default
    const { container } = render(<TestimonialsSectionWithData />)

    const hiddenGroups = container.querySelectorAll('[aria-hidden="true"]')
    const hiddenHasReview = Array.from(hiddenGroups).some((el) => el.textContent?.includes('Jane Doe'))
    expect(hiddenHasReview).toBe(true)
  })
})
