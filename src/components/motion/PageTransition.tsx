import React from 'react'
import { useRouter } from 'next/router'

/**
 * Gentle page entrance: when the route changes, the new page fades up a few pixels (opacity +
 * transform only, ~450ms). Keyed on the path so navigating between two pages of the same template
 * (e.g. /dzongkhag/paro → /dzongkhag/punakha) also gets the transition. The CSS animation is
 * neutralised by the global prefers-reduced-motion rule.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const { asPath } = useRouter()
  const path = asPath.split('#')[0].split('?')[0]
  return (
    <div key={path} className="animate-page-in">
      {children}
    </div>
  )
}

export default PageTransition
