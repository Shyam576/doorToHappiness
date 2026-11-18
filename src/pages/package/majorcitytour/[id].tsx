import React, { useState } from "react";
import Seo from "../../../components/Seo";
import TourDestinationLinks from "../../../components/TourDestinationLinks";
import { normalizeItinerary } from "../../../lib/package-card-utils";
import { buildTourJsonLd } from "../../../lib/tour-jsonld";
import { GetStaticProps, GetStaticPaths } from "next";
import majorCitiesPackage from "../../../data/majorCitiesPackage.json";
import ReactMarkdown from "react-markdown";
import {
  PackageDetailShell,
  ClipImage,
  DetailSection,
  Highlights,
  DayTimeline,
  Inclusions,
  LeadParagraph,
  presentFacts,
} from "../../../components/package/PackageDetail";
import { Photo } from "../../../components/Photo";
import { Reveal } from "../../../components/motion/Reveal";

interface DayItinerary {
  title: string;
  description: string;
  details: string;
}

interface TourPackage {
  id: string;
  title: string;
  image: string;
  alt: string;
  category: string;
  highlights: string[];
  duration: string;
  route: string;
  dates: string[];
  images: string[];
  rating: number;
  description: string;
  full_description: string;
  itinerary: DayItinerary[];
  inclusions: string[];
  exclusions: string[];
  bestSeason: string[];
}

interface PackageDetailsPageProps {
  packageData: TourPackage;
}

const PackageDetailsPage: React.FC<PackageDetailsPageProps> = ({
  packageData,
}) => {
  const [selectedImage, setSelectedImage] = useState(0); // Start with first image from images array

  const images = packageData.images ?? [];
  const mainImage =
    images.length > 0 && selectedImage >= 0 && selectedImage < images.length
      ? images[selectedImage]
      : packageData.image;

  const facts = presentFacts([
    { label: "Duration", value: packageData.duration },
    { label: "Route", value: packageData.route },
    {
      label: "Best travel season",
      value: packageData.bestSeason?.length ? packageData.bestSeason.join(", ") : "",
    },
    {
      label: "Sample departures",
      value: packageData.dates?.length ? packageData.dates.join(" · ") : "",
    },
  ]);

  const nav = [
    { id: "overview", label: "Overview" },
    { id: "itinerary", label: "Itinerary" },
    { id: "highlights", label: "Highlights" },
    { id: "inclusions", label: "Inclusions" },
    ...(images.length > 0 ? [{ id: "gallery", label: "Gallery" }] : []),
  ];

  return (
    <>
      <Seo
        title={`${packageData.title} | Door to Happiness Holiday`}
        description={packageData.description}
        path={`/package/majorcitytour/${packageData.id}`}
        ogImage={packageData.image}
        jsonLd={buildTourJsonLd({
          title: packageData.title,
          description: packageData.description,
          image: packageData.image,
          path: `/package/majorcitytour/${packageData.id}`,
          touristType: 'Cultural Tourism',
          itinerary: normalizeItinerary(packageData),
        })}
      />

      <PackageDetailShell
        eyebrow="City departure package"
        title={packageData.title}
        image={packageData.image}
        imageAlt={packageData.alt}
        route={packageData.route}
        duration={packageData.duration}
        facts={facts}
        nav={nav}
        links={<TourDestinationLinks route={packageData.route} />}
      >
        <DetailSection id="overview" eyebrow="Overview" title={<>Package <em>overview</em></>}>
          {packageData.description && <LeadParagraph>{packageData.description}</LeadParagraph>}
          <div className="mt-8 max-w-prose space-y-5 text-base leading-relaxed text-stone-700">
            {packageData.full_description ? (
              packageData.full_description
                .split("\n")
                .map((paragraph, i) => <p key={i}>{paragraph}</p>)
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </DetailSection>

        <DetailSection id="itinerary" eyebrow="Itinerary" title={<>Detailed <em>itinerary</em></>}>
          {packageData.itinerary ? (
            <DayTimeline
              items={packageData.itinerary.map((day, index) => ({
                label: `Day ${index + 1}`,
                title: `${day.title}: ${day.description}`,
                body: (
                  <div className="space-y-3 [&_a]:text-emerald-900 [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-semibold [&_strong]:text-stone-900 [&_ul]:list-disc [&_ul]:pl-5">
                    {day.details.split("\n").map((paragraph, i) => (
                      <ReactMarkdown key={i}>{paragraph}</ReactMarkdown>
                    ))}
                  </div>
                ),
              }))}
            />
          ) : (
            <p>Loading...</p>
          )}
        </DetailSection>

        <DetailSection id="highlights" eyebrow="Highlights" title={<>Package <em>highlights</em></>}>
          <Highlights items={packageData.highlights} />
        </DetailSection>

        <DetailSection id="inclusions" eyebrow="Inclusions" title={<>What&apos;s <em>included</em></>}>
          <Inclusions included={packageData.inclusions} excluded={packageData.exclusions} />
        </DetailSection>

        {images.length > 0 && (
          <DetailSection id="gallery" eyebrow="Gallery" title={<>Photo <em>gallery</em> ({images.length} images)</>}>
            <ClipImage className="aspect-[16/10] bg-stone-200" from="bottom">
              <Photo
                src={mainImage}
                alt={packageData.alt}
                className="h-full w-full"
                fallback={packageData.image}
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
            </ClipImage>
            <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
              {images.map((img, index) => (
                <Reveal as="li" key={index} delay={Math.min(index * 60, 360)}>
                  <button
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    aria-label={`Show gallery image ${index + 1}`}
                    aria-pressed={selectedImage === index}
                    className={`group block aspect-square min-h-[44px] w-full overflow-hidden bg-stone-200 transition-opacity duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900 ${
                      selectedImage === index ? "opacity-100 ring-2 ring-emerald-900 ring-offset-2 ring-offset-brand-ivory" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Photo
                      src={img}
                      alt=""
                      className="h-full w-full"
                      imgClassName="h-full w-full object-cover group-hover:scale-[1.08]"
                      fallback="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300"
                      sizes="(min-width: 640px) 12vw, 25vw"
                    />
                  </button>
                </Reveal>
              ))}
            </ul>
          </DetailSection>
        )}
      </PackageDetailShell>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = majorCitiesPackage
    .filter((pkg) => pkg.id)
    .map((pkg) => ({ params: { id: pkg.id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const packageData = majorCitiesPackage.find(
    (pkg) => pkg.id && pkg.id.toString() === id
  );

  if (!packageData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      packageData,
    },
  };
};

export default PackageDetailsPage;
