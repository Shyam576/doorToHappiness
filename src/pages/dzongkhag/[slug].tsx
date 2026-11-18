import React, { useEffect, useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Seo from '../../components/Seo';
import VisitOnTourCTA from '../../components/VisitOnTourCTA';
import Link from 'next/link';
import popularDestination from '../../data/popularDestination.json';
import PageHero from '../../components/PageHero';
import SectionHeading from '../../components/SectionHeading';
import PlaceGallery, { GalleryImage } from '../../components/PlaceGallery';
import { Reveal } from '../../components/motion/Reveal';
import { RevealImage } from '../../components/motion/RevealImage';
import { Parallax } from '../../components/motion/Parallax';
import { PlaceImage, dzongkhagHero, dzongkhagImage, useResolvedImage } from '../../components/PlacePlaceholder';

interface DzongkhagPageProps {
  dzongkhag: any;
  relatedDzongkhags: any[];
}

const placeSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const pad = (n: number) => String(n).padStart(2, '0');
const firstParagraph = (text: string) => (text || '').split('\n').map((p) => p.trim()).filter(Boolean)[0] || '';

const pillOnDark =
  'inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-emerald-950 transition-colors hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';
const linkOnDark =
  'inline-flex min-h-[44px] items-center text-[13px] font-semibold uppercase tracking-[0.14em] text-white underline decoration-1 underline-offset-[6px] transition-colors hover:text-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';
const subheading = 'mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600';

const DzongkhagPage: React.FC<DzongkhagPageProps> = ({ dzongkhag, relatedDzongkhags }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const hero = dzongkhagHero(dzongkhag);
  const heroSrc = useResolvedImage(hero.src, hero.fallback);

  const sacredPlaces = dzongkhag.placesToVisit?.filter((place: any) => 
    place.name.toLowerCase().includes('dzong') || 
    place.name.toLowerCase().includes('lhakhang') ||
    place.name.toLowerCase().includes('monastery') ||
    place.name.toLowerCase().includes('temple') ||
    place.name.toLowerCase().includes('chorten') ||
    place.name.toLowerCase().includes('goenpa') ||
    place.name.toLowerCase().includes('stupa') ||
    place.name.toLowerCase().includes('palace') ||
    place.name.toLowerCase().includes('fortress') ||
    (place.type && ['dzong', 'monastery', 'temple', 'lhakhang', 'chorten', 'stupa', 'palace', 'fortress'].includes(place.type.toLowerCase()))
  ) || [];

  const places: any[] = dzongkhag.placesToVisit || [];
  const featured = places.slice(0, 3);
  const rest = places.slice(3);
  const experiences: any[] = Array.isArray(dzongkhag.experiences) ? dzongkhag.experiences : [];
  const practical = dzongkhag.practicalInfo;
  const practicalGroups: { label: string; items: string[] }[] = practical
    ? [
        { label: 'Best time to visit', items: practical.bestTimeToVisit },
        { label: 'Accommodation', items: practical.accommodation },
        { label: 'Getting there', items: practical.transportation },
      ].filter((g) => Array.isArray(g.items) && g.items.length > 0)
    : [];

  const galleryImages: GalleryImage[] = [];
  const seen = new Set<string>([hero.src]);
  const addImage = (src: any, alt: string, caption?: string) => {
    if (typeof src === 'string' && /^https?:\/\//.test(src) && !seen.has(src) && galleryImages.length < 6) {
      seen.add(src);
      galleryImages.push({ src, alt, caption });
    }
  };
  (dzongkhag.media?.images || []).forEach((src: string) => addImage(src, `${dzongkhag.name} dzongkhag`));
  rest.forEach((p: any) => addImage(p.image, p.name, p.name));

  const sections = [
    { id: 'overview', label: 'Overview', show: true },
    { id: 'places', label: 'Places to visit', show: places.length > 0 },
    { id: 'culture', label: 'Culture', show: true },
    { id: 'nature', label: 'Nature', show: !!dzongkhag.nature },
    { id: 'experiences', label: 'Experiences', show: experiences.length > 0 },
    { id: 'practical', label: 'Practical info', show: practicalGroups.length > 0 },
    { id: 'plan', label: 'Plan your visit', show: true },
  ].filter((x) => x.show);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    sections.forEach((x) => {
      const el = document.getElementById(x.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dzongkhag.slug]);

  const mapUrl = `https://www.google.com/maps?q=${dzongkhag.location.coordinates.lat},${dzongkhag.location.coordinates.lng}`;

  return (
    <>
      <Seo
        title={`${dzongkhag.name} Dzongkhag Guide | Places to Visit, Dzongs & Monasteries in ${dzongkhag.name}`}
        description={`Complete travel guide to ${dzongkhag.name} dzongkhag in ${dzongkhag.location.region}. Discover dzongs, monasteries, cultural sites, and experiences in ${dzongkhag.name}, Bhutan.`}
        path={`/dzongkhag/${dzongkhag.slug}`}
        keywords={`${dzongkhag.name} dzongkhag, ${dzongkhag.name} Bhutan, ${dzongkhag.culture.dzongs.join(', ')}, ${dzongkhag.highlights.join(', ')}, ${dzongkhag.location.region}, sacred places ${dzongkhag.name}, monasteries ${dzongkhag.name}`}
        ogTitle={`${dzongkhag.name} Dzongkhag - Sacred Places & Cultural Heritage | Bhutan`}
        ogDescription={`Explore ${dzongkhag.name} dzongkhag's sacred sites, ancient dzongs, and monasteries. ${dzongkhag.description}`}
        ogType="article"
        ogImage={dzongkhag.images?.[0] || '/logo.png'}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          "name": `${dzongkhag.name} Dzongkhag`,
          "description": dzongkhag.description,
          "image": dzongkhag.images || ['/logo.png'],
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": dzongkhag.location.coordinates.lat,
            "longitude": dzongkhag.location.coordinates.lng
          },
          "containedInPlace": {
            "@type": "Country",
            "name": "Bhutan"
          },
          "touristType": ["Cultural Tourism", "Religious Tourism", "Adventure Tourism"],
          "hasMap": `https://www.google.com/maps?q=${dzongkhag.location.coordinates.lat},${dzongkhag.location.coordinates.lng}`
        }}
      />

      <PageHero
        size="lg"
        eyebrow={dzongkhag.location.region}
        title={<>{dzongkhag.name} <em>Dzongkhag</em></>}
        intro={dzongkhag.tagline}
        image={heroSrc}
        imageAlt={`${dzongkhag.name} dzongkhag landscape`}
      >
        <a href="#plan" className={pillOnDark}>Plan your visit</a>
        {places.length > 0 && <a href="#places" className={linkOnDark}>Places to visit</a>}
      </PageHero>

      <div className="bg-brand-ivory">
        {/* Sticky in-page navigation */}
        <nav
          aria-label={`${dzongkhag.name} page sections`}
          className="sticky top-16 z-30 border-b border-stone-300 bg-brand-ivory/[0.94] backdrop-blur sm:top-[4.5rem]"
        >
          <div className="container mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
            <ul className="flex gap-x-7 overflow-x-auto">
              {sections.map((x) => (
                <li key={x.id} className="shrink-0">
                  <a
                    href={`#${x.id}`}
                    aria-current={activeSection === x.id ? 'true' : undefined}
                    className={`inline-flex min-h-[48px] items-center border-b-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-emerald-900 ${
                      activeSection === x.id ? 'border-amber-500 text-emerald-900' : 'border-transparent text-stone-500 hover:text-emerald-900'
                    }`}
                  >
                    {x.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Overview */}
        <section id="overview" aria-labelledby="overview-heading" className="scroll-mt-32 py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <nav aria-label="Breadcrumb" className="mb-14 text-xs uppercase tracking-[0.16em] text-stone-500">
              <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <li><Link href="/" className="inline-flex min-h-[44px] items-center hover:text-emerald-900">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/dzongkhag" className="inline-flex min-h-[44px] items-center hover:text-emerald-900">Dzongkhags</Link></li>
                <li aria-hidden="true">/</li>
                <li>{dzongkhag.location.region}</li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-stone-900">{dzongkhag.name}</li>
              </ol>
            </nav>

            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-7">
                <SectionHeading
                  id="overview-heading"
                  eyebrow={dzongkhag.location.region}
                  title={<>About <em>{dzongkhag.name}</em> Dzongkhag</>}
                />
                <p className="mt-10 font-heading text-2xl font-normal leading-[1.45] text-stone-800 sm:text-3xl">
                  {dzongkhag.description}
                </p>

                <dl className="mt-14 grid gap-x-10 gap-y-8 border-t border-stone-300 pt-8 sm:grid-cols-3">
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">Region</dt>
                    <dd className="mt-2 text-stone-900">{dzongkhag.location.region}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">Nearby dzongkhags</dt>
                    <dd className="mt-2 text-stone-900">{dzongkhag.location.nearbyDzongkhags.join(', ')}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">Coordinates</dt>
                    <dd className="mt-2 text-stone-900">
                      {dzongkhag.location.coordinates.lat}°N, {dzongkhag.location.coordinates.lng}°E
                      <a
                        href={mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 flex min-h-[44px] items-center text-[12px] font-semibold uppercase tracking-[0.14em] text-emerald-900 underline decoration-1 underline-offset-[6px] hover:text-amber-600"
                      >
                        View on map
                      </a>
                    </dd>
                  </div>
                </dl>
              </Reveal>

              <Reveal delay={90} className="lg:col-span-4 lg:col-start-9">
                <div className="lg:sticky lg:top-40">
                  <p className={subheading}>
                    <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
                    Key highlights
                  </p>
                  <ol className="border-t border-stone-300">
                    {dzongkhag.highlights.map((highlight: string, index: number) => (
                      <Reveal as="li" key={index} delay={index * 70} className="flex items-baseline gap-5 border-b border-stone-300 py-4">
                        <span className="font-heading text-sm text-amber-600" aria-hidden="true">{pad(index + 1)}</span>
                        <span className="font-heading text-xl font-medium text-stone-900">{highlight}</span>
                      </Reveal>
                    ))}
                  </ol>
                  <dl className="mt-10 grid grid-cols-2 gap-6">
                    <div>
                      <dd className="font-heading text-5xl font-medium text-emerald-900">{dzongkhag.culture.dzongs.length}</dd>
                      <dt className="mt-1 text-xs uppercase tracking-[0.16em] text-stone-500">Historic dzongs</dt>
                    </div>
                    <div>
                      <dd className="font-heading text-5xl font-medium text-emerald-900">{sacredPlaces.length}</dd>
                      <dt className="mt-1 text-xs uppercase tracking-[0.16em] text-stone-500">Heritage sites</dt>
                    </div>
                    <div>
                      <dd className="font-heading text-5xl font-medium text-emerald-900">{dzongkhag.highlights.length}</dd>
                      <dt className="mt-1 text-xs uppercase tracking-[0.16em] text-stone-500">Key highlights</dt>
                    </div>
                    <div>
                      <dd className="font-heading text-5xl font-medium text-emerald-900">{places.length}</dd>
                      <dt className="mt-1 text-xs uppercase tracking-[0.16em] text-stone-500">Places to visit</dt>
                    </div>
                  </dl>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Places to visit */}
        {places.length > 0 && (
          <section id="places" aria-labelledby="places-heading" className="scroll-mt-32 border-t border-stone-300 py-24 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-10">
              <Reveal className="mb-16 sm:mb-24">
                <SectionHeading
                  id="places-heading"
                  eyebrow={`${places.length} places`}
                  title={<>Heritage places &amp; <em>attractions</em></>}
                />
              </Reveal>

              <ol className="space-y-24 sm:space-y-32">
                {featured.map((place: any, i: number) => (
                  <li key={place.name}>
                    <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
                      <RevealImage
                        from={i % 2 === 1 ? 'right' : 'left'}
                        className={`relative bg-stone-200 aspect-[4/3] lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}
                      >
                        <Link
                          href={`/attractions/${placeSlug(place.name)}`}
                          tabIndex={-1}
                          aria-hidden="true"
                          className="group relative block h-full w-full overflow-hidden"
                        >
                          <Parallax speed={0.07} className="absolute inset-x-0 -inset-y-[7%]">
                            <PlaceImage
                              src={place.image}
                              name={place.name}
                              alt=""
                              className="duration-[1400ms] group-hover:scale-[1.05]"
                            />
                          </Parallax>
                        </Link>
                      </RevealImage>
                      <Reveal delay={250} className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                        <p className="font-heading text-6xl font-normal text-amber-500/60" aria-hidden="true">{pad(i + 1)}</p>
                        <h3 className="mt-3 font-heading text-3xl font-medium leading-tight text-stone-900 sm:text-4xl">{place.name}</h3>
                        {place.distance && (
                          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600">{place.distance} from center</p>
                        )}
                        <p className="mt-5 line-clamp-5 leading-[1.8] text-stone-600">{firstParagraph(place.description)}</p>
                        <Link
                          href={`/attractions/${placeSlug(place.name)}`}
                          className="group mt-7 inline-flex min-h-[44px] items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-900"
                        >
                          View details<span className="sr-only"> for {place.name}</span>
                          <span className="inline-block h-px w-14 origin-left scale-x-[0.57] bg-emerald-900 transition-transform duration-500 ease-out group-hover:scale-x-100" aria-hidden="true" />
                        </Link>
                      </Reveal>
                    </div>
                  </li>
                ))}
              </ol>

              {rest.length > 0 && (
                <Reveal className="mt-24 sm:mt-32">
                  <p className={subheading}>
                    <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
                    More to explore
                  </p>
                  <ol className="grid gap-x-16 border-t border-stone-300 lg:grid-cols-2" start={4}>
                    {rest.map((place: any, i: number) => (
                      <li key={place.name} className="border-b border-stone-300">
                        <Link
                          href={`/attractions/${placeSlug(place.name)}`}
                          className="group flex items-start gap-5 py-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-emerald-900"
                        >
                          <span className="pt-1 font-heading text-sm text-amber-600" aria-hidden="true">{pad(i + 4)}</span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-heading text-xl font-medium text-stone-900 transition-colors group-hover:text-emerald-900">{place.name}</span>
                            {place.distance && (
                              <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600">{place.distance} from center</span>
                            )}
                            <span className="mt-2 line-clamp-2 block text-sm leading-relaxed text-stone-600">{firstParagraph(place.description)}</span>
                          </span>
                          <span className="mt-2 hidden h-px w-12 shrink-0 origin-left scale-x-[0.67] bg-emerald-900 transition-transform duration-500 ease-out group-hover:scale-x-100 sm:block" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              )}
            </div>
          </section>
        )}

        <PlaceGallery
          id="gallery"
          images={galleryImages}
          className="border-t border-stone-300 py-24 sm:py-32"
          header={<SectionHeading eyebrow="Gallery" title={<>Glimpses of <em>{dzongkhag.name}</em></>} />}
        />

        {/* Cultural heritage */}
        <section id="culture" aria-labelledby="culture-heading" className="scroll-mt-32 bg-emerald-950 py-24 text-white sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <Reveal className="mb-16 sm:mb-20">
              <SectionHeading id="culture-heading" tone="dark" eyebrow="Living tradition" title={<>Cultural <em>heritage</em></>} />
            </Reveal>
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
              <Reveal className="lg:col-span-5">
                <h3 className="border-t border-white/25 pt-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300">Dzongs &amp; monasteries</h3>
                <ul className="mt-6 space-y-4">
                  {dzongkhag.culture.dzongs.map((dzong: string, idx: number) => (
                    <Reveal as="li" key={idx} delay={idx * 80} className="flex items-baseline gap-5 font-heading text-2xl font-medium">
                      <span className="text-sm text-amber-300" aria-hidden="true">{pad(idx + 1)}</span>
                      {dzong}
                    </Reveal>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={90} className="lg:col-span-4">
                <h3 className="border-t border-white/25 pt-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300">Festivals</h3>
                <ul className="mt-6 space-y-4">
                  {dzongkhag.culture.festivals.map((festival: string, idx: number) => (
                    <li key={idx} className="font-heading text-2xl font-medium">{festival}</li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={180} className="lg:col-span-3">
                <h3 className="border-t border-white/25 pt-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300">Local specialty</h3>
                <p className="mt-6 font-heading text-3xl font-normal italic leading-snug text-amber-200">{dzongkhag.culture.localDish}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Natural wonders */}
        {dzongkhag.nature && (
          <section id="nature" aria-labelledby="nature-heading" className="scroll-mt-32 py-24 sm:py-32">
            <div className="container mx-auto grid gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
              <Reveal className="lg:col-span-5">
                <div className="lg:sticky lg:top-40">
                  <SectionHeading id="nature-heading" eyebrow="Landscape" title={<>Natural <em>wonders</em></>} />
                </div>
              </Reveal>
              <div className="space-y-14 lg:col-span-6 lg:col-start-7">
                {dzongkhag.nature.trekkingRoutes && (
                  <Reveal>
                    <h3 className={subheading}><span className="h-px w-10 bg-amber-500" aria-hidden="true" />Trekking routes</h3>
                    <ul className="border-t border-stone-300">
                      {dzongkhag.nature.trekkingRoutes.map((route: string, idx: number) => (
                        <Reveal as="li" key={idx} delay={idx * 80} className="flex items-baseline gap-5 border-b border-stone-300 py-4 font-heading text-2xl font-medium text-stone-900">
                          <span className="text-sm text-amber-600" aria-hidden="true">{pad(idx + 1)}</span>
                          {route}
                        </Reveal>
                      ))}
                    </ul>
                  </Reveal>
                )}
                {(dzongkhag.nature.wildlife || dzongkhag.nature.scenicSpots) && (
                  <Reveal>
                    <h3 className={subheading}><span className="h-px w-10 bg-amber-500" aria-hidden="true" />Wildlife &amp; scenery</h3>
                    {dzongkhag.nature.wildlife && (
                      <p className="font-heading text-2xl font-normal italic text-emerald-900">{dzongkhag.nature.wildlife}</p>
                    )}
                    {dzongkhag.nature.scenicSpots && (
                      <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-lg text-stone-700">
                        {dzongkhag.nature.scenicSpots.map((spot: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-3">
                            <span className="h-px w-5 bg-amber-500" aria-hidden="true" />{spot}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Reveal>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Experiences */}
        {experiences.length > 0 && (
          <section id="experiences" aria-labelledby="experiences-heading" className="scroll-mt-32 border-y border-stone-300 bg-stone-100 py-24 sm:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-10">
              <Reveal className="mb-14">
                <SectionHeading id="experiences-heading" eyebrow="Do & discover" title={<>Signature <em>experiences</em></>} />
              </Reveal>
              <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                {experiences.map((exp: any, i: number) => (
                  <Reveal key={exp.type + i} delay={i * 90}>
                    <h3 className="border-t border-stone-400 pt-5 font-heading text-3xl font-medium text-emerald-900">{exp.type}</h3>
                    <ul className="mt-5 space-y-2 text-stone-700">
                      {(exp.activities || []).map((a: string) => (
                        <li key={a} className="flex items-center gap-3">
                          <span className="h-px w-5 bg-amber-500" aria-hidden="true" />{a}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Practical information */}
        {practicalGroups.length > 0 && (
          <section id="practical" aria-labelledby="practical-heading" className="scroll-mt-32 py-24 sm:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-10">
              <Reveal className="mb-14">
                <SectionHeading id="practical-heading" eyebrow="Before you go" title={<>Practical <em>information</em></>} />
              </Reveal>
              <dl className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                {practicalGroups.map((g, i) => (
                  <Reveal key={g.label} delay={i * 90}>
                    <dt className="border-t border-stone-400 pt-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">{g.label}</dt>
                    <dd>
                      <ul className="mt-5 space-y-2 font-heading text-xl font-medium text-stone-900">
                        {g.items.map((item) => (<li key={item}>{item}</li>))}
                      </ul>
                    </dd>
                  </Reveal>
                ))}
              </dl>
            </div>
          </section>
        )}

        {/* Plan your visit */}
        <section id="plan" aria-labelledby="plan-heading" className="scroll-mt-32 bg-emerald-950 py-24 text-white sm:py-32">
          <div className="container mx-auto grid gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
            <Reveal className="lg:col-span-6">
              <SectionHeading
                id="plan-heading"
                tone="dark"
                eyebrow="Plan your visit"
                title={<>Let us take you to <em>{dzongkhag.name}</em></>}
                intro="Our Thimphu team designs every journey by hand, around the places and pace you care about."
              />
            </Reveal>
            <Reveal delay={90} className="lg:col-span-5 lg:col-start-8">
              <VisitOnTourCTA dzongkhagName={dzongkhag.name} pageLabel={`${dzongkhag.name} Dzongkhag`} tone="dark" />
            </Reveal>
          </div>
        </section>

        {/* Related dzongkhags */}
        {relatedDzongkhags.length > 0 && (
          <section aria-labelledby="related-heading" className="py-24 sm:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-10">
              <Reveal className="mb-12">
                <SectionHeading id="related-heading" eyebrow={dzongkhag.location.region} title={<>Nearby <em>dzongkhags</em></>} />
              </Reveal>
              <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-3">
                {relatedDzongkhags.map((related: any, i: number) => {
                  const img = dzongkhagImage(related);
                  return (
                    <li key={related.id}>
                      <Reveal delay={i * 90}>
                        <Link href={`/dzongkhag/${related.slug}`} className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-emerald-900">
                          <RevealImage from="bottom" delay={i * 120} className="relative aspect-[4/5] bg-stone-200">
                            <PlaceImage src={img.src} fallbackSrc={img.fallback} name={related.name} alt={`${related.name} dzongkhag`} className="duration-[1400ms] group-hover:scale-[1.05]" />
                          </RevealImage>
                          <h3 className="mt-5 font-heading text-2xl font-medium text-stone-900">{related.name}</h3>
                          <p className="mt-1 text-sm text-stone-600">{related.tagline}</p>
                        </Link>
                      </Reveal>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = popularDestination.map((dzongkhag: any) => ({
    params: { slug: dzongkhag.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const dzongkhag = popularDestination.find((d: any) => d.slug === slug);

  if (!dzongkhag) {
    return {
      notFound: true,
    };
  }

  // Find related dzongkhags in the same region
  const relatedDzongkhags = popularDestination
    .filter((d: any) => 
      d.location.region === dzongkhag.location.region && 
      d.id !== dzongkhag.id
    )
    .slice(0, 3);

  return {
    props: {
      dzongkhag,
      relatedDzongkhags,
    },
  };
};

export default DzongkhagPage;
