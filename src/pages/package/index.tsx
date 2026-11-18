import React, { useState, useRef } from "react";
import Seo from "../../components/Seo";
import Link from "next/link";
import PageHero from "../../components/PageHero";
import { Reveal } from "../../components/motion/Reveal";
import { StaggerText } from "../../components/motion/StaggerText";
import { Photo } from "../../components/Photo";
import majorCitiesPackage from "../../data/majorCitiesPackage.json";
import festivalTours from "../../data/festivialTours.json";
import culturalTours from "../../data/culturalTours.json";
import trekkingAdventure from "../../data/trekkingAdventure.json";
import groupTours from "../../data/groupTours.json";
import CityPackageCard from "../../components/citiesPackageCard";
import { FiSearch } from "react-icons/fi";

interface Tour {
  id: string;
  title: string;
  description: string;
  image: string;
  route: string;
  category: string;
  rating: number;
  duration: string;
  highlights: string[];
  dates?: string | string[];
  price?: string | number;
}

interface AllTours {
  cityTours: Tour[];
  festivalTours: Tour[];
  culturalTours: Tour[];
  adventureTours: Tour[];
  groupTours: Tour[];
}

function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const allTours: AllTours = {
    cityTours: majorCitiesPackage,
    festivalTours,
    culturalTours,
    adventureTours: trekkingAdventure,
    groupTours,
  };

  // Refs for scrolling to categories
  const cityToursRef = useRef<HTMLDivElement>(null);
  const festivalToursRef = useRef<HTMLDivElement>(null);
  const culturalToursRef = useRef<HTMLDivElement>(null);
  const adventureToursRef = useRef<HTMLDivElement>(null);
  const groupToursRef = useRef<HTMLDivElement>(null);
  const filteredToursRef = useRef<HTMLDivElement>(null);

  // Scroll to category function
  const scrollToCategory = (categoryName: string) => {
    setActiveCategory(categoryName);

    // Scroll to filtered content
    setTimeout(() => {
      if (filteredToursRef.current) {
        filteredToursRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  // Get filtered tours based on active category
  const getFilteredTours = () => {
    const allToursArray = [
      ...allTours.cityTours.map((tour) => ({ ...tour, categoryType: "city" })),
      ...allTours.festivalTours.map((tour) => ({
        ...tour,
        categoryType: "festival",
      })),
      ...allTours.culturalTours.map((tour) => ({
        ...tour,
        categoryType: "cultural",
      })),
      ...allTours.adventureTours.map((tour) => ({
        ...tour,
        categoryType: "adventure",
      })),
      ...allTours.groupTours.map((tour) => ({
        ...tour,
        categoryType: "group",
      })),
    ];

    if (activeCategory === "all") {
      return allToursArray;
    }

    return allToursArray.filter((tour) => tour.categoryType === activeCategory);
  };

  const filterTours = (tours: any) => {
    if (!searchTerm) return tours;

    const searchLower = searchTerm.toLowerCase();
    return tours.filter((tour: any) => {
      return (
        (tour.title && tour.title.toLowerCase().includes(searchLower)) ||
        (tour.description &&
          tour.description.toLowerCase().includes(searchLower)) ||
        (tour.route && tour.route.toLowerCase().includes(searchLower)) ||
        (tour.duration && tour.duration.toLowerCase().includes(searchLower))
      );
    });
  };

  const allFilteredTours = [
    ...filterTours(allTours.cityTours),
    ...filterTours(allTours.festivalTours),
    ...filterTours(allTours.culturalTours),
    ...filterTours(allTours.adventureTours),
    ...filterTours(allTours.groupTours),
  ];

  const categories = [
    { id: "all", title: "All journeys", description: "Browse everything", image: "/homepagebg2.jpg", count: allTours.cityTours.length + allTours.festivalTours.length + allTours.culturalTours.length + allTours.adventureTours.length + allTours.groupTours.length },
    { id: "city", title: "City tours", description: "From major cities", image: "/category1.jpg", count: allTours.cityTours.length },
    { id: "festival", title: "Festivals", description: "Cultural celebrations", image: "/category2.jpg", count: allTours.festivalTours.length },
    { id: "cultural", title: "Cultural", description: "Heritage & traditions", image: "/category3.jpg", count: allTours.culturalTours.length },
    { id: "adventure", title: "Adventures", description: "Treks & outdoor", image: "/category4.jpg", count: allTours.adventureTours.length },
    { id: "group", title: "Group tours", description: "Travel together", image: "/category5.jpg", count: allTours.groupTours.length },
  ];

  /** Lead package as a large feature, the rest as alternating image/text rows. */
  const renderPackageList = (tours: any[]) => (
    <div className="divide-y divide-stone-200">
      {tours.map((tour: any, i: number) => (
        <Reveal key={`${tour.id}-${tour.categoryType ?? tour.category}`} className="py-14 first:pt-0 last:pb-0 sm:py-20">
          <CityPackageCard tour={tour} feature={i === 0} reverse={i % 2 === 1} />
        </Reveal>
      ))}
    </div>
  );

  const renderTourCards = (
    tours: any,
    category: any,
    ref?: React.RefObject<HTMLDivElement>,
    index?: number
  ) => {
    if (tours.length === 0 && !searchTerm) return null;

    return (
      <section className="py-20 sm:py-28" ref={ref} aria-label={category}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mb-14 flex items-end justify-between gap-6 border-b border-stone-300 pb-6">
            <div>
              {index !== undefined && (
                <p className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">
                  <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
                  {String(index).padStart(2, "0")}
                </p>
              )}
              <h2 className="font-heading text-3xl font-medium leading-[1.08] text-stone-900 sm:text-5xl"><StaggerText>{category}</StaggerText></h2>
              {searchTerm && tours.length > 0 && (
                <p className="mt-2 text-stone-600">
                  Showing {tours.length} {category.toLowerCase()} matching &quot;{searchTerm}&quot;
                </p>
              )}
            </div>
            <p className="hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500 sm:block">
              {tours.length} {tours.length === 1 ? "journey" : "journeys"}
            </p>
          </div>

          {tours.length > 0 ? (
            renderPackageList(tours)
          ) : searchTerm ? (
            <p className="py-8 text-lg text-stone-600">No {category.toLowerCase()} found matching your search</p>
          ) : null}
        </div>
      </section>
    );
  };

  const activeCategoryTitle: Record<string, string> = {
    city: "Bhutan Tour Packages from Major Cities",
    festival: "Bhutan Festival Tours",
    cultural: "Bhutan Cultural Tours",
    adventure: "Bhutan Treks & Adventures",
    group: "Bhutan Group Tours",
  };

  const payTips: { heading: string; items: { title: string; body: React.ReactNode }[] }[] = [
    {
      heading: "Smart Tips for Hassle-Free Payments",
      items: [
        {
          title: "Enable Your Cards for International Use",
          body: "Before traveling, confirm with your bank (or via your mobile banking app) that your debit/credit cards are enabled for international transactions, including use in Bhutan.",
        },
        {
          title: "Inform Your Bank About Your Travel Plans",
          body: "Notify your bank of your travel dates and destination to prevent transaction declines and ensure smooth payments.",
        },
        {
          title: "Check Card Network Compatibility",
          body: (
            <>
              Ensure your card network — e.g. Visa, Mastercard, UnionPay, JCB, or American Express — is supported by banks in Bhutan.{" "}
              <a
                href="https://www.rma.org.bt"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-[44px] items-center border-b border-amber-300 text-amber-200 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
              >
                Visit Royal Monetary Authority (RMA) →
              </a>
            </>
          ),
        },
      ],
    },
    {
      heading: "Key Things to Do Before You Pay",
      items: [
        {
          title: "Be Aware of Transaction & Withdrawal Limits",
          body: "Check your bank's transaction limit. At ATMs in Bhutan, follow on-screen instructions to note withdrawal limits per transaction.",
        },
        {
          title: "Consult Merchants, Guides, or Banks",
          body: "If a payment is declined, consult your merchant or guide for assistance. If the issue persists, contact the nearest bank.",
        },
        {
          title: "Important Note for Regional (Indian) Tourists",
          body: "Cards issued in India denominated in USD will not work in Bhutan due to FEMA regulations by the Reserve Bank of India. Please carry cards valid for India, Bhutan, and Nepal to avoid payment issues.",
        },
      ],
    },
  ];

  const totalTours = categories[0].count;

  return (
    <div className="bg-brand-ivory">
      <Seo
        title="Bhutan Tour Packages | Cultural, Trekking & Festival Tours"
        description="Browse curated Bhutan tour packages: cultural tours, trekking adventures, festival tours, and group tours from a licensed Bhutanese operator."
        path="/package"
        ogTitle="Bhutan Tour Packages | Door to Happiness Holiday"
        ogDescription="Discover curated travel experiences to the Land of the Thunder Dragon — cultural, trekking, festival, and group tours."
      />

      <PageHero
        eyebrow="Holiday packages"
        title={
          <>
            Bhutan Tour Packages, <em>made to measure.</em>
          </>
        }
        intro="Discover curated travel experiences to the Land of the Thunder Dragon"
        image="/packagebg.jpg"
      >
        <div className="relative w-full max-w-md">
          <label htmlFor="package-search" className="sr-only">
            Search tour packages
          </label>
          <input
            id="package-search"
            type="text"
            placeholder="Search all packages..."
            className="min-h-[52px] w-full rounded-full border border-white/40 bg-white/[0.12] py-4 pl-6 pr-12 text-white placeholder:text-white/70 backdrop-blur focus:border-white focus:outline-none focus:ring-2 focus:ring-amber-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/80" aria-hidden="true" />
        </div>
      </PageHero>

      {/* Category browser */}
      {!searchTerm && (
        <section className="border-b border-stone-200 py-16 sm:py-24" aria-labelledby="browse-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <Reveal className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">
                  <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
                  Browse by style
                </p>
                <h2 id="browse-heading" className="font-heading text-4xl font-medium leading-[1.05] text-stone-900 sm:text-5xl">
                  <StaggerText>Choose your perfect <em className="font-normal text-emerald-900">Bhutan experience.</em></StaggerText>
                </h2>
              </div>
              <p className="max-w-md text-base leading-relaxed text-stone-600">
                From cultural immersion to mountain adventures, discover our carefully curated tour categories designed for
                every type of traveler.
              </p>
            </Reveal>

            <div role="group" aria-label="Filter packages by category" className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-6">
              {categories.map((category, ci) => {
                const active = activeCategory === category.id;
                return (
                  <Reveal key={category.id} delay={ci * 90} className="w-40 flex-shrink-0 snap-start sm:w-auto">
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => scrollToCategory(category.id)}
                    className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-900 sm:w-auto"
                  >
                    <span className="relative block aspect-[4/5] overflow-hidden bg-stone-200">
                      <Photo
                        src={category.image}
                        alt=""
                        fallback="/backgroundbanner.jpg"
                        className="h-full w-full"
                        sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 160px"
                        imgClassName="h-full w-full object-cover group-hover:scale-[1.06]"
                      />
                      {!active && (
                        <span className="absolute inset-0 bg-emerald-950/20 transition-opacity duration-500 group-hover:opacity-0" aria-hidden="true" />
                      )}
                      <span className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" aria-hidden="true" />
                      <span className="absolute bottom-3 left-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-transform duration-500 ease-out group-hover:-translate-y-1">
                        {category.count} {category.count === 1 ? "tour" : "tours"}
                      </span>
                    </span>
                    <span className={`mt-3 block border-t-2 pt-3 ${active ? "border-emerald-900" : "border-transparent"}`}>
                      <span className={`block font-heading text-xl font-medium ${active ? "text-emerald-900" : "text-stone-900"}`}>
                        {category.title}
                      </span>
                      <span className="mt-0.5 block text-sm text-stone-500">{category.description}</span>
                    </span>
                  </button>
                  </Reveal>
                );
              })}
            </div>

            <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
              {totalTours} packages across {categories.length - 1} categories
            </p>
          </div>
        </section>
      )}

      {/* Filtered Tours View - Shows when category is selected */}
      {!searchTerm && activeCategory !== "all" && (
        <section className="py-20 sm:py-28" ref={filteredToursRef} aria-labelledby="filtered-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="mb-14 border-b border-stone-300 pb-6">
              <p className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">
                <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
                Category filter active
              </p>
              <h2 id="filtered-heading" className="font-heading text-3xl font-medium leading-[1.08] text-stone-900 sm:text-5xl">
                <StaggerText key={activeCategory}>{activeCategoryTitle[activeCategory]}</StaggerText>
              </h2>
            </div>
            <div key={activeCategory} className="animate-page-in">
              {renderPackageList(getFilteredTours())}
            </div>
          </div>
        </section>
      )}

      {/* Search Results View */}
      {searchTerm && (
        <section className="py-20 sm:py-28" aria-labelledby="search-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="mb-14 border-b border-stone-300 pb-6">
              <h2 id="search-heading" className="font-heading text-3xl font-medium leading-[1.08] text-stone-900 sm:text-5xl">
                Search Results
              </h2>
              <p className="mt-3 text-lg text-stone-600">
                Found {allFilteredTours.length} packages matching &quot;{searchTerm}&quot;
              </p>
            </div>

            {allFilteredTours.length > 0 ? (
              renderPackageList(allFilteredTours)
            ) : (
              <div className="py-8">
                <p className="mb-6 text-xl text-stone-600">No packages found matching your search</p>
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="min-h-[44px] rounded-full bg-emerald-900 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Category Views (hidden when searching or filtering) */}
      {!searchTerm && activeCategory === "all" && (
        <>
          {renderTourCards(allTours.cityTours, "Bhutan Tour Packages from Major Cities", cityToursRef, 1)}
          {renderTourCards(allTours.festivalTours, "Bhutan Festival Tours", festivalToursRef, 2)}
          {renderTourCards(allTours.culturalTours, "Bhutan Cultural Tours", culturalToursRef, 3)}
          {renderTourCards(allTours.adventureTours, "Bhutan Treks & Adventures", adventureToursRef, 4)}
          {renderTourCards(allTours.groupTours, "Bhutan Group Tours", groupToursRef, 5)}
        </>
      )}

      {/* Payment Advisory Section */}
      {!searchTerm && (
        <section className="bg-emerald-950 py-24 text-white sm:py-32" aria-labelledby="payment-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <Reveal className="grid gap-14 lg:grid-cols-12 lg:gap-20">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-28">
                  <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300">
                    <span className="h-px w-10 bg-amber-300" aria-hidden="true" />
                    Important — please read
                  </p>
                  <h2 id="payment-heading" className="font-heading text-4xl font-medium leading-[1.05] sm:text-5xl">
                    <StaggerText>Important <em className="font-normal text-amber-200">Payment Information</em></StaggerText>
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-white/75">
                    Please read carefully to ensure a smooth payment experience during your Bhutan journey
                  </p>
                  <p className="mt-8 border-l-2 border-amber-300 pl-5 font-heading text-xl leading-snug text-white">
                    Welcome to Bhutan – The Land of the Thunder Dragon!
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    We are delighted to have you in our beautiful country. To make your stay truly memorable and ensure a
                    smooth payment experience, please take note of the following important guidelines:
                  </p>
                </div>
              </div>

              <div className="space-y-14 lg:col-span-7">
                {payTips.map((group) => (
                  <div key={group.heading}>
                    <h3 className="mb-2 border-b border-white/20 pb-4 font-heading text-2xl font-medium">{group.heading}</h3>
                    <ol className="divide-y divide-white/10">
                      {group.items.map((item, i) => (
                        <li key={item.title} className="flex gap-6 py-6">
                          <span className="w-8 flex-shrink-0 font-heading text-xl text-amber-300" aria-hidden="true">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <h4 className="font-semibold text-white">{item.title}</h4>
                            <p className="mt-2 text-[15px] leading-relaxed text-white/75">{item.body}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Call to Action */}
      {!searchTerm && (
        <section className="bg-brand-ivory py-24 text-center sm:py-32" aria-labelledby="cta-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <h2 id="cta-heading" className="mx-auto max-w-3xl font-heading text-4xl font-medium leading-[1.05] text-stone-900 sm:text-6xl">
              <StaggerText>Ready for your <em className="font-normal text-emerald-900">Bhutan adventure?</em></StaggerText>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-stone-600">
              Contact our travel experts to customize your perfect trip
            </p>
            <Link
              href="/contactus"
              className="mt-10 inline-flex min-h-[44px] items-center justify-center rounded-full bg-emerald-900 px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
            >
              Get a Custom Quote
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

export default Index;
