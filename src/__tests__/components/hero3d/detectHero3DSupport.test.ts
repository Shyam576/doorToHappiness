import { detectHero3DSupport } from '../../../components/hero3d/detectHero3DSupport'

function mockMatchMedia(reducedMotion: boolean) {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: query.includes('prefers-reduced-motion') ? reducedMotion : false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }))
}

function mockWebGL(available: boolean) {
  jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation((contextId: string) => {
    if (!available) return null
    if (contextId === 'webgl' || contextId === 'experimental-webgl') {
      return {} as unknown as RenderingContext
    }
    return null
  })
}

describe('detectHero3DSupport', () => {
  afterEach(() => {
    jest.restoreAllMocks()
    delete (navigator as any).connection
  })

  it('returns false when prefers-reduced-motion is set', () => {
    mockMatchMedia(true)
    mockWebGL(true)
    expect(detectHero3DSupport()).toBe(false)
  })

  it('returns false when WebGL is unavailable', () => {
    mockMatchMedia(false)
    mockWebGL(false)
    expect(detectHero3DSupport()).toBe(false)
  })

  it('returns false when the WebGL probe throws', () => {
    mockMatchMedia(false)
    jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => {
      throw new Error('context creation failed')
    })
    expect(detectHero3DSupport()).toBe(false)
  })

  it('returns false when navigator.connection.saveData is true', () => {
    mockMatchMedia(false)
    mockWebGL(true)
    Object.defineProperty(navigator, 'connection', {
      value: { saveData: true },
      configurable: true,
    })
    expect(detectHero3DSupport()).toBe(false)
  })

  it('returns true when no blocking condition is present', () => {
    mockMatchMedia(false)
    mockWebGL(true)
    expect(detectHero3DSupport()).toBe(true)
  })

  it('does not throw when matchMedia is unavailable (e.g. jsdom)', () => {
    const originalMatchMedia = window.matchMedia
    // @ts-expect-error simulating an environment without matchMedia
    delete window.matchMedia
    mockWebGL(true)
    expect(() => detectHero3DSupport()).not.toThrow()
    window.matchMedia = originalMatchMedia
  })
})

import { renderHook, waitFor } from '@testing-library/react'
import { useHero3DSupport } from '../../../components/hero3d/useHero3DSupport'

describe('useHero3DSupport', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('starts unchecked and resolves to the detected support value', async () => {
    mockMatchMedia(false)
    mockWebGL(true)

    const { result } = renderHook(() => useHero3DSupport())

    await waitFor(() => expect(result.current.checked).toBe(true))
    expect(result.current.supported).toBe(true)
  })

  it('resolves to unsupported when detection fails', async () => {
    mockMatchMedia(true)
    mockWebGL(true)

    const { result } = renderHook(() => useHero3DSupport())

    await waitFor(() => expect(result.current.checked).toBe(true))
    expect(result.current.supported).toBe(false)
  })
})
