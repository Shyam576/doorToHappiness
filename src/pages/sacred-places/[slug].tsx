import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Seo from '../../components/Seo';
import VisitOnTourCTA from '../../components/VisitOnTourCTA';
import Link from 'next/link';
import popularDestination from '../../data/popularDestination.json';
import PageHero from '../../components/PageHero';
import SectionHeading from '../../components/SectionHeading';
import PlaceGallery from '../../components/PlaceGallery';
import { Reveal } from '../../components/motion/Reveal';
import { RevealImage } from '../../components/motion/RevealImage';
import { PlaceImage, GENERIC_LANDSCAPE, placeLocalPhoto, useResolvedImage } from '../../components/PlacePlaceholder';

interface HeritagePlacePageProps {
  place: any;
  dzongkhag: any;
  relatedPlaces: any[];
}

const pad = (n: number) => String(n).padStart(2, '0');
const subheading = 'mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600';

const HeritagePlacePage: React.FC<HeritagePlacePageProps> = ({ place, dzongkhag, relatedPlaces }) => {
  const isUrl = (u?: string) => !!u && /^(https?:\/\/|\/)/.test(u);
  // Photo of the place itself > local photo of the real place > the district's licensed photo (labelled) > generic banner.
  const districtPhoto = ((dzongkhag as any)?.media?.images ?? []).find(isUrl) as string | undefined;
  const ownPhoto = isUrl(place.image) ? place.image : undefined;
  const fallback = placeLocalPhoto(place.name) || districtPhoto || GENERIC_LANDSCAPE;
  const heroSrc = useResolvedImage(ownPhoto || fallback, fallback);
  const showsDistrictPhoto = !ownPhoto && !placeLocalPhoto(place.name) && !!districtPhoto;
  const districtLabel = String((dzongkhag as any)?.name ?? '').replace(/\s*Dzongkhag$/i, '');

  const images = place.images || [place.image].filter(Boolean);

  const architectureFeatures = [
    'Traditional construction without nails',
    'Intricate wood carvings and paintings',
    'Sacred Buddhist artifacts',
  ];
  const access = [
    'Open to visitors during daylight hours',
    'Guided tours available',
    'Photography permitted in designated areas',
    'Respectful dress code required',
  ];
  const expect = [
    'Sacred prayer halls and shrines',
    'Traditional architectural details',
    'Peaceful meditation spaces',
    'Views of surrounding landscape',
  ];

  return (
    <>
      <Seo
        title={`${place.name}, ${dzongkhag.name}, Bhutan – History & How to Visit`}
        description={place.description}
        path={`/sacred-places/${place.slug}`}
        ogImage={place.image || '/backgroundbanner.jpg'}
        ogType="article"
      />

      <PageHero
        size="lg"
        eyebrow={`${place.type ? place.type + ' · ' : ''}${dzongkhag.name} Dzongkhag`}
        title={place.name}
        intro={`${place.region}${place.distance ? ` · ${place.distance} from center` : ''}`}
        image={heroSrc}
        imageAlt={showsDistrictPhoto ? `${districtLabel} district` : `${place.name} heritage site`}
      >
        {showsDistrictPhoto && (
          <span className="bg-emerald-950/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
            Photo: {districtLabel} district
          </span>
        )}
      </PageHero>

      <div className="bg-brand-ivory">
        <section aria-labelledby="about-heading" className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <nav aria-label="Breadcrumb" className="mb-14 text-xs uppercase tracking-[0.16em] text-stone-500">
              <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <li><Link href="/" className="inline-flex min-h-[44px] items-center hover:text-emerald-900">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/sacred-places" className="inline-flex min-h-[44px] items-center hover:text-emerald-900">Heritage places</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href={`/dzongkhag/${dzongkhag.slug}`} className="inline-flex min-h-[44px] items-center hover:text-emerald-900">{dzongkhag.name}</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-stone-900">{place.name}</li>
              </ol>
            </nav>

            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Facts rail */}
              <aside aria-label="Quick information" className="lg:col-span-3">
                <div className="lg:sticky lg:top-32">
                  <Reveal delay={200}><p className={subheading}><span className="h-px w-10 bg-amber-500" aria-hidden="true" />At a glance</p></Reveal>
                  <Reveal delay={350}>
                  <dl className="divide-y divide-stone-300 border-y border-stone-300">
                    {place.type && (
                      <div className="py-4">
                        <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">Type</dt>
                        <dd className="mt-1 font-heading text-xl font-medium capitalize text-stone-900">{place.type}</dd>
                      </div>
                    )}
                    <div className="py-4">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">Location</dt>
                      <dd className="mt-1 font-heading text-xl font-medium text-stone-900">{dzongkhag.name}</dd>
                    </div>
                    {place.distance && (
                      <div className="py-4">
                        <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">Distance</dt>
                        <dd className="mt-1 font-heading text-xl font-medium text-stone-900">{place.distance}</dd>
                      </div>
                    )}
                  </dl>
                  </Reveal>
                  <Link
                    href={`/dzongkhag/${dzongkhag.slug}`}
                    className="mt-6 inline-flex min-h-[44px] items-center text-[12px] font-semibold uppercase tracking-[0.14em] text-emerald-900 underline decoration-1 underline-offset-[6px] hover:text-amber-600"
                  >
                    Visit {dzongkhag.name}
                  </Link>
                </div>
              </aside>

              {/* Long-form */}
              <div className="lg:col-span-8 lg:col-start-5">
                <SectionHeading id="about-heading" eyebrow="The story" title={<>About <em>{place.name}</em></>} className="max-w-3xl" />
                <div className="mt-10 max-w-2xl space-y-6 text-lg leading-[1.85] text-stone-700">
                  <Reveal delay={250}>
                  <p className="first-letter:float-left first-letter:mr-3 first-letter:font-heading first-letter:text-7xl first-letter:font-medium first-letter:leading-[0.85] first-letter:text-emerald-900">
                    {place.description}
                  </p>
                  </Reveal>
                  {place.history && (
                    <Reveal delay={150}>
                      <h3 className="pt-6 font-heading text-3xl font-medium text-stone-900">Historical <em className="font-normal text-emerald-900">significance</em></h3>
                      <p className="mt-6">{place.history}</p>
                    </Reveal>
                  )}
                  {place.significance && (
                    <Reveal delay={150}>
                      <h3 className="pt-6 font-heading text-3xl font-medium text-stone-900">Cultural <em className="font-normal text-emerald-900">significance</em></h3>
                      <p className="mt-6">{place.significance}</p>
                    </Reveal>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {images.length > 1 && (
          <PlaceGallery
            images={images.map((src: string) => ({ src, alt: place.name }))}
            className="border-t border-stone-300 py-24"
            header={<SectionHeading eyebrow="Gallery" title={<>Seen <em>up close</em></>} />}
          />
        )}

        {/* Architecture & features */}
        <section aria-labelledby="architecture-heading" className="bg-emerald-950 py-24 text-white sm:py-32">
          <div className="container mx-auto grid gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
            <Reveal className="lg:col-span-6">
              <SectionHeading id="architecture-heading" tone="dark" eyebrow="Built to endure" title={<>Architecture &amp; <em>features</em></>} />
              <h3 className="mt-10 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300">Architectural style</h3>
              <p className="mt-4 max-w-md font-heading text-2xl font-normal italic leading-snug text-white/90">
                Traditional Bhutanese architecture featuring intricate woodwork, painted motifs, and distinctive roof designs typical of {place.type || 'heritage site'}s.
              </p>
            </Reveal>
            <Reveal delay={90} className="lg:col-span-5 lg:col-start-8">
              <h3 className="border-t border-white/25 pt-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300">Special features</h3>
              <ol className="mt-4">
                {architectureFeatures.map((f, i) => (
                  <Reveal as="li" key={f} delay={i * 120} className="flex items-baseline gap-5 border-b border-white/25 py-5 font-heading text-xl font-medium">
                    <span className="text-sm text-amber-300" aria-hidden="true">{pad(i + 1)}</span>{f}
                  </Reveal>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* Visiting information */}
        <section aria-labelledby="visiting-heading" className="py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <Reveal className="mb-14">
              <SectionHeading id="visiting-heading" eyebrow="Before you go" title={<>Visiting <em>information</em></>} />
            </Reveal>
            <div className="grid gap-12 md:grid-cols-2 lg:gap-24">
              <Reveal>
                <h3 className="border-t border-stone-400 pt-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">Access &amp; timing</h3>
                <ul className="mt-5 space-y-3 text-lg text-stone-700">
                  {access.map((x, i) => (<Reveal as="li" key={x} delay={i * 100} className="flex items-baseline gap-3"><span className="h-px w-5 shrink-0 translate-y-[-4px] bg-amber-500" aria-hidden="true" />{x}</Reveal>))}
                </ul>
              </Reveal>
              <Reveal delay={90}>
                <h3 className="border-t border-stone-400 pt-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">What to expect</h3>
                <ul className="mt-5 space-y-3 text-lg text-stone-700">
                  {expect.map((x, i) => (<Reveal as="li" key={x} delay={i * 100} className="flex items-baseline gap-3"><span className="h-px w-5 shrink-0 translate-y-[-4px] bg-amber-500" aria-hidden="true" />{x}</Reveal>))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Related heritage places */}
        {relatedPlaces.length > 0 && (
          <section aria-labelledby="related-heading" className="border-t border-stone-300 bg-stone-100 py-24 sm:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-10">
              <Reveal className="mb-12">
                <SectionHeading id="related-heading" eyebrow={dzongkhag.name} title={<>Related heritage <em>places</em></>} />
              </Reveal>
              <ul className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
                {relatedPlaces.map((relatedPlace: any, ri: number) => (
                  <li key={relatedPlace.slug} className="w-[72%] shrink-0 snap-start sm:w-auto">
                    <Link href={`/sacred-places/${relatedPlace.slug}`} className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-emerald-900">
                      <RevealImage from="bottom" delay={ri * 150} className="relative aspect-[4/5] bg-stone-200">
                        <PlaceImage src={relatedPlace.image} fallbackSrc={placeLocalPhoto(relatedPlace.name)} name={relatedPlace.name} alt={relatedPlace.name} className="duration-[1600ms] group-hover:scale-[1.05]" />
                      </RevealImage>
                      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600">
                        {relatedPlace.type ? <span className="capitalize">{relatedPlace.type} · </span> : null}{relatedPlace.dzongkhag}
                      </p>
                      <h3 className="mt-1 font-heading text-xl font-medium leading-snug text-stone-900">{relatedPlace.name}</h3>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Visit + explore the region */}
        <section aria-labelledby="visit-heading" className="bg-emerald-950 py-24 text-white sm:py-32">
          <div className="container mx-auto grid gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
            <Reveal className="lg:col-span-6">
              <SectionHeading
                id="visit-heading"
                tone="dark"
                eyebrow="Explore the region"
                title={<>More to discover in <em>{dzongkhag.name}</em></>}
                intro={`Discover more attractions and heritage sites in ${dzongkhag.name} Dzongkhag.`}
              />
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-2">
                <Link
                  href={`/dzongkhag/${dzongkhag.slug}`}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-emerald-950 transition-colors hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Visit {dzongkhag.name}
                </Link>
                <Link
                  href="/sacred-places"
                  className="inline-flex min-h-[44px] items-center text-[13px] font-semibold uppercase tracking-[0.14em] text-white underline decoration-1 underline-offset-[6px] hover:text-amber-200"
                >
                  Browse all heritage places
                </Link>
              </div>
            </Reveal>
            <Reveal delay={90} className="lg:col-span-5 lg:col-start-8">
              <VisitOnTourCTA dzongkhagName={dzongkhag.name} pageLabel={place.name} tone="dark" />
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPlaces: any[] = [];
  
  // Extract all places from all dzongkhags
  popularDestination.forEach((dzongkhag: any) => {
    if (dzongkhag.placesToVisit) {
      dzongkhag.placesToVisit.forEach((place: any) => {
        // Only include heritage/sacred places
        if (place.name.toLowerCase().includes('dzong') || 
            place.name.toLowerCase().includes('lhakhang') ||
            place.name.toLowerCase().includes('monastery') ||
            place.name.toLowerCase().includes('temple') ||
            place.name.toLowerCase().includes('chorten') ||
            place.name.toLowerCase().includes('stupa') ||
            place.type && ['dzong', 'monastery', 'temple', 'lhakhang', 'chorten', 'stupa', 'palace', 'fortress'].includes(place.type)) {
          
          // Create a slug for the place
          const slug = place.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          
          allPlaces.push({
            ...place,
            slug,
            dzongkhagSlug: dzongkhag.slug,
            dzongkhag: dzongkhag.name,
            region: dzongkhag.location.region
          });
        }
      });
    }
  });

  const paths = allPlaces.map((place: any) => ({
    params: { slug: place.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  
  let foundPlace: any = null;
  let foundDzongkhag: any = null;

  // Find the place and its dzongkhag
  for (const dzongkhag of popularDestination) {
    if (dzongkhag.placesToVisit) {
      for (const place of dzongkhag.placesToVisit) {
        const placeSlug = place.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        if (placeSlug === slug) {
          foundPlace = {
            ...place,
            slug: placeSlug,
            dzongkhagSlug: dzongkhag.slug,
            dzongkhag: dzongkhag.name,
            region: dzongkhag.location.region
          };
          foundDzongkhag = dzongkhag;
          break;
        }
      }
      if (foundPlace) break;
    }
  }

  if (!foundPlace || !foundDzongkhag) {
    return {
      notFound: true,
    };
  }

  // Find related places (other heritage places in the same dzongkhag)
  const relatedPlaces: any[] = [];
  if (foundDzongkhag.placesToVisit) {
    foundDzongkhag.placesToVisit.forEach((place: any) => {
      if (place.name !== foundPlace.name && 
          (place.name.toLowerCase().includes('dzong') || 
           place.name.toLowerCase().includes('lhakhang') ||
           place.name.toLowerCase().includes('monastery') ||
           place.name.toLowerCase().includes('temple') ||
           place.type && ['dzong', 'monastery', 'temple', 'lhakhang', 'chorten', 'stupa', 'palace', 'fortress'].includes(place.type))) {
        
        const relatedSlug = place.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        relatedPlaces.push({
          ...place,
          slug: relatedSlug,
          dzongkhagSlug: foundDzongkhag.slug,
          dzongkhag: foundDzongkhag.name,
        });
      }
    });
  }

  return {
    props: {
      place: foundPlace,
      dzongkhag: foundDzongkhag,
      relatedPlaces: relatedPlaces.slice(0, 4), // Limit to 4 related places
    },
  };
};

export default HeritagePlacePage;
