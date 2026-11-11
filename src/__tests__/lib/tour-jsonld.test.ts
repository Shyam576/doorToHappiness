import { buildTourJsonLd } from '../../lib/tour-jsonld'

describe('buildTourJsonLd', () => {
  const baseInput = {
    title: 'Classical Cultural Tour',
    description: 'A cultural journey across Bhutan.',
    image: '/tours/cultural-1.jpg',
    path: '/package/cultural/cultural-1',
    touristType: 'Cultural Tourism',
    itinerary: [
      { day: 1, title: 'Arrival in Paro', summary: 'Airport pickup, Tiger\'s Nest hike' },
      { day: 2, title: 'Day 2', summary: 'Thimphu sightseeing' },
    ],
  }

  it('builds a TouristTrip (not Product) with no fabricated price/offers', () => {
    const jsonLd = buildTourJsonLd(baseInput)
    expect(jsonLd['@type']).toBe('TouristTrip')
    expect(jsonLd).not.toHaveProperty('offers')
  })

  it('resolves a relative image against SITE_URL and builds the canonical url from path', () => {
    const jsonLd = buildTourJsonLd(baseInput)
    expect(jsonLd.image).toBe('https://dthholiday.com/tours/cultural-1.jpg')
    expect(jsonLd.url).toBe('https://dthholiday.com/package/cultural/cultural-1')
  })

  it('keeps an absolute image URL as-is', () => {
    const jsonLd = buildTourJsonLd({ ...baseInput, image: 'https://cdn.example.com/pic.jpg' })
    expect(jsonLd.image).toBe('https://cdn.example.com/pic.jpg')
  })

  it('numbers itinerary entries and only appends the title when it differs from "Day N"', () => {
    const jsonLd = buildTourJsonLd(baseInput)
    const items = jsonLd.itinerary.itemListElement
    expect(items).toHaveLength(2)
    expect(items[0]).toMatchObject({ position: 1, name: 'Day 1: Arrival in Paro', description: 'Airport pickup, Tiger\'s Nest hike' })
    // day 2's title is literally "Day 2" (the city-tour data shape) — shouldn't render as "Day 2: Day 2"
    expect(items[1]).toMatchObject({ position: 2, name: 'Day 2' })
  })

  it('includes the provider as a TravelAgency pointing at SITE_URL', () => {
    const jsonLd = buildTourJsonLd(baseInput)
    expect(jsonLd.provider).toEqual({
      '@type': 'TravelAgency',
      name: 'Door to Happiness Holiday',
      url: 'https://dthholiday.com',
    })
  })
})
