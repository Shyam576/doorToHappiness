import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Container } from "../../components/Container";
import WhatsAppButton from "../../components/whatsAppButton";
import majorCitiesPackage from "../../data/majorCitiesPackage.json";
import CityPackageCard from "../../components/citiesPackageCard";
import {
  FiArrowRight,
  FiSearch,
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiTrendingUp,
  FiCamera,
} from "react-icons/fi";
import { getTheme } from "../../styles/themes";

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
  // Get unified theme
  const theme = getTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [allTours, setAllTours] = useState<AllTours>({
    cityTours: [],
    festivalTours: [],
    culturalTours: [],
    adventureTours: [],
    groupTours: [],
  });

  // Refs for scrolling to categories
  const cityToursRef = useRef<HTMLDivElement>(null);
  const festivalToursRef = useRef<HTMLDivElement>(null);
  const culturalToursRef = useRef<HTMLDivElement>(null);
  const adventureToursRef = useRef<HTMLDivElement>(null);
  const groupToursRef = useRef<HTMLDivElement>(null);
  const filteredToursRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading data from multiple JSON files
    const loadData = async () => {
      try {
        // In a real app, you would use fetch or axios to load these JSON files
        const festivalTours = await import("../../data/festivialTours.json");
        const culturalTours = await import("../../data/culturalTours.json");
        const trekkingAdventure = await import(
          "../../data/trekkingAdventure.json"
        );
        const groupTours = await import("../../data/groupTours.json");

        setAllTours({
          cityTours: majorCitiesPackage,
          festivalTours: festivalTours.default,
          culturalTours: culturalTours.default,
          adventureTours: trekkingAdventure.default,
          groupTours: groupTours.default,
        });
      } catch (error) {
        console.error("Error loading tour data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

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

  const renderTourCards = (
    tours: any,
    category: any,
    ref?: React.RefObject<HTMLDivElement>
  ) => {
    if (tours.length === 0 && !searchTerm) return null;

    return (
      <Container className="py-8" ref={ref}>
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-l from-yellow-400 to-orange-400 inline-block py-2 px-4 rounded-lg shadow-md">
            {category}
          </h3>
          {searchTerm && tours.length > 0 && (
            <p className="text-lg text-gray-600 mt-2">
              Showing {tours.length} {category.toLowerCase()} matching "
              {searchTerm}"
            </p>
          )}
        </div>

        {tours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10 lg:px-20">
            {tours.map((tour: any) => (
              <div key={tour.id} className="h-full">
                <CityPackageCard tour={tour} />
              </div>
            ))}
          </div>
        ) : searchTerm ? (
          <div className="text-center py-8">
            <h3 className="text-xl font-medium text-gray-600 mb-6">
              No {category.toLowerCase()} found matching your search
            </h3>
          </div>
        ) : null}
      </Container>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-orange-600 font-medium">
            Loading amazing tours...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Search */}
      <div className="relative py-24 overflow-hidden bg-gray-900">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/packagebg.svg" 
            alt="Bhutan Landscape" 
            fill
            className="object-cover"
            priority
            loading="eager"
            quality={75}
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxZjJhMzciLz48L3N2Zz4="
          />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Bhutan Tour Packages
          </h1>
          <p className="text-xl text-white opacity-90 mb-8">
            Discover curated travel experiences to the Land of the Thunder
            Dragon
          </p>
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search all packages..."
              className="w-full py-4 px-6 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          </div>
        </div>
        </div>
      </div>

      {/* Category Overview Section */}
      {!searchTerm && (
        <Container className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Choose Your Perfect Bhutan Experience
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From cultural immersion to mountain adventures, discover our
              carefully curated tour categories designed for every type of
              traveler.
            </p>
          </div>

          {/* Category Navigation Cards */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6 mb-12">
            {[
              {
                id: "all",
                title: "All Tours",
                count:
                  allTours.cityTours.length +
                  allTours.festivalTours.length +
                  allTours.culturalTours.length +
                  allTours.adventureTours.length +
                  allTours.groupTours.length,
                icon: FiSearch,
                description: "Browse everything",
                gradient: "from-orange-500 to-yellow-500",
                hoverGradient: "hover:from-orange-600 hover:to-yellow-600",
                activeGradient: "from-orange-600 to-yellow-600",
              },
              {
                id: "city",
                title: "City Tours",
                count: allTours.cityTours.length,
                icon: FiMapPin,
                description: "From major cities",
                gradient: "from-yellow-400 to-orange-400",
                hoverGradient: "hover:from-yellow-500 hover:to-orange-500",
                activeGradient: "from-yellow-500 to-orange-500",
              },
              {
                id: "festival",
                title: "Festivals",
                count: allTours.festivalTours.length,
                icon: FiCalendar,
                description: "Cultural celebrations",
                gradient: "from-orange-400 to-red-400",
                hoverGradient: "hover:from-orange-500 hover:to-red-500",
                activeGradient: "from-orange-500 to-red-500",
              },
              {
                id: "cultural",
                title: "Cultural",
                count: allTours.culturalTours.length,
                icon: FiCamera,
                description: "Heritage & traditions",
                gradient: "from-yellow-500 to-amber-500",
                hoverGradient: "hover:from-yellow-600 hover:to-amber-600",
                activeGradient: "from-yellow-600 to-amber-600",
              },
              {
                id: "adventure",
                title: "Adventures",
                count: allTours.adventureTours.length,
                icon: FiTrendingUp,
                description: "Treks & outdoor",
                gradient: "from-orange-600 to-yellow-400",
                hoverGradient: "hover:from-orange-700 hover:to-yellow-500",
                activeGradient: "from-orange-700 to-yellow-500",
              },
              {
                id: "group",
                title: "Group Tours",
                count: allTours.groupTours.length,
                icon: FiUsers,
                description: "Travel together",
                gradient: "from-amber-400 to-orange-500",
                hoverGradient: "hover:from-amber-500 hover:to-orange-600",
                activeGradient: "from-amber-500 to-orange-600",
              },
            ].map((category) => (
              <div
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={`cursor-pointer transform hover:scale-105 transition-all duration-300 rounded-2xl p-6 text-white bg-gradient-to-br ${category.gradient} ${category.hoverGradient} ${
                  activeCategory === category.id
                    ? `ring-4 ring-yellow-300 shadow-2xl scale-105 ${category.activeGradient}`
                    : "hover:shadow-xl"
                }`}
              >
                <div className="text-center">
                  <category.icon className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-1">{category.title}</h3>
                  <p className="text-sm opacity-90 mb-2">
                    {category.description}
                  </p>
                  <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm font-medium">
                    {category.count} tours
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {allTours.cityTours.length +
                    allTours.festivalTours.length +
                    allTours.culturalTours.length +
                    allTours.adventureTours.length +
                    allTours.groupTours.length}
                </div>
                <div className="text-gray-600 font-medium">Total Packages</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">5</div>
                <div className="text-gray-600 font-medium">Tour Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  3-15
                </div>
                <div className="text-gray-600 font-medium">Days Duration</div>
              </div>
            </div>
          </div>
        </Container>
      )}

      {/* Filtered Tours View - Shows when category is selected */}
      {!searchTerm && activeCategory !== "all" && (
        <Container className="py-8" ref={filteredToursRef}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800 rounded-full text-sm font-medium mb-4">
              <FiCamera className="w-4 h-4 mr-2" />
              Category Filter Active
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
              {activeCategory === "city" &&
                "Bhutan Tour Packages from Major Cities"}
              {activeCategory === "festival" && "Bhutan Festival Tours"}
              {activeCategory === "cultural" && "Bhutan Cultural Tours"}
              {activeCategory === "adventure" && "Bhutan Treks & Adventures"}
              {activeCategory === "group" && "Bhutan Group Tours"}
            </h2>
            {/* <button
              onClick={() => {
                setActiveCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-orange-600 hover:text-orange-800 font-medium underline"
            >
              ← Back to all categories
            </button> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10 lg:px-20">
            {getFilteredTours().map((tour) => (
              <div key={`${tour.id}-${tour.categoryType}`} className="h-full">
                <CityPackageCard tour={tour} />
              </div>
            ))}
          </div>
        </Container>
      )}

      {/* Search Results View */}
      {searchTerm && (
        <Container className="py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              Search Results
            </h2>
            <p className="text-lg text-gray-600 mt-2">
              Found {allFilteredTours.length} packages matching "{searchTerm}"
            </p>
          </div>

          {allFilteredTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10 lg:px-20">
              {allFilteredTours.map((tour) => (
                <div key={`${tour.id}-${tour.category}`} className="h-full">
                  <CityPackageCard tour={tour} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-600 mb-6">
                No packages found matching your search
              </h3>
              <button
                onClick={() => setSearchTerm("")}
                className={`px-6 py-3 ${theme.primary} ${theme.primaryHover} text-white rounded-lg transition-all shadow-md`}
              >
                Clear Search
              </button>
            </div>
          )}
        </Container>
      )}

      {/* Category Views (hidden when searching or filtering) */}
      {!searchTerm && activeCategory === "all" && (
        <>
          {/* Major Cities Packages */}
          {renderTourCards(
            allTours.cityTours,
            "Bhutan Tour Packages from Major Cities",
            cityToursRef
          )}

          {/* Festival Tours */}
          {renderTourCards(
            allTours.festivalTours,
            "Bhutan Festival Tours",
            festivalToursRef
          )}

          {/* Cultural Tours */}
          {renderTourCards(
            allTours.culturalTours,
            "Bhutan Cultural Tours",
            culturalToursRef
          )}

          {/* Adventure Tours */}
          {renderTourCards(
            allTours.adventureTours,
            "Bhutan Treks & Adventures",
            adventureToursRef
          )}

          {/* Group Tours */}
          {renderTourCards(
            allTours.groupTours,
            "Bhutan Group Tours",
            groupToursRef
          )}
        </>
      )}

      {/* Call to Action */}
      {!searchTerm && (
        <div className="bg-gradient-to-r from-orange-500 to-yellow-400 py-12 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready for Your Bhutan Adventure?
            </h2>
            <p className="text-xl text-white mb-8">
              Contact our travel experts to customize your perfect trip
            </p>
            <button
              className={`bg-white ${theme.primaryText} font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors`}
            >
              Get a Custom Quote
            </button>
          </div>
        </div>
      )}

      <WhatsAppButton
        phoneNumber={process.env.NEXT_PUBLIC_PHONE_NO as string}
        message="Hello! I have a question about Bhutan tours"
      />
    </div>
  );
}

export default Index;
