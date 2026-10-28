import { render, screen } from '@testing-library/react'
import { RouteTimeline } from '../../../components/journeyArchitect/RouteTimeline'

describe('RouteTimeline', () => {
  it('renders one entry per stop, in order, with day badges', () => {
    render(
      <RouteTimeline
        stops={[
          { day: 1, location: 'Paro', description: 'Arrival day.' },
          { day: 2, location: 'Thimphu', description: 'Capital sightseeing.' },
        ]}
      />
    )

    const locations = screen.getAllByText(/^(Paro|Thimphu)$/)
    expect(locations.map((el) => el.textContent)).toEqual(['Paro', 'Thimphu'])
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('Arrival day.')).toBeInTheDocument()
  })
})
