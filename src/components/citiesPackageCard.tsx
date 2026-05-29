import React from 'react';
import Link from 'next/link';

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
  [key: string]: any;
}

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

  return (
    <article className="group relative bg-white rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)]">

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
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-grow p-5">
        {/* Duration */}
        <p className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-1.5">
          {tour.duration}
          {tour.route && <span className="text-stone-400 normal-case tracking-normal font-normal ml-1">· {tour.route}</span>}
        </p>

        {/* Title */}
        <h3 className="font-heading text-xl font-semibold text-stone-900 mb-2 leading-snug line-clamp-2">
          {tour.title}
        </h3>

        {/* Highlights */}
        <p className="text-xs text-stone-500 mb-3 line-clamp-1">
          {tour.highlights.join(' · ')}
        </p>

        {/* Description */}
        <p className="text-sm text-stone-600 leading-relaxed line-clamp-3 flex-grow mb-5">
          {tour.description}
        </p>

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
