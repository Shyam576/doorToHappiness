import { SITE_URL } from '../config/site'
import { ItineraryDay } from './package-card-utils'

export interface TourJsonLdInput {
  title: string
  description: string
  image: string
  path: string
  touristType: string
  itinerary: ItineraryDay[]
}

/**
 * TouristTrip is the schema.org type for trip/itinerary content — not Product, which Google's
 * structured-data guidelines reserve for physical goods (misusing it for a service/trip risks a
 * manual action). Deliberately has no `offers`/price: none of the tour data files have a
 * trustworthy currency recorded anywhere, so a guessed one would be fabricated structured data.
 */
export function buildTourJsonLd({ title, description, image, path, touristType, itinerary }: TourJsonLdInput) {
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: title,
    description,
    image: imageUrl,
    url: `${SITE_URL}${path}`,
    touristType,
    provider: {
      '@type': 'TravelAgency',
      name: 'Door to Happiness Holiday',
      url: SITE_URL,
    },
    itinerary: {
      '@type': 'ItemList',
      itemListElement: itinerary.map((day, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: `Day ${day.day}${day.title && day.title !== `Day ${day.day}` ? `: ${day.title}` : ''}`,
        description: day.summary || undefined,
      })),
    },
  }
}
