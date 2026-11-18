import React from "react";
import Link from "next/link";
import popularDestination from "../../data/popularDestination.json";
import { Reveal } from "../motion/Reveal";
import Photo from "../Photo";
import { StaggerText } from "../motion/StaggerText";
import { RevealImage } from "../motion/RevealImage";

type Destination = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  media?: { images?: string[] };
};

const all = popularDestination as Destination[];

// Featured destinations, in editorial order. Each tile has its own proportion and offset so the
// composition reads like a magazine spread rather than a grid of equal cards. `image` overrides
// the data's first photo where that hotlink is dead (Punakha) with a local photograph of the
// real place; everything else uses the destination's own image.
const FEATURED: {
  slug: string;
  image?: string;
  /** Which of the destination's own photos to use when no override is given. */
  imageIndex?: number;
  className: string;
  aspect: string;
  tall?: boolean;
}[] = [
  { slug: "paro", imageIndex: 1, className: "lg:col-span-7", aspect: "aspect-[4/5] lg:aspect-[7/6]" },
  { slug: "thimphu", className: "lg:col-span-5 lg:mt-24", aspect: "aspect-[4/5]" },
  { slug: "punakha", image: "/homepagebg3.jpg", className: "lg:col-span-4 lg:-mt-6", aspect: "aspect-[4/5]" },
  { slug: "bumthang", className: "lg:col-span-4 lg:mt-20", aspect: "aspect-square" },
  { slug: "trashigang", className: "lg:col-span-4", aspect: "aspect-[3/4]" },
];

const firstSentence = (text: string) => {
  const end = text.indexOf(". ");
  return end > 0 ? text.slice(0, end + 1) : text;
};

const DestinationShowcase: React.FC = () => {
  const tiles = FEATURED.map((f) => ({
    ...f,
    destination: all.find((d) => d.slug === f.slug),
  })).filter((t): t is typeof t & { destination: Destination } => Boolean(t.destination));

  return (
    <section aria-labelledby="destinations-heading" className="bg-brand-ivory py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <Reveal className="mb-14 flex flex-col gap-6 sm:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">
              <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
              Destinations
            </p>
            <h2 id="destinations-heading" className="font-heading text-4xl font-medium leading-[1.05] text-stone-900 sm:text-5xl lg:text-6xl"><StaggerText>
              Twenty dzongkhags. <span className="italic text-emerald-900">One kingdom</span> to be
              explored slowly.
            </StaggerText></h2>
          </div>
          <Link
            href="/dzongkhag"
            className="group inline-flex items-center gap-3 self-start text-[13px] font-semibold uppercase tracking-[0.16em] text-emerald-900 lg:self-auto"
          >
            All 20 dzongkhags
            <span className="inline-block h-px w-10 bg-emerald-900 transition-all duration-300 group-hover:w-16" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 lg:grid-cols-12 lg:gap-y-16">
          {tiles.map(({ destination, image, imageIndex = 0, className, aspect }, i) => {
            const src = image ?? destination.media?.images?.[imageIndex] ?? destination.media?.images?.[0] ?? "/backgroundbanner.jpg";
            return (
              <Reveal key={destination.slug} delay={(i % 3) * 90} className={className}>
                <Link href={`/dzongkhag/${destination.slug}`} className="group block">
                  <RevealImage className={`relative bg-stone-200 ${aspect}`} from={i % 2 ? "top" : "bottom"}>
                    <Photo
                      src={src}
                      alt={`${destination.name} — ${destination.tagline}`}
                      className="absolute inset-0"
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      imgClassName="h-full w-full object-cover group-hover:scale-[1.05]"
                      fallback="/backgroundbanner.jpg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/55 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute left-5 top-5 text-[11px] font-medium uppercase tracking-[0.24em] text-white/90">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </RevealImage>
                  <div className="mt-5 flex items-start justify-between gap-6">
                    <div>
                      <h3 className="font-heading text-3xl font-medium text-stone-900 sm:text-4xl">
                        {destination.name}
                      </h3>
                      <p className="mt-1 text-[12px] uppercase tracking-[0.2em] text-amber-600">
                        {destination.tagline}
                      </p>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-600 line-clamp-2">
                        {firstSentence(destination.description)}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="mt-2 hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stone-300 text-emerald-900 transition-all duration-300 group-hover:border-emerald-900 group-hover:bg-emerald-900 group-hover:text-white sm:flex"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" />
                      </svg>
                    </span>
                  </div>
                  <span className="sr-only">Discover {destination.name}</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DestinationShowcase;
