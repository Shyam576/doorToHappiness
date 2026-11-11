import popularDestination from '../data/popularDestination.json'
import majorCitiesPackage from '../data/majorCitiesPackage.json'
import culturalTours from '../data/culturalTours.json'
import festivalTours from '../data/festivialTours.json'
import trekkingAdventures from '../data/trekkingAdventure.json'
import groupTours from '../data/groupTours.json'
import { getTourUrl } from './package-card-utils'

export interface TourSummary {
  id: string
  title: string
  duration: string
  image: string
  url: string
}

interface RawTour {
  id: string
  title: string
  duration?: string
  image: string
  route?: string
  category?: string
}

const ALL_TOURS: RawTour[] = [
  ...(majorCitiesPackage as RawTour[]),
  ...(culturalTours as RawTour[]),
  ...(festivalTours as RawTour[]),
  ...(trekkingAdventures as RawTour[]),
  ...(groupTours as RawTour[]),
]

const DZONGKHAG_NAMES = (popularDestination as { name: string }[]).map((d) => d.name)

function toSummary(tour: RawTour): TourSummary {
  return {
    id: tour.id,
    title: tour.title,
    duration: tour.duration || '',
    image: tour.image,
    url: getTourUrl(tour),
  }
}

/**
 * No tour dataset has a stored foreign key to a dzongkhag/sacred place — this matches on the
 * tour's free-text `route` field (e.g. "Paro - Thimphu - Punakha") instead, since that's the only
 * place real Bhutanese geography already lives in the tour data. A place with no match (city-tour
 * routes mostly just name a departure airport, not Bhutanese dzongkhags) should fall back to a
 * general "plan a custom trip" CTA rather than show nothing.
 */
export function getToursForDzongkhag(dzongkhagName: string, limit = 2): TourSummary[] {
  const needle = dzongkhagName.toLowerCase()
  return ALL_TOURS.filter((tour) => tour.route?.toLowerCase().includes(needle))
    .slice(0, limit)
    .map(toSummary)
}

/** The reverse direction: given a tour's route string, which dzongkhags (by name) does it mention? */
export function getDzongkhagsForRoute(route: string | undefined): string[] {
  if (!route) return []
  const routeLower = route.toLowerCase()
  return DZONGKHAG_NAMES.filter((name) => routeLower.includes(name.toLowerCase()))
}

export interface DzongkhagLink {
  name: string
  slug: string
}

/** Same match as getDzongkhagsForRoute, but resolved to real dzongkhag page links (for cross-linking tour pages to the dzongkhag pages they pass through). */
export function getDzongkhagLinksForRoute(route: string | undefined): DzongkhagLink[] {
  const names = getDzongkhagsForRoute(route)
  return (popularDestination as { name: string; slug: string }[])
    .filter((d) => names.includes(d.name))
    .map((d) => ({ name: d.name, slug: d.slug }))
}
