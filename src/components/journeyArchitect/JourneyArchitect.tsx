import { useState } from 'react'
import { CalculatorInput, TravelerType, calculateCost, getRouteForDuration } from '../../lib/calculator-utils'
import { DurationSlider } from './DurationSlider'
import { TravelerSelector } from './TravelerSelector'
import { RouteTimeline } from './RouteTimeline'
import { CostBreakdown } from './CostBreakdown'
import { LockInDrawer } from './LockInDrawer'
import { getTheme } from '../../styles/themes'

const initialInput: CalculatorInput = {
  durationDays: 7,
  adults: 2,
  children: 0,
  travelerType: 'couple',
}

export function JourneyArchitect() {
  const theme = getTheme()
  const [input, setInput] = useState<CalculatorInput>(initialInput)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const breakdown = calculateCost(input)
  const routeStops = getRouteForDuration(input.durationDays)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <DurationSlider
          value={input.durationDays}
          onChange={(durationDays) => setInput((prev) => ({ ...prev, durationDays }))}
        />
        <TravelerSelector
          adults={input.adults}
          childrenCount={input.children}
          travelerType={input.travelerType}
          onAdultsChange={(adults) => setInput((prev) => ({ ...prev, adults }))}
          onChildrenCountChange={(children) => setInput((prev) => ({ ...prev, children }))}
          onTravelerTypeChange={(travelerType: TravelerType) => setInput((prev) => ({ ...prev, travelerType }))}
        />
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">Your route</p>
          <RouteTimeline stops={routeStops} />
        </div>
      </div>

      <div className="space-y-6">
        <CostBreakdown breakdown={breakdown} />
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition ${theme.primary} ${theme.primaryHover}`}
        >
          Lock in this Itinerary
        </button>
      </div>

      <LockInDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        input={input}
        breakdown={breakdown}
        routeStops={routeStops}
      />
    </div>
  )
}
