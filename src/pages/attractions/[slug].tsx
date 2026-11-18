import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Seo from '../../components/Seo';
import Link from 'next/link';
import popularDestination from '../../data/popularDestination.json';
import { Reveal } from '../../components/motion/Reveal';
import { StaggerText } from '../../components/motion/StaggerText';
import { RevealImage } from '../../components/motion/RevealImage';
import Photo from '../../components/Photo';
import PlaceGallery from '../../components/PlaceGallery';
import { PlaceImage, GENERIC_LANDSCAPE, placeLocalPhoto, useResolvedImage } from '../../components/PlacePlaceholder';

interface AttractionPageProps {
  place: any;
  dzongkhag: any;
  relatedPlaces: any[];
}

const pad = (n: number) => String(n).padStart(2, '0');
const label = 'text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500';

const AttractionPage: React.FC<AttractionPageProps> = ({ place, dzongkhag, relatedPlaces }) => {
  const isUrl = (u?: string) => !!u && /^(https?:\/\/|\/)/.test(u);
  // Photo of the place itself > local photo of the real place > the district's licensed photo (labelled) > generic banner.
  const districtPhoto = ((dzongkhag as any)?.media?.images ?? []).find(isUrl) as string | undefined;
  const ownPhoto = isUrl(place.image) ? place.image : undefined;
  const fallback = placeLocalPhoto(place.name) || districtPhoto || GENERIC_LANDSCAPE;
  const heroSrc = useResolvedImage(ownPhoto || fallback, fallback);
  const showsDistrictPhoto = !ownPhoto && !placeLocalPhoto(place.name) && !!districtPhoto;
  const districtLabel = String((dzongkhag as any)?.name ?? '').replace(/\s*Dzongkhag$/i, '');

  // Determine attraction type
  const getAttractionType = (place: any) => {
    const name = place.name.toLowerCase();
    if (name.includes('dzong')) return { type: 'Dzong' };
    if (name.includes('monastery') || name.includes('lhakhang')) return { type: 'Monastery' };
    if (name.includes('temple')) return { type: 'Temple' };
    if (name.includes('valley') || name.includes('lake')) return { type: 'Natural Attraction' };
    if (name.includes('village') || name.includes('town')) return { type: 'Village/Town' };
    if (name.includes('trail') || name.includes('hike')) return { type: 'Trail' };
    if (name.includes('viewpoint') || name.includes('view')) return { type: 'Viewpoint' };
    return { type: 'Attraction' };
  };

  const attractionInfo = getAttractionType(place);
  const images = place.images || [place.image].filter(Boolean);

  const experience: string[] =
    attractionInfo.type === 'Natural Attraction'
      ? ['Scenic natural beauty', 'Photography opportunities', 'Wildlife spotting', 'Nature walks and hiking']
      : attractionInfo.type === 'Village/Town'
      ? ['Traditional Bhutanese culture', 'Local community interaction', 'Traditional architecture', 'Local handicrafts and food']
      : ['Dzong', 'Monastery', 'Temple'].includes(attractionInfo.type)
      ? ['Sacred architecture', 'Buddhist art and sculptures', 'Spiritual atmosphere', 'Cultural ceremonies']
      : attractionInfo.type === 'Trail'
      ? ['Hiking and trekking', 'Mountain views', 'Physical challenge', 'Connection with nature']
      : attractionInfo.type === 'Viewpoint'
      ? ['Panoramic views', 'Photography paradise', 'Sunrise/sunset viewing', 'Peaceful meditation spot']
      : ['Unique local experience', 'Cultural insights', 'Educational opportunity', 'Memorable adventure'];

  const tips = [
    'Respect local customs and traditions',
    'Dress modestly and appropriately',
    'Bring appropriate gear for weather',
    'Follow designated paths and guidelines',
    'Support local communities',
  ];

  return (
    <>
      <Seo
        title={`${place.name} - ${dzongkhag.name} Attraction | Door to Happiness`}
        description={place.description}
        path={`/attractions/${place.slug}`}
        ogTitle={`${place.name} - ${dzongkhag.name} Attraction`}
        ogImage={place.image || '/backgroundbanner.jpg'}
        ogType="article"
      />
      <div className="bg-brand-ivory">
        {/* Split opening: photograph pinned on the left, story on the right */}
        <div className="lg:grid lg:grid-cols-12">
          <div className="relative aspect-[4/3] overflow-hidden bg-emerald-950 sm:aspect-[16/10] lg:sticky lg:top-[4.5rem] lg:col-span-6 lg:h-[calc(100vh-4.5rem)] lg:aspect-auto">
            <div className="absolute inset-0 animate-img-settle">
              <Photo
                src={heroSrc}
                alt={showsDistrictPhoto ? `${districtLabel} district` : `${place.name} attraction`}
                fallback={fallback}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full w-full !bg-emerald-950"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/50 via-transparent to-transparent" aria-hidden="true" />
            {showsDistrictPhoto && (
              <span className="absolute bottom-5 left-5 z-10 bg-emerald-950/75 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                Photo: {districtLabel} district
              </span>
            )}
          </div>
          <div className="px-4 py-14 sm:px-10 sm:py-20 lg:col-span-6 lg:px-16 lg:py-24 xl:px-24">
            <nav aria-label="Breadcrumb" className="mb-12 text-xs uppercase tracking-[0.16em] text-stone-500">
              <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <li><Link href="/" className="inline-flex min-h-[44px] items-center hover:text-emerald-900">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href={`/dzongkhag/${dzongkhag.slug}`} className="inline-flex min-h-[44px] items-center hover:text-emerald-900">{dzongkhag.name}</Link></li>
              </ol>
            </nav>
            <Reveal>
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">
              <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
              {attractionInfo.type}
            </p>
            </Reveal>
            <h1 className="font-heading text-4xl font-medium leading-[1.05] text-stone-900 sm:text-5xl xl:text-6xl"><StaggerText mode="mount" delay={150}>{place.name}</StaggerText></h1>
            <Reveal delay={200}>
            <p className="mt-4 font-heading text-xl italic text-emerald-900">{dzongkhag.name} Dzongkhag, {dzongkhag.location.region}</p>
            </Reveal>
            <Reveal delay={300}>
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-stone-300 py-6 sm:grid-cols-3">
              <div>
                <dt className={label}>Type</dt>
                <dd className="mt-1 text-stone-900">{attractionInfo.type}</dd>
              </div>
              <div>
                <dt className={label}>Location</dt>
                <dd className="mt-1 text-stone-900">{dzongkhag.name}</dd>
              </div>
              <div>
                <dt className={label}>Region</dt>
                <dd className="mt-1 text-stone-900">{dzongkhag.location.region}</dd>
              </div>
              {place.rating && (
                <div>
                  <dt className={label}>Rating</dt>
                  <dd className="mt-1 text-stone-900">{place.rating}/5</dd>
                </div>
              )}
              {place.distance && (
                <div>
                  <dt className={label}>Distance</dt>
                  <dd className="mt-1 text-stone-900">{place.distance}</dd>
                </div>
              )}
            </dl>
            </Reveal>
            <Reveal delay={100} className="mt-12">
              <h2 className="font-heading text-3xl font-medium text-stone-900">About <em className="font-normal text-emerald-900">{place.name}</em></h2>
              <div className="mt-6 space-y-5 text-[17px] leading-[1.85] text-stone-700">
                <p>{place.description}</p>
                {place.history && (
                  <>
                    <h3 className="pt-4 font-heading text-2xl font-medium text-stone-900">Historical background</h3>
                    <p>{place.history}</p>
                  </>
                )}
                {place.significance && (
                  <>
                    <h3 className="pt-4 font-heading text-2xl font-medium text-stone-900">Significance</h3>
                    <p>{place.significance}</p>
                  </>
                )}
              </div>
            </Reveal>
            <Reveal className="mt-16">
              <h2 className="font-heading text-3xl font-medium text-stone-900">What to <em className="font-normal text-emerald-900">expect</em></h2>
              <ol className="mt-6 border-t border-stone-300">
                {experience.map((x, i) => (
                  <Reveal as="li" key={x} delay={i * 100} className="flex items-baseline gap-5 border-b border-stone-300 py-4">
                    <span className="font-heading text-sm text-amber-600" aria-hidden="true">{pad(i + 1)}</span>
                    <span className="font-heading text-xl font-medium text-stone-900">{x}</span>
                  </Reveal>
                ))}
              </ol>
            </Reveal>
            <Reveal className="mt-14">
            <aside aria-labelledby="tips-heading" className="bg-emerald-950 p-8 text-white sm:p-10">
              <h2 id="tips-heading" className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300">Tips for visitors</h2>
              <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-white/85">
                {tips.map((t) => (
                  <li key={t} className="flex items-baseline gap-3">
                    <span className="h-px w-5 shrink-0 translate-y-[-4px] bg-amber-300" aria-hidden="true" />{t}
                  </li>
                ))}
              </ul>
            </aside>
            </Reveal>
            <Reveal className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-2">
              <Link
                href={`/dzongkhag/${dzongkhag.slug}`}
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-emerald-900 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
              >
                Explore {dzongkhag.name}
              </Link>
              <Link
                href="/plan-your-trip"
                className="inline-flex min-h-[44px] items-center text-[12px] font-semibold uppercase tracking-[0.14em] text-emerald-900 underline decoration-1 underline-offset-[6px] hover:text-amber-600"
              >
                Plan a trip
              </Link>
            </Reveal>
          </div>
        </div>
        {images.length > 1 && (
          <PlaceGallery
            images={images.map((src: string) => ({ src, alt: place.name }))}
            className="border-t border-stone-300 py-24"
            header={<h2 className="font-heading text-4xl font-medium text-stone-900">Gallery</h2>}
          />
        )}
        {/* Nearby attractions */}
        {relatedPlaces.length > 0 && (
          <section aria-labelledby="nearby-heading" className="border-t border-stone-300 bg-stone-100 py-24 sm:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-10">
              <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">
                    <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
                    {dzongkhag.name}
                  </p>
                  <h2 id="nearby-heading" className="font-heading text-4xl font-medium leading-[1.05] text-stone-900 sm:text-5xl">
                    Nearby <em className="font-normal text-emerald-900">attractions</em>
                  </h2>
                </div>
                <Link
                  href={`/dzongkhag/${dzongkhag.slug}`}
                  className="group inline-flex min-h-[44px] items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-emerald-900"
                >
                  View all attractions
                  <span className="inline-block h-px w-16 origin-left scale-x-[0.625] bg-emerald-900 transition-transform duration-500 ease-out group-hover:scale-x-100" aria-hidden="true" />
                </Link>
              </Reveal>
              <ul className="grid gap-x-12 border-t border-stone-300 lg:grid-cols-2">
                {relatedPlaces.map((relatedPlace: any, ri: number) => (
                  <Reveal as="li" key={relatedPlace.slug} delay={(ri % 2) * 100} className="border-b border-stone-300">
                    <Link
                      href={`/attractions/${relatedPlace.slug}`}
                      className="group flex items-center gap-5 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-emerald-900"
                    >
                      <RevealImage from="left" delay={(ri % 2) * 100} className="relative h-20 w-20 shrink-0 bg-stone-200 sm:h-24 sm:w-24">
                        <PlaceImage src={relatedPlace.image} fallbackSrc={placeLocalPhoto(relatedPlace.name)} name={relatedPlace.name} alt="" className="duration-[1400ms] group-hover:scale-[1.08]" />
                      </RevealImage>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-heading text-xl font-medium leading-snug text-stone-900 transition-colors group-hover:text-emerald-900">{relatedPlace.name}</h3>
                        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600">
                          {getAttractionType(relatedPlace).type}
                          {relatedPlace.distance && <span className="text-stone-500"> · {relatedPlace.distance}</span>}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        )}
        {/* Back to dzongkhag */}
        <section aria-labelledby="back-heading" className="bg-emerald-950 py-24 text-white sm:py-28">
          <Reveal className="container mx-auto px-4 sm:px-6 lg:px-10">
            <h2 id="back-heading" className="max-w-3xl font-heading text-4xl font-medium leading-[1.05] sm:text-6xl">
              Explore more of <em className="font-normal text-amber-200">{dzongkhag.name}</em>
            </h2>
            <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-white/80">
              Discover more attractions, heritage sites, and experiences in this beautiful dzongkhag
            </p>
            <Link
              href={`/dzongkhag/${dzongkhag.slug}`}
              className="mt-9 inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-emerald-950 transition-colors hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View all attractions
            </Link>
          </Reveal>
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
        // Create a slug for the place
        const slug = place.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        allPlaces.push({
          ...place,
          slug,
          dzongkhagSlug: dzongkhag.slug,
          dzongkhag: dzongkhag.name,
          region: dzongkhag.location.region
        });
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
  // Find related places (other attractions in the same dzongkhag)
  const relatedPlaces: any[] = [];
  if (foundDzongkhag.placesToVisit) {
    foundDzongkhag.placesToVisit.forEach((place: any) => {
      if (place.name !== foundPlace.name) {
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
      relatedPlaces: relatedPlaces.slice(0, 5), // Limit to 5 related places
    },
  };
};
export default AttractionPage;
