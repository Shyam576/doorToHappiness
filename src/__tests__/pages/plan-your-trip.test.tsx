import { render, screen } from '@testing-library/react'
import PlanYourTripPage from '../../pages/plan-your-trip/index'

describe('PlanYourTripPage', () => {
  it('renders the heading and the calculator', () => {
    render(<PlanYourTripPage />)
    expect(screen.getByRole('heading', { name: 'Plan Your Bhutan Trip' })).toBeInTheDocument()
    expect(screen.getByText('Lock in this Itinerary')).toBeInTheDocument()
  })
})
