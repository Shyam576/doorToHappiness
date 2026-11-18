import React from 'react'
import { useReveal } from './useReveal'

type StaggerTextProps = {
  children: React.ReactNode
  /** 'mount' animates on load (hero); 'scroll' waits until the text enters the viewport. */
  mode?: 'mount' | 'scroll'
  /** Base delay in ms before the first word. */
  delay?: number
  /** Extra delay per word in ms. */
  step?: number
  className?: string
}

/** Wrap every word of the children (recursing into <em> etc.) so each can rise into place. */
function splitWords(node: React.ReactNode, counter: { i: number }, make: (word: string, i: number) => React.ReactNode, keyPrefix = 'w'): React.ReactNode {
  return React.Children.map(node, (child, idx) => {
    if (typeof child === 'string' || typeof child === 'number') {
      const parts = String(child).split(/(\s+)/)
      return parts.map((part, pi) => {
        if (part === '') return null
        if (/^\s+$/.test(part)) return ' '
        return <React.Fragment key={`${keyPrefix}-${idx}-${pi}`}>{make(part, counter.i++)}</React.Fragment>
      })
    }
    if (React.isValidElement(child)) {
      const el = child as React.ReactElement<{ children?: React.ReactNode }>
      return React.cloneElement(el, { key: `${keyPrefix}-${idx}` }, splitWords(el.props.children, counter, make, `${keyPrefix}-${idx}`))
    }
    return child
  })
}

/**
 * Staggered word-by-word rise for headings. The words are clipped by a tight mask so they appear to
 * slide up from a baseline. Uses transform only; honours prefers-reduced-motion (global CSS rule and
 * the reveal hook both short-circuit it). Screen readers get the original text via aria-label on the
 * wrapper while the split spans are hidden from the accessibility tree.
 */
export function StaggerText({ children, mode = 'scroll', delay = 0, step = 55, className = '' }: StaggerTextProps) {
  const [ref, state] = useReveal<HTMLSpanElement>()
  const label = typeof children === 'string' ? children : undefined
  const counter = { i: 0 }

  const make = (word: string, i: number) => {
    const wait = delay + i * step
    const style: React.CSSProperties =
      mode === 'mount'
        ? { animation: `word-rise 1000ms cubic-bezier(.2,.7,.2,1) ${wait}ms both` }
        : {
            transform: state === 'hidden' ? 'translateY(110%)' : 'translateY(0)',
            transition: state === 'shown' ? `transform 1000ms cubic-bezier(.2,.7,.2,1) ${wait}ms` : undefined,
          }
    return (
      <span className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em] pr-[0.04em]" aria-hidden={label ? true : undefined}>
        <span className="inline-block will-change-transform" style={style}>
          {word}
        </span>
      </span>
    )
  }

  return (
    <span ref={ref} className={className} aria-label={label}>
      {splitWords(children, counter, make)}
    </span>
  )
}

export default StaggerText
