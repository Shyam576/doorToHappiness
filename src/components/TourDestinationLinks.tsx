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

  const labelClass = variant === 'onDark' ? 'text-sm text-white/80' : 'text-sm text-gray-500'
  const linkClass =
    variant === 'onDark'
      ? 'inline-flex items-center gap-1 text-sm font-medium text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full transition-colors'
      : 'inline-flex items-center gap-1 text-sm font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-full transition-colors'

  const wrapperClass =
    variant === 'onDark'
      ? 'flex flex-wrap items-center justify-center gap-2 mt-3'
      : 'flex flex-wrap items-center gap-2 mt-3'

  return (
    <div className={wrapperClass}>
      <span className={labelClass}>Places you&apos;ll visit:</span>
      {links.map((link) => (
        <Link key={link.slug} href={`/dzongkhag/${link.slug}`} className={linkClass}>
          <FiMapPin className="w-3 h-3" />
          {link.name}
        </Link>
      ))}
    </div>
  )
}
