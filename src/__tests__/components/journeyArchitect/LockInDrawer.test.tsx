import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import { LockInDrawer } from '../../../components/journeyArchitect/LockInDrawer'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const breakdown = {
  sdf: { label: 'Sustainable Development Fee', amountUsd: 200 },
  accommodation: { label: 'Accommodation', amountUsd: 240 },
  guide: { label: 'Licensed Guide', amountUsd: 105 },
  transit: { label: 'Private Transit', amountUsd: 135 },
  totalUsd: 680,
}

const routeStops = [
  { day: 1, location: 'Paro', description: 'Arrival.' },
  { day: 2, location: 'Thimphu', description: 'Sightseeing.' },
]

const input = { durationDays: 3, adults: 1, children: 0, travelerType: 'solo' as const }

describe('LockInDrawer', () => {
  afterEach(() => jest.clearAllMocks())

  it('submits the calculator summary to /api/contact with source journey-architect', async () => {
    mockedAxios.post.mockResolvedValueOnce({ status: 201, data: {} })

    render(<LockInDrawer isOpen onClose={jest.fn()} input={input} breakdown={breakdown} routeStops={routeStops} />)

    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Jane Doe' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jane@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /confirm request/i }))

    await waitFor(() =>
      expect(mockedAxios.post).toHaveBeenCalledWith(
        '/api/contact',
        expect.objectContaining({
          name: 'Jane Doe',
          email: 'jane@example.com',
          source: 'journey-architect',
          durationDays: 3,
          estimatedCostUsd: 680,
        }),
        expect.anything()
      )
    )

    await waitFor(() => expect(screen.getByText('Request sent!')).toBeInTheDocument())
  })

  it('shows a validation error and does not submit when name/email are missing', () => {
    render(<LockInDrawer isOpen onClose={jest.fn()} input={input} breakdown={breakdown} routeStops={routeStops} />)

    fireEvent.click(screen.getByRole('button', { name: /confirm request/i }))

    expect(screen.getByText('Please provide your name and email.')).toBeInTheDocument()
    expect(mockedAxios.post).not.toHaveBeenCalled()
  })
})
