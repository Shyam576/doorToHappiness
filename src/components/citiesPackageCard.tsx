import React, { useState } from 'react';
import Link from 'next/link';
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

const CATEGORY_CONFIG: Record<string, { label: string; color: string }> = {
  city:      { label: 'City Tour',    color: 'bg-amber-500' },
  festival:  { label: 'Festival',     color: 'bg-orange-500' },
  cultural:  { label: 'Cultural',     color: 'bg-yellow-600' },
  trekking:  { label: 'Trekking',     color: 'bg-emerald-700' },
  adventure: { label: 'Adventure',    color: 'bg-emerald-700' },
  group:     { label: 'Group Tour',   color: 'bg-amber-600' },
};

const getRouteForTour = (tour: TourPackage): string => {
  switch (tour.category) {
    case 'cultural':  return `/package/cultural/${tour.id}`;
    case 'festival':  return `/package/festival/${tour.id}`;
    case 'group':     return `/package/group/${tour.id}`;
    case 'trekking':
    case 'adventure': return `/package/trekking/${tour.id}`;
    default:          return `/package/majorcitytour/${tour.id}`;
  }
};

const CityPackageCard: React.FC<{ tour: TourPackage }> = ({ tour }) => {
  const cfg = CATEGORY_CONFIG[tour.category ?? ''] ?? { label: tour.category ?? '', color: 'bg-amber-500' };
  const [activeTab, setActiveTab] = useState<PreviewTab>('highlights');

  const difficulty = parseDifficulty(tour.trek_details?.difficulty ?? tour.difficulty);
  const itinerary = normalizeItinerary(tour);
  const inclusions = tour.inclusions ?? [];

  return (
    <article className="group relative bg-white rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1 shadow-card hover:shadow-card-hover">

      {/* ── Image ── */}
      <div className="relative h-52 overflow-hidden bg-stone-100">
        <img
          src={tour.image}
          alt={tour.alt || tour.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width={400}
          height={208}
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Category badge */}
        {tour.category && (
          <span className={`absolute top-3 left-3 ${cfg.color} text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm`}>
            {cfg.label}
          </span>
        )}

        {/* Difficulty badge — only shown when parseable difficulty data exists for this tour */}
        {difficulty && (
          <span className="absolute top-3 right-3 bg-white/90 text-stone-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
            {difficulty}
          </span>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-grow p-5">
        {/* Duration */}
        <p className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-1.5">
          {tour.duration}
          {tour.route && <span className="text-stone-400 normal-case tracking-normal font-normal ml-1">· {tour.route}</span>}
        </p>

        {/* Title */}
        <h3 className="font-heading text-xl font-semibold text-stone-900 mb-3 leading-snug line-clamp-2">
          {tour.title}
        </h3>

        {/* Quick-preview tabs */}
        <div className="border-b border-stone-100 mb-3">
          <nav className="flex gap-4" role="tablist" aria-label="Tour preview">
            {PREVIEW_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-2 text-xs font-semibold border-b-2 transition-colors duration-200 ${
                  activeTab === tab.key
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="h-28 overflow-y-auto mb-5 flex-grow">
          {activeTab === 'highlights' && (
            <ul className="space-y-1.5 text-sm text-stone-600">
              {tour.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-1.5">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'itinerary' && (
            <ul className="space-y-2 text-sm text-stone-600">
              {itinerary.length === 0 && <li className="text-stone-400">Itinerary details coming soon.</li>}
              {itinerary.map((day) => {
                // Some tour types (e.g. city packages) store the title as a bare
                // "Day N" label identical to the day number — showing it again
                // next to the day badge would just repeat it.
                const showTitle = day.title && day.title !== `Day ${day.day}`;
                return (
                  <li key={day.day}>
                    <span className="font-semibold text-stone-800">
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
            <ul className="space-y-1.5 text-sm text-stone-600">
              {inclusions.length === 0 && <li className="text-stone-400">Inclusion details coming soon.</li>}
              {inclusions.map((item) => (
                <li key={item} className="flex items-start gap-1.5">
                  <span className="text-emerald-600 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CTA */}
        <Link
          href={getRouteForTour(tour)}
          className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 transition-colors duration-150 shadow-sm"
        >
          View Details
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default CityPackageCard;
