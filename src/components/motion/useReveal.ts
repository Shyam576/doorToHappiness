import { useEffect, useRef, useState } from 'react'
import { observeOnce, prefersReducedMotion } from './observe'

export type RevealState = 'visible' | 'hidden' | 'shown'

/**
 * Drives a scroll reveal without ever hiding content on the server or without JS:
 * the element starts 'visible'; after mount, only elements that begin below the fold are
 * switched to 'hidden' and then to 'shown' when they scroll into view. Reduced-motion users
 * never see a hidden state.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [state, setState] = useState<RevealState>('visible')

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return // already on screen
    setState('hidden')
    return observeOnce(el, () => setState('shown'))
  }, [])

  return [ref, state] as const
}
