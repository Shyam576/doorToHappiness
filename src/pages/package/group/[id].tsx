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
import groupTours from '../../../data/groupTours.json';

interface DayItinerary {
  day: number | string;
  title: string;
  activities: string[];
}

interface GroupTour {
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
  group_size?: string | { min: number; max: number };
  inclusions?: string[];
  exclusions?: string[];
  special_features?: string[];
  booking_requirements?: string;
  visa_requirements?: string;
  group_benefits?: Record<string, unknown>;
  women_focused_experiences?: Record<string, unknown>;
  combined_tour_benefits?: Record<string, unknown>;
}

interface GroupTourDetailsProps {
  tourData: GroupTour;
}

const GroupTourDetails: React.FC<GroupTourDetailsProps> = ({ tourData }) => {
  const handleShare = makeShare('Group Tour', tourData?.title, tourData?.description || 'Check out this amazing group tour in Bhutan!');

  const groupSize =
    typeof tourData.group_size === 'object' && tourData.group_size
      ? `${tourData.group_size.min}-${tourData.group_size.max} people`
      : (tourData.group_size as string | undefined);

  const facts = presentFacts([
    { label: 'Duration', value: tourData.duration },
    { label: 'Route', value: tourData.route },
    { label: 'Departures', value: tourData.dates },
    { label: 'Group size', value: groupSize },
    { label: 'Booking requirements', value: tourData.booking_requirements },
    { label: 'Visa', value: tourData.visa_requirements },
  ]);

  const hasBenefits = !!(
    tourData.group_benefits ||
    tourData.women_focused_experiences ||
    tourData.combined_tour_benefits ||
    tourData.special_features?.length
  );
  const hasInclusions = !!(tourData.inclusions?.length || tourData.exclusions?.length);
  const nav = [
    { id: 'overview', label: 'Overview' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'itinerary', label: 'Itinerary' },
    ...(hasBenefits ? [{ id: 'benefits', label: 'Group benefits' }] : []),
    ...(hasInclusions ? [{ id: 'inclusions', label: 'Inclusions' }] : []),
  ];

  return (
    <>
      <Seo
        title={`${tourData.title} | Door to Happiness Holiday`}
        description={tourData.description}
        path={`/package/group/${tourData.id}`}
        keywords="Bhutan group tour, group travel, affordable Bhutan tour, shared tour"
        ogImage={tourData.image}
        jsonLd={buildTourJsonLd({
          title: tourData.title,
          description: tourData.description,
          image: tourData.image,
          path: `/package/group/${tourData.id}`,
          touristType: 'Group Tourism',
          itinerary: normalizeItinerary(tourData),
        })}
      />

      <PackageDetailShell
        eyebrow="Group tour"
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

        <DetailSection id="itinerary" eyebrow="Itinerary" title={<>Group <em>itinerary</em></>}>
          <DayTimeline items={toTimeline(tourData.detailed_itinerary)} />
        </DetailSection>

        {hasBenefits && (
          <DetailSection id="benefits" eyebrow="Group benefits" title={<>Why travel <em>together</em></>}>
            <div className="space-y-12">
              <DetailList title="Group benefits" data={tourData.group_benefits} />
              <DetailList title="Women-focused experiences" data={tourData.women_focused_experiences} />
              <DetailList title="Combined tour benefits" data={tourData.combined_tour_benefits} />
              {tourData.special_features && tourData.special_features.length > 0 && (
                <DetailList title="Special features" data={{ features: tourData.special_features }} />
              )}
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
  const paths = groupTours.map((tour) => ({
    params: { id: tour.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const tourData = groupTours.find((tour) => tour.id === id) as
    | GroupTour
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

export default GroupTourDetails;
