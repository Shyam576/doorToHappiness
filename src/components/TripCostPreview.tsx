import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { calculateCost, TravelerType, MIN_DURATION_DAYS, MAX_DURATION_DAYS } from '../lib/calculator-utils'

const TRAVELER_TYPE_OPTIONS: { value: TravelerType; label: string; adults: number; children: number }[] = [
  { value: 'solo', label: 'Solo', adults: 1, children: 0 },
  { value: 'couple', label: 'Couple', adults: 2, children: 0 },
  { value: 'family', label: 'Family', adults: 2, children: 2 },
  { value: 'trekking-group', label: 'Group', adults: 4, children: 0 },
]

const QUICK_DESTINATIONS = [
  { href: '/dzongkhag/paro', label: 'Paro' },
  { href: '/dzongkhag/thimphu', label: 'Thimphu' },
  { href: '/dzongkhag/punakha', label: 'Punakha' },
  { href: '/dzongkhag/bumthang', label: 'Bumthang' },
]

/**
 * The home page's trip planner: trip length + traveler type with a live estimate from the real
 * calculator, deep-linking into /plan-your-trip (the full Journey Architect) with the chosen values.
 * Each traveler type maps to a representative headcount (see TRAVELER_TYPE_OPTIONS) purely to
 * produce an illustrative starting estimate; the full page lets visitors set adults/children exactly.
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
    <div className="mx-auto w-full max-w-6xl rounded-lg bg-brand-ivory p-5 shadow-warm-xl ring-1 ring-stone-200 sm:p-7 lg:p-8">
      <div className="grid gap-7 lg:grid-cols-[0.8fr_0.9fr_1.1fr_1.3fr] lg:items-end lg:gap-9">
        {/* Intro */}
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-600">
            Plan your journey
          </p>
          <h2 className="font-heading text-2xl font-medium leading-tight text-stone-900 sm:text-3xl">
            Build Your Bhutan Trip
          </h2>
        </div>

        {/* Trip length */}
        <div>
          <div className="mb-3 flex items-baseline justify-between">
            <label htmlFor="hero-duration" className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-600">
              Trip length
            </label>
            <span className="text-sm font-semibold text-emerald-900">
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
            className="h-11 w-full accent-emerald-900"
            aria-valuemin={MIN_DURATION_DAYS}
            aria-valuemax={MAX_DURATION_DAYS}
            aria-valuenow={durationDays}
          />
        </div>

        {/* Travelers */}
        <div>
          <p id="traveler-type-label" className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-stone-600">
            Travelling as
          </p>
          <div role="radiogroup" aria-labelledby="traveler-type-label" className="grid grid-cols-4 gap-2">
            {TRAVELER_TYPE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={travelerType === option.value}
                onClick={() => setTravelerType(option.value)}
                className={`min-h-[44px] rounded-md border px-2 text-xs font-medium transition-colors sm:text-sm ${
                  travelerType === option.value
                    ? 'border-emerald-900 bg-emerald-900 text-white'
                    : 'border-stone-300 bg-white text-stone-700 hover:border-emerald-800'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Estimate + action */}
        <div>
          <div className="mb-3 flex items-baseline justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-600">Estimated total</span>
            <span className="font-heading text-3xl font-medium text-stone-900">
              ${breakdown.totalUsd.toLocaleString()}
            </span>
          </div>
          <button
            type="button"
            onClick={handleSeeFullItinerary}
            className="min-h-[48px] w-full whitespace-nowrap rounded-full bg-emerald-900 px-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-emerald-800 sm:text-[13px]"
          >
            See My Full Itinerary & Price
          </button>
          <Link
            href="/contactus"
            className="mt-3 flex min-h-[48px] w-full items-center justify-center whitespace-nowrap rounded-full border border-emerald-900 px-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-emerald-900 transition-colors hover:bg-emerald-900 hover:text-white sm:text-[13px]"
          >
            Enquire Now
          </Link>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-stone-200 pt-5 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
        <p>Estimate only — your final quote will be confirmed by our team.</p>
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="uppercase tracking-[0.16em] text-stone-500">Or start with a place:</span>
          {QUICK_DESTINATIONS.map(({ href, label }) => (
            <Link key={href} href={href} className="font-medium text-emerald-900 underline-offset-4 hover:underline">
              {label}
            </Link>
          ))}
        </p>
      </div>
    </div>
  )
}
