import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Photo } from './Photo';
import { ClipImage } from './package/PackageDetail';
import { normalizeItinerary, parseDifficulty } from '../lib/package-card-utils';

interface TourPackage {
  id: string;
  title: string;
  image: string;
  alt?: string;
  highlights: string[];
  duration: string;
  route: string;
  description: string;
  price?: string | number;
  category?: string;
  inclusions?: string[];
  difficulty?: string;
  trek_details?: { difficulty?: string };
  // `day` is usually a single day number, but some tours (e.g. group/trekking) group
  // several days into one itinerary entry with a range string like "3-4".
  detailed_itinerary?: { day: number | string; title: string; activities?: string[] }[];
  itinerary?: { title: string; description?: string }[];
  [key: string]: any;
}

type PreviewTab = 'highlights' | 'itinerary' | 'inclusions';

const PREVIEW_TABS: { key: PreviewTab; label: string }[] = [
  { key: 'highlights', label: 'Highlights' },
  { key: 'itinerary', label: 'Itinerary' },
  { key: 'inclusions', label: 'Inclusions' },
];

const CATEGORY_LABEL: Record<string, string> = {
  city: 'City Tour',
  festival: 'Festival',
  cultural: 'Cultural',
  trekking: 'Trekking',
  adventure: 'Adventure',
  group: 'Group Tour',
};

export const getRouteForTour = (tour: TourPackage): string => {
  switch (tour.category) {
    case 'cultural':  return `/package/cultural/${tour.id}`;
    case 'festival':  return `/package/festival/${tour.id}`;
    case 'group':     return `/package/group/${tour.id}`;
    case 'trekking':
    case 'adventure': return `/package/trekking/${tour.id}`;
    default:          return `/package/majorcitytour/${tour.id}`;
  }
};

type CardProps = {
  tour: TourPackage;
  /** Swap the image/text sides on wide screens (for alternating lists). */
  reverse?: boolean;
  /** Larger, image-led treatment for a lead package. */
  feature?: boolean;
};

const CityPackageCard: React.FC<CardProps> = ({ tour, reverse = false, feature = false }) => {
  const categoryLabel = CATEGORY_LABEL[tour.category ?? ''] ?? tour.category ?? '';
  const [activeTab, setActiveTab] = useState<PreviewTab>('highlights');
  // Panel content fades/slides in whenever the tab changes (first render stays fully visible).
  const [panelIn, setPanelIn] = useState(true);
  const firstTab = useRef(true);
  useEffect(() => {
    if (firstTab.current) {
      firstTab.current = false;
      return;
    }
    setPanelIn(false);
    let id2 = 0;
    const id = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => setPanelIn(true));
    });
    return () => {
      cancelAnimationFrame(id);
      cancelAnimationFrame(id2);
    };
  }, [activeTab]);

  const difficulty = parseDifficulty(tour.trek_details?.difficulty ?? tour.difficulty);
  const itinerary = normalizeItinerary(tour);
  const inclusions = tour.inclusions ?? [];
  const uid = `pc-${tour.category ?? 'x'}-${tour.id}`.replace(/[^a-zA-Z0-9_-]/g, '');
  const href = getRouteForTour(tour);

  return (
    <article className="group grid items-center gap-8 md:grid-cols-12 md:gap-12">
      {/* Image */}
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className={`relative block overflow-hidden bg-stone-200 ${
          feature ? 'md:col-span-7 aspect-[4/3] md:aspect-[5/4]' : 'md:col-span-5 aspect-[4/3]'
        } ${reverse ? 'md:order-2' : ''}`}
      >
        <ClipImage className="h-full w-full bg-stone-200" from={reverse ? 'right' : 'left'}>
          <Photo
            src={tour.image}
            alt=""
            fallback="/backgroundbanner.jpg"
            className="h-full w-full"
            imgClassName="h-full w-full object-cover group-hover:scale-[1.05]"
            sizes={feature ? '(min-width: 768px) 58vw, 100vw' : '(min-width: 768px) 40vw, 100vw'}
          />
        </ClipImage>
        <span className="pointer-events-none absolute inset-0 bg-emerald-950/0 transition-colors duration-500 group-hover:bg-emerald-950/10" aria-hidden="true" />
        {difficulty && (
          <span className="absolute left-0 top-5 bg-brand-ivory px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-900">
            {difficulty}
          </span>
        )}
      </Link>

      {/* Content */}
      <div className={`${feature ? 'md:col-span-5' : 'md:col-span-7'} ${reverse ? 'md:order-1' : ''}`}>
        <p className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-600">
          {categoryLabel && <span>{categoryLabel}</span>}
          {categoryLabel && tour.duration && <span className="h-px w-6 bg-amber-500" aria-hidden="true" />}
          {tour.duration && <span>{tour.duration}</span>}
        </p>

        <h3 className={`font-heading font-medium leading-[1.08] text-stone-900 ${feature ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'}`}>
          <Link href={href} className="hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-900">
            {tour.title}
          </Link>
        </h3>
        {tour.route && <p className="mt-3 text-sm uppercase tracking-[0.12em] text-stone-500">{tour.route}</p>}

        {/* Quick-preview tabs */}
        <div className="mt-6 border-b border-stone-300">
          <div className="flex flex-wrap gap-x-5 gap-y-1" role="tablist" aria-label={`${tour.title} preview`}>
            {PREVIEW_TABS.map((tab) => (
              <button
                key={tab.key}
                id={`${uid}-tab-${tab.key}`}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                aria-controls={`${uid}-panel`}
                onClick={() => setActiveTab(tab.key)}
                className={`-mb-px min-h-[44px] border-b-2 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900 ${
                  activeTab === tab.key
                    ? 'border-emerald-900 text-emerald-900'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div
          id={`${uid}-panel`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${activeTab}`}
          className="mt-5 h-36 overflow-y-auto pr-2"
        >
          <div
            className={`transition-[opacity,transform] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${
              panelIn ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}
          >
          {activeTab === 'highlights' && (
            <ul className="space-y-2 text-[15px] leading-relaxed text-stone-700">
              {tour.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <span className="mt-[0.7em] h-px w-4 flex-shrink-0 bg-amber-500" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'itinerary' && (
            <ul className="space-y-3 text-[15px] leading-relaxed text-stone-700">
              {itinerary.length === 0 && <li className="text-stone-400">Itinerary details coming soon.</li>}
              {itinerary.map((day) => {
                // Some tour types (e.g. city packages) store the title as a bare
                // "Day N" label identical to the day number — showing it again
                // next to the day badge would just repeat it.
                const showTitle = day.title && day.title !== `Day ${day.day}`;
                return (
                  <li key={day.day}>
                    <span className="font-semibold text-stone-900">
                      <span className="text-amber-600">Day {day.day}:</span>
                      {showTitle && <> {day.title}</>}
                    </span>
                    {day.summary && <p className="text-stone-500">{day.summary}</p>}
                  </li>
                );
              })}
            </ul>
          )}

          {activeTab === 'inclusions' && (
            <ul className="space-y-2 text-[15px] leading-relaxed text-stone-700">
              {inclusions.length === 0 && <li className="text-stone-400">Inclusion details coming soon.</li>}
              {inclusions.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 text-emerald-800" aria-hidden="true">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link
            href={href}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-emerald-900 px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
          >
            View Details
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link
            href="/contactus"
            aria-label={`Enquire about ${tour.title}`}
            className="inline-flex min-h-[44px] items-center border-b border-stone-400 text-[12px] font-semibold uppercase tracking-[0.14em] text-stone-800 transition-colors hover:border-emerald-900 hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-900"
          >
            Enquire
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CityPackageCard;
