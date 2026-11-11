import { useState } from 'react'
import { useRouter } from 'next/router'
import { calculateCost, TravelerType, MIN_DURATION_DAYS, MAX_DURATION_DAYS } from '../lib/calculator-utils'

const TRAVELER_TYPE_OPTIONS: { value: TravelerType; label: string; adults: number; children: number }[] = [
  { value: 'solo', label: 'Solo', adults: 1, children: 0 },
  { value: 'couple', label: 'Couple', adults: 2, children: 0 },
  { value: 'family', label: 'Family', adults: 2, children: 2 },
  { value: 'trekking-group', label: 'Group', adults: 4, children: 0 },
]

/**
 * A compact, hero-sized version of the Journey Architect calculator: trip length + traveler type
 * only (no adult/children fine-tuning — that's what the full /plan-your-trip page is for), showing
 * a live estimated price so the hero itself demonstrates the site's main conversion tool instead of
 * just linking to it. Each traveler type maps to a representative headcount (see
 * TRAVELER_TYPE_OPTIONS) purely to produce an illustrative starting estimate; the full calculator
 * page lets visitors adjust adults/children exactly once they land there via the deep link below.
 */
export default function TripCostPreview() {
  const router = useRouter()
  const [durationDays, setDurationDays] = useState(7)
  const [travelerType, setTravelerType] = useState<TravelerType>('couple')

  const selected = TRAVELER_TYPE_OPTIONS.find((option) => option.value === travelerType)!
  const breakdown = calculateCost({
    durationDays,
    adults: selected.adults,
    children: selected.children,
    travelerType,
  })

  const handleSeeFullItinerary = () => {
    router.push({
      pathname: '/plan-your-trip',
      query: {
        duration: durationDays,
        adults: selected.adults,
        children: selected.children,
        travelerType,
      },
    })
  }

  return (
    <div className="mt-4 sm:mt-6 md:mt-8 bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 bg-opacity-95 mx-2 sm:mx-4">
      <h2 className="text-base sm:text-xl md:text-2xl font-bold text-stone-900 mb-3 sm:mb-4">
        Build Your Bhutan Trip
      </h2>

      <div className="flex items-center justify-between mb-2">
        <label htmlFor="hero-duration" className="text-sm font-medium text-stone-700">
          Trip length
        </label>
        <span className="text-sm font-semibold text-amber-700">
          {durationDays} {durationDays === 1 ? 'day' : 'days'}
        </span>
      </div>
      <input
        id="hero-duration"
        type="range"
        min={MIN_DURATION_DAYS}
        max={MAX_DURATION_DAYS}
        step={1}
        value={durationDays}
        onChange={(e) => setDurationDays(Number(e.target.value))}
        className="w-full accent-amber-600"
        aria-valuemin={MIN_DURATION_DAYS}
        aria-valuemax={MAX_DURATION_DAYS}
        aria-valuenow={durationDays}
      />

      <div role="radiogroup" aria-label="Traveler type" className="grid grid-cols-4 gap-2 mt-4 mb-4">
        {TRAVELER_TYPE_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={travelerType === option.value}
            onClick={() => setTravelerType(option.value)}
            className={`px-2 py-2 rounded-lg border-2 text-xs sm:text-sm font-medium transition-colors ${
              travelerType === option.value
                ? 'border-amber-600 bg-amber-50 text-amber-800'
                : 'border-stone-300 text-stone-700 hover:border-amber-300'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="flex items-baseline justify-between bg-stone-50 rounded-lg px-4 py-3 mb-4">
        <span className="text-sm font-medium text-stone-700">Estimated total</span>
        <span className="text-2xl font-bold text-amber-700">${breakdown.totalUsd.toLocaleString()}</span>
      </div>

      <button
        type="button"
        onClick={handleSeeFullItinerary}
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 sm:py-3 px-4 rounded-lg transition text-sm sm:text-base"
      >
        See My Full Itinerary & Price
      </button>
      <p className="text-xs text-stone-500 mt-2 text-center">
        Estimate only — your final quote will be confirmed by our team.
      </p>
    </div>
  )
}
