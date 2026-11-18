import { useState } from 'react'
import { CalculatorInput, TravelerType, calculateCost, getRouteForDuration } from '../../lib/calculator-utils'
import { DurationSlider } from './DurationSlider'
import { TravelerSelector } from './TravelerSelector'
import { RouteTimeline } from './RouteTimeline'
import { CostBreakdown } from './CostBreakdown'
import { LockInDrawer } from './LockInDrawer'

const DEFAULT_INPUT: CalculatorInput = {
  durationDays: 7,
  adults: 2,
  children: 0,
  travelerType: 'couple',
}

interface JourneyArchitectProps {
  /** Lets callers (e.g. a homepage preview picker deep-linking here via URL query params) open the calculator pre-filled instead of always at the default. */
  initialInput?: CalculatorInput
}

export function JourneyArchitect({ initialInput = DEFAULT_INPUT }: JourneyArchitectProps) {
  const [input, setInput] = useState<CalculatorInput>(initialInput)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const breakdown = calculateCost(input)
  const routeStops = getRouteForDuration(input.durationDays)

  const sectionLabel = (n: string, t: string) => (
    <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">
      <span aria-hidden="true">{n}</span>
      <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
      {t}
    </p>
  )

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
      <div className="space-y-14">
        <section aria-label="Your trip">
          {sectionLabel('01', 'Shape your trip')}
          <div className="space-y-10">
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
          </div>
        </section>
        <section aria-label="Your route">
          {sectionLabel('02', 'Your route')}
          <RouteTimeline stops={routeStops} />
        </section>
      </div>

      <div className="lg:sticky lg:top-28 lg:self-start" aria-live="polite">
        <CostBreakdown breakdown={breakdown} />
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="mt-4 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-emerald-900 px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
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
