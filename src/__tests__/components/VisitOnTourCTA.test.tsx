import React from 'react'
import { render, screen } from '@testing-library/react'
import VisitOnTourCTA from '../../components/VisitOnTourCTA'
import { getToursForDzongkhag } from '../../lib/tour-mapping'

jest.mock('../../lib/tour-mapping')
const mockedGetTours = getToursForDzongkhag as jest.Mock

describe('VisitOnTourCTA', () => {
  afterEach(() => jest.clearAllMocks())

  it('shows the matched tour, no fabricated price, and a WhatsApp link mentioning the page', () => {
    mockedGetTours.mockReturnValue([
      { id: 'cultural-1', title: 'Classical Cultural Tour', duration: '8N/9D', image: '/img.jpg', url: '/package/cultural/cultural-1' },
    ])
    render(<VisitOnTourCTA dzongkhagName="Paro" pageLabel="Taktshang Monastery" />)

    expect(screen.getByText('Classical Cultural Tour')).toBeInTheDocument()
    expect(screen.getByText('8N/9D')).toBeInTheDocument()
    expect(screen.queryByText(/\$\d/)).not.toBeInTheDocument()

    const link = screen.getByRole('link', { name: /view itinerary/i })
    expect(link).toHaveAttribute('href', '/package/cultural/cultural-1')

    const whatsapp = screen.getByRole('link', { name: /ask us on whatsapp/i })
    expect(decodeURIComponent(whatsapp.getAttribute('href') || '')).toContain('Taktshang Monastery')
  })

  it('falls back to the custom trip planner when no tour matches', () => {
    mockedGetTours.mockReturnValue([])
    render(<VisitOnTourCTA dzongkhagName="Gasa" pageLabel="Some Remote Place" />)

    const planLink = screen.getByRole('link', { name: /plan a custom bhutan trip/i })
    expect(planLink).toHaveAttribute('href', '/plan-your-trip')

    const whatsapp = screen.getByRole('link', { name: /ask us on whatsapp/i })
    expect(decodeURIComponent(whatsapp.getAttribute('href') || '')).toContain('Some Remote Place')
  })
})
