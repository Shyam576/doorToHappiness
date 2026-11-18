import React from "react";
import Link from "next/link";
import HeroHeading from "../HeroHeading";
import { Parallax } from "../motion/Parallax";

/** Tiger's Nest — photo by Arian Zwegers, CC BY 2.0 (credited on /photo-credits). */
export const HERO_IMAGE = "/images/homepage/paro-taktsang-goemba-tiger-s-nest-15221622304.webp";

/**
 * Full-viewport cinematic hero. Photography leads: a slow settle (Ken Burns) plus a subtle
 * scroll parallax on the image, a restrained left-weighted scrim for legibility, editorial
 * headline bottom-left, and a quiet scroll cue. The planner bar overlaps its lower edge.
 */
const HomeHero: React.FC = () => {
  return (
    <section
      aria-label="Welcome"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-emerald-950 text-white"
    >
      <Parallax speed={0.15} className="absolute inset-x-0 -top-[15%] -z-10 h-[130%]">
        <div
          className="relative h-full w-full"
          style={{ animation: "kenBurns 24s ease-out forwards, imgFade 1.8s ease-out both" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMAGE}
            alt="Tiger's Nest Monastery (Paro Taktsang) clinging to a cliff above the Paro valley, Bhutan"
            loading="eager"
            decoding="async"
            {...({ fetchpriority: "high" } as Record<string, string>)}
            // Focal point set per breakpoint so the monastery stays in frame: phones show a narrow slice of the 3:2
            // photograph, so they're anchored far to the right where the monastery sits.
            className="absolute inset-0 h-full w-full object-cover object-[78%_50%] sm:object-[48%_45%] lg:object-[34%_42%]"
          />
        </div>
      </Parallax>

      {/* Scrims: legibility for the headline, a darker top for the transparent nav, and a soft fade into the page */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,39,32,0.92)_0%,rgba(15,39,32,0.78)_36%,rgba(15,39,32,0.4)_58%,rgba(15,39,32,0.06)_82%,rgba(15,39,32,0)_100%)] max-sm:bg-[linear-gradient(180deg,rgba(15,39,32,0.35)_0%,rgba(15,39,32,0.2)_35%,rgba(15,39,32,0.82)_100%)]" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-emerald-950/70 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-emerald-950/70 to-transparent" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 pb-44 pt-36 sm:pb-48 lg:pb-52">
        <p
          style={{ animationDelay: "200ms" }}
          className="mb-6 flex animate-rise items-center gap-3 text-[11px] sm:text-xs font-medium uppercase tracking-[0.28em] text-amber-200"
        >
          <span className="h-px w-10 bg-amber-300/80" aria-hidden="true" />
          Licensed Bhutan tour operator · Thimphu
        </p>

        <HeroHeading />

        <div
          style={{ animationDelay: "1450ms" }}
          className="mt-9 sm:mt-11 flex animate-rise flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
        >
          <Link
            href="/dzongkhag"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-emerald-950 transition-colors duration-300 hover:bg-amber-200"
          >
            Explore Destinations
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link
            href="/plan-your-trip"
            className="inline-flex items-center justify-center rounded-full border border-white/60 px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-colors duration-300 hover:border-white hover:bg-white/10"
          >
            Plan Your Journey
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ animationDelay: "2000ms" }} className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-[imgFade_1.4s_ease-out_both] flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/70 sm:flex" aria-hidden="true">
        Scroll
        <span className="relative block h-10 w-px overflow-hidden bg-white/25">
          <span className="absolute inset-x-0 top-0 h-full bg-white animate-scroll-cue" />
        </span>
      </div>
    </section>
  );
};

export default HomeHero;
