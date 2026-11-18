import React from 'react'
import { useReveal } from './useReveal'

type RevealImageProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  /** Edge the image is uncovered from. */
  from?: 'bottom' | 'top' | 'left' | 'right'
}

const HIDDEN_CLIP: Record<NonNullable<RevealImageProps['from']>, string> = {
  bottom: 'inset(0 0 100% 0)',
  top: 'inset(100% 0 0 0)',
  left: 'inset(0 100% 0 0)',
  right: 'inset(0 0 0 100%)',
}

/**
 * Clip-path image reveal with a slow settle: the frame is uncovered while the photograph inside eases
 * from a slight zoom to rest. Wrap the <img> (or any media).
 *
 * IMPORTANT: the element the IntersectionObserver watches (the outer frame) is never clipped. An element
 * whose own clip-path hides it reports a 0 intersection ratio, so it would never "enter" the viewport —
 * the clip lives on an inner wrapper instead. Only images that start below the fold are hidden; on the
 * server, without JS and with reduced motion the image is simply shown.
 */
export function RevealImage({ children, className = '', delay = 0, from = 'bottom' }: RevealImageProps) {
  const [ref, state] = useReveal<HTMLDivElement>()
  const hidden = state === 'hidden'
  return (
    <div ref={ref} className={className}>
      <div
        className="h-full w-full overflow-hidden"
        style={{
          clipPath: hidden ? HIDDEN_CLIP[from] : 'inset(0 0 0 0)',
          transition: state === 'shown' ? `clip-path 1200ms cubic-bezier(.77,0,.18,1) ${delay}ms` : undefined,
        }}
      >
        <div
          className="h-full w-full"
          style={{
            transform: hidden ? 'scale(1.14)' : 'scale(1)',
            transition: state === 'shown' ? `transform 1600ms cubic-bezier(.2,.7,.2,1) ${delay}ms` : undefined,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default RevealImage
