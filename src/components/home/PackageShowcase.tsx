import React, { useEffect, useRef, useState } from "react";
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
/** Auto-scroll speed of the rail, in CSS px per second (right to left). */
const AUTOPLAY_PX_PER_SEC = 42;
/** How far the rail travels per px of page scroll while the section is on screen (scroll down = cards move right to left). */
const SCROLL_LINK_FACTOR = 0.9;

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
  const firstCardRef = useRef<HTMLElement | null>(null);
  const loopCardRef = useRef<HTMLElement | null>(null);
  // Why the rail is currently held still (hover / keyboard focus / touch) and when a manual action's pause ends.
  const hold = useRef({ hover: false, focus: false, touch: false, until: 0 });
  const [motionOk, setMotionOk] = useState(false);
  const [playing, setPlaying] = useState(true);

  const scrollRail = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    hold.current.until = performance.now() + 4000; // let the arrow's smooth scroll finish before drifting again
    rail.scrollBy({ left: dir * Math.round(rail.clientWidth * 0.8), behavior: "smooth" });
  };

  // Right-to-left drift. The cards are rendered twice, so when the first set has scrolled fully past we step back by
  // exactly one set's width and the loop is seamless. Never runs for prefers-reduced-motion.
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    setMotionOk(true);
  }, []);

  // `playing` is read through a ref so toggling Pause never tears down the scroll-linked motion below.
  const playingRef = useRef(true);
  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || !motionOk || typeof IntersectionObserver === "undefined") return;
    let raf = 0;
    let last = 0;
    let pos = rail.scrollLeft;
    let lastY = window.scrollY;
    let inView = false;
    let loop = 0;
    const measure = () => {
      const a = firstCardRef.current;
      const b = loopCardRef.current;
      loop = a && b ? b.offsetLeft - a.offsetLeft : 0;
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        last = 0;
        lastY = window.scrollY;
        pos = rail.scrollLeft;
        measure();
      },
      { threshold: 0.05 },
    );
    io.observe(rail);
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const dt = last ? Math.min(t - last, 64) : 0;
      last = t;
      const y = window.scrollY;
      const dy = Math.max(-120, Math.min(120, y - lastY)); // clamp so an anchor jump can't fling the rail
      lastY = y;
      if (!loop) measure(); // layout may not have been ready when the effect first ran
      if (!inView || document.hidden || !loop) return;
      const h = hold.current;
      const drifting = playingRef.current && dt > 0 && !h.hover && !h.focus && !h.touch && performance.now() >= h.until;
      const scrollMove = dy * SCROLL_LINK_FACTOR;
      if (!drifting && !scrollMove) return;
      // The user (drag, trackpad, arrows) moved the rail: continue from where they left it.
      if (Math.abs(rail.scrollLeft - pos) > 2) pos = rail.scrollLeft;
      pos += scrollMove + (drifting ? (AUTOPLAY_PX_PER_SEC * dt) / 1000 : 0);
      // Seamless in both directions: the second copy is identical, so jumping by one set's width is invisible.
      while (pos >= loop) pos -= loop;
      while (pos < 0) pos += loop;
      rail.scrollLeft = pos;
    };
    measure();
    window.addEventListener("resize", measure);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [motionOk, packages]);

  const tours = packages.slice(0, VISIBLE);

  /** One package card. `dup` marks the second copy that exists only to make the loop seamless. */
  const renderTour = (tour: Tour, dup: boolean, index: number) => {
    const href = getRouteForTour(tour as any);
    const image = tour.image || tour.images?.[0] || "/backgroundbanner.jpg";
    const inclusions = Array.isArray(tour.inclusions)
      ? (tour.inclusions as unknown[]).filter((i): i is string => typeof i === "string").slice(0, 3)
      : [];
    const ti = dup ? -1 : undefined;
    return (
      <article
        key={`${tour.id}${dup ? "-loop" : ""}`}
        ref={index === 0 ? (dup ? loopCardRef : firstCardRef) : undefined}
        aria-hidden={dup || undefined}
        className="group w-[80vw] shrink-0 sm:w-[360px] lg:w-[390px]"
      >
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
            <Link href={href} tabIndex={ti} className="hover:text-emerald-900">
              {tour.title}
            </Link>
          </h3>
          {tour.highlights?.length > 0 && (
            <p className="mt-3 text-sm leading-relaxed text-stone-600 line-clamp-2">{tour.highlights.slice(0, 4).join(" · ")}</p>
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
              tabIndex={ti}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-900 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-emerald-800"
            >
              View Details
              <ArrowIcon />
            </Link>
            <Link
              href="/contactus"
              tabIndex={ti}
              className="border-b border-stone-400 pb-0.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-stone-700 transition-colors hover:border-emerald-900 hover:text-emerald-900"
            >
              Enquire
            </Link>
          </div>
        </div>
      </article>
    );
  };

  const renderSeeAll = (dup: boolean) => (
    <Link
      key={dup ? "all-loop" : "all"}
      href="/package"
      tabIndex={dup ? -1 : undefined}
      aria-hidden={dup || undefined}
      className="group flex w-[70vw] shrink-0 flex-col justify-between bg-emerald-950 p-8 text-white sm:w-[320px]"
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
  );

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
            {motionOk && (
              <button
                type="button"
                onClick={() => setPlaying((v) => !v)}
                aria-pressed={!playing}
                className="inline-flex min-h-[44px] items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-stone-600 transition-colors hover:text-emerald-900"
              >
                <span aria-hidden="true" className="flex h-3 w-3 items-center justify-center">
                  {playing ? (
                    <svg viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor"><rect x="2" y="1" width="3" height="10" /><rect x="7" y="1" width="3" height="10" /></svg>
                  ) : (
                    <svg viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor"><path d="M2 1l9 5-9 5z" /></svg>
                  )}
                </span>
                {playing ? "Pause" : "Play"}
                <span className="sr-only"> automatic drift of holiday packages</span>
              </button>
            )}
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

      {/* Rail: bleeds to the viewport edge on the right so it reads as a continuing journey. It drifts right to left
          (see the effect above): it also moves with the page scroll, and the drift pauses on hover, focus, touch, arrow use, and
          when the Pause button is on. */}
      <div
        ref={railRef}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") hold.current.hover = true;
        }}
        onPointerLeave={() => {
          hold.current.hover = false;
        }}
        onFocusCapture={() => {
          hold.current.focus = true;
        }}
        onBlurCapture={() => {
          hold.current.focus = false;
        }}
        onTouchStart={() => {
          hold.current.touch = true;
        }}
        onTouchEnd={() => {
          hold.current.touch = false;
          hold.current.until = performance.now() + 2500;
        }}
        className="scrollbar-hide flex gap-6 overflow-x-auto px-4 pb-4 sm:gap-8 sm:px-6 lg:px-10 xl:pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]"
        tabIndex={0}
        aria-label="Holiday packages"
      >
        {tours.map((tour, i) => renderTour(tour, false, i))}
        {renderSeeAll(false)}
        {/* Second copy: only there to make the loop seamless, hidden from assistive tech and the tab order */}
        {motionOk && tours.map((tour, i) => renderTour(tour, true, i))}
        {motionOk && renderSeeAll(true)}
      </div>
    </section>
  );
};

export default PackageShowcase;
