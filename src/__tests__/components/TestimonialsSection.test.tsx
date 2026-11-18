import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import TestimonialsSection from '../../components/TestimonialsSection'

// The component reads this array at import time, so tests mutate it in place
// (rather than resetting modules, which would give the component a second copy
// of React and break hooks).
jest.mock('../../data/testimonials.json', () => [], { virtual: true })
const mockTestimonials: any[] = require('../../data/testimonials.json')

const LONG_QUOTE =
  'An unforgettable trip through Bhutan. Every day brought something new, from quiet monasteries to sweeping valley views, and our guide made it all feel effortless.'

describe('TestimonialsSection', () => {
  beforeEach(() => {
    mockTestimonials.length = 0
  })

  it('renders nothing when there are no testimonials', () => {
    const { container } = render(<TestimonialsSection />)
    expect(container).toBeEmptyDOMElement()
  })
})

describe('TestimonialsSection with real reviews', () => {
  beforeEach(() => {
    mockTestimonials.length = 0
    mockTestimonials.push(
      {
        quote: LONG_QUOTE,
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
    )
  })

  it('renders the quote, author, and a working link to the full review when present', () => {
    render(<TestimonialsSection />)

    expect(screen.getAllByText('An unforgettable trip through Bhutan.', { exact: false }).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Jane Doe/).length).toBeGreaterThan(0)

    const links = screen.getAllByRole('link', { name: /read full review/i, hidden: true })
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', 'https://www.google.com/maps/reviews/data=example')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
    })
  })

  it('does not render a review link when the testimonial has none', () => {
    render(<TestimonialsSection />)

    const noLinkCards = screen.getAllByText(/No Link Reviewer/)
    noLinkCards.forEach((reviewer) => {
      const card = reviewer.closest('div')
      expect(card && card.querySelector('a')).toBeNull()
    })
  })

  it('duplicates the review set once for a seamless scrolling loop', () => {
    render(<TestimonialsSection />)

    // 2 real reviews, duplicated once = 4 rendered cards total
    expect(screen.getAllByText(/Jane Doe/)).toHaveLength(2)
    expect(screen.getAllByText(/No Link Reviewer/)).toHaveLength(2)
  })

  it('hides the duplicated copy from assistive tech so reviews are not announced twice', () => {
    const { container } = render(<TestimonialsSection />)

    const hiddenGroups = container.querySelectorAll('[aria-hidden="true"]')
    const hiddenHasReview = Array.from(hiddenGroups).some((el) => el.textContent?.includes('Jane Doe'))
    expect(hiddenHasReview).toBe(true)
  })

  it('clamps long quotes behind a Read more / Read less toggle and leaves short quotes alone', () => {
    render(<TestimonialsSection />)

    // Only the long quote gets a toggle (2 copies in the marquee loop).
    const toggles = screen.getAllByRole('button', { name: /read more/i, hidden: true })
    expect(toggles).toHaveLength(2)

    const toggle = toggles[0]
    const quote = toggle.previousElementSibling as HTMLElement
    expect(quote.className).toContain('line-clamp-4')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(toggle)
    expect(toggle).toHaveTextContent(/read less/i)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(quote.className).not.toContain('line-clamp-4')

    fireEvent.click(toggle)
    expect(toggle).toHaveTextContent(/read more/i)
    expect(quote.className).toContain('line-clamp-4')
  })

  it("keeps the duplicated copy's toggle out of the tab order", () => {
    const { container } = render(<TestimonialsSection />)
    const hidden = container.querySelector('[aria-hidden="true"] button')
    expect(hidden).toHaveAttribute('tabindex', '-1')
  })
})
