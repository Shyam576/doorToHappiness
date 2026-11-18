import React from "react";
import Link from "next/link";
import guides from "../../data/guides.json";
import { Reveal } from "../motion/Reveal";
import Photo from "../Photo";
import { StaggerText } from "../motion/StaggerText";
import { RevealImage } from "../motion/RevealImage";

type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  datePublished: string;
};

const items = guides as Guide[];

const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

/** Editorial travel inspiration drawn from the site's real travel guides (/guides). */
const InspirationSection: React.FC = () => {
  if (items.length === 0) return null;
  const [lead, ...rest] = items;

  return (
    <section aria-labelledby="inspiration-heading" className="bg-white py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <Reveal className="mb-14 flex flex-col gap-6 sm:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">
              <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
              Travel inspiration
            </p>
            <h2 id="inspiration-heading" className="font-heading text-4xl font-medium leading-[1.05] text-stone-900 sm:text-5xl lg:text-6xl"><StaggerText>
              Read before you <span className="italic text-emerald-900">go.</span>
            </StaggerText></h2>
          </div>
          <Link
            href="/guides"
            className="group inline-flex items-center gap-3 self-start text-[13px] font-semibold uppercase tracking-[0.16em] text-emerald-900 lg:self-auto"
          >
            All travel guides
            <span className="inline-block h-px w-10 bg-emerald-900 transition-all duration-300 group-hover:w-16" />
          </Link>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <Link href={`/guides/${lead.slug}`} className="group block">
              <RevealImage className="relative aspect-[4/3] bg-stone-200">
                <Photo
                  src={lead.image}
                  alt=""
                  className="absolute inset-0"
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  imgClassName="h-full w-full object-cover group-hover:scale-[1.04]"
                />
              </RevealImage>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-600">
                {lead.category} · {formatDate(lead.datePublished)}
              </p>
              <h3 className="mt-3 max-w-xl font-heading text-3xl font-medium leading-tight text-stone-900 transition-colors group-hover:text-emerald-900 sm:text-4xl">
                {lead.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone-600">{lead.excerpt}</p>
            </Link>
          </Reveal>

          <div className="space-y-10 lg:col-span-5 lg:space-y-12 lg:pt-16">
            {rest.map((guide, i) => (
              <Reveal key={guide.slug} delay={(i + 1) * 90}>
                <Link href={`/guides/${guide.slug}`} className="group grid grid-cols-[7.5rem_1fr] gap-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <RevealImage className="relative aspect-[4/5] bg-stone-200" delay={120}>
                    <Photo
                      src={guide.image}
                      alt=""
                      className="absolute inset-0"
                      sizes="160px"
                      imgClassName="h-full w-full object-cover group-hover:scale-[1.06]"
                    />
                  </RevealImage>
                  <div className="self-center">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600">
                      {guide.category}
                    </p>
                    <h3 className="mt-2 font-heading text-2xl font-medium leading-snug text-stone-900 transition-colors group-hover:text-emerald-900">
                      {guide.title}
                    </h3>
                    <p className="mt-2 hidden text-sm leading-relaxed text-stone-600 line-clamp-2 sm:block">
                      {guide.excerpt}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InspirationSection;
