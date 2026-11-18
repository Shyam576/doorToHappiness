import React from "react";
import Link from "next/link";
import PageHero from "../PageHero";
import { Reveal } from "../motion/Reveal";
import { StaggerText } from "../motion/StaggerText";
import { useReveal } from "../motion/useReveal";
import StickyEnquireBar from "../StickyEnquireBar";

export type Fact = { label: string; value: React.ReactNode };
export type NavSection = { id: string; label: string };

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4" aria-hidden="true">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
  </svg>
);

const CheckIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`h-4 w-4 ${className}`} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

const CrossIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`h-4 w-4 ${className}`} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
  </svg>
);


/** The shared clip-path image reveal (its scroll trigger is an unclipped outer frame). */
export { RevealImage as ClipImage } from "../motion/RevealImage";

const enquireBtnLight =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-emerald-950 transition-colors hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300";

/* ------------------------------------------------------------------ */
/* Shell                                                               */
/* ------------------------------------------------------------------ */

type ShellProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  image: string;
  imageAlt?: string;
  route?: string;
  duration?: string;
  /** Shown in the sticky side panel (and the hero meta row for route/duration). */
  facts: Fact[];
  nav: NavSection[];
  /** Cross-links under the hero meta (e.g. <TourDestinationLinks />). */
  links?: React.ReactNode;
  onShare?: () => void;
  children: React.ReactNode;
};

