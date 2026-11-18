/**
 * One shared IntersectionObserver for every reveal on the page (instead of one per element).
 * `observeOnce` calls back the first time the element enters the viewport, then stops watching it.
 */
type Callback = () => void

const callbacks = new WeakMap<Element, Callback>()
let observer: IntersectionObserver | null = null

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined') return null
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const cb = callbacks.get(entry.target)
          if (cb) {
            callbacks.delete(entry.target)
            observer?.unobserve(entry.target)
            cb()
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
  }
  return observer
}

export function observeOnce(el: Element, cb: Callback): () => void {
  const io = getObserver()
  if (!io) {
    cb()
    return () => {}
  }
  callbacks.set(el, cb)
  io.observe(el)
  return () => {
    callbacks.delete(el)
    io.unobserve(el)
  }
}

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}
