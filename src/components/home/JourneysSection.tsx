import React, { useState } from "react";
import Link from "next/link";
import { Reveal } from "../motion/Reveal";
import { StaggerText } from "../motion/StaggerText";

// What the company genuinely offers: the five tour families that make up /package, plus visa and
// SDF handling (see the FAQ). Each has a representative local photograph of the real thing.
const JOURNEYS = [
  {
    title: "Cultural Tours",
    blurb: "Dzongs, monasteries and living traditions, with a licensed local guide at your side.",
    href: "/package",
    image: "/homepagebg3.jpg",
    alt: "Punakha Dzong beside the river",
  },
  {
    title: "Trekking & Adventure",
    blurb: "High passes, alpine lakes and the quiet of the Himalayas, at a pace that suits you.",
    href: "/package",
    image: "/image8.jpeg",
    alt: "Alpine lake surrounded by misty mountains",
  },
  {
    title: "Festival Tours",
    blurb: "Plan around a tsechu and see masked dances in the courtyards where they began.",
    href: "/package",
    image: "/explore3.jpg",
    alt: "Dancers in colourful costume at a Bhutanese festival",
  },
  {
    title: "Group Tours",
    blurb: "Shared departures with fixed itineraries, for travellers who prefer good company.",
    href: "/package",
    image: "/image5.jpeg",
    alt: "Prayer flags above a Bhutanese valley town",
  },
  {
    title: "City Tours",
    blurb: "Paro, Thimphu and Punakha, arranged end to end from the city you are leaving.",
    href: "/package",
    image: "/image7.jpeg",
    alt: "Terrace overlooking the Thimphu valley",
  },
  {
    title: "Visa & SDF Assistance",
    blurb: "We handle your visa and the Sustainable Development Fee, so you only have to arrive.",
    href: "/faq",
    image: "/packagebg.jpg",
    alt: "A dzong on a misty hill",
  },
];

const JourneysSection: React.FC = () => {
  const [active, setActive] = useState(0);

  return (
    <section aria-labelledby="journeys-heading" className="bg-brand-ivory py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal className="mb-12 max-w-xl">
              <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">
                <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
                Our journeys
              </p>
              <h2 id="journeys-heading" className="font-heading text-4xl font-medium leading-[1.05] text-stone-900 sm:text-5xl lg:text-6xl"><StaggerText>
                Ways to <span className="italic text-emerald-900">experience</span> Bhutan.
              </StaggerText></h2>
            </Reveal>

            <ol className="border-t border-stone-300">
              {JOURNEYS.map((journey, i) => (
                <li key={journey.title} className="border-b border-stone-300">
                  <Link
                    href={journey.href}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-6 sm:grid-cols-[3.5rem_1fr_auto] sm:py-8"
                  >
                    <span className="text-xs font-medium tracking-[0.2em] text-stone-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span
                        className={`block font-heading text-3xl font-medium transition-colors duration-300 sm:text-4xl ${
                          active === i ? "text-emerald-900" : "text-stone-800 group-hover:text-emerald-900"
                        }`}
                      >
                        {journey.title}
                      </span>
                      <span className="mt-2 block max-w-md text-sm leading-relaxed text-stone-600">
                        {journey.blurb}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`self-center text-emerald-900 transition-all duration-300 ${
                        active === i ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-40 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          {/* Image panel follows the active row on large screens */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-200">
                {JOURNEYS.map((journey, i) => (
                  <img
                    key={journey.title}
                    src={journey.image}
                    alt={journey.alt}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
                      active === i ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent" />
              </div>
              <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-stone-500">
                {JOURNEYS[active].alt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneysSection;
