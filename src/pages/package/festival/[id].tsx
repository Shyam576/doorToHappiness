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
import festivialTours from '../../../data/festivialTours.json';

interface DayItinerary {
  day: number | string;
  title: string;
  activities: string[];
}

interface FestivalTour {
  id: string;
  title: string;
  dates: string;
  duration: string;
  description: string;
  image: string;
  route: string;
  category: string;
  highlights: string[];
  detailed_itinerary: DayItinerary[];
  festival_details?: Record<string, unknown>;
  inclusions?: string[];
  exclusions?: string[];
  best_time?: string;
  difficulty?: string;
  group_size?: string;
  accommodation?: string;
}

interface FestivalTourDetailsProps {
  tourData: FestivalTour;
}

const FestivalTourDetails: React.FC<FestivalTourDetailsProps> = ({
  tourData,
}) => {
  const handleShare = makeShare('Festival Tour', tourData?.title, tourData?.description || 'Check out this amazing festival tour in Bhutan!');

  const facts = presentFacts([
    { label: 'Festival dates', value: tourData.dates },
    { label: 'Duration', value: tourData.duration },
    { label: 'Route', value: tourData.route },
    { label: 'Best time', value: tourData.best_time },
    { label: 'Difficulty', value: tourData.difficulty },
    { label: 'Group size', value: tourData.group_size },
    { label: 'Accommodation', value: tourData.accommodation },
  ]);

  const hasInclusions = !!(tourData.inclusions?.length || tourData.exclusions?.length);
  const nav = [
    { id: 'overview', label: 'Overview' },
    ...(tourData.festival_details ? [{ id: 'festival', label: 'The festival' }] : []),
    { id: 'itinerary', label: 'Schedule' },
    { id: 'highlights', label: 'Highlights' },
    ...(hasInclusions ? [{ id: 'inclusions', label: 'Inclusions' }] : []),
  ];

  return (
    <>
      <Seo
        title={`${tourData.title} | Door to Happiness Holiday`}
        description={tourData.description}
        path={`/package/festival/${tourData.id}`}
        keywords="Bhutan festival tour, Tsechu festival, Buddhist celebration, cultural festival"
        ogImage={tourData.image}
        jsonLd={buildTourJsonLd({
          title: tourData.title,
          description: tourData.description,
          image: tourData.image,
          path: `/package/festival/${tourData.id}`,
          touristType: 'Cultural Tourism, Religious Tourism',
          itinerary: normalizeItinerary(tourData),
        })}
      />

      <PackageDetailShell
        eyebrow="Festival experience"
        title={tourData.title}
        image={tourData.image}
        route={tourData.route}
        duration={tourData.duration}
        facts={facts}
        nav={nav}
        links={<TourDestinationLinks route={tourData.route} />}
        onShare={handleShare}
      >
        <DetailSection id="overview" eyebrow="Overview" title={<>About this <em>festival</em></>}>
          <LeadParagraph>{tourData.description}</LeadParagraph>
        </DetailSection>

        {tourData.festival_details && (
          <DetailSection id="festival" eyebrow="The festival" title={<>Festival <em>details</em></>}>
            <DetailList title="Good to know" data={tourData.festival_details} />
          </DetailSection>
        )}

        <DetailSection id="itinerary" eyebrow="Schedule" title={<>Festival <em>schedule</em></>}>
          <DayTimeline items={toTimeline(tourData.detailed_itinerary)} />
        </DetailSection>

        <DetailSection id="highlights" eyebrow="Highlights" title={<>Festival <em>highlights</em></>}>
          <Highlights items={tourData.highlights} />
        </DetailSection>

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
  const paths = festivialTours.map((tour) => ({
    params: { id: tour.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const tourData = festivialTours.find((tour) => tour.id === id) as
    | FestivalTour
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

export default FestivalTourDetails;
