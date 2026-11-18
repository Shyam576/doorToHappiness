import React from "react";
import { SOCIAL_LINKS } from "./Footer";
import { Reveal } from "./motion/Reveal";

const TrustBar: React.FC = () => {
  return (
    <div className="w-full border-b border-stone-300 bg-brand-ivory">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-700">
          <Reveal delay={0} className="inline-flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Licensed Bhutanese Tour Operator
          </Reveal>

          <Reveal delay={100} className="inline-flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            Based in Thimphu, Bhutan
          </Reveal>

          <Reveal delay={200} className="inline-flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Operating Since 2020
          </Reveal>

          <Reveal delay={300} className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ href, label, icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center h-11 w-11 text-stone-500 transition-colors hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-900"
              >
                {icon}
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
