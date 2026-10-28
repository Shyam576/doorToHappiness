import { calculateCost, getRouteForDuration } from '../../lib/calculator-utils'

describe('calculateCost', () => {
  it('computes the breakdown for a solo traveler on a 3-day trip', () => {
    const result = calculateCost({ durationDays: 3, adults: 1, children: 0, travelerType: 'solo' })

    expect(result.sdf.amountUsd).toBe(200)
    expect(result.accommodation.amountUsd).toBe(240)
    expect(result.guide.amountUsd).toBe(105)
    expect(result.transit.amountUsd).toBe(135)
    expect(result.totalUsd).toBe(680)
  })

  it('computes the breakdown for a family with children on a 7-day trip', () => {
    const result = calculateCost({ durationDays: 7, adults: 2, children: 2, travelerType: 'family' })

    expect(result.sdf.amountUsd).toBe(1800)
    expect(result.accommodation.amountUsd).toBe(1920)
    expect(result.guide.amountUsd).toBe(245)
    expect(result.transit.amountUsd).toBe(315)
    expect(result.totalUsd).toBe(4280)
  })

  it('clamps duration above the maximum to 14 days', () => {
    const result = calculateCost({ durationDays: 20, adults: 1, children: 0, travelerType: 'couple' })
    const expected = calculateCost({ durationDays: 14, adults: 1, children: 0, travelerType: 'couple' })

    expect(result).toEqual(expected)
  })

  it('clamps duration below the minimum to 3 days', () => {
    const result = calculateCost({ durationDays: 1, adults: 1, children: 0, travelerType: 'solo' })
    const expected = calculateCost({ durationDays: 3, adults: 1, children: 0, travelerType: 'solo' })

    expect(result).toEqual(expected)
  })

  it('clamps adults below the minimum to 1 and children below the minimum to 0', () => {
    const result = calculateCost({ durationDays: 5, adults: 0, children: -3, travelerType: 'couple' })
    const expected = calculateCost({ durationDays: 5, adults: 1, children: 0, travelerType: 'couple' })

    expect(result).toEqual(expected)
  })
})

describe('getRouteForDuration', () => {
  it('returns one stop per day for a 3-day trip, starting at Paro and ending at Thimphu', () => {
    const route = getRouteForDuration(3)

    expect(route).toHaveLength(3)
    expect(route.map((stop) => stop.day)).toEqual([1, 2, 3])
    expect(route[0].location).toBe('Paro')
    expect(route[route.length - 1].location).toBe('Thimphu')
  })

  it('returns a 14-day route ending at Bumthang', () => {
    const route = getRouteForDuration(14)

    expect(route).toHaveLength(14)
    expect(route[0].location).toBe('Paro')
    expect(route[route.length - 1].location).toBe('Bumthang')
  })

  it('clamps a duration above the maximum to a 14-day route', () => {
    const route = getRouteForDuration(20)
    const expected = getRouteForDuration(14)

    expect(route).toEqual(expected)
  })

  it('clamps a duration below the minimum to a 3-day route', () => {
    const route = getRouteForDuration(1)
    const expected = getRouteForDuration(3)

    expect(route).toEqual(expected)
  })
})
