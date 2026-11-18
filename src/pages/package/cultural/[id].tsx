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
import culturalTours from '../../../data/culturalTours.json';

interface DayItinerary {
  day: number | string;
  title: string;
  activities: string[];
}

interface CulturalTour {
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
  group_size?: string;
  accommodation?: string;
  fitness_level?: string;
  special_focus?: string;
  cultural_experiences?: Record<string, unknown>;
  trek_details?: Record<string, unknown>;
  sustainability_features?: Record<string, unknown>;
}

interface CulturalTourDetailsProps {
  tourData: CulturalTour;
}

const CulturalTourDetails: React.FC<CulturalTourDetailsProps> = ({
  tourData,
}) => {
  const handleShare = makeShare('Cultural Tour', tourData?.title, tourData?.description || 'Check out this amazing cultural tour in Bhutan!');

  const facts = presentFacts([
    { label: 'Duration', value: tourData.duration },
    { label: 'Route', value: tourData.route },
    { label: 'Dates', value: tourData.dates },
    { label: 'Group size', value: tourData.group_size },
    { label: 'Accommodation', value: tourData.accommodation },
    { label: 'Fitness level', value: tourData.fitness_level },
    { label: 'Special focus', value: tourData.special_focus },
  ]);

  const hasExperiences = !!(tourData.cultural_experiences || tourData.trek_details || tourData.sustainability_features);
  const hasInclusions = !!(tourData.inclusions?.length || tourData.exclusions?.length);
  const nav = [
    { id: 'overview', label: 'Overview' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'itinerary', label: 'Itinerary' },
    ...(hasExperiences ? [{ id: 'experiences', label: 'Experiences' }] : []),
    ...(hasInclusions ? [{ id: 'inclusions', label: 'Inclusions' }] : []),
  ];

  return (
    <>
      <Seo
        title={`${tourData.title} | Door to Happiness Holiday`}
        description={tourData.description}
        path={`/package/cultural/${tourData.id}`}
        keywords="Bhutan cultural tour, Buddhist culture, monastery visit, cultural experience"
        ogImage={tourData.image}
        jsonLd={buildTourJsonLd({
          title: tourData.title,
          description: tourData.description,
          image: tourData.image,
          path: `/package/cultural/${tourData.id}`,
          touristType: 'Cultural Tourism',
          itinerary: normalizeItinerary(tourData),
        })}
      />

      <PackageDetailShell
        eyebrow="Cultural experience"
        title={tourData.title}
        image={tourData.image}
        route={tourData.route}
        duration={tourData.duration}
        facts={facts}
        nav={nav}
        links={<TourDestinationLinks route={tourData.route} />}
        onShare={handleShare}
      >
        <DetailSection id="overview" eyebrow="Overview" title={<>About this <em>journey</em></>}>
          <LeadParagraph>{tourData.description}</LeadParagraph>
        </DetailSection>

        <DetailSection id="highlights" eyebrow="Highlights" title={<>Tour <em>highlights</em></>}>
          <Highlights items={tourData.highlights} />
        </DetailSection>

        <DetailSection id="itinerary" eyebrow="Itinerary" title={<>Day-by-day <em>itinerary</em></>}>
          <DayTimeline items={toTimeline(tourData.detailed_itinerary)} />
        </DetailSection>

        {hasExperiences && (
          <DetailSection id="experiences" eyebrow="Experiences" title={<>What you will <em>experience</em></>}>
            <div className="space-y-12">
              <DetailList title="Cultural experiences" data={tourData.cultural_experiences} />
              <DetailList title="Trek details" data={tourData.trek_details} />
              <DetailList title="Sustainability features" data={tourData.sustainability_features} />
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
  const paths = culturalTours.map((tour) => ({
    params: { id: tour.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const tourData = culturalTours.find((tour) => tour.id === id) as
    | CulturalTour
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

export default CulturalTourDetails;
