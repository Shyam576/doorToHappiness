import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CityPackageCard from '../../components/citiesPackageCard'

const trekTour = {
  id: 'jomolhari-trek',
  title: 'Jomolhari Trek',
  image: '/trek.jpg',
  highlights: ['Stunning mountain views', 'Remote villages', 'Base camp views'],
  duration: '8 days',
  route: 'Paro to Paro',
  description: 'A challenging high-altitude trek.',
  category: 'trekking',
  detailed_itinerary: [
    { day: 1, title: 'Arrival in Paro', activities: ['Airport pickup', 'Acclimatization'] },
    { day: 2, title: 'Paro to Shana', activities: ['Trek to base camp'] },
  ],
  inclusions: ['Camping equipment', 'All meals'],
  trek_details: { difficulty: 'Moderate to challenging' },
}

const cityTour = {
  id: 'thimphu-city',
  title: 'Thimphu City Tour',
  image: '/city.jpg',
  highlights: ['Tashichho Dzong', 'Weekend market'],
  duration: '3 days',
  route: 'Paro to Thimphu',
  description: 'A relaxed city tour.',
  category: 'city',
  itinerary: [
    { title: 'Day 1', description: 'Arrival at Paro Airport, Transfer to Thimphu' },
  ],
  inclusions: ['Hotel accommodation', 'Breakfast'],
}

describe('CityPackageCard', () => {
  it('shows the Highlights tab by default', () => {
    render(<CityPackageCard tour={trekTour} />)
    expect(screen.getByText('Stunning mountain views')).toBeInTheDocument()
  })

  it('switches to the Itinerary tab and shows normalized day-by-day content', () => {
    render(<CityPackageCard tour={trekTour} />)
    fireEvent.click(screen.getByRole('tab', { name: 'Itinerary' }))
    expect(screen.getByText('Arrival in Paro')).toBeInTheDocument()
    expect(screen.getByText('Airport pickup, Acclimatization')).toBeInTheDocument()
  })

  it('switches to the Inclusions tab and shows the inclusions list', () => {
    render(<CityPackageCard tour={trekTour} />)
    fireEvent.click(screen.getByRole('tab', { name: 'Inclusions' }))
    expect(screen.getByText('Camping equipment')).toBeInTheDocument()
    expect(screen.getByText('All meals')).toBeInTheDocument()
  })

  it('shows a parsed difficulty badge when difficulty data exists', () => {
    render(<CityPackageCard tour={trekTour} />)
    expect(screen.getByText('Challenging')).toBeInTheDocument()
  })

  it('shows no difficulty badge when no difficulty data exists', () => {
    render(<CityPackageCard tour={cityTour} />)
    expect(screen.queryByText('Easy')).not.toBeInTheDocument()
    expect(screen.queryByText('Moderate')).not.toBeInTheDocument()
    expect(screen.queryByText('Challenging')).not.toBeInTheDocument()
  })

  it('normalizes the city-tour itinerary shape in the Itinerary tab', () => {
    render(<CityPackageCard tour={cityTour} />)
    fireEvent.click(screen.getByRole('tab', { name: 'Itinerary' }))
    expect(screen.getByText('Arrival at Paro Airport, Transfer to Thimphu')).toBeInTheDocument()
  })

  it('still links to the correct tour detail page', () => {
    render(<CityPackageCard tour={trekTour} />)
    expect(screen.getByRole('link', { name: /view details/i })).toHaveAttribute(
      'href',
      '/package/trekking/jomolhari-trek'
    )
  })
})
