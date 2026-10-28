import { render, screen, fireEvent } from '@testing-library/react'
import { DurationSlider } from '../../../components/journeyArchitect/DurationSlider'
import { MIN_DURATION_DAYS, MAX_DURATION_DAYS } from '../../../lib/calculator-utils'

describe('DurationSlider', () => {
  it('sets the slider bounds from the shared duration constants', () => {
    render(<DurationSlider value={5} onChange={jest.fn()} />)
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('min', String(MIN_DURATION_DAYS))
    expect(slider).toHaveAttribute('max', String(MAX_DURATION_DAYS))
  })

  it('displays the current duration', () => {
    render(<DurationSlider value={5} onChange={jest.fn()} />)
    expect(screen.getByText('5 days')).toBeInTheDocument()
  })

  it('calls onChange with the new value when moved', () => {
    const onChange = jest.fn()
    render(<DurationSlider value={5} onChange={onChange} />)
    fireEvent.change(screen.getByRole('slider'), { target: { value: '10' } })
    expect(onChange).toHaveBeenCalledWith(10)
  })

  it('uses the singular "day" label for a value of 1', () => {
    render(<DurationSlider value={1} onChange={jest.fn()} />)
    expect(screen.getByText('1 day')).toBeInTheDocument()
  })
})
