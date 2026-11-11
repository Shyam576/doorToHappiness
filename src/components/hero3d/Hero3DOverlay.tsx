import { useState } from 'react'
import { useHero3DSupport } from './useHero3DSupport'
import { HeroErrorBoundary } from './HeroErrorBoundary'
import { HeroCanvas } from './HeroCanvas'

export default function Hero3DOverlay(): JSX.Element | null {
  const { supported, checked } = useHero3DSupport()
  const [canvasReady, setCanvasReady] = useState(false)
  const [revealTrigger, setRevealTrigger] = useState(0)

  if (!checked || !supported) {
    return null
  }

  return (
    <>
      <div
        aria-hidden="true"
        tabIndex={-1}
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          canvasReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <HeroErrorBoundary>
          <HeroCanvas onReady={() => setCanvasReady(true)} revealTrigger={revealTrigger} />
        </HeroErrorBoundary>
      </div>

      {/* A real, accessible button (not inside the decorative canvas div above) — entirely
          optional, no page behavior changes unless a visitor clicks it. Desktop-only: the
          Tiger's Nest model itself isn't rendered on mobile (see HeroCanvas's isMobile gate). */}
      {canvasReady && (
        <button
          type="button"
          onClick={() => setRevealTrigger((count) => count + 1)}
          className="hidden md:inline-flex absolute z-20 left-6 top-[150px] lg:left-10 lg:top-[170px] items-center gap-2 rounded-full bg-black/35 hover:bg-black/50 backdrop-blur-sm border border-white/40 px-4 py-2 text-sm font-medium text-white transition-colors animate-pulse hover:animate-none"
        >
          Discover Taktshang
        </button>
      )}
    </>
  )
}
