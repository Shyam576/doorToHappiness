import Link from 'next/link'
import { FiMapPin } from 'react-icons/fi'
import { getDzongkhagLinksForRoute } from '../lib/tour-mapping'

interface TourDestinationLinksProps {
  route: string | undefined
  /** 'light' (default) for the usual white-card headers; 'onDark' for pages whose header sits directly on a photo/color background (e.g. majorcitytour's hero). */
  variant?: 'light' | 'onDark'
}

/**
 * Cross-links a tour detail page to the dzongkhag pages its route passes through (the reverse of
 * VisitOnTourCTA, which links dzongkhag/sacred-places pages to tours). Rendered outside any tab
 * system deliberately — this page's tabs only add their content to the DOM after hydration, so
 * links placed inside a non-default tab would never appear in the statically-generated HTML a
 * crawler sees.
 */
export default function TourDestinationLinks({ route, variant = 'light' }: TourDestinationLinksProps): JSX.Element | null {
  const links = getDzongkhagLinksForRoute(route)
  if (links.length === 0) return null

  const onDark = variant === 'onDark'
  const labelClass = `text-[11px] font-semibold uppercase tracking-[0.2em] ${onDark ? 'text-white/80' : 'text-stone-500'}`
  const linkClass = `inline-flex min-h-[44px] items-center gap-1.5 border-b px-0.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
    onDark
      ? 'border-white/50 text-white hover:border-amber-200 hover:text-amber-200 focus-visible:outline-white'
      : 'border-amber-500 text-emerald-900 hover:border-emerald-900 hover:text-amber-600 focus-visible:outline-emerald-900'
  }`
  const wrapperClass = `flex flex-wrap items-center gap-x-5 gap-y-1 mt-3 ${onDark ? 'justify-center' : ''}`

  return (
    <div className={wrapperClass}>
      <span className={labelClass}>Places you&apos;ll visit:</span>
      {links.map((link) => (
        <Link key={link.slug} href={`/dzongkhag/${link.slug}`} className={linkClass}>
          <FiMapPin className="h-3 w-3" aria-hidden="true" />
          {link.name}
        </Link>
      ))}
    </div>
  )
}
