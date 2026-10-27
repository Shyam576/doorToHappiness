import { useState } from 'react'
import { useHero3DSupport } from './useHero3DSupport'
import { HeroErrorBoundary } from './HeroErrorBoundary'
import { HeroCanvas } from './HeroCanvas'

export default function Hero3DOverlay(): JSX.Element | null {
  const { supported, checked } = useHero3DSupport()
  const [canvasReady, setCanvasReady] = useState(false)

  if (!checked || !supported) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      tabIndex={-1}
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
        canvasReady ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <HeroErrorBoundary>
        <HeroCanvas onReady={() => setCanvasReady(true)} />
      </HeroErrorBoundary>
    </div>
  )
}
