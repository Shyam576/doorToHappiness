import React from 'react'
import { render, screen } from '@testing-library/react'
import TourDestinationLinks from '../../components/TourDestinationLinks'

describe('TourDestinationLinks', () => {
  it('links to the real dzongkhag pages mentioned in the route', () => {
    render(<TourDestinationLinks route="Paro - Thimphu - Punakha" />)
    const paroLink = screen.getByRole('link', { name: /paro/i })
    expect(paroLink).toHaveAttribute('href', '/dzongkhag/paro')
    expect(screen.getByRole('link', { name: /thimphu/i })).toHaveAttribute('href', '/dzongkhag/thimphu')
  })

  it('renders nothing when the route matches no dzongkhag', () => {
    const { container } = render(<TourDestinationLinks route="Bagdogra to Bagdogra" />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing when route is undefined', () => {
    const { container } = render(<TourDestinationLinks route={undefined} />)
    expect(container).toBeEmptyDOMElement()
  })
})
