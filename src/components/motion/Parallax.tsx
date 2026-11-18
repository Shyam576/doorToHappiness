import React, { useEffect, useRef } from 'react'
import { prefersReducedMotion } from './observe'

type ParallaxProps = {
  children: React.ReactNode
  className?: string
  /** Fraction of scroll distance the layer drifts (0.05–0.2 is subtle). */
  speed?: number
}

/**
 * Parallax runs from ONE shared scroll listener + requestAnimationFrame loop for the whole page.
 * Each layer registers while it is within ~one viewport of the screen (tracked by a shared
 * IntersectionObserver), so off-screen layers cost nothing. transform only; disabled for
 * prefers-reduced-motion.
 */
type Layer = { el: HTMLElement; parent: HTMLElement; speed: number }
const active = new Set<Layer>()
const layers = new WeakMap<Element, Layer>()
let io: IntersectionObserver | null = null
let frame = 0
let listening = false

function paint() {
  frame = 0
  const vh = window.innerHeight
  active.forEach(({ el, parent, speed }) => {
    const rect = parent.getBoundingClientRect()
    // distance of the section's centre from the viewport centre, so the drift is 0 when centred
    const offset = rect.top + rect.height / 2 - vh / 2
    el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`
  })
}
function schedule() {
  if (!frame) frame = requestAnimationFrame(paint)
}
function ensureListening() {
  if (listening) return
  listening = true
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
}
function maybeStopListening() {
  if (active.size === 0 && listening) {
    listening = false
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
  }
}
function getIO() {
  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const layer = layers.get(e.target)
          if (!layer) continue
          if (e.isIntersecting) {
            active.add(layer)
            ensureListening()
            schedule()
          } else {
            active.delete(layer)
            maybeStopListening()
          }
        }
      },
      { rootMargin: '100% 0px 100% 0px' },
    )
  }
  return io
}

export function Parallax({ children, className = '', speed = 0.12 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    const parent = el?.parentElement
    if (!el || !parent || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return
    const layer: Layer = { el, parent, speed }
    layers.set(parent, layer)
    const observer = getIO()
    observer.observe(parent)
    return () => {
      observer.unobserve(parent)
      layers.delete(parent)
      active.delete(layer)
      maybeStopListening()
      el.style.transform = ''
    }
  }, [speed])

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  )
}

export default Parallax
