import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import { getToursForDzongkhag } from '../lib/tour-mapping'

interface VisitOnTourCTAProps {
  /** The dzongkhag name to match tours against — e.g. "Paro". See getToursForDzongkhag for how the match works (no stored place->tour link exists in the data, so this matches on each tour's free-text route field). */
  dzongkhagName: string
  /** A short phrase identifying the specific page, used in the prefilled WhatsApp message (e.g. "Taktshang Monastery"). */
  pageLabel: string
}

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_PHONE_NO

/**
 * Shown on sacred-places and dzongkhag pages: surfaces a real tour that visits this place (or,
 * if none of the 5 tour datasets' routes mention this dzongkhag, a fallback CTA to the
 * custom trip planner) plus a WhatsApp button pre-filled with a message naming this page.
 * No price is shown — none of the tour data files record a trustworthy currency anywhere in the
 * codebase, and showing a guessed one would be fabricated pricing in a visitor-facing CTA.
 */
export default function VisitOnTourCTA({ dzongkhagName, pageLabel }: VisitOnTourCTAProps): JSX.Element {
  const tours = getToursForDzongkhag(dzongkhagName, 1)
  const whatsappMessage = encodeURIComponent(`Hi! I'm interested in visiting ${pageLabel} in Bhutan.`)
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`

  if (tours.length === 0) {
    return (
      <div className="bg-gradient-to-r from-amber-50 to-stone-50 border border-amber-100 rounded-xl p-6 text-center">
        <h3 className="text-lg font-bold text-stone-900 mb-2">Want to see {pageLabel} in person?</h3>
        <p className="text-stone-600 mb-4">
          We&apos;ll build a private Bhutan itinerary around the places you care about.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/plan-your-trip"
            className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-5 py-2.5 rounded-lg transition"
          >
            Plan a custom Bhutan trip
            <FiArrowRight />
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-amber-300 text-amber-700 hover:bg-amber-50 font-semibold px-5 py-2.5 rounded-lg transition"
          >
            Ask us on WhatsApp
          </a>
        </div>
      </div>
    )
  }

  const tour = tours[0]

  return (
    <div className="bg-white border border-stone-200 rounded-xl shadow-card overflow-hidden">
      <div className="relative w-full h-40">
        <Image src={tour.image} alt={tour.title} fill unoptimized className="object-cover" />
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">Visit on a tour</p>
        <h3 className="text-lg font-bold text-stone-900 mb-1">{tour.title}</h3>
        {tour.duration && <p className="text-stone-500 text-sm mb-4">{tour.duration}</p>}
        <div className="flex flex-col gap-3">
          <Link
            href={tour.url}
            className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded-lg transition text-sm"
          >
            View itinerary
            <FiArrowRight />
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-amber-300 text-amber-700 hover:bg-amber-50 font-semibold px-4 py-2 rounded-lg transition text-sm"
          >
            Ask us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
