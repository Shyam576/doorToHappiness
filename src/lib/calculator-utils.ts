import {
  SDF_PER_ADULT_PER_NIGHT_USD,
  SDF_PER_CHILD_PER_NIGHT_USD,
  ACCOMMODATION_PER_NIGHT_USD_BY_TYPE,
  GUIDE_PER_DAY_USD,
  TRANSIT_PER_DAY_USD,
  ROUTE_TEMPLATES,
} from '../data/journeyArchitectRates'

export const MIN_DURATION_DAYS = 3
export const MAX_DURATION_DAYS = 14
export const MIN_ADULTS = 1
export const MIN_CHILDREN = 0

export type TravelerType = 'solo' | 'couple' | 'family' | 'trekking-group'

export interface CalculatorInput {
  durationDays: number
  adults: number
  children: number
  travelerType: TravelerType
}

export interface CostLineItem {
  label: string
  amountUsd: number
}

export interface CostBreakdown {
  sdf: CostLineItem
  accommodation: CostLineItem
  guide: CostLineItem
  transit: CostLineItem
  totalUsd: number
}

export interface RouteStop {
  day: number
  location: string
  description: string
}

function clampInput(input: CalculatorInput): CalculatorInput {
  return {
    durationDays: Math.min(MAX_DURATION_DAYS, Math.max(MIN_DURATION_DAYS, input.durationDays)),
    adults: Math.max(MIN_ADULTS, input.adults),
    children: Math.max(MIN_CHILDREN, input.children),
    travelerType: input.travelerType,
  }
}

export function calculateCost(input: CalculatorInput): CostBreakdown {
  const { durationDays, adults, children, travelerType } = clampInput(input)
  const nights = Math.max(0, durationDays - 1)
  const travelerCount = adults + children

  const sdfAmount = nights * (adults * SDF_PER_ADULT_PER_NIGHT_USD + children * SDF_PER_CHILD_PER_NIGHT_USD)
  const accommodationAmount = nights * travelerCount * ACCOMMODATION_PER_NIGHT_USD_BY_TYPE[travelerType]
  const guideAmount = durationDays * GUIDE_PER_DAY_USD
  const transitAmount = durationDays * TRANSIT_PER_DAY_USD

  const sdf: CostLineItem = { label: 'Sustainable Development Fee', amountUsd: Math.round(sdfAmount) }
  const accommodation: CostLineItem = { label: 'Accommodation', amountUsd: Math.round(accommodationAmount) }
  const guide: CostLineItem = { label: 'Licensed Guide', amountUsd: Math.round(guideAmount) }
  const transit: CostLineItem = { label: 'Private Transit', amountUsd: Math.round(transitAmount) }

  return {
    sdf,
    accommodation,
    guide,
    transit,
    totalUsd: sdf.amountUsd + accommodation.amountUsd + guide.amountUsd + transit.amountUsd,
  }
}

export function getRouteForDuration(days: number): RouteStop[] {
  const clampedDays = Math.min(MAX_DURATION_DAYS, Math.max(MIN_DURATION_DAYS, days))
  const template =
    ROUTE_TEMPLATES.find((t) => clampedDays >= t.minDays && clampedDays <= t.maxDays) ??
    ROUTE_TEMPLATES[ROUTE_TEMPLATES.length - 1]

  const stops = template.stops
  const result: RouteStop[] = []
  for (let day = 1; day <= clampedDays; day++) {
    const stopIndex = Math.min(stops.length - 1, Math.floor(((day - 1) / clampedDays) * stops.length))
    const stop = stops[stopIndex]
    result.push({ day, location: stop.location, description: stop.description })
  }
  return result
}
