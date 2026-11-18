import React, { useRef } from "react";
import Link from "next/link";
import { getRouteForTour } from "../citiesPackageCard";
import { Reveal } from "../motion/Reveal";
import Photo from "../Photo";
import { StaggerText } from "../motion/StaggerText";
import { RevealImage } from "../motion/RevealImage";

type Tour = {
  id: string;
  title: string;
  image: string;
  images?: string[];
  alt?: string;
  category?: string;
  duration: string;
  route: string;
  highlights: string[];
  inclusions?: unknown;
  [key: string]: any;
};

type SortOption = { value: string; label: string };

interface PackageShowcaseProps {
  packages: Tour[];
  sortOption: string;
  onSortChange: (value: string) => void;
  sortOptions: SortOption[];
  sectionRef: React.RefObject<HTMLDivElement>;
  /** Total number of packages across the site, for the "view all" link. */
  total: number;
}

const CATEGORY_LABEL: Record<string, string> = {
  city: "City Tour",
  festival: "Festival",
  cultural: "Cultural",
  trekking: "Trekking",
  adventure: "Adventure",
  group: "Group Tour",
};

const VISIBLE = 8;

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const PackageShowcase: React.FC<PackageShowcaseProps> = ({
  packages,
  sortOption,
  onSortChange,
  sortOptions,
  sectionRef,
  total,
}) => {
  const railRef = useRef<HTMLDivElement>(null);
  const scrollRail = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: dir * Math.round(rail.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="packages-heading"
      className="scroll-mt-20 bg-white py-24 sm:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <Reveal className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">
              <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
              Holiday packages
            </p>
            <h2 id="packages-heading" className="font-heading text-4xl font-medium leading-[1.05] text-stone-900 sm:text-5xl lg:text-6xl"><StaggerText>
              Journeys our guests <span className="italic text-emerald-900">choose most.</span>
            </StaggerText></h2>
            <p className="mt-4 text-sm uppercase tracking-[0.18em] text-stone-500">
              {total} tours available
            </p>
          </div>

          <div className="flex items-center justify-between gap-6 lg:justify-end">
            <div role="group" aria-label="Sort tours" className="flex flex-wrap gap-x-5 gap-y-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onSortChange(option.value)}
                  aria-pressed={sortOption === option.value}
                  className={`border-b pb-1 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                    sortOption === option.value
                      ? "border-emerald-900 text-emerald-900"
                      : "border-transparent text-stone-500 hover:text-stone-900"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="hidden gap-2 lg:flex">
              <button
                type="button"
                onClick={() => scrollRail(-1)}
                aria-label="Previous packages"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 text-stone-700 transition-colors hover:border-emerald-900 hover:bg-emerald-900 hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 rotate-180" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollRail(1)}
                aria-label="Next packages"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 text-stone-700 transition-colors hover:border-emerald-900 hover:bg-emerald-900 hover:text-white"
              >
                <ArrowIcon />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Rail: bleeds to the viewport edge on the right so it reads as a continuing journey */}
      <div
        ref={railRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-4 scroll-pl-4 sm:gap-8 sm:px-6 sm:scroll-pl-6 lg:px-10 lg:scroll-pl-10 xl:pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] xl:scroll-pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]"
        tabIndex={0}
        aria-label="Holiday packages"
      >
        {packages.slice(0, VISIBLE).map((tour) => {
          const href = getRouteForTour(tour as any);
          const image = tour.image || tour.images?.[0] || "/backgroundbanner.jpg";
          const inclusions = Array.isArray(tour.inclusions)
            ? (tour.inclusions as unknown[]).filter((i): i is string => typeof i === "string").slice(0, 3)
            : [];
          return (
            <article key={tour.id} className="group w-[80vw] shrink-0 snap-start sm:w-[360px] lg:w-[390px]">
              <RevealImage>
              <Link href={href} className="relative block aspect-[4/5] overflow-hidden bg-stone-200" tabIndex={-1} aria-hidden="true">
                <Photo
                  src={image}
                  alt=""
                  className="absolute inset-0"
                  sizes="(min-width: 1024px) 390px, 80vw"
                  imgClassName="h-full w-full object-cover group-hover:scale-[1.05]"
                  fallback="/backgroundbanner.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-emerald-950/10" />
                <span className="absolute left-5 top-5 bg-brand-ivory/95 px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-emerald-900">
                  {CATEGORY_LABEL[tour.category ?? ""] ?? tour.category}
                </span>
                <span className="absolute bottom-5 left-5 right-5 block text-white">
                  <span className="block font-heading text-3xl">{tour.duration}</span>
                  <span className="mt-1 block truncate text-[11px] uppercase tracking-[0.2em] text-white/85">{tour.route}</span>
                </span>
              </Link>
              </RevealImage>

              <div className="pt-6">
                <h3 className="font-heading text-2xl font-medium leading-tight text-stone-900 line-clamp-2 sm:text-[1.7rem]">
                  <Link href={href} className="hover:text-emerald-900">
                    {tour.title}
                  </Link>
                </h3>
                {tour.highlights?.length > 0 && (
                  <p className="mt-3 text-sm leading-relaxed text-stone-600 line-clamp-2">
                    {tour.highlights.slice(0, 4).join(" · ")}
                  </p>
                )}
                {inclusions.length > 0 && (
                  <p className="mt-3 text-xs leading-relaxed text-stone-500 line-clamp-2">
                    <span className="font-semibold uppercase tracking-[0.14em] text-stone-600">Includes </span>
                    {inclusions.join(" · ")}
                  </p>
                )}
                <div className="mt-6 flex items-center gap-5">
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-900 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-emerald-800"
                  >
                    View Details
                    <ArrowIcon />
                  </Link>
                  <Link
                    href="/contactus"
                    className="border-b border-stone-400 pb-0.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-stone-700 transition-colors hover:border-emerald-900 hover:text-emerald-900"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            </article>
          );
        })}

        <Link
          href="/package"
          className="group flex w-[70vw] shrink-0 snap-start flex-col justify-between bg-emerald-950 p-8 text-white sm:w-[320px]"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-amber-300">Every journey</p>
          <div>
            <p className="font-heading text-4xl font-medium leading-tight">
              See all {total} <span className="italic text-amber-200">holiday packages</span>
            </p>
            <span className="mt-8 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em]">
              Browse packages
              <span className="inline-block h-px w-10 bg-white transition-all duration-300 group-hover:w-16" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default PackageShowcase;
