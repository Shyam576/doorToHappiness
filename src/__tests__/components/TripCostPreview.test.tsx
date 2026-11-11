import { render, screen, fireEvent } from '@testing-library/react'
import TripCostPreview from '../../components/TripCostPreview'
import { calculateCost } from '../../lib/calculator-utils'

const mockPush = jest.fn()
jest.mock('next/router', () => ({
  useRouter: () => ({ push: mockPush }),
}))

describe('TripCostPreview', () => {
  beforeEach(() => jest.clearAllMocks())

  it('shows a default 7-day/couple estimate matching the calculator', () => {
    render(<TripCostPreview />)
    const expected = calculateCost({ durationDays: 7, adults: 2, children: 0, travelerType: 'couple' })
    expect(screen.getByText('7 days')).toBeInTheDocument()
    expect(screen.getByText(`$${expected.totalUsd.toLocaleString()}`)).toBeInTheDocument()
  })

  it('updates the estimate when the traveler type changes', () => {
    render(<TripCostPreview />)
    fireEvent.click(screen.getByRole('radio', { name: 'Family' }))
    const expected = calculateCost({ durationDays: 7, adults: 2, children: 2, travelerType: 'family' })
    expect(screen.getByText(`$${expected.totalUsd.toLocaleString()}`)).toBeInTheDocument()
  })

  it('updates the estimate when the duration slider moves', () => {
    render(<TripCostPreview />)
    fireEvent.change(screen.getByRole('slider'), { target: { value: '10' } })
    const expected = calculateCost({ durationDays: 10, adults: 2, children: 0, travelerType: 'couple' })
    expect(screen.getByText('10 days')).toBeInTheDocument()
    expect(screen.getByText(`$${expected.totalUsd.toLocaleString()}`)).toBeInTheDocument()
  })

  it('deep-links into /plan-your-trip with the chosen duration and the traveler type\'s headcount', () => {
    render(<TripCostPreview />)
    fireEvent.click(screen.getByRole('radio', { name: 'Family' }))
    fireEvent.change(screen.getByRole('slider'), { target: { value: '10' } })
    fireEvent.click(screen.getByRole('button', { name: /see my full itinerary/i }))

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/plan-your-trip',
      query: { duration: 10, adults: 2, children: 2, travelerType: 'family' },
    })
  })
})
