import { render, screen, fireEvent } from '@testing-library/react'
import { JourneyArchitect } from '../../../components/journeyArchitect/JourneyArchitect'
import { calculateCost, getRouteForDuration } from '../../../lib/calculator-utils'

describe('JourneyArchitect', () => {
  it('renders a default estimate matching the calculator for 7 days, 2 adults, couple', () => {
    render(<JourneyArchitect />)

    const expected = calculateCost({ durationDays: 7, adults: 2, children: 0, travelerType: 'couple' })
    expect(screen.getByText('7 days')).toBeInTheDocument()
    expect(screen.getByText(`$${expected.totalUsd.toLocaleString()}`)).toBeInTheDocument()

    const expectedRoute = getRouteForDuration(7)
    expect(screen.getAllByText(expectedRoute[0].location)[0]).toBeInTheDocument()
  })

  it('updates the displayed duration and total cost when the slider moves', () => {
    render(<JourneyArchitect />)
    fireEvent.change(screen.getByRole('slider'), { target: { value: '14' } })
    // '14 days' also appears as the slider's static max-value label (MAX_DURATION_DAYS is 14),
    // so there are two matches once the duration reaches the max; the duration counter renders first.
    expect(screen.getAllByText('14 days')[0]).toBeInTheDocument()

    const expected14 = calculateCost({ durationDays: 14, adults: 2, children: 0, travelerType: 'couple' })
    expect(screen.getByText(`$${expected14.totalUsd.toLocaleString()}`)).toBeInTheDocument()
  })

  it('opens the lock-in drawer when the CTA is clicked', () => {
    render(<JourneyArchitect />)
    fireEvent.click(screen.getByRole('button', { name: /lock in this itinerary/i }))
    expect(screen.getByText('Lock in this itinerary')).toBeInTheDocument()
  })
})
