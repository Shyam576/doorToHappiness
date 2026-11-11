// Trip-cost rates for the Journey Architect calculator.
// SDF, guide, and accommodation below are grounded in publicly reported 2026
// Bhutan tourism market rates (see citations per constant) rather than
// invented numbers — but they are still estimates, not DoorToHappiness's own
// negotiated tariffs. Confirm against your current hotel/guide contracts
// before treating this as a final quote. Transit remains an unverified
// placeholder (not covered by this pass).

// Confirmed: official international-visitor SDF, in effect through at least
// 2027 (one source reports an extension to 2029). Child rate is the
// documented half-rate for ages 6-12.
// https://littlebhutan.com/travel-guide/bhutan-sdf/
export const SDF_PER_ADULT_PER_NIGHT_USD = 100
export const SDF_PER_CHILD_PER_NIGHT_USD = 50 // ages 6-12

// Per-person-per-night, full-board "Standard" (3-star) tour-package tariff —
// the figure relevant to an operator-booked trip (not an independent room
// rate). Source lists solo/twin-share/3-or-more tiers; family and
// trekking-group both map to the 3-or-more tier here.
// https://www.keystobhutan.com/?p=68369
export const ACCOMMODATION_PER_NIGHT_USD_BY_TYPE: Record<
  'solo' | 'couple' | 'family' | 'trekking-group',
  number
> = {
  solo: 200,
  couple: 140,
  family: 120,
  'trekking-group': 120,
}

// Blended cultural/trekking licensed-guide day rate (reported range $30-80/day
// depending on guide type); not yet split by trip type in this calculator.
// https://www.langtangtreks.com/blog/?p=1712
export const GUIDE_PER_DAY_USD = 45

export const TRANSIT_PER_DAY_USD = 45 // PLACEHOLDER — not updated in this pass

export interface RouteTemplateStop {
  location: string
  description: string
}

export interface RouteTemplate {
  minDays: number
  maxDays: number
  stops: RouteTemplateStop[]
}

// Stop names mirror the towns already featured in src/data/destinations.json
// (Paro, Thimphu, Punakha, Phobjika) so the illustrative route reflects real
// Bhutanese geography rather than invented place names.
export const ROUTE_TEMPLATES: RouteTemplate[] = [
  {
    minDays: 3,
    maxDays: 4,
    stops: [
      { location: 'Paro', description: "Arrival, Rinpung Dzong, and the approach to Taktsang (Tiger's Nest)." },
      { location: 'Thimphu', description: 'Capital city sightseeing: Tashichho Dzong, Buddha Dordenma, and local markets.' },
    ],
  },
  {
    minDays: 5,
    maxDays: 7,
    stops: [
      { location: 'Paro', description: "Arrival, Rinpung Dzong, and the hike to Taktsang (Tiger's Nest)." },
      { location: 'Thimphu', description: 'Capital city sightseeing and local culture.' },
      { location: 'Punakha', description: 'Punakha Dzong and the Mo Chhu / Pho Chhu river valley.' },
    ],
  },
  {
    minDays: 8,
    maxDays: 10,
    stops: [
      { location: 'Paro', description: "Arrival, Rinpung Dzong, and the hike to Taktsang (Tiger's Nest)." },
      { location: 'Thimphu', description: 'Capital city sightseeing and local culture.' },
      { location: 'Punakha', description: 'Punakha Dzong and the river valley.' },
      { location: 'Phobjika', description: 'Gangtey Monastery and the Phobjikha Valley.' },
    ],
  },
  {
    minDays: 11,
    maxDays: 14,
    stops: [
      { location: 'Paro', description: "Arrival, Rinpung Dzong, and the hike to Taktsang (Tiger's Nest)." },
      { location: 'Thimphu', description: 'Capital city sightseeing and local culture.' },
      { location: 'Punakha', description: 'Punakha Dzong and the river valley.' },
      { location: 'Phobjika', description: 'Gangtey Monastery and the Phobjikha Valley.' },
      { location: 'Bumthang', description: 'Historic temples and the cultural heartland of central Bhutan.' },
    ],
  },
]
