import React from 'react';
import Seo from '../../../components/Seo';
import TourDestinationLinks from '../../../components/TourDestinationLinks';
import { normalizeItinerary } from '../../../lib/package-card-utils';
import { buildTourJsonLd } from '../../../lib/tour-jsonld';
import { GetStaticProps, GetStaticPaths } from 'next';
import {
  PackageDetailShell,
  DetailSection,
  Highlights,
  DayTimeline,
  Inclusions,
  DetailList,
  LeadParagraph,
  makeShare,
  toTimeline,
  presentFacts,
} from '../../../components/package/PackageDetail';
import trekkingAdventure from '../../../data/trekkingAdventure.json';

interface DayItinerary {
  day: number | string;
  title: string;
  activities: string[];
}

interface TrekkingTour {
  id: string;
  title: string;
  description: string;
  image: string;
  route: string;
  category: string;
  rating?: number;
  duration: string;
  highlights: string[];
  detailed_itinerary: DayItinerary[];
  dates?: string;
  inclusions?: string[];
  exclusions?: string[];
  fitness_level?: string;
  group_size?: string;
  special_requirements?: string[];
  trek_details?: Record<string, unknown> & { difficulty?: string; max_altitude?: string };
  cycling_details?: Record<string, unknown> & { difficulty?: string };
}

interface TrekkingTourDetailsProps {
  tourData: TrekkingTour;
}

const TrekkingTourDetails: React.FC<TrekkingTourDetailsProps> = ({
  tourData,
}) => {
  const handleShare = makeShare('Trekking Adventure', tourData?.title, tourData?.description || 'Check out this amazing trekking adventure in Bhutan!');

  const specs = tourData.trek_details ?? tourData.cycling_details;
  const isCycling = !tourData.trek_details && !!tourData.cycling_details;

  const facts = presentFacts([
    { label: 'Duration', value: tourData.duration },
    { label: 'Route', value: tourData.route },
    { label: 'Best season', value: tourData.dates },
    { label: 'Difficulty', value: specs?.difficulty },
    { label: 'Max altitude', value: tourData.trek_details?.max_altitude },
    { label: 'Fitness required', value: tourData.fitness_level },
    { label: 'Group size', value: tourData.group_size },
  ]);

  const hasPrep = !!tourData.special_requirements?.length || !!tourData.fitness_level;
  const hasInclusions = !!(tourData.inclusions?.length || tourData.exclusions?.length);
  const nav = [
    { id: 'overview', label: 'Overview' },
    ...(specs ? [{ id: 'specs', label: isCycling ? 'Ride details' : 'Trek details' }] : []),
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'highlights', label: 'Highlights' },
    ...(hasPrep ? [{ id: 'preparation', label: 'Preparation' }] : []),
    ...(hasInclusions ? [{ id: 'inclusions', label: 'Inclusions' }] : []),
  ];

  return (
    <>
      <Seo
        title={`${tourData.title} | Door to Happiness Holiday`}
        description={tourData.description}
        path={`/package/trekking/${tourData.id}`}
        keywords="Bhutan trekking, Himalaya trek, mountain adventure, hiking Bhutan"
        ogImage={tourData.image}
        jsonLd={buildTourJsonLd({
          title: tourData.title,
          description: tourData.description,
          image: tourData.image,
          path: `/package/trekking/${tourData.id}`,
          touristType: 'Adventure Tourism',
          itinerary: normalizeItinerary(tourData),
        })}
      />

      <PackageDetailShell
        eyebrow={isCycling ? 'Cycling adventure' : 'Trekking adventure'}
        title={tourData.title}
        image={tourData.image}
        route={tourData.route}
        duration={tourData.duration}
        facts={facts}
        nav={nav}
        links={<TourDestinationLinks route={tourData.route} />}
        onShare={handleShare}
      >
        <DetailSection id="overview" eyebrow="Overview" title={<>About this <em>adventure</em></>}>
          <LeadParagraph>{tourData.description}</LeadParagraph>
        </DetailSection>

        {specs && (
          <DetailSection id="specs" eyebrow={isCycling ? 'Ride details' : 'Trek details'} title={<>{isCycling ? 'The ride in' : 'The trek in'} <em>detail</em></>}>
            <DetailList title={isCycling ? 'Cycling specifications' : 'Trek specifications'} data={specs} />
          </DetailSection>
        )}

        <DetailSection id="itinerary" eyebrow="Itinerary" title={<>Daily <em>itinerary</em></>}>
          <DayTimeline items={toTimeline(tourData.detailed_itinerary)} />
        </DetailSection>

        <DetailSection id="highlights" eyebrow="Highlights" title={<>Highlights of the <em>route</em></>}>
          <Highlights items={tourData.highlights} />
        </DetailSection>

        {hasPrep && (
          <DetailSection id="preparation" eyebrow="Preparation" title={<>Fitness &amp; <em>preparation</em></>}>
            <div className="space-y-12">
              {tourData.fitness_level && (
                <DetailList title="Fitness" data={{ fitness_level: tourData.fitness_level }} />
              )}
              {tourData.special_requirements && tourData.special_requirements.length > 0 && (
                <DetailList title="Special requirements" data={{ requirements: tourData.special_requirements }} />
              )}
              <p className="max-w-prose border-l-2 border-amber-500 pl-5 text-[15px] leading-relaxed text-stone-600">
                Treks involve walking at altitude and require good physical fitness. We recommend consulting your doctor
                before booking, especially if you have any medical conditions.
              </p>
            </div>
          </DetailSection>
        )}

        {hasInclusions && (
          <DetailSection id="inclusions" eyebrow="Inclusions" title={<>What&apos;s <em>included</em></>}>
            <Inclusions included={tourData.inclusions} excluded={tourData.exclusions} />
          </DetailSection>
        )}
      </PackageDetailShell>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = trekkingAdventure.map((tour) => ({
    params: { id: tour.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const tourData = trekkingAdventure.find((tour) => tour.id === id) as
    | TrekkingTour
    | undefined;

  if (!tourData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      tourData,
    },
  };
};

export default TrekkingTourDetails;
