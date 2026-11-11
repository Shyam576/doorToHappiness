import { useRouter } from 'next/router'
import { Container } from '../../components/Container'
import { JourneyArchitect } from '../../components/journeyArchitect/JourneyArchitect'
import Seo from '../../components/Seo'
import {
  CalculatorInput,
  TravelerType,
  MIN_DURATION_DAYS,
  MAX_DURATION_DAYS,
  MIN_ADULTS,
  MIN_CHILDREN,
} from '../../lib/calculator-utils'

const VALID_TRAVELER_TYPES: TravelerType[] = ['solo', 'couple', 'family', 'trekking-group']

/** Lets a link (e.g. the homepage's mini trip-cost picker) deep-link here pre-filled, via ?duration=&adults=&children=&travelerType=. Invalid/missing values fall back to the calculator's own defaults rather than erroring. */
function parseInitialInput(query: Record<string, string | string[] | undefined>): CalculatorInput | undefined {
  const { duration, adults, children, travelerType } = query
  if (duration === undefined && adults === undefined && children === undefined && travelerType === undefined) {
    return undefined
  }

  const parsedDuration = Number(duration)
  const parsedAdults = Number(adults)
  const parsedChildren = Number(children)
  const parsedType =
    typeof travelerType === 'string' && VALID_TRAVELER_TYPES.includes(travelerType as TravelerType)
      ? (travelerType as TravelerType)
      : 'couple'

  return {
    durationDays: Number.isFinite(parsedDuration)
      ? Math.min(MAX_DURATION_DAYS, Math.max(MIN_DURATION_DAYS, parsedDuration))
      : 7,
    adults: Number.isFinite(parsedAdults) ? Math.max(MIN_ADULTS, parsedAdults) : 2,
    children: Number.isFinite(parsedChildren) ? Math.max(MIN_CHILDREN, parsedChildren) : 0,
    travelerType: parsedType,
  }
}

export default function PlanYourTripPage() {
  const router = useRouter()
  // router.query is empty until the client router has parsed the URL (router.isReady) — the key
  // forces a fresh JourneyArchitect mount exactly once that happens, so its internal useState
  // picks up the right initial values instead of silently ignoring a later prop change.
  const initialInput = router.isReady ? parseInitialInput(router.query) : undefined

  return (
    <>
      <Seo
        title="Plan Your Bhutan Trip - Door to Happiness Holiday"
        description="Build your own Bhutan itinerary: choose your trip length and travelers, see a live cost estimate and route, then lock it in."
        path="/plan-your-trip"
        ogTitle="Plan Your Bhutan Trip | Door to Happiness Holiday"
        ogDescription="Build your own Bhutan itinerary with a live cost estimate and route timeline."
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Plan Your Bhutan Trip</h1>
            <p className="text-stone-600 mb-8 sm:mb-10 max-w-2xl">
              Adjust your trip length and travelers to see a live cost estimate and route, then lock in your
              itinerary and our team will confirm the details.
            </p>
            <JourneyArchitect key={router.isReady ? 'ready' : 'loading'} initialInput={initialInput} />
          </div>
        </Container>
      </div>
    </>
  )
}
