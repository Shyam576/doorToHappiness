// Placeholder trip-cost rates for the Journey Architect calculator.
// These are NOT official figures. Replace every PLACEHOLDER value below with
// current rates (Sustainable Development Fee, accommodation, guide, transit)
// before this calculator is used to produce real quotes.

export const SDF_PER_ADULT_PER_NIGHT_USD = 100 // PLACEHOLDER
export const SDF_PER_CHILD_PER_NIGHT_USD = 50 // PLACEHOLDER — ages 6-12

export const ACCOMMODATION_PER_NIGHT_USD_BY_TYPE: Record<
  'solo' | 'couple' | 'family' | 'trekking-group',
  number
> = {
  solo: 120, // PLACEHOLDER
  couple: 95, // PLACEHOLDER — blended per-person rate, shared room
  family: 80, // PLACEHOLDER — blended per-person rate, group discount
  'trekking-group': 70, // PLACEHOLDER — blended per-person rate, group discount
}

export const GUIDE_PER_DAY_USD = 35 // PLACEHOLDER
export const TRANSIT_PER_DAY_USD = 45 // PLACEHOLDER

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
