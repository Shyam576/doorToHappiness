import React, { useEffect, useRef, useState } from "react";
import { FaPrayingHands, FaTree, FaStore, FaMountain } from "react-icons/fa";
import popularDestination from "../data/popularDestination.json";

interface PlacePlaceholderProps {
  name: string;
  className?: string;
}

const RELIGIOUS_KEYWORDS = [
  "dzong",
  "lhakhang",
  "monastery",
  "temple",
  "chorten",
  "goenpa",
  "stupa",
  "nunnery",
  "palace",
];
const MARKET_KEYWORDS = ["market", "town", "institute", "museum", "craft"];
const NATURE_KEYWORDS = [
  "village",
  "valley",
  "river",
  "pass",
  "lake",
  "trek",
  "forest",
  "wildlife",
  "sanctuary",
  "park",
  "farm",
  "bridge",
];

const getCategory = (name: string): "religious" | "market" | "nature" | "general" => {
  const lower = name.toLowerCase();
  if (RELIGIOUS_KEYWORDS.some((k) => lower.includes(k))) return "religious";
  if (MARKET_KEYWORDS.some((k) => lower.includes(k))) return "market";
  if (NATURE_KEYWORDS.some((k) => lower.includes(k))) return "nature";
  return "general";
};

const hashIndex = (input: string, mod: number) => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash % mod;
};

// Deterministic pick from a small tonal pool so the same place always renders the same shade,
// without every tile in a wall of places looking identical.
const TONES = [
  "bg-emerald-900 text-emerald-100/80",
  "bg-emerald-950 text-amber-200/80",
  "bg-stone-800 text-amber-200/80",
  "bg-emerald-800 text-emerald-50/80",
];

const ICONS = {
  religious: FaPrayingHands,
  market: FaStore,
  nature: FaTree,
  general: FaMountain,
};

/**
 * Quiet, named panel shown where a photograph is missing or its remote link is dead.
 * Fills its parent (give the parent a fixed aspect ratio) so nothing shifts.
 */
