import { render, screen, fireEvent } from '@testing-library/react'
import { TravelerSelector } from '../../../components/journeyArchitect/TravelerSelector'

describe('TravelerSelector', () => {
  const baseProps = {
    adults: 2,
    childrenCount: 1,
    travelerType: 'couple' as const,
    onAdultsChange: jest.fn(),
    onChildrenCountChange: jest.fn(),
    onTravelerTypeChange: jest.fn(),
  }

  it('increments adults when the increase button is clicked', () => {
    const onAdultsChange = jest.fn()
    render(<TravelerSelector {...baseProps} onAdultsChange={onAdultsChange} />)
    fireEvent.click(screen.getByLabelText('Increase adults'))
    expect(onAdultsChange).toHaveBeenCalledWith(3)
  })

  it('does not decrement adults below the minimum of 1', () => {
    const onAdultsChange = jest.fn()
    render(<TravelerSelector {...baseProps} adults={1} onAdultsChange={onAdultsChange} />)
    fireEvent.click(screen.getByLabelText('Decrease adults'))
    expect(onAdultsChange).toHaveBeenCalledWith(1)
  })

  it('does not decrement children below the minimum of 0', () => {
    const onChildrenCountChange = jest.fn()
    render(<TravelerSelector {...baseProps} childrenCount={0} onChildrenCountChange={onChildrenCountChange} />)
    fireEvent.click(screen.getByLabelText('Decrease children'))
    expect(onChildrenCountChange).toHaveBeenCalledWith(0)
  })

  it('selects a traveler type', () => {
    const onTravelerTypeChange = jest.fn()
    render(<TravelerSelector {...baseProps} onTravelerTypeChange={onTravelerTypeChange} />)
    fireEvent.click(screen.getByRole('radio', { name: 'Family' }))
    expect(onTravelerTypeChange).toHaveBeenCalledWith('family')
  })
})
