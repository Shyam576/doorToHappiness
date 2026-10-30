import { normalizeItinerary, parseDifficulty } from '../../lib/package-card-utils'

describe('parseDifficulty', () => {
  it('returns null when no difficulty text is given', () => {
    expect(parseDifficulty(undefined)).toBeNull()
    expect(parseDifficulty('')).toBeNull()
  })

  it('maps text mentioning "challenging" to Challenging, even when combined with a lower tier', () => {
    expect(parseDifficulty('Moderate to challenging')).toBe('Challenging')
    expect(parseDifficulty('Extremely challenging')).toBe('Challenging')
  })

  it('maps plain "moderate" text to Moderate', () => {
    expect(parseDifficulty('Moderate')).toBe('Moderate')
    expect(parseDifficulty('Easy to moderate (some walking and high altitude)')).toBe('Moderate')
    expect(parseDifficulty('Moderate (high altitude and some walking)')).toBe('Moderate')
  })

  it('maps plain "easy" text to Easy', () => {
    expect(parseDifficulty('Easy (minimal walking required)')).toBe('Easy')
  })

  it('returns null for unrecognized free text', () => {
    expect(parseDifficulty('Some totally unrelated description')).toBeNull()
  })
})

describe('normalizeItinerary', () => {
  it('normalizes the detailed_itinerary shape (trekking/cultural/festival/group tours)', () => {
    const tour = {
      detailed_itinerary: [
        { day: 1, title: 'Arrival in Paro', activities: ['Airport pickup', 'Acclimatization'] },
        { day: 2, title: 'Paro to Thimphu', activities: ['Drive to Thimphu'] },
      ],
    }

    expect(normalizeItinerary(tour)).toEqual([
      { day: 1, title: 'Arrival in Paro', summary: 'Airport pickup, Acclimatization' },
      { day: 2, title: 'Paro to Thimphu', summary: 'Drive to Thimphu' },
    ])
  })

  it('normalizes the itinerary shape (major city tours), deriving day numbers from array position', () => {
    const tour = {
      itinerary: [
        { title: 'Day 1', description: 'Arrival at Paro Airport, Transfer to Thimphu', details: 'A long narrative paragraph...' },
        { title: 'Day 2', description: 'Thimphu sightseeing', details: 'Another long paragraph...' },
      ],
    }

    expect(normalizeItinerary(tour)).toEqual([
      { day: 1, title: 'Day 1', summary: 'Arrival at Paro Airport, Transfer to Thimphu' },
      { day: 2, title: 'Day 2', summary: 'Thimphu sightseeing' },
    ])
  })

  it('returns an empty array when a tour has neither itinerary shape', () => {
    expect(normalizeItinerary({})).toEqual([])
  })
})
