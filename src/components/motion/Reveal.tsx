import React from 'react'
import { useReveal } from './useReveal'

type RevealProps = {
  children: React.ReactNode
  className?: string
  /** Delay in ms — use small steps (60–120) to stagger siblings. */
  delay?: number
  as?: keyof JSX.IntrinsicElements
}

/** Scroll-triggered fade-up (transform + opacity only). */
export function Reveal({ children, className = '', delay = 0, as = 'div' }: RevealProps) {
  const [ref, state] = useReveal<HTMLElement>()
  const Tag = as as any
  return (
    <Tag
      ref={ref}
      style={state === 'shown' ? { transitionDelay: `${delay}ms` } : undefined}
      className={`${className} ${
        state === 'hidden'
          ? 'opacity-0 translate-y-6'
          : state === 'shown'
          ? 'opacity-100 translate-y-0 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)]'
          : ''
      }`}
    >
      {children}
    </Tag>
  )
}

export default Reveal
