import { render, screen } from '@testing-library/react'
import PlanYourTripPage from '../../pages/plan-your-trip/index'
import { calculateCost } from '../../lib/calculator-utils'

const mockUseRouter = jest.fn()
jest.mock('next/router', () => ({
  useRouter: () => mockUseRouter(),
}))

describe('PlanYourTripPage', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({ isReady: true, query: {} })
  })

  it('renders the heading and the calculator', () => {
    render(<PlanYourTripPage />)
    expect(screen.getByRole('heading', { name: 'Plan Your Bhutan Trip' })).toBeInTheDocument()
    expect(screen.getByText('Lock in this Itinerary')).toBeInTheDocument()
  })

  it('defaults to the calculator defaults when the router has no query params', () => {
    render(<PlanYourTripPage />)
    const expected = calculateCost({ durationDays: 7, adults: 2, children: 0, travelerType: 'couple' })
    expect(screen.getByText('7 days')).toBeInTheDocument()
    expect(screen.getByText(`$${expected.totalUsd.toLocaleString()}`)).toBeInTheDocument()
  })

  it('pre-fills the calculator from URL query params once the router is ready', () => {
    mockUseRouter.mockReturnValue({
      isReady: true,
      query: { duration: '10', adults: '3', children: '1', travelerType: 'family' },
    })
    render(<PlanYourTripPage />)
    const expected = calculateCost({ durationDays: 10, adults: 3, children: 1, travelerType: 'family' })
    expect(screen.getByText('10 days')).toBeInTheDocument()
    expect(screen.getByText(`$${expected.totalUsd.toLocaleString()}`)).toBeInTheDocument()
  })

  it('clamps an out-of-range duration from the URL instead of erroring', () => {
    mockUseRouter.mockReturnValue({ isReady: true, query: { duration: '999' } })
    render(<PlanYourTripPage />)
    // '14 days' also appears as the slider's static max-value label, so there are two matches.
    expect(screen.getAllByText('14 days')[0]).toBeInTheDocument()
  })

  it('falls back to the default input while the router is not yet ready', () => {
    mockUseRouter.mockReturnValue({ isReady: false, query: {} })
    render(<PlanYourTripPage />)
    expect(screen.getByText('7 days')).toBeInTheDocument()
  })
})
