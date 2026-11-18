import React from "react";
import Seo from "../../components/Seo";
import Link from "next/link";
import guides from "../../data/guides.json";
import PageHero from "../../components/PageHero";
import { Reveal } from "../../components/motion/Reveal";
import { RevealImage } from "../../components/motion/RevealImage";
import Photo from "../../components/Photo";

const GuidesIndex = () => {
  const [featured, ...rest] = guides;

  return (
    <>
      <Seo
        title="Bhutan Travel Guides | Door to Happiness Holiday"
        description="Practical Bhutan travel guides — when to visit, sample itineraries, and cultural insights to help you plan your trip."
        path="/guides"
        ogTitle="Bhutan Travel Guides"
      />

      <PageHero
        eyebrow="The Journal"
        title={
          <>
            Bhutan Travel <em>Guides</em>
          </>
        }
        intro="Practical, honest guides to help you plan your trip"
        image="/homepagebg2.jpg"
        focus="center 60%"
      />

      <main className="bg-brand-ivory py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          {featured && (
            <Reveal>
              <Link
                href={`/guides/${featured.slug}`}
                className="group grid items-center gap-8 border-b border-stone-300 pb-16 lg:grid-cols-12 lg:gap-14"
              >
                <RevealImage className="aspect-[4/3] bg-stone-200 lg:col-span-7">
                  <Photo
                    src={featured.image}
                    alt={featured.title}
                    className="h-full w-full"
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    imgClassName="h-full w-full object-cover group-hover:scale-105"
                  />
                </RevealImage>
                <div className="lg:col-span-5">
                  <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">
                    <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
                    {featured.category}
                  </p>
                  <h2 className="font-heading text-3xl font-medium leading-[1.08] text-stone-900 group-hover:text-emerald-900 sm:text-5xl">
                    {featured.title}
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-stone-600">{featured.excerpt}</p>
                  <span className="mt-8 inline-flex items-center gap-3 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-stone-900">
                    Read the guide
                    <span className="inline-block h-px w-10 origin-left bg-stone-900 transition-transform duration-300 group-hover:scale-x-150" />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          <ol className="divide-y divide-stone-300">
            {rest.map((guide, i) => (
              <Reveal as="li" key={guide.slug} delay={i * 60}>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="group grid items-center gap-6 py-10 sm:grid-cols-[3rem_220px_1fr] sm:gap-10"
                >
                  <span className="hidden font-heading text-2xl text-amber-600 sm:block">
                    {String(i + 2).padStart(2, "0")}
                  </span>
                  <RevealImage from="left" delay={i * 60} className="aspect-[4/3] bg-stone-200">
                    <Photo
                      src={guide.image}
                      alt={guide.title}
                      className="h-full w-full"
                      sizes="(min-width: 640px) 220px, 100vw"
                      imgClassName="h-full w-full object-cover group-hover:scale-105"
                    />
                  </RevealImage>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">
                      {guide.category}
                    </p>
                    <h2 className="mt-2 font-heading text-2xl font-medium leading-tight text-stone-900 group-hover:text-emerald-900 sm:text-3xl">
                      {guide.title}
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone-600 sm:text-base">
                      {guide.excerpt}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </main>
    </>
  );
};

export default GuidesIndex;