const PlacePlaceholder: React.FC<PlacePlaceholderProps> = ({ name, className = "" }) => {
  const category = getCategory(name);
  const Icon = ICONS[category];
  const tone = TONES[hashIndex(name, TONES.length)];

  return (
    <div
      role="img"
      aria-label={name}
      className={`relative flex flex-col items-center justify-center gap-3 overflow-hidden px-4 text-center ${tone} ${className}`}
    >
      <span className="pointer-events-none absolute inset-3 border border-current opacity-20" aria-hidden="true" />
      <Icon className="h-5 w-5 opacity-70" aria-hidden="true" />
      <span className="line-clamp-3 max-w-[16rem] font-heading text-base font-medium italic leading-snug sm:text-lg">
        {name}
      </span>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Image helpers: remote hotlinks can be dead, so images fall back to a */
/* local photograph of the real place (when one exists) or a panel.    */
/* ------------------------------------------------------------------ */

const isUsableUrl = (src?: string | null): src is string => !!src && (/^https?:\/\//.test(src) || src.startsWith("/"));

/** Local photographs, only for the places they actually show. */
const DZONGKHAG_LOCAL: Record<string, string> = {
  paro: "/homepagebg1.webp",
  punakha: "/homepagebg3.jpg",
};

export const GENERIC_LANDSCAPE = "/backgroundbanner.jpg";

/** Best local photograph for a dzongkhag slug (or the generic landscape). */
export const dzongkhagFallback = (slug?: string) => (slug && DZONGKHAG_LOCAL[slug]) || GENERIC_LANDSCAPE;

/** Local photograph for a named place when one exists (Tiger's Nest, Punakha Dzong), else undefined. */
export const placeLocalPhoto = (name: string): string | undefined => {
  const n = name.toLowerCase();
  if (n.includes("taktshang") || n.includes("taktsang") || n.includes("tiger")) return "/heritagebg.jpg";
  if (n.includes("punakha dzong")) return "/homepagebg3.jpg";
  return undefined;
};

/** The dzongkhag's lead photograph: its own licensed photo from the data, else the generic landscape. */
export const dzongkhagImage = (d: any): { src: string; fallback: string } => {
  const fallback = dzongkhagFallback(d?.slug);
  const src = [...(d?.media?.images ?? []), d?.images?.[0]].find(isUsableUrl);
  return { src: src || fallback, fallback };
};

/** Hero photograph for a dzongkhag page: its own licensed photo, else the old local photo of the real place, else generic. */
export const dzongkhagHero = (d: any): { src: string; fallback: string } => {
  const own = [...(d?.media?.images ?? []), d?.images?.[0]].find(isUsableUrl);
  const local = DZONGKHAG_LOCAL[d?.slug];
  if (own) return { src: own, fallback: local || GENERIC_LANDSCAPE };
  if (local) return { src: local, fallback: local };
  return { src: GENERIC_LANDSCAPE, fallback: GENERIC_LANDSCAPE };
};

/** place name (lower-case) -> district slug, only for names that appear in exactly one district */
const PLACE_DISTRICT: Map<string, string | null> = (() => {
  const m = new Map<string, string | null>();
  for (const d of popularDestination as any[]) {
    for (const p of d.placesToVisit ?? []) {
      const k = String(p.name).toLowerCase();
      m.set(k, m.has(k) ? null : d.slug);
    }
  }
  return m;
})();

/**
 * When a place has no photograph of its own, its district's photograph can stand in — shown with an explicit
 * "<District> district" label so it is never mistaken for a picture of the place itself.
 */
export const districtPhotoForPlace = (placeName: string): { src: string; label: string } | undefined => {
  const slug = PLACE_DISTRICT.get(placeName.toLowerCase());
  if (!slug) return undefined;
  const d = (popularDestination as any[]).find((x) => x.slug === slug);
  const src = (d?.media?.images ?? []).find(isUsableUrl);
  return src ? { src, label: String(d.name).replace(/\s*Dzongkhag$/i, "") } : undefined;
};

/** Resolve a remote image on the client; swaps to `fallback` if it fails to load. */
export function useResolvedImage(src: string, fallback: string) {
  const [resolved, setResolved] = useState(src);
  useEffect(() => {
    setResolved(src);
    if (!src || src === fallback) return;
    let cancelled = false;
    const probe = new window.Image();
    probe.onerror = () => {
      if (!cancelled) setResolved(fallback);
    };
    probe.src = src;
    return () => {
      cancelled = true;
    };
  }, [src, fallback]);
  return resolved;
}

type PlaceImageProps = {
  src?: string | null;
  alt: string;
  /** Used for the fallback panel. */
  name: string;
  /** Local photograph to try before the panel. */
  fallbackSrc?: string;
  /** Classes for the <img>; the parent should provide the fixed aspect box. */
  className?: string;
  eager?: boolean;
};

/**
 * Lazy <img> that fills its (fixed-aspect) parent. Order: the place's own photo -> a local photo of the real place ->
 * its district's photograph (clearly labelled) -> the neutral PlacePlaceholder. Never a broken-image icon.
 */
export const PlaceImage: React.FC<PlaceImageProps> = ({ src, alt, name, fallbackSrc, className = "", eager }) => {
  const district = districtPhotoForPlace(name);
  const next = (s: 0 | 1 | 2 | 3): 0 | 1 | 2 | 3 => {
    if (s < 1 && fallbackSrc) return 1;
    if (s < 2 && district) return 2;
    return 3;
  };
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(isUsableUrl(src) ? 0 : next(0));
  const ref = useRef<HTMLImageElement>(null);
  // Visible by default (SSR / no-JS); after hydration an unfinished image shows a skeleton and fades in.
  const [loading, setLoading] = useState(false);
  const current = stage === 0 ? src : stage === 1 ? fallbackSrc : stage === 2 ? district?.src : undefined;

  const fail = () => setStage((s) => next(s));

  // An error can fire before React hydrates; catch images that already failed.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.complete && el.naturalWidth === 0 && stage < 3) fail();
    else setLoading(!el.complete);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  if (stage === 3 || !current) return <PlacePlaceholder name={name} className="absolute inset-0 h-full w-full" />;
  return (
    <>
      {loading && (
        <span className="absolute inset-0 animate-pulse bg-gradient-to-br from-stone-200 via-stone-100 to-stone-200" aria-hidden="true" />
      )}
      <img
        ref={ref}
        src={current}
        alt={stage === 2 && district ? `${district.label} district` : alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoading(false)}
        onError={fail}
        className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[900ms] ease-out ${
          loading ? "opacity-0" : "opacity-100"
        } ${className}`}
      />
      {stage === 2 && district && (
        <span className="pointer-events-none absolute right-3 top-3 z-10 bg-emerald-950/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
          {district.label} district
        </span>
      )}
    </>
  );
};

export default PlacePlaceholder;