export const PackageDetailShell: React.FC<ShellProps> = ({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  route,
  duration,
  facts,
  nav,
  links,
  onShare,
  children,
}) => (
  <>
    <PageHero eyebrow={eyebrow} title={title} image={image} imageAlt={imageAlt ?? title} size="lg">
      <dl className="flex w-full flex-wrap gap-x-10 gap-y-4 text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.6)]">
        {duration && (
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200">Duration</dt>
            <dd className="mt-1 font-heading text-2xl">{duration}</dd>
          </div>
        )}
        {route && (
          <div className="min-w-0 max-w-xl">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200">Route</dt>
            <dd className="mt-1 font-heading text-2xl leading-snug">{route}</dd>
          </div>
        )}
      </dl>
      <div className="flex w-full flex-wrap items-center gap-3">
        <Link href="/contactus" className={enquireBtnLight}>
          Enquire now <ArrowIcon />
        </Link>
        {onShare && (
          <button
            type="button"
            onClick={onShare}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-white/50 px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
          >
            <ShareIcon /> Share
          </button>
        )}
      </div>
    </PageHero>

    <div className="bg-brand-ivory pb-28 lg:pb-0">
      <div className="container mx-auto grid gap-14 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-20 lg:px-10">
        <div className="min-w-0">
          {links && <div className="mb-10 border-b border-stone-200 pb-8">{links}</div>}
          <nav aria-label="On this page" className="mb-14 flex flex-wrap gap-x-7 gap-y-2 border-b border-stone-200 pb-5">
            {nav.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="relative inline-flex min-h-[44px] items-center text-[12px] font-semibold uppercase tracking-[0.16em] text-stone-600 transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-emerald-900 after:transition-transform after:duration-300 after:ease-[cubic-bezier(.2,.7,.2,1)] hover:text-emerald-900 hover:after:scale-x-100 focus-visible:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
              >
                {s.label}
              </a>
            ))}
          </nav>
          <div className="space-y-20 sm:space-y-28">{children}</div>
        </div>

        <aside aria-label="Trip summary" className="lg:pt-[3.75rem]">
          <div className="lg:sticky lg:top-24">
            <Reveal className="bg-emerald-950 p-7 text-white sm:p-9">
              <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300">
                <span className="h-px w-8 bg-amber-300" aria-hidden="true" />
                Trip at a glance
              </p>
              <dl className="divide-y divide-white/10 border-y border-white/10">
                {facts.map((f) => (
                  <div key={f.label} className="py-4">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">{f.label}</dt>
                    <dd className="mt-1 text-[15px] leading-snug text-white">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/contactus" className={`${enquireBtnLight} mt-8 w-full`}>
                Enquire now <ArrowIcon />
              </Link>
              <p className="mt-4 text-center text-xs leading-relaxed text-white/60">
                Tell us your dates and group; we will shape the journey around you.
              </p>
            </Reveal>
          </div>
        </aside>
      </div>
    </div>

    <StickyEnquireBar title={title} />
  </>
);

/* ------------------------------------------------------------------ */
/* Section primitives                                                  */
/* ------------------------------------------------------------------ */

export const DetailSection: React.FC<{
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
}> = ({ id, eyebrow, title, children }) => (
  <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-28">
    <Reveal>
      <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">
        <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
        {eyebrow}
      </p>
    </Reveal>
      <h2
        id={`${id}-h`}
        className="mb-10 font-heading text-3xl font-medium leading-[1.08] text-stone-900 sm:text-4xl [&_em]:font-normal [&_em]:text-emerald-900"
      >
        <StaggerText>{title}</StaggerText>
      </h2>
    <Reveal delay={100}>{children}</Reveal>
  </section>
);

export const Highlights: React.FC<{ items: string[] }> = ({ items }) => (
  <ol className="divide-y divide-stone-200 border-y border-stone-200">
    {items.map((h, i) => (
      <Reveal as="li" key={i} delay={Math.min(i * 70, 350)} className="group flex items-baseline gap-5 py-5 sm:gap-8">
        <span className="w-8 flex-shrink-0 font-heading text-xl text-amber-600 transition-transform duration-300 ease-out group-hover:translate-x-1" aria-hidden="true">
          {String(i + 1).padStart(2, "0")}
        </span>
        <span className="text-base leading-relaxed text-stone-800 sm:text-lg">{h}</span>
      </Reveal>
    ))}
  </ol>
);

export type TimelineItem = {
  label: string;
  title?: string;
  activities?: string[];
  body?: React.ReactNode;
};

export const DayTimeline: React.FC<{ items: TimelineItem[] }> = ({ items }) => {
  const [lineRef, lineState] = useReveal<HTMLSpanElement>();
  return (
  <ol className="relative ml-2 border-l border-stone-300">
    <span
      ref={lineRef}
      aria-hidden="true"
      className="pointer-events-none absolute -left-px top-0 h-full w-px origin-top bg-amber-500"
      style={{
        transform: lineState === "hidden" ? "scaleY(0)" : "scaleY(1)",
        transition: lineState === "shown" ? "transform 1800ms cubic-bezier(.4,0,.2,1)" : undefined,
      }}
    />
    {items.map((d, i) => (
      <Reveal as="li" key={i} delay={60} className="group relative pb-12 pl-8 last:pb-0 sm:pl-12">
        <span
          className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-amber-500 bg-brand-ivory transition-transform duration-300 ease-out group-hover:scale-125 group-hover:bg-amber-500"
          aria-hidden="true"
        />
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-600">{d.label}</p>
        {d.title && (
          <h3 className="mt-2 font-heading text-2xl font-medium leading-snug text-stone-900 sm:text-[1.7rem]">
            {d.title}
          </h3>
        )}
        {d.activities && d.activities.length > 0 && (
          <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-stone-700">
            {d.activities.map((a, k) => (
              <li key={k} className="flex gap-3">
                <span className="mt-[0.7em] h-px w-4 flex-shrink-0 bg-stone-400" aria-hidden="true" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        )}
        {d.body && <div className="mt-4 max-w-prose text-[15px] leading-relaxed text-stone-700">{d.body}</div>}
      </Reveal>
    ))}
  </ol>
  );
};

export const Inclusions: React.FC<{ included?: string[]; excluded?: string[] }> = ({ included, excluded }) => {
  const hasIn = !!included && included.length > 0;
  const hasEx = !!excluded && excluded.length > 0;
  if (!hasIn && !hasEx) return null;
  return (
    <div className={`grid gap-12 ${hasIn && hasEx ? "md:grid-cols-2" : ""}`}>
      {hasIn && (
        <div>
          <h3 className="mb-5 border-b border-emerald-900 pb-3 font-heading text-xl font-medium text-stone-900">
            Included
          </h3>
          <ul className="space-y-3.5">
            {included!.map((item, i) => (
              <Reveal as="li" key={i} delay={Math.min(i * 50, 300)} className="group flex gap-3 text-[15px] leading-relaxed text-stone-700">
                <CheckIcon className="mt-1 flex-shrink-0 text-emerald-800 transition-transform duration-300 group-hover:scale-125" />
                <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">{item}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      )}
      {hasEx && (
        <div>
          <h3 className="mb-5 border-b border-stone-400 pb-3 font-heading text-xl font-medium text-stone-900">
            Not included
          </h3>
          <ul className="space-y-3.5">
            {excluded!.map((item, i) => (
              <Reveal as="li" key={i} delay={Math.min(i * 50, 300)} className="group flex gap-3 text-[15px] leading-relaxed text-stone-600">
                <CrossIcon className="mt-1 flex-shrink-0 text-stone-400 transition-colors duration-300 group-hover:text-stone-600" />
                <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">{item}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Generic renderer for the descriptive objects that live in the JSON  */
/* (festival_details, trek_details, group_benefits, ...)               */
/* ------------------------------------------------------------------ */

const humanize = (key: string) => {
  const s = key.replace(/_/g, " ").trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const renderValue = (v: unknown): React.ReactNode => {
  if (Array.isArray(v)) {
    return (
      <ul className="flex flex-wrap gap-x-2 gap-y-1.5">
        {v.map((x, i) => (
          <li key={i} className="border border-stone-300 px-2.5 py-1 text-[13px] leading-snug text-stone-700">
            {String(x)}
          </li>
        ))}
      </ul>
    );
  }
  if (v && typeof v === "object") {
    return (
      <dl className="space-y-3">
        {Object.entries(v as Record<string, unknown>).map(([k, val]) => (
          <div key={k}>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500">{humanize(k)}</dt>
            <dd className="mt-1">{renderValue(val)}</dd>
          </div>
        ))}
      </dl>
    );
  }
  return <span>{String(v)}</span>;
};

/** Renders an arbitrary data object as an editorial definition list. Returns null when empty. */
export const DetailList: React.FC<{ title: string; data?: Record<string, unknown> | null }> = ({ title, data }) => {
  if (!data || Object.keys(data).length === 0) return null;
  return (
    <div>
      <h3 className="mb-2 border-b border-emerald-900 pb-3 font-heading text-xl font-medium text-stone-900">{title}</h3>
      <dl className="divide-y divide-stone-200">
        {Object.entries(data).map(([k, v]) => (
          <div key={k} className="grid gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-8">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500 sm:pt-0.5">{humanize(k)}</dt>
            <dd className="text-[15px] leading-relaxed text-stone-800">{renderValue(v)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export const LeadParagraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="max-w-prose font-heading text-xl font-normal leading-relaxed text-stone-800 sm:text-2xl sm:leading-relaxed">
    {children}
  </p>
);

export const makeShare = (fallbackTitle: string, title: string | undefined, description: string | undefined) => async () => {
  const shareData = {
    title: title || fallbackTitle,
    text: description || fallbackTitle,
    url: window.location.href,
  };
  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log("Error sharing:", err);
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  }
};

/** Converts a `detailed_itinerary` array (day number or range + title + activities) into timeline items. */
export const toTimeline = (
  days: { day: number | string; title: string; activities?: string[] }[] | undefined,
): TimelineItem[] =>
  (days ?? []).map((d) => ({
    label: typeof d.day === "number" || /^\d+$/.test(String(d.day)) ? `Day ${d.day}` : `Days ${d.day}`,
    title: d.title,
    activities: d.activities,
  }));

/** Drops facts whose value is empty so the side panel only shows what the data has. */
export const presentFacts = (facts: { label: string; value: unknown }[]): Fact[] =>
  facts.filter((f) => f.value !== undefined && f.value !== null && String(f.value).trim() !== "") as Fact[];
