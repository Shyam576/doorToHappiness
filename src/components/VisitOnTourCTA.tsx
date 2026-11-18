import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import Photo from './Photo'
import { getToursForDzongkhag } from '../lib/tour-mapping'

interface VisitOnTourCTAProps {
  /** The dzongkhag name to match tours against — e.g. "Paro". See getToursForDzongkhag for how the match works (no stored place->tour link exists in the data, so this matches on each tour's free-text route field). */
  dzongkhagName: string
  /** A short phrase identifying the specific page, used in the prefilled WhatsApp message (e.g. "Taktshang Monastery"). */
  pageLabel: string
  /** 'light' (default) sits on ivory; 'dark' sits on the forest-green sections. */
  tone?: 'light' | 'dark'
}

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_PHONE_NO

/**
 * Shown on sacred-places and dzongkhag pages: surfaces a real tour that visits this place (or,
 * if none of the 5 tour datasets' routes mention this dzongkhag, a fallback CTA to the
 * custom trip planner) plus a WhatsApp button pre-filled with a message naming this page.
 * No price is shown — none of the tour data files record a trustworthy currency anywhere in the
 * codebase, and showing a guessed one would be fabricated pricing in a visitor-facing CTA.
 */
export default function VisitOnTourCTA({ dzongkhagName, pageLabel, tone = 'light' }: VisitOnTourCTAProps): JSX.Element {
  const tours = getToursForDzongkhag(dzongkhagName, 1)
  const whatsappMessage = encodeURIComponent(`Hi! I'm interested in visiting ${pageLabel} in Bhutan.`)
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`
  const dark = tone === 'dark'

  const eyebrow = `mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] ${dark ? 'text-amber-300' : 'text-amber-600'}`
  const rule = `h-px w-10 ${dark ? 'bg-amber-300' : 'bg-amber-500'}`
  const heading = `font-heading text-2xl font-medium leading-tight sm:text-3xl ${dark ? 'text-white' : 'text-stone-900'}`
  const copy = `mt-3 text-sm leading-relaxed ${dark ? 'text-white/75' : 'text-stone-600'}`
  const primary = `inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
    dark
      ? 'bg-white text-emerald-950 hover:bg-amber-200 focus-visible:outline-white'
      : 'bg-emerald-900 text-white hover:bg-emerald-800 focus-visible:outline-emerald-900'
  }`
  const secondary = `inline-flex min-h-[44px] items-center justify-center self-start text-[12px] font-semibold uppercase tracking-[0.14em] underline decoration-1 underline-offset-[6px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
    dark
      ? 'text-white hover:text-amber-200 focus-visible:outline-white'
      : 'text-emerald-900 hover:text-amber-600 focus-visible:outline-emerald-900'
  }`

  if (tours.length === 0) {
    return (
      <div className={`border-t pt-8 ${dark ? 'border-white/20' : 'border-stone-300'}`}>
        <p className={eyebrow}>
          <span className={rule} aria-hidden="true" />
          Visit with us
        </p>
        <h3 className={heading}>Want to see {pageLabel} in person?</h3>
        <p className={copy}>We&apos;ll build a private Bhutan itinerary around the places you care about.</p>
        <div className="mt-7 flex flex-col items-start gap-3">
          <Link href="/plan-your-trip" className={primary}>
            Plan a custom Bhutan trip
            <FiArrowRight aria-hidden="true" />
          </Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={secondary}>
            Ask us on WhatsApp
          </a>
        </div>
      </div>
    )
  }

  const tour = tours[0]

  return (
    <div className={`border-t pt-8 ${dark ? 'border-white/20' : 'border-stone-300'}`}>
      <p className={eyebrow}>
        <span className={rule} aria-hidden="true" />
        Visit on a tour
      </p>
      <Photo
        src={tour.image}
        alt={tour.title}
        fallback="/backgroundbanner.jpg"
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="mb-6 aspect-[16/10] w-full"
      />
      <h3 className={heading}>{tour.title}</h3>
      {tour.duration && <p className={`mt-2 text-sm ${dark ? 'text-white/70' : 'text-stone-500'}`}>{tour.duration}</p>}
      <div className="mt-7 flex flex-col items-start gap-3">
        <Link href={tour.url} className={primary}>
          View itinerary
          <FiArrowRight aria-hidden="true" />
        </Link>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={secondary}>
          Ask us on WhatsApp
        </a>
      </div>
    </div>
  )
}
