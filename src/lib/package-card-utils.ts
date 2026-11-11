export type Difficulty = 'Easy' | 'Moderate' | 'Challenging'

export function parseDifficulty(raw: string | undefined): Difficulty | null {
  if (!raw) return null
  const text = raw.toLowerCase()

  if (text.includes('challenging') || text.includes('extreme') || text.includes('difficult') || text.includes('hard')) {
    return 'Challenging'
  }
  if (text.includes('moderate')) {
    return 'Moderate'
  }
  if (text.includes('easy')) {
    return 'Easy'
  }
  return null
}

export interface ItineraryDay {
  day: number | string
  title: string
  summary: string
}

interface DetailedItineraryDay {
  // Usually a single day number, but some tours group several days into one
  // itinerary entry with a range string like "3-4".
  day: number | string
  title: string
  activities?: string[]
}

interface CityItineraryDay {
  title: string
  description?: string
}

interface TourWithItinerary {
  detailed_itinerary?: DetailedItineraryDay[]
  itinerary?: CityItineraryDay[]
}

export function normalizeItinerary(tour: TourWithItinerary): ItineraryDay[] {
  if (Array.isArray(tour.detailed_itinerary)) {
    return tour.detailed_itinerary.map((d) => ({
      day: d.day,
      title: d.title,
      summary: Array.isArray(d.activities) ? d.activities.join(', ') : '',
    }))
  }

  if (Array.isArray(tour.itinerary)) {
    return tour.itinerary.map((d, index) => ({
      day: index + 1,
      title: d.title,
      summary: d.description ?? '',
    }))
  }

  return []
}
