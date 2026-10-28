import { render, screen } from '@testing-library/react'
import { CostBreakdown } from '../../../components/journeyArchitect/CostBreakdown'

describe('CostBreakdown', () => {
  it('renders each line item and the total', () => {
    render(
      <CostBreakdown
        breakdown={{
          sdf: { label: 'Sustainable Development Fee', amountUsd: 200 },
          accommodation: { label: 'Accommodation', amountUsd: 240 },
          guide: { label: 'Licensed Guide', amountUsd: 105 },
          transit: { label: 'Private Transit', amountUsd: 135 },
          totalUsd: 680,
        }}
      />
    )

    expect(screen.getByText('Sustainable Development Fee')).toBeInTheDocument()
    expect(screen.getByText('$200')).toBeInTheDocument()
    expect(screen.getByText('Estimated total')).toBeInTheDocument()
    expect(screen.getByText('$680')).toBeInTheDocument()
  })
})
