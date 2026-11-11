import { getToursForDzongkhag, getDzongkhagsForRoute, getDzongkhagLinksForRoute } from '../../lib/tour-mapping'

describe('getToursForDzongkhag', () => {
  it('finds tours whose route mentions the given dzongkhag, case-insensitively', () => {
    const tours = getToursForDzongkhag('paro')
    expect(tours.length).toBeGreaterThan(0)
    expect(tours.every((t) => t.id && t.title && t.url)).toBe(true)
  })

  it('returns an empty array for a dzongkhag no tour route mentions', () => {
    // Gasa is a real, sparsely-visited dzongkhag unlikely to appear in every tour's route;
    // this just proves the function can return nothing rather than always matching something.
    const tours = getToursForDzongkhag('Zzzznonexistentplace')
    expect(tours).toEqual([])
  })

  it('respects the limit parameter', () => {
    const tours = getToursForDzongkhag('paro', 1)
    expect(tours.length).toBeLessThanOrEqual(1)
  })

  it('builds a real package URL for each matched tour', () => {
    const tours = getToursForDzongkhag('paro', 1)
    expect(tours[0]?.url).toMatch(/^\/package\//)
  })
})

describe('getDzongkhagsForRoute', () => {
  it('extracts dzongkhag names mentioned in a route string', () => {
    const names = getDzongkhagsForRoute('Paro - Thimphu - Punakha - Gangtey - Bumthang')
    expect(names).toEqual(expect.arrayContaining(['Paro', 'Thimphu', 'Punakha', 'Bumthang']))
  })

  it('returns an empty array for an undefined or non-matching route', () => {
    expect(getDzongkhagsForRoute(undefined)).toEqual([])
    expect(getDzongkhagsForRoute('Bagdogra to Bagdogra')).toEqual([])
  })
})

describe('getDzongkhagLinksForRoute', () => {
  it('resolves matched dzongkhag names to real {name, slug} page links', () => {
    const links = getDzongkhagLinksForRoute('Paro - Thimphu - Punakha')
    expect(links.length).toBeGreaterThanOrEqual(3)
    const paro = links.find((l) => l.name === 'Paro')
    expect(paro).toEqual({ name: 'Paro', slug: 'paro' })
  })

  it('returns an empty array when nothing matches', () => {
    expect(getDzongkhagLinksForRoute('Bagdogra to Bagdogra')).toEqual([])
  })
})
