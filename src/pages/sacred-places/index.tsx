import React, { useState } from 'react';
import Head from 'next/head';
import Seo from '../../components/Seo';
import Link from 'next/link';
import PageHero from '../../components/PageHero';
import SectionHeading from '../../components/SectionHeading';
import { Reveal } from '../../components/motion/Reveal';
import { RevealImage } from '../../components/motion/RevealImage';
import popularDestination from '../../data/popularDestination.json';
import { PlaceImage, placeLocalPhoto } from '../../components/PlacePlaceholder';
import { FiSearch } from 'react-icons/fi';

const SacredPlacesIndex = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Extract all sacred places from all dzongkhags
  const allSacredPlaces = popularDestination.reduce((acc: any[], dzongkhag: any) => {
    const sacredPlacesInDzongkhag = dzongkhag.placesToVisit?.filter((place: any) => 
      place.name.toLowerCase().includes('dzong') || 
      place.name.toLowerCase().includes('lhakhang') ||
      place.name.toLowerCase().includes('monastery') ||
      place.name.toLowerCase().includes('temple') ||
      place.name.toLowerCase().includes('chorten') ||
      place.name.toLowerCase().includes('goenpa')
    ) || [];

    return acc.concat(
      sacredPlacesInDzongkhag.map((place: any) => ({
        ...place,
        slug: place.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        dzongkhag: dzongkhag.name,
        dzongkhagSlug: dzongkhag.slug,
        region: dzongkhag.location.region
      }))
    );
  }, []);

  const filteredPlaces = allSacredPlaces.filter((place: any) => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         place.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         place.dzongkhag.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // Wall of places: varied photo proportions give the masonry its editorial rhythm.
  const SHAPES = ['aspect-[4/5]', 'aspect-square', 'aspect-[3/4]', 'aspect-[5/4]', 'aspect-[4/5]', 'aspect-[3/4]'];

  const architecture = [
    { term: 'Dzongs', gloss: 'Fortress monasteries', text: "Bhutan's dzongs are architectural masterpieces that serve as both administrative centers and monasteries. These massive fortified structures, built without a single nail, represent the pinnacle of traditional Bhutanese architecture and house both government offices and monastic communities." },
    { term: 'Lhakhangs', gloss: 'Sacred temples', text: 'Lhakhangs are the sacred temples of Bhutan, often housing precious statues, ancient scriptures, and religious artifacts. These temples serve as centers for daily prayers, religious festivals, and spiritual guidance for local communities across all dzongkhags.' },
    { term: 'Gompas', gloss: 'Monasteries', text: 'Monasteries or gompas are the spiritual heart of Buddhist practice in Bhutan. These institutions preserve ancient teachings, train monks, and serve as centers for meditation and religious study. Each dzongkhag has several important gompas that contribute to the spiritual landscape.' },
    { term: 'Chortens', gloss: 'Sacred stupas', text: "Chortens are Buddhist stupas found throughout Bhutan's landscape. These sacred structures contain relics and serve as focal points for circumambulation and prayers. They mark sacred spaces and provide spiritual protection for communities in every dzongkhag." },
  ];

  return (
    <>
      <Seo
        title="Heritage Places in Bhutan | Complete Guide to Dzongs, Monasteries & Temples"
        description="Discover Bhutan's most significant heritage places including ancient dzongs, monasteries, lhakhangs, and chortens. Comprehensive guide to cultural sites across all 20 dzongkhags with detailed descriptions and travel information."
        path="/sacred-places"
        keywords="Bhutan sacred places, dzongs Bhutan, monasteries Bhutan, lhakhangs Bhutan, Buddhist temples Bhutan, chortens Bhutan, spiritual sites Bhutan, religious tourism Bhutan, Tiger's Nest Monastery, Paro Taktsang"
        ogTitle="Sacred Places in Bhutan - Complete Guide to Spiritual Sites"
        ogDescription="Explore Bhutan's sacred dzongs, monasteries, and temples. Your complete guide to spiritual sites across the Kingdom of Bhutan."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TravelGuide",
          "name": "Sacred Places of Bhutan Guide",
          "description": "Complete guide to sacred places in Bhutan including dzongs, monasteries, and temples",
          "about": {
            "@type": "Place",
            "name": "Bhutan Sacred Sites"
          },
          "author": {
            "@type": "Organization",
            "name": "Door To Happiness Holiday"
          }
        }}
      />
      <Head>
        {/* Preload hero image for faster LCP */}
        <link
          rel="preload"
          as="image"
          href="/heritagebg.jpg"
          {...({ fetchpriority: "high" } as Record<string, string>)}
        />
      </Head>

      <Head>
        {/* Preload hero image for faster LCP */}
        <link
          rel="preload"
          as="image"
          href="/heritagebg.jpg"
          {...({ fetchpriority: "high" } as Record<string, string>)}
        />
      </Head>

      <PageHero
        eyebrow="Heritage"
        title={<>Heritage places of <em>Bhutan</em></>}
        intro="Journey through the cultural landscape of the Thunder Dragon Kingdom. Discover ancient dzongs, monasteries, and temples that have guided Bhutanese Buddhism for centuries."
        image="/heritagebg.jpg"
        imageAlt="Taktsang monastery clinging to a cliff above the Paro valley"
        focus="center 40%"
      >
        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/85">
          {allSacredPlaces.length} places <span className="mx-2 text-amber-300" aria-hidden="true">/</span> 20 dzongkhags
        </p>
      </PageHero>

      <div className="bg-brand-ivory">
        {/* Search */}
        <div className="sticky top-16 z-30 border-b border-stone-300 bg-brand-ivory/[0.94] backdrop-blur sm:top-[4.5rem]">
          <div className="container mx-auto flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6 lg:px-10">
            <div className="relative w-full max-w-xl">
              <FiSearch className="pointer-events-none absolute left-1 top-1/2 -translate-y-1/2 text-amber-600" aria-hidden="true" />
              <input
                type="search"
                aria-label="Search sacred places"
                placeholder="Search sacred places, dzongs, monasteries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="min-h-[48px] w-full border-0 border-b border-stone-400 bg-transparent pl-8 pr-2 text-base text-stone-900 placeholder:text-stone-400 focus:border-emerald-900 focus:outline-none focus:ring-0"
              />
            </div>
            <p role="status" aria-live="polite" className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
              {filteredPlaces.length} {filteredPlaces.length === 1 ? 'place' : 'places'}
            </p>
          </div>
        </div>

        {/* Places wall */}
        <section aria-label="Heritage places" className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            {filteredPlaces.length === 0 ? (
              <div className="mx-auto max-w-xl py-24 text-center">
                <h2 className="font-heading text-4xl font-medium text-stone-900">No sacred places <em className="font-normal text-emerald-900">found</em></h2>
                <p className="mt-4 text-stone-600">Try adjusting your search terms or filters</p>
              </div>
            ) : (
              <ul className="columns-1 gap-x-8 sm:columns-2 lg:columns-3 [&>li]:mb-14">
                {filteredPlaces.map((place: any, index: number) => (
                  <li key={index} className="break-inside-avoid">
                    <Link
                      href={`/sacred-places/${place.slug}`}
                      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-emerald-900"
                    >
                      <RevealImage className={`relative bg-stone-200 ${SHAPES[index % SHAPES.length]}`} from="bottom" delay={(index % 3) * 140}>
                        <PlaceImage
                          src={place.image}
                          fallbackSrc={placeLocalPhoto(place.name)}
                          name={place.name}
                          alt={place.name}
                          className="duration-[1600ms] group-hover:scale-[1.05]"
                        />
                        <span className="pointer-events-none absolute inset-0 bg-emerald-950/0 transition-colors duration-700 group-hover:bg-emerald-950/10" aria-hidden="true" />
                      </RevealImage>
                      <Reveal delay={(index % 3) * 140 + 150} className="mt-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-600">
                          {place.type ? <span className="capitalize">{place.type} · </span> : null}
                          {place.dzongkhag} · {place.region.replace(' Bhutan', '')}
                        </p>
                        <h3 className="mt-2 font-heading text-2xl font-medium leading-tight text-stone-900 sm:text-[1.7rem]">{place.name}</h3>
                        <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-stone-600">{place.description}</p>
                        {place.distance && (
                          <p className="mt-3 text-xs uppercase tracking-[0.14em] text-stone-500">{place.distance} from district center</p>
                        )}
                        <span className="mt-4 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-emerald-900">
                          Read more<span className="sr-only"> about {place.name}</span>
                          <span className="inline-block h-px w-14 origin-left scale-x-[0.57] bg-emerald-900 transition-transform duration-500 ease-out group-hover:scale-x-100" aria-hidden="true" />
                        </span>
                      </Reveal>
                    </Link>
                    <Link
                      href={`/dzongkhag/${place.dzongkhagSlug}`}
                      className="mt-1 inline-flex min-h-[44px] items-center text-xs font-semibold uppercase tracking-[0.14em] text-stone-500 underline decoration-1 underline-offset-[6px] hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-900"
                    >
                      Explore {place.dzongkhag}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Sacred architecture */}
        <section aria-labelledby="architecture-heading" className="bg-emerald-950 py-24 text-white sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <Reveal className="mb-16 sm:mb-20">
              <SectionHeading id="architecture-heading" tone="dark" eyebrow="A short glossary" title={<>Sacred <em>architecture</em> of Bhutan</>} />
            </Reveal>
            <dl className="border-t border-white/25">
              {architecture.map((a, i) => (
                <Reveal key={a.term} delay={i * 60} className="grid gap-4 border-b border-white/25 py-10 lg:grid-cols-12 lg:gap-12">
                  <dt className="lg:col-span-5">
                    <span className="font-heading text-5xl font-medium sm:text-6xl">{a.term}</span>
                    <span className="mt-2 block text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300">{a.gloss}</span>
                  </dt>
                  <dd className="max-w-xl leading-[1.8] text-white/75 lg:col-span-6 lg:col-start-7">{a.text}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>
      </div>
    </>
  );
};

export default SacredPlacesIndex;
